# TOC-tistory-Square

티스토리 블로그 Square 스킨의 TOC(Table Of Contents)

## 기능

- H2, H3 태그를 정리하여 오른쪽 빈 공간에 테이블로 표시(TOC)
- TOC에 표시된 제목을 누르면 해당 위치로 이동
- TOC에 현재 보고 있는 위치 표시

## 적용

Squre 스킨 전용: 해당 위치에 `<div id="table-of-contents"></div>` 코드 삽입

```html
<div id="content">
  <div id="content-inner"></div>
  <!-- content-inner close -->
  <div id="table-of-contents"></div>
  <!-- 삽입 -->
</div>
<!-- content close -->
```

toc.min.js와 toc.min.css를 업로드

## 수정

최초 clone 후

```bash
npm install
```

TOC.js 혹은 TOC.css 수정 후

```bash
npm start
```

toc.min.js와 toc.min.css 생성

- console과 debugger 및 주석이 지워진 작은 js, css 파일로 변경
