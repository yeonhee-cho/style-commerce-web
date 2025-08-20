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

  // 상품 등록
  addProducts();
  // 상품 캐러셀
  productSwiper();

  // 콘텐츠 등록
  addContents();
  // 콘텐츠 캐러셀
  contentSwiper();

  // 라이브 편성표 등록
  addSchedule();
  // 라이브 편성표 캐러셀
  scheduleSwiper();

  // 클릭 시 스크롤 상단으로 올리기
  touchTopEvent();
});

// 리사이징 시 배너 크기를 맞춰주기
let resizeTimer;

$(window).on("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    setTimeout(() => {
      swiper();
    }, 50);
  }, 200); // 200ms 안에 resize가 안 오면 새로고침
});

// 배너 슬라이드 등록
function addBanner() {
  $.get("json/banner.json").done(function (data) {
    if (data) {
      $("#bannerList").html(
        data
          .map(
            (i) => `
            <div class="banner-item" >
              <a href="pages/banner-detail.html" data-banner='${JSON.stringify(
                i
              )}'>
                <img src="${i.image_url}" alt="${i.title}" />
                <div class="banner-txt">
                  <p class="banner-tit">
                    ${i.title}
                  </p>
                  <p class="banner-cont">${i.subtitle}</p>
                </div>
              </a>
            </div>
            `
          )
          .join("")
      );
      document.querySelectorAll(".banner-item a").forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault();

          const banner = this.dataset.banner;
          console.log(banner);

          localStorage.setItem("selectedBanner", banner);

          window.location.href = this.getAttribute("href");
        });
      });
    }
  });

  // 배너 슬라이드 실행
  setTimeout(() => {
    swiper();
  }, 50);
}

