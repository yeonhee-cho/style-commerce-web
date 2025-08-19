$(function () {
  bannerData();
});

function bannerData() {
  const bannerDataString = localStorage.getItem("selectedBanner");
  console.log(bannerDataString);

  if (bannerDataString) {
    const bannerData = JSON.parse(bannerDataString);
    document.title = `${bannerData.title} - 배너 상세 | NOVER`;

    document.querySelector(".banner-detail-img img").src = bannerData.image_url;
    document.querySelector(".banner-detail-img img").alt = bannerData.title;
    document.querySelector(".banner-maintit").textContent = bannerData.title;
    document.querySelector(".banner-txt").textContent = bannerData.subtitle;
  }
}
