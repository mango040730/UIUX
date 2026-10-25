(() => {
  const frame = document.querySelector('.notion-frame-wrap');
  if (!frame) return;

  const chapterTitle = document.title.split('—')[0].trim();
  const pageUrl = window.location.href.split('#')[0];
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
        <span class="comments-preview-badge">DESIGN PREVIEW</span>
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
        <div class="comment-form-footer">
          <span class="comment-count" data-comment-count>0 / 500</span>
          <button class="comment-submit" type="submit">댓글 남기기</button>
        </div>
        <p class="comment-form-note">현재는 디자인 확인용입니다. 작성한 댓글은 저장되지 않으며 새로고침하면 사라집니다.</p>
        <p class="comment-form-message" aria-live="polite"></p>
      </form>
      <ol class="comment-list" data-comment-list>
        <li class="comment-empty" data-comment-empty>
          <p>아직 댓글이 없습니다.<br>첫 번째 생각을 남겨보세요.</p>
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

  commentText.addEventListener('input', () => {
    commentCount.textContent = `${commentText.value.length} / 500`;
  });

  commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!commentForm.reportValidity()) return;

    const author = commentForm.elements.author.value.trim();
    const comment = commentText.value.trim();
    if (!author || !comment) {
      formMessage.textContent = '이름과 댓글 내용을 입력해주세요.';
      return;
    }

    const item = document.createElement('li');
    item.className = 'comment-item comment-item--preview';
    item.innerHTML = `
      <article>
        <header class="comment-meta">
          <span class="comment-avatar" aria-hidden="true"></span>
          <div><strong></strong><time>방금 전 · 미리보기</time></div>
        </header>
        <p></p>
        <button type="button" class="comment-reply" disabled>답글</button>
      </article>
    `;
    item.querySelector('.comment-avatar').textContent = author.slice(0, 1);
    item.querySelector('strong').textContent = author;
    item.querySelector('article > p').textContent = comment;
    community.querySelector('[data-comment-empty]')?.remove();
    commentList.prepend(item);
    commentTotal.textContent = String(commentList.children.length);
    commentForm.reset();
    commentCount.textContent = '0 / 500';
    formMessage.textContent = '미리보기 댓글을 추가했습니다. 새로고침하면 사라집니다.';
    window.setTimeout(() => {
      formMessage.textContent = '';
    }, 3200);
  });
})();
