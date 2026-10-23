# THE PERSONAL CURATION — 웹사이트 코드

업로드한 영상의 분위기를 참고해 제작한 **HTML/CSS/JavaScript 기반 웹사이트**입니다. 별도 설치 없이 실행할 수 있습니다.

## 실행

1. `index.html` 파일을 웹브라우저에서 엽니다.
2. 메인 화면에서 원하는 책을 클릭하면 해당 책의 빈 페이지로 이동합니다.
3. 빈 페이지 왼쪽 위의 `← BACK`을 누르면 메인 화면으로 돌아갑니다.
4. 책 위에 마우스를 올리면 책등이 앞표지로 펼쳐집니다. 책장은 마우스로 드래그하거나 가로/세로 휠, 터치 스와이프로 좌우 이동할 수 있습니다.

## 파일 구조

- `index.html` : 메인 화면 및 책 18권의 링크
- `styles.css` : 메인 화면 디자인과 반응형 스타일
- `script.js` : 책장 좌우 드래그/스크롤
- `assets/figure-cover.svg` : 대표 책 표지 일러스트
- `books/book-01.html` ~ `books/book-18.html` : 각 책의 독립적인 빈 페이지
- `blank.css` : 빈 페이지용 기본 스타일
- `about.html` : ABOUT 메뉴의 빈 페이지

## 수정

- **책 페이지 내용 추가:** `books/book-01.html` 등에서 `<main class="blank-content">` 사이에 HTML을 추가합니다.
- **책 링크 변경:** `index.html`의 `<a class="book ..." href="books/book-01.html">` 속성을 수정합니다.
- **책 색상/높이 변경:** `styles.css`에 있는 `.book--...` 색상과 `index.html`의 `--book-width`, `--book-height` 값을 수정합니다.
- **제목 변경:** `index.html`의 `<h1>` 내용을 수정합니다.

모든 시각요소는 영상 분위기를 참고해 코드로 재구성했으며, 원본 사이트의 파일을 추출한 것은 아닙니다.
