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

  const buttonTag = document.createElement("button");
  buttonTag.textContent = hTag.textContent;
  buttonTag.addEventListener("click", () => {
    hTag.scrollIntoView({ behavior: "smooth", block: "start" });
    console.log("이동");
  });
  buttonTag.id = `TOC-${getTagId(hTag)}`;
  buttonTag.classList.add(`${hTag.tagName.toLowerCase()}-TOC`);

  const currentHTagElement = document.createElement("li");
  currentHTagElement.appendChild(buttonTag);

  return currentHTagElement;
}

function TOCHighlight() {
  const className = "active_TOC";

  const articleContents = document.getElementById(contentId);
  if (!articleContents) return;
  const hElements = Array.from(articleContents.querySelectorAll("h2, h3"));

  const viewportTop = window.scrollY;
  let highlightElement = hElements[0];
  let closestDistance = Infinity;
  hElements.forEach((element) => {
    const elementOffsetTop = element.getBoundingClientRect().top + viewportTop;
    const distance = Math.abs(scrollY - elementOffsetTop);
    if (closestDistance > distance) {
      highlightElement = element;
      closestDistance = distance;
    }
  });

  const toActive = getTocElement(highlightElement);

  if (toActive) {
    hElements.forEach((e) => {
      getTocElement(e)?.classList.remove(className);
    });
    toActive.classList.add(className);
  }
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
