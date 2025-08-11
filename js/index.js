$(function () {
  /*
    해야 하는 것!!
    1. 메뉴 슬라이드
        - 3초에 한 번씩 자동 돌아가기 (반복) : 페이지가 열리면 바로 시작할 것
        - 이전 다음 선택 시 상황에 맞게 이동되어질 것
        - 오 -> 왼으로 이동되면서 변경 : 반복되어 보여야 함!!
  */
  $(".banner-item").slice(0, 3).clone().appendTo("#bannerList");
  swiper();
});

function swiper() {
  let currentPage = 0;
  const bannerList = document.querySelector("#bannerList");

  if (bannerList) {
    const bannerWidth = bannerList.offsetWidth;
    const bannerLength = $(".banner-item").length;
    const totalPage = bannerLength / 3;

    // 중복 함수
    function goToPage(page, instant = false) {
      if (instant) {
        $("#bannerList").css("left", -bannerWidth * page);
      } else {
        $("#bannerList").animate(
          {
            left: -bannerWidth * page,
          },
          500
        );
      }
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
      goToPage(currentPage);

      // 마지막 페이지 넘어가면 즉시 처음 위치로 (클론 효과)
      if (currentPage >= totalPage - 1) {
        setTimeout(() => {
          // 순간적으로 첫 페이지로 이동
          currentPage = 0;
          goToPage(0, true);
        }, 510); // 애니메이션 끝난 뒤 이동
      }
    }, 3000);
  }
}
