$(function () {
  /*
    넣어야하는 값!!
    1. 배너 슬라이드 값 넣기
    2. 카테고리 값
    --------------------------
    3. 상품 값
    4. 콘텐츠 값
    5. 편성표 값
  */
  /*
    해야 하는 기능!!
    1. 메뉴 슬라이드 기능
        - 3초에 한 번씩 자동 돌아가기 (반복) : 페이지가 열리면 바로 시작할 것
        - 이전 다음 선택 시 상황에 맞게 이동되어질 것
        - 오 -> 왼으로 이동되면서 변경 : 반복되어 보여야 함!!
    2. 클릭 시 스크롤 상단으로 올리기
    3. 터치로 스크롤 되어지게 하기
    --------------------------------------------------------------------------------
  */

  // 배너 슬라이드 등록
  addBanner();

  // 카테고리 등록
  addCategory();

  // 터치로 스크롤 기능(상품 + 콘텐츠 + 편성표)
  const pdList = document.getElementById("pdList");
  const contList = document.getElementById("contList");
  const scheduleList = document.getElementById("scheduleList");

  touchScrollEvent(pdList);
  touchScrollEvent(contList);
  touchScrollEvent(scheduleList);

  // 클릭 시 스크롤 상단으로 올리기
  touchTopEvent();
});

// TODO 확인 필요
// 리사이징 시 배너 크기를 맞춰주고 싶은데 일단 새로고침해서 다시 시작되는거로 넣어둠 (with debounce)
let resizeTimer;

$(window).on("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    location.reload();
  }, 200); // 200ms 안에 resize가 안 오면 새로고침
});

// 배너 슬라이드 등록
function addBanner() {
  $.get("../json/banner.json").done(function (data) {
    $("#bannerList").html(
      data.map(
        (i) => `
            <a href="${i.link}" class="banner-item" >
              <img src="${i.image_url}" alt="${i.title}" />
              <div class="banner-txt">
                <p class="banner-tit">
                  ${i.title}
                </p>
                <p class="banner-cont">${i.subtitle}</p>
              </div>
            </a>
            `
      )
    );
  });

  // 배너 슬라이드 실행
  setTimeout(() => {
    swiper();
  }, 50);
}

// 배너 슬라이드 실행
function swiper() {
  let currentPage = 0;
  const bannerList = document.querySelector("#bannerList");

  if (bannerList) {
    const bannerWidth = bannerList.offsetWidth;
    const bannerLength = $("#bannerList .banner-item").length;
    const totalPage = Math.ceil(bannerLength / 3); // 올림으로 계산

    // 배너 슬라이드 임시 반복 - 빈 공간이 보이지 않도록 3의 배수로 만들어주기
    const remainder = bannerLength % 3;

    if (remainder !== 0) {
      const itemsToClone = 3 - remainder;
      // 남은 갯수
      $(".banner-item")
        .slice(3)
        .slice(0, itemsToClone)
        .clone()
        .appendTo("#bannerList");

      // 배너 슬라이드 임시 반복 - 첫 페이지 용
      $(".banner-item").slice(0, 3).clone().appendTo("#bannerList");
    }

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

    // 자동 슬라이드
    setInterval(function () {
      currentPage++;
      goToPage(currentPage);

      // 마지막 페이지 넘어가면 즉시 처음 위치로
      if (currentPage >= totalPage) {
        setTimeout(() => {
          // 첫 페이지로 이동
          currentPage = 0;
          goToPage(currentPage, true);
        }, 510);
      }
    }, 3000);

    // 다음 버튼 클릭 시
    $("#bannerNext").click(function () {
      currentPage++;
      goToPage(currentPage);

      // 반복
      if (currentPage >= totalPage - 1) {
        setTimeout(() => {
          currentPage = 0;
          goToPage(currentPage, true);
        }, 510);
      }
    });

    // 이전 버튼 클릭시
    $("#bannerPrev").click(function () {
      // 반복
      if (currentPage <= 0) {
        currentPage = totalPage - 1;
        goToPage(currentPage, true);
        currentPage--;
        setTimeout(() => {
          goToPage(currentPage);
        }, 10);
      } else {
        currentPage--;
        goToPage(currentPage);
      }
    });
  }
}

// 카테고리 등록
function addCategory() {
  $.get("../json/category.json").done(function (data) {
    if (data) {
      $("#cateResult").html(
        data.map(
          (i) => `
            <li class="category-item" >
                <a href="${i.link}">
                    <div class="cate-icon">
                        <img src="${i.image}" alt="${i.alt}" />
                    </div>
                    <p class="cate-name">${i.title}</p>
                </a>
            </li>
            `
        )
      );
    }
  });
}

// 터치로 스크롤 기능
function touchScrollEvent(scrollList) {
  let isMouseDown = false;
  let startX, scrollLeft; // 마우스 누른 순간의 x좌표, 스크롤바 위치

  // 마우스 눌렀을 경우
  scrollList.addEventListener("mousedown", function (e) {
    isMouseDown = true;
    startX = e.pageX;
    scrollLeft = scrollList.scrollLeft;
    e.preventDefault();
  });

  // 마우스 커서가 요소 밖으로 나갈 때
  scrollList.addEventListener("mouseleave", () => {
    isMouseDown = false;
  });

  // 마우스 버튼을 떼는 순간
  scrollList.addEventListener("mouseup", () => {
    isMouseDown = false;
  });

  // 마우스가 움직일 때
  scrollList.addEventListener("mousemove", (e) => {
    if (!isMouseDown) return; // mouseleave, mouseup 시 함수 종료, 적용 안 함
    e.preventDefault();
    const x = e.pageX - scrollList.offsetLeft; // 현재 마우스 가로 위치
    const walk = (x - startX) * 1; // 마우스의 움직인 위치 계산
    scrollList.scrollLeft = scrollLeft - walk; // 스크롤 된 값 구한 내용 적용하기
  });
}

// 클릭 시 스크롤 상단으로 올리기
function touchTopEvent() {
  $("#scrollTopBtn").hide(); // 처음에는 버튼 숨김

  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $("#scrollTopBtn").fadeIn();
    } else {
      $("#scrollTopBtn").fadeOut();
    }
  });

  $("#scrollTopBtn").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
  });
}
