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

## 적용된 블로그 게시글 보기

[TOC 적용된 블로그 게시글](https://curt-poem.tistory.com/entry/%EB%B0%98%EC%9D%91%ED%98%95-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%BB%A8%ED%85%8C%EC%9D%B4%EB%84%88-%EC%BF%BC%EB%A6%AC%EB%A1%9C-%EC%83%88%EB%A1%AD%EA%B2%8C-%EC%9A%94%EB%A6%AC%ED%95%98%EA%B8%B0) - 폰트 및 글자 크기로 인해 실제 적용시 다를 수 있습니다.

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
