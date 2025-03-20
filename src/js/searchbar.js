const searchWrap = document.getElementById("search-wrap");
const searchIcon = document.getElementById("js-search-icon");

searchIcon.addEventListener("click", () => {
  const isExpanded = searchIcon.getAttribute("aria-expanded") === "true"; // 修正

  if (isExpanded) {
    searchWrap.setAttribute("aria-hidden", "true");
    searchIcon.setAttribute("aria-expanded", "false");
  } else {
    searchWrap.setAttribute("aria-hidden", "false");
    searchIcon.setAttribute("aria-expanded", "true");
  }
});
