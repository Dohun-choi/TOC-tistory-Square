// @ts-check

/**
 *
 * @param {HTMLElement} hTag
 * @returns
 */
function getTagId(hTag) {
  return `${hTag.tagName}-${hTag.offsetTop}`;
}

const contentId = "article-view";

window.addEventListener("scroll", TOCHighlight);

const articleContents = document.getElementById(contentId);

(function makeToc(articleContents) {
  if (!articleContents) return;

  const hElements = /** @type {NodeListOf<HTMLElement>} */ (articleContents.querySelectorAll("h2, h3"));
  const tocContainer = document.querySelector("#table-of-contents");

  const tocList = document.createElement("ul");
  tocContainer?.appendChild(tocList);
  tocList.id = "TOC-list";

  let currentH3List = /** @type {HTMLElement | null} */ (null);

  hElements.forEach((hTag) => {
    const currentList = setTOC(hTag);
    if (hTag.tagName === "H2") {
      tocList.appendChild(currentList);
    } else if (hTag.tagName === "H3") {
      if (currentH3List) currentH3List.appendChild(currentList);
      else tocList.appendChild(currentList);
    }
  });
})(articleContents);

/**
 *
 * @param {HTMLElement} hTag
 */
function setTOC(hTag) {
  hTag.id = getTagId(hTag);

  const aTag = document.createElement("a");
  aTag.textContent = hTag.textContent;
  aTag.href = `#${getTagId(hTag)}`;
  aTag.id = `TOC-${getTagId(hTag)}`;
  aTag.classList.add(`${hTag.tagName.toLowerCase()}-TOC`);

  const currentHTagElement = document.createElement("li");
  currentHTagElement.appendChild(aTag);

  return currentHTagElement;
}

function TOCHighlight() {
  const className = "active_TOC";

  const articleContents = document.getElementById(contentId);
  if (!articleContents) return;
  const hElements = Array.from(articleContents.querySelectorAll("h2, h3"));

  const viewportTop = window.scrollY;
  const viewportMiddle = window.scrollY + window.innerHeight / 1.5;

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

  element = document.getElementById(`TOC-${articleHTag.id}`);

  return element;
}
