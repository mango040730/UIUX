/*
 * 마우스로 책장을 좌우로 드래그할 수 있습니다.
 * 각 책은 내부 전자책 또는 외부 아카이브 페이지로 연결됩니다.
 */
const shelf = document.querySelector('.library');

if (shelf) {
  let startX = 0;
  let startScrollLeft = 0;
  let isDragging = false;
  let moved = false;

  shelf.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch' || event.button !== 0) return;
    isDragging = true;
    moved = false;
    startX = event.clientX;
    startScrollLeft = shelf.scrollLeft;
    shelf.classList.add('dragging');
  });

  window.addEventListener('pointermove', (event) => {
    if (!isDragging) return;
    const distance = event.clientX - startX;
    if (Math.abs(distance) > 6) moved = true;
    if (moved) shelf.scrollLeft = startScrollLeft - distance;
  });

  window.addEventListener('pointerup', () => {
    isDragging = false;
    shelf.classList.remove('dragging');
    if (moved) window.setTimeout(() => { moved = false; }, 0);
  });

  shelf.addEventListener('click', (event) => {
    if (moved) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);

  // 일반 마우스의 세로 휠로도 책장을 좌우 탐색할 수 있습니다.
  shelf.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX) && shelf.scrollWidth > shelf.clientWidth) {
      event.preventDefault();
      shelf.scrollLeft += event.deltaY;
    }
  }, { passive: false });
}
