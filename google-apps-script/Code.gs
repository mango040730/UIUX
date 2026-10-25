const SPREADSHEET_ID = '1aI1Uko21_UvXWSLwBwQhdsphvt0TXTY7NzjEPngfBmI';
const SHEET_NAME = 'Comments';
const HEADERS = [
  'id',
  'chapter',
  'author',
  'comment',
  'createdAt',
  'status',
  'visibility',
  'deleteTokenHash'
];

function doGet(e) {
  const chapter = String(e.parameter.chapter || '').trim();
  const callback = String(e.parameter.callback || '').trim();

  if (!isValidChapter_(chapter)) {
    return respond_(callback, {
      ok: false,
      message: '올바르지 않은 장입니다.'
    });
  }

  const sheet = getCommentSheet_();
  const lastRow = sheet.getLastRow();
  const capabilities = { privateComments: true };

  if (lastRow < 2) {
    return respond_(callback, { ok: true, comments: [], capabilities: capabilities });
  }

  const rows = sheet
    .getRange(2, 1, lastRow - 1, HEADERS.length)
    .getDisplayValues();

  const comments = rows
    .filter(row => row[1] === chapter && row[5] === 'published')
    .reverse()
    .slice(0, 100)
    .map(row => {
      const isPrivate = row[6] === 'private';
      return {
        id: row[0],
        chapter: row[1],
        author: isPrivate ? '비공개' : row[2],
        comment: isPrivate ? '비밀댓글입니다.' : row[3],
        createdAt: row[4],
        private: isPrivate
      };
    });

  return respond_(callback, {
    ok: true,
    comments: comments,
    capabilities: capabilities
  });
}

function doPost(e) {
  const params = e.parameter || {};
  const action = String(params.action || 'create').trim();

  // 자동 입력 봇이 숨겨진 필드를 채운 경우 저장하지 않습니다.
  if (String(params.website || '').trim()) {
    return json_({ ok: true });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    if (action === 'delete') {
      return deleteComment_(params);
    }
    return createComment_(params);
  } finally {
    lock.releaseLock();
  }
}

function createComment_(params) {
  const chapter = String(params.chapter || '').trim();
  const requestedId = String(params.id || '').trim();
  const deleteToken = String(params.deleteToken || '').trim();
  const author = String(params.author || '').trim();
  const comment = String(params.comment || '').trim();
  const visibility = String(params.visibility || 'public').trim() === 'private'
    ? 'private'
    : 'public';
  const id = requestedId || Utilities.getUuid();

  if (!isValidChapter_(chapter)) {
    return json_({ ok: false, message: '올바르지 않은 장입니다.' });
  }
  if (!isValidId_(id)) {
    return json_({ ok: false, message: '댓글 정보가 올바르지 않습니다.' });
  }
  if (deleteToken && !isValidDeleteToken_(deleteToken)) {
    return json_({ ok: false, message: '댓글 삭제 정보가 올바르지 않습니다.' });
  }
  if (!author || author.length > 24) {
    return json_({ ok: false, message: '이름은 1~24자로 입력해주세요.' });
  }
  if (!comment || comment.length > 500) {
    return json_({ ok: false, message: '댓글은 1~500자로 입력해주세요.' });
  }

  const sheet = getCommentSheet_();
  if (findCommentRow_(sheet, id)) {
    return json_({ ok: false, message: '이미 처리된 댓글입니다.' });
  }

  const row = [
    id,
    chapter,
    escapeFormula_(author),
    escapeFormula_(comment),
    new Date().toISOString(),
    'published',
    visibility,
    deleteToken ? hashToken_(deleteToken) : ''
  ];
  const target = sheet.getRange(sheet.getLastRow() + 1, 1, 1, HEADERS.length);
  target.setNumberFormat('@');
  target.setValues([row]);

  return json_({ ok: true, id: id });
}

function deleteComment_(params) {
  const chapter = String(params.chapter || '').trim();
  const id = String(params.id || '').trim();
  const deleteToken = String(params.deleteToken || '').trim();

  if (!isValidChapter_(chapter) || !isValidId_(id) || !isValidDeleteToken_(deleteToken)) {
    return json_({ ok: false, message: '삭제 요청이 올바르지 않습니다.' });
  }

  const sheet = getCommentSheet_();
  const rowNumber = findCommentRow_(sheet, id);
  if (!rowNumber) {
    return json_({ ok: false, message: '댓글을 찾을 수 없습니다.' });
  }

  const row = sheet.getRange(rowNumber, 1, 1, HEADERS.length).getDisplayValues()[0];
  const tokenMatches = row[7] && row[7] === hashToken_(deleteToken);
  if (row[1] !== chapter || row[5] !== 'published' || !tokenMatches) {
    return json_({ ok: false, message: '댓글 삭제 권한이 없습니다.' });
  }

  sheet.getRange(rowNumber, 3, 1, 6).setValues([[
    '',
    '',
    new Date().toISOString(),
    'deleted',
    '',
    ''
  ]]);

  return json_({ ok: true });
}

function getCommentSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.setFrozenRows(1);
  }

  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  return sheet;
}

function findCommentRow_(sheet, id) {
  if (sheet.getLastRow() < 2) return null;
  const match = sheet
    .getRange(2, 1, sheet.getLastRow() - 1, 1)
    .createTextFinder(id)
    .matchEntireCell(true)
    .findNext();
  return match ? match.getRow() : null;
}

function isValidChapter_(chapter) {
  return /^book-(0[1-9]|1[0-8])$/.test(chapter);
}

function isValidId_(id) {
  return /^[A-Za-z0-9-]{16,80}$/.test(id);
}

function isValidDeleteToken_(token) {
  return /^[a-f0-9]{48}$/.test(token);
}

function hashToken_(token) {
  const bytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    token,
    Utilities.Charset.UTF_8
  );
  return bytes
    .map(byte => (byte < 0 ? byte + 256 : byte).toString(16).padStart(2, '0'))
    .join('');
}

function escapeFormula_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function respond_(callback, data) {
  if (/^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback)) {
    return ContentService
      .createTextOutput(callback + '(' + JSON.stringify(data) + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return json_(data);
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
