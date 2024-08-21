// @ts-check

const tagHref = {
  h2Tag(hTag) {
    return `h2-${hTag.offsetTop}`;
  },
  h3Tag(hTag) {
    return `h3-${hTag.offsetTop}`;
  },
};

const contentId = "article-view";

window.addEventListener("scroll", TOCHighlight);

const articleContents = document.getElementById(contentId);

(function makeToc(articleContents) {
  if (!articleContents) return;

  const hElements = articleContents.querySelectorAll("h2, h3");
  const tocContainer = document.querySelector("#table-of-contents");

  const tocList = document.createElement("ul");
  tocContainer?.appendChild(tocList);
  tocList.id = "TOC-list";

  let currentH3List = null;

  hElements.forEach((hTag) => {
    if (hTag.tagName === "H2") {
      hTag.id = tagHref.h2Tag(hTag);

      const currentH2Item = document.createElement("li");
      const h2Link = document.createElement("a");
      h2Link.textContent = hTag.textContent;
      h2Link.href = `#${tagHref.h2Tag(hTag)}`;
      h2Link.id = `TOC-${tagHref.h2Tag(hTag)}`;
      h2Link.classList.add("h2-TOC");

      currentH2Item.appendChild(h2Link);

      currentH3List = document.createElement("ul");
      currentH2Item.appendChild(currentH3List);
      tocList.appendChild(currentH2Item);
    } else if (hTag.tagName === "H3") {
      hTag.id = tagHref.h3Tag(hTag);

      if (currentH3List) {
        const listItem = document.createElement("li");
        const h3Link = document.createElement("a");
        h3Link.textContent = `▸ ${hTag.textContent}`;
        h3Link.href = `#${tagHref.h3Tag(hTag)}`;
        h3Link.id = `TOC-${tagHref.h3Tag(hTag)}`;
        h3Link.classList.add("h3-TOC");

        listItem.appendChild(h3Link);
        currentH3List.appendChild(listItem);
      }
    }
  });
})(articleContents);

function TOCHighlight() {
  const className = "active_TOC";

  const articleContents = document.getElementById(contentId);
  if (!articleContents) return;
  const hElements = Array.from(articleContents.querySelectorAll("h2, h3"));

  const viewportTop = window.scrollY;
  const viewportMiddle = window.scrollY + window.innerHeight / 2;

  const elementsInRange = hElements.filter((el) => {
    const rect = el.getBoundingClientRect();
    const elementTop = rect.top + window.scrollY;
    const elementBottom = elementTop + rect.height;

    return elementTop <= viewportMiddle && elementBottom >= viewportTop;
  });

  let closest;

  if (elementsInRange.length > 0) {
    // 중간까지 보이는 요소가 존재하면 그 중에서 첫 번째 요소를 반환
    closest = elementsInRange[0];
  } else {
    // 화면 위쪽에 있는 가장 마지막 요소를 찾음
    const elementsAboveViewport = hElements.filter((el) => {
      const rect = el.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementBottom = elementTop + rect.height;

      return elementBottom < viewportTop;
    });

    if (elementsAboveViewport.length > 0) {
      // 가장 마지막 요소를 반환
      closest = elementsAboveViewport[elementsAboveViewport.length - 1];
    }
  }

  const toActive = getTocElement(closest);

  if (toActive) {
    hElements.forEach((e) => {
      getTocElement(e)?.classList.remove(className);
    });
    toActive.classList.add(className);
    scrollToCenter(toActive, "table-of-contents");
  }
}

function scrollToCenter(element, containerId) {
  const container = document.getElementById(containerId);

  if (!container) return;

  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  const elementCenter = elementRect.top - containerRect.top + container.scrollTop + elementRect.height / 2;
  const containerCenter = containerRect.height / 2;
  const scrollTop = elementCenter - containerCenter;

  container.scrollTo({
    top: scrollTop,
    behavior: "smooth",
  });
}

/**
 *
 * @param {Element | undefined} articleHTag
 * @returns {HTMLElement | null}
 */
function getTocElement(articleHTag) {
  let element;
  if (!articleHTag) return null;

  if (articleHTag.tagName === "H2") {
    element = document.getElementById(`TOC-${articleHTag.id}`);
  } else {
    element = document.getElementById(`TOC-${articleHTag.id}`);
  }

  return element;
}
