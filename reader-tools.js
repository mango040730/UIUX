(() => {
  const COMMENTS_API = 'https://script.google.com/macros/s/AKfycbzXJGrr0lXrususrMjIeelGCWAx4r2RgzSiYDeM5QDMI2k8jJxHWG2klgO2WGuvERdBGg/exec';
  const frame = document.querySelector('.notion-frame-wrap');
  if (!frame) return;

  const chapterTitle = document.title.split('—')[0].trim();
  const chapterId = window.location.pathname.match(/(book-\d{2})\.html$/)?.[1];
  const pageUrl = window.location.href.split('#')[0];
  if (!chapterId) return;
  const community = document.createElement('section');
  community.className = 'reader-community';
  community.setAttribute('aria-labelledby', 'community-title');
  community.innerHTML = `
    <div class="community-heading">
      <p class="community-kicker">JOIN THE CONVERSATION</p>
      <h2 id="community-title">읽은 뒤의 생각을 나눠보세요.</h2>
      <p>이 페이지를 공유하거나, 아래에 감상을 남길 수 있습니다.</p>
    </div>
    <div class="community-actions" aria-label="페이지 공유">
      <button class="community-button" type="button" data-share>공유하기</button>
      <button class="community-button community-button--quiet" type="button" data-copy>링크 복사</button>
      <p class="community-status" aria-live="polite"></p>
    </div>
    <div class="reader-comments">
      <div class="comments-heading">
        <div>
          <h3>댓글 <span data-comment-total>0</span></h3>
          <p>서로의 생각을 존중하며 이야기를 나눠주세요.</p>
        </div>
      </div>
      <form class="comment-form" data-comment-form>
        <label class="comment-field">
          <span>이름 또는 별명</span>
          <input type="text" name="author" maxlength="24" autocomplete="nickname" placeholder="어떻게 불러드릴까요?" required>
        </label>
        <label class="comment-field">
          <span>댓글</span>
          <textarea name="comment" rows="5" maxlength="500" placeholder="읽고 떠오른 생각을 자유롭게 남겨보세요." required></textarea>
        </label>
        <label class="comment-honeypot" aria-hidden="true">
          <span>웹사이트</span>
          <input type="text" name="website" tabindex="-1" autocomplete="off">
        </label>
        <label class="comment-privacy" data-private-option hidden>
          <input type="checkbox" name="private">
          <span>
            <strong>비밀댓글</strong>
            <small>댓글 내용은 운영자만 볼 수 있어요.</small>
          </span>
        </label>
        <div class="comment-form-footer">
          <span class="comment-count" data-comment-count>0 / 500</span>
          <button class="comment-submit" type="submit">댓글 남기기</button>
        </div>
        <p class="comment-form-note">댓글은 공개되며 운영자의 Google Sheet에 저장됩니다.</p>
        <p class="comment-form-message" aria-live="polite"></p>
      </form>
      <ol class="comment-list" data-comment-list>
        <li class="comment-empty" data-comment-empty>
          <p>댓글을 불러오는 중입니다.</p>
        </li>
      </ol>
    </div>
  `;
  frame.insertAdjacentElement('afterend', community);

  const status = community.querySelector('.community-status');
  const setStatus = (message) => {
    status.textContent = message;
    window.clearTimeout(setStatus.timer);
    setStatus.timer = window.setTimeout(() => {
      status.textContent = '';
    }, 2400);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setStatus('링크를 복사했습니다.');
    } catch {
      const input = document.createElement('textarea');
      input.value = pageUrl;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
      setStatus('링크를 복사했습니다.');
    }
  };

  community.querySelector('[data-copy]').addEventListener('click', copyLink);
  community.querySelector('[data-share]').addEventListener('click', async () => {
    if (!navigator.share) {
      await copyLink();
      return;
    }

    try {
      await navigator.share({
        title: `${chapterTitle} — THE PERSONAL CURATION`,
        text: `${chapterTitle} 아카이브를 함께 읽어보세요.`,
        url: pageUrl,
      });
    } catch (error) {
      if (error.name !== 'AbortError') setStatus('공유하지 못했습니다. 다시 시도해주세요.');
    }
  });

  const commentForm = community.querySelector('[data-comment-form]');
  const commentText = commentForm.elements.comment;
  const commentCount = community.querySelector('[data-comment-count]');
  const commentList = community.querySelector('[data-comment-list]');
  const commentTotal = community.querySelector('[data-comment-total]');
  const formMessage = community.querySelector('.comment-form-message');
  const submitButton = commentForm.querySelector('.comment-submit');
  const privateOption = commentForm.querySelector('[data-private-option]');

  const formatCommentDate = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';

    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfComment = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dayDifference = Math.round((startOfToday - startOfComment) / 86400000);
    if (dayDifference === 0) return '오늘';
    if (dayDifference === 1) return '어제';

    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const createCommentItem = (comment) => {
    const item = document.createElement('li');
    item.className = 'comment-item';
    if (comment.private) item.classList.add('comment-item--private');
    item.innerHTML = `
      <article>
        <header class="comment-meta">
          <span class="comment-avatar" aria-hidden="true"></span>
          <div><strong></strong><time></time></div>
          <span class="comment-private-badge" hidden>비밀댓글</span>
        </header>
        <p></p>
      </article>
    `;
    item.querySelector('.comment-avatar').textContent = comment.author.slice(0, 1);
    item.querySelector('strong').textContent = comment.author;
    item.querySelector('time').textContent = formatCommentDate(comment.createdAt);
    item.querySelector('time').dateTime = comment.createdAt;
    item.querySelector('article > p').textContent = comment.comment;
    item.querySelector('.comment-private-badge').hidden = !comment.private;
    return item;
  };

  const renderComments = (comments) => {
    commentList.replaceChildren();
    commentTotal.textContent = String(comments.length);

    if (!comments.length) {
      const empty = document.createElement('li');
      empty.className = 'comment-empty';
      empty.dataset.commentEmpty = '';
      empty.innerHTML = '<p>아직 댓글이 없습니다.<br>첫 번째 생각을 남겨보세요.</p>';
      commentList.appendChild(empty);
      return;
    }

    comments.forEach((comment) => commentList.appendChild(createCommentItem(comment)));
  };

  const loadComments = () => new Promise((resolve, reject) => {
    const callbackName = `__archiveComments_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement('script');
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error('댓글 요청 시간이 초과되었습니다.'));
    }, 10000);

    const cleanup = () => {
      window.clearTimeout(timeout);
      delete window[callbackName];
      script.remove();
    };

    window[callbackName] = (response) => {
      cleanup();
      if (!response?.ok || !Array.isArray(response.comments)) {
        reject(new Error(response?.message || '댓글을 불러오지 못했습니다.'));
        return;
      }
      privateOption.hidden = response.capabilities?.privateComments !== true;
      renderComments(response.comments);
      resolve(response.comments);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error('댓글 서버에 연결하지 못했습니다.'));
    };
    script.src = `${COMMENTS_API}?chapter=${encodeURIComponent(chapterId)}&callback=${encodeURIComponent(callbackName)}&t=${Date.now()}`;
    document.head.appendChild(script);
  });

  commentText.addEventListener('input', () => {
    commentCount.textContent = `${commentText.value.length} / 500`;
  });

  commentForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!commentForm.reportValidity()) return;

    const author = commentForm.elements.author.value.trim();
    const comment = commentText.value.trim();
    const isPrivate = !privateOption.hidden && commentForm.elements.private.checked;
    if (!author || !comment) {
      formMessage.textContent = '이름과 댓글 내용을 입력해주세요.';
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = '등록 중…';
    formMessage.textContent = '';

    try {
      await fetch(COMMENTS_API, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          chapter: chapterId,
          author,
          comment,
          visibility: isPrivate ? 'private' : 'public',
          website: commentForm.elements.website.value,
        }),
      });
      await loadComments();
      commentForm.reset();
      commentCount.textContent = '0 / 500';
      formMessage.textContent = isPrivate
        ? '비밀댓글을 등록했습니다. 내용은 운영자만 확인할 수 있습니다.'
        : '댓글을 등록했습니다.';
    } catch (error) {
      formMessage.textContent = error.message || '댓글을 등록하지 못했습니다. 다시 시도해주세요.';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = '댓글 남기기';
    }
  });

  loadComments().catch((error) => {
    commentList.innerHTML = '<li class="comment-empty"><p>댓글을 불러오지 못했습니다.<br>잠시 후 다시 시도해주세요.</p></li>';
    formMessage.textContent = error.message;
  });
})();
