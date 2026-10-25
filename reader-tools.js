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
        <h3>댓글</h3>
        <p>댓글 작성에는 GitHub 로그인이 필요합니다.</p>
      </div>
      <div class="comments-thread"></div>
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

  const commentsScript = document.createElement('script');
  commentsScript.src = 'https://utteranc.es/client.js';
  commentsScript.async = true;
  commentsScript.crossOrigin = 'anonymous';
  commentsScript.setAttribute('repo', 'mango040730/UIUX');
  commentsScript.setAttribute('issue-term', 'pathname');
  commentsScript.setAttribute('theme', 'github-light');
  commentsScript.setAttribute('label', 'comments');
  community.querySelector('.comments-thread').appendChild(commentsScript);
})();