// 배너 슬라이드 실행
let currentPage = 0; // 전역 선언
function swiper() {
  const bannerList = document.querySelector("#bannerList");
  let bannerCount = 3;

  window.addEventListener("resize", function () {
    if (bannerCount && window.innerWidth > 768) {
      bannerCount = 1;
    }
  });

  if (bannerList) {
    // 기존 자동 슬라이드 타이머 제거 (중복 방지)
    if (window.bannerTimer) clearInterval(window.bannerTimer);

    // 기존 복제된 슬라이드 제거
    $("#bannerList .banner-item.clone").remove();
    const bannerWidth = bannerList.offsetWidth;
    const bannerLength = $("#bannerList .banner-item").length;
    const totalPage = Math.ceil(bannerLength / bannerCount); // 올림으로 계산

    // 배너 슬라이드 임시 반복 - 빈 공간이 보이지 않도록 3의 배수로 만들어주기
    const remainder = bannerLength % bannerCount;

    if (remainder !== 0) {
      const itemsToClone = bannerCount - remainder;
      // 남은 갯수
      $(".banner-item")
        .slice(bannerCount)
        .slice(0, itemsToClone)
        .clone()
        .addClass("clone")
        .appendTo("#bannerList");

      // 배너 슬라이드 임시 반복 - 첫 페이지 용
      $(".banner-item")
        .slice(0, bannerCount)
        .clone()
        .addClass("clone")
        .appendTo("#bannerList");
    }

    // 이동 함수
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

    // 리사이즈 후 현재 위치 유지
    goToPage(currentPage, true);

    // 자동 슬라이드
    window.bannerTimer = setInterval(function () {
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

// 카테고리 등록 <a href="${i.link}"></a> 생략
function addCategory() {
  $.get("json/category.json").done(function (data) {
    if (data) {
      $("#cateResult").html(
        data.map(
          (i) => `
            <li class="category-item" >
              <div class="cate-icon">
                  <img src="${i.image}" alt="${i.alt}" />
              </div>
              <p class="cate-name">${i.title}</p>
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

// 상품 등록
function addProducts() {
  $.get("json/products.json").done(function (data) {
    if (data) {
      $("#pdResult").html(
        data
          .map(
            (i) => `
            <div class="product-item">
              <a href="pages/product-detail.html" data-product='${JSON.stringify(
                i
              )}'>
                  <div class="pd-image">
                    <img src="${i.image_urls[0]}" alt="${i.brand_name}" />
                    <!-- 활성화 시 "like-red" -->
                    <label class="pd-like-btn">
                      <input type="checkbox"  ${
                        i.is_liked ? "checked" : ""
                      }></input>
                    </label>
                  </div>
                  <div class="pd-text-area">
                    <p class="pd-brand">${i.brand_name}</p>
                    <p class="pd-tit">
                      ${i.product_name}
                    </p>
                    <p class="pd-price">
                      <span class="discount-per">${
                        i.discount_rate === 0 ? "" : i.discount_rate + "%"
                      }</span>
                      ${i.sale_price.toLocaleString()}원
                    </p>
                  </div>
              </a>
            </div>
            `
          )
          .join("")
      );

      document.querySelectorAll(".product-item a").forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault();

          const product = this.dataset.product; // data-product 가져오기
          localStorage.setItem("selectedProduct", product); // 이미 문자열이므로 바로 저장

          window.location.href = this.getAttribute("href"); // 페이지 이동
        });
      });
    }
  });
}
// 상품 리스트 캐러셀 스크롤 이동
function productSwiper() {
  const wrapper = document.getElementById("pdListWrap"); // 호버 시 버튼 올라올 때 깜박임을 없애기 위함
  const scrollContainer = document.getElementById("pdList");
  const btnPrev = document.getElementById("pdPrev");
  const btnNext = document.getElementById("pdNext");

  listSwiper(wrapper, scrollContainer, btnPrev, btnNext);
}

// 콘텐츠 등록
function addContents() {
  $.get("json/contents.json").done(function (datas) {
    if (datas) {
      $("#contResult").html(
        datas
          .map((data, index) => {
            const content = data.content;
            const products = data.products || [];
            const moreBtn = data.more_button;

            // 하단 이미지 리스트 부분
            let productHTML = "";
            if (products.length > 0) {
              productHTML += `<div class="con-image-list">`;

              const productCount = moreBtn
                ? Math.min(products.length, 3)
                : Math.min(products.length, 4);

              for (let i = 0; i < productCount; i++) {
                const p = products[i];

                productHTML += `
                <div class="con-image-item">
                  <a href="${p.url}">
                    <img src="${p.image}" alt="${p.brand + i}" />
                  </a>
                </div>
              `;
              }
              if (moreBtn) {
                productHTML += `
              <div class="con-image-item">
                <a href="${moreBtn.url}">
                  <img src="${moreBtn.image}" alt="더보기" />
                </a>
                <span>${moreBtn.label.replace("개", "개<br>")}</span>
              </div>
            `;
              }

              productHTML += `</div>`;
            }

            return `
            <div class="content-item">
                <a href="pages/content-detail.html" data-index="${index}"  class="cont-item-inner">
                  <div class="con-image">
                    <img src="${data.content.thumbnail}" alt="${
              data.content.title
            }" />
                  </div>
                  <div class="con-text-area">
                    <p class="con-cate">${data.content.category}</p>
                    <p class="con-tit">${data.content.title}</p>
                    <p class="con-con">
                      ${data.content.description}
                    </p>
                    <div class="cont-status-wrap">
                      <div class="cont-status">
                        <span class="cont-status-time">${
                          data.content.publish_date
                        }</span>
                        <div class="cont-status-view">
                          <div class="view-icon"></div>
                          <span class="view-num">${data.content.views}</span>
                        </div>
                      </div>
                      <div class="con-brand-wrap">
                        <p class="brand-txt">${data.content.authors.name}</p>
                        ${
                          data.content.authors.count
                            ? `<p class="brand-txt-etc">외 ${data.content.authors.count.toLocaleString()}개</p>`
                            : ""
                        }
                      </div>
                    </div>
                  </div>
                </a>
                ${productHTML}       
              </div>
            `;
          })
          .join("")
      );
      document.querySelectorAll(".content-item a").forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault();

          const index = this.dataset.index;
          localStorage.setItem("allContents", JSON.stringify(datas));
          localStorage.setItem("selectedIndex", index);
          window.location.href = this.getAttribute("href");
        });
      });
    }
  });
}
// 콘텐츠 리스트 캐러셀 스크롤 이동
function contentSwiper() {
  const wrapper = document.getElementById("contListWrap");
  const scrollContainer = document.getElementById("contList");
  const btnPrev = document.getElementById("contentPrev");
  const btnNext = document.getElementById("contentNext");

  listSwiper(wrapper, scrollContainer, btnPrev, btnNext);
}

// 라이브 편성표 등록
function addSchedule() {
  $.get("json/schedule.json").done(function (data) {
    if (data) {
      $("#scheduleResult").html(
        data
          .map(
            (i) => `
             <div class="schedule-item">
                <a href="pages/live-schedule-detail.html" data-schedule ='${JSON.stringify(
                  i
                )}' >
                  <div class="schedule-image">
                    <img src="${i.thumbnail}" alt="${i.title}" />
                    <p class="schdate-box">${i.d_day}</p>
                  </div>
                  <div class="schedule-text-area">
                    <p>${i.title}</p>
                  </div>
                </a>
              </div>
            `
          )
          .join("")
      );

      document.querySelectorAll(".schedule-item a").forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault();

          const schedule = this.dataset.schedule;
          console.log(schedule);

          localStorage.setItem("selectedSchedule", schedule);

          window.location.href = this.getAttribute("href");
        });
      });
    }
  });
}
// 라이브 리스트 캐러셀 스크롤 이동
function scheduleSwiper() {
  const wrapper = document.getElementById("scheduleListWrap");
  const scrollContainer = document.getElementById("scheduleList");
  const btnPrev = document.getElementById("schedulePrev");
  const btnNext = document.getElementById("scheduleNext");

  listSwiper(wrapper, scrollContainer, btnPrev, btnNext);
}

// 리스트 캐러셀 스크롤 이동
function listSwiper(wrapper, scrollContainer, btnPrev, btnNext) {
  // 버튼 클릭 이벤트
  btnPrev.addEventListener("click", () => {
    scrollCarousel(-1);
  });

  btnNext.addEventListener("click", () => {
    scrollCarousel(1);
  });

  // 스크롤 이동 함수
  function scrollCarousel(direction) {
    const containerWidth = scrollContainer.offsetWidth; // 가로 너비 구하기
    console.log(containerWidth);

    const currentScroll = scrollContainer.scrollLeft;
    const maxScroll = scrollContainer.scrollWidth - containerWidth;
    let newScroll = currentScroll + containerWidth * direction;

    // 스크롤 범위 제한
    if (newScroll < 0) newScroll = 0;
    if (newScroll > maxScroll) newScroll = maxScroll;

    // 부드러운 스크롤 이동
    scrollContainer.scrollTo({ left: newScroll, behavior: "smooth" });

    // 부드러운 스크롤 후 버튼 상태 업데이트를 위해 300ms 후 호출
    setTimeout(updateButtons, 300);
  }

  // 호버시 버튼 보이게
  btnPrev.style.display = "none";
  btnNext.style.display = "none";

  wrapper.addEventListener("mouseenter", () => {
    updateButtons();
  });

  wrapper.addEventListener("mouseleave", () => {
    btnPrev.style.display = "none";
    btnNext.style.display = "none";
  });

  // 버튼 보임/숨김 상태 갱신 함수
  function updateButtons() {
    const containerWidth = scrollContainer.offsetWidth;
    const currentScroll = scrollContainer.scrollLeft;
    const maxScroll = scrollContainer.scrollWidth - containerWidth;
    // 처음이면 왼쪽 버튼 숨기기
    btnPrev.style.display = currentScroll > 0 ? "block" : "none";
    // 끝이면 오른쪽 버튼 숨기기
    btnNext.style.display = currentScroll < maxScroll ? "block" : "none";
  }

  // 스크롤 이벤트에도 버튼 상태 갱신
  scrollContainer.addEventListener("scroll", updateButtons);

  // 초기 상태 버튼 세팅
  updateButtons();
  setTimeout(updateButtons, 100); // 상품 영역만 나오고 안 나와서 추가
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
