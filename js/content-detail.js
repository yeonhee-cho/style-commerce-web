$(function () {
  contentData();
});

function contentData() {
  const index = localStorage.getItem("selectedIndex");
  const allContents = JSON.parse(localStorage.getItem("allContents"));
  console.log("?", index, allContents);

  if (index != null && allContents) {
    const data = allContents[index];
    const content = data.content;

    document.title = `${content.title} - 라이브 편성표 상세 | NOVER`;

    document.querySelector(".content-detail-img img").src = content.thumbnail;
    document.querySelector(".content-detail-img img").alt = content.title;
    document.querySelector(".content-detail-maintit").textContent =
      content.title;
    document.querySelector(".content-detail-authors").textContent =
      content.authors.name;
    document.querySelector(".content-detail-txt").textContent =
      content.description;
  }
}
