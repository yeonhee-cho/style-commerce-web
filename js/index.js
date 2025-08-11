$(function () {
  // 해야 하는 것!!
  // 1. 메뉴 슬라이드
  // - 3초에 한 번씩 자동 돌아가기 (반복)
  // - 오->왼으로 이동되면서 변경

  swiper();
});
// 페이지가 열리면 바로 시작할 것
// 이전 다음 선택 시 상황에 맞게 이동되어질 것
function swiper() {
  let currentPage = 0;
  const bannerList = document.querySelector("#bannerList");

  if (bannerList) {
    const bannerWidth = bannerList.offsetWidth;
    const bannerLength = $(".banner-item").length;
    const totalPage = bannerLength / 3;

    // 중복 함수
    function goToPage(page) {
      $("#bannerList").animate(
        {
          left: -bannerWidth * page,
        },
        500
      );
    }

    $("#bannerNext").click(function () {
      if (currentPage < totalPage - 1) {
        currentPage++;
        goToPage(currentPage);
      } else {
        alert("마지막 페이지입니다.");
      }
    });

    $("#bannerPrev").click(function () {
      if (currentPage > 0) {
        currentPage--;
        goToPage(currentPage);
      } else {
        alert("첫 번째 페이지입니다.");
      }
    });

    setInterval(function () {
      currentPage++;
      if (currentPage >= totalPage) {
        currentPage = 0;
      }
      goToPage(currentPage);
    }, 3000);
  }
}
