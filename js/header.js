// 모든 헤더 관련 기능을 초기화하는 메인 함수
function initializeHeader() {
  // 헤더의 핵심 요소(햄버거 버튼)가 로드되었는지 확인
  const menuBtn = document.querySelector(".menu-detail-btn");

  // 아직 로드되지 않았다면, 잠시 후 다시 시도
  if (!menuBtn) {
    setTimeout(initializeHeader, 100); // 0.1초 후 재시도
    return;
  }

  // 요소가 성공적으로 로드되면 모든 기능 실행
  loginCheck();
  goSearch();
  filter();
  filterTop();
  initMobileMenu();
}

// 페이지 로드가 시작되면 초기화 함수 실행
$(function () {
  initializeHeader();
});

// 현재 페이지의 상대 경로를 계산하는 함수
function getBasePath() {
  const currentPath = window.location.pathname;
  if (currentPath.includes("/pages/account/")) return "../../";
  if (currentPath.includes("/pages/")) return "../";
  return "";
}

// NOTE Mobile 모바일 메뉴(햄버거) 기능 초기화
function initMobileMenu() {
  const menuBtn = document.querySelector(".menu-detail-btn");
  const mobileDropdown = document.querySelector(".mobile-dropdown");

  if (menuBtn && mobileDropdown) {
    menuBtn.addEventListener("click", function (e) {
      e.stopPropagation(); // 이벤트 버블링 방지
      mobileDropdown.classList.toggle("active");
      // 메뉴가 열리면 배경 스크롤 막기
      document.body.style.overflow = mobileDropdown.classList.contains("active")
        ? "hidden"
        : "";
    });

    // 메뉴 바깥을 클릭하면 닫기
    document.addEventListener("click", function (e) {
      if (!mobileDropdown.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileDropdown.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }
}

// 로그인 상태를 확인하고 UI를 변경하는 함수
function loginCheck() {
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const mypageLink = document.querySelector(".mypage-link");
  const basePath = getBasePath();
  const loggedInUser = sessionStorage.getItem("loggedInUser");

  if (loggedInUser) {
    // 로그인 상태
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "block";
    if (mypageLink) mypageLink.onclick = null; // 경고창 이벤트 제거
  } else {
    // 로그아웃 상태일 때
    if (loginBtn) loginBtn.style.display = "block";
    if (logoutBtn) logoutBtn.style.display = "none";
    if (mypageLink) {
      mypageLink.onclick = function (e) {
        e.preventDefault();
        alert("로그인 후 이용할 수 있습니다.\n로그인 페이지로 이동합니다.");
        window.location.href = basePath + "pages/account/login.html";
      };
    }
  }
  // 로그아웃 버튼에 이벤트 연결
  if (logoutBtn) {
    logoutBtn.onclick = logoutFn;
  }
}

// 로그아웃 기능
function logoutFn() {
  sessionStorage.removeItem("loggedInUser");
  alert("로그아웃 되었습니다.");
  window.location.href = getBasePath() + "index.html"; // 홈으로 이동
}

// 검색창 클릭 시 검색 페이지로 이동
function goSearch() {
  const mainSearchbar = document.getElementById("mainSearchbar");
  if (mainSearchbar) {
    mainSearchbar.addEventListener("click", () => {
      window.location.href = getBasePath() + "pages/search-detail.html";
    });
  }
}

// 상품 목록 필터링 기능 (상단 메뉴)
function filterTop() {
  document.querySelectorAll(".menu-sort").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const filter = item.dataset.filter; // woman man bag acc shoes
      console.log(filter);

      window.location.href =
        getBasePath() + `/pages/product-list.html?filter=${filter}`;
    });
  });
}

// 상품 목록 필터링 기능 (세그먼트 메뉴)
function filter() {
  document.querySelectorAll(".sort").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const filter = item.dataset.filter; // recommend, ranking, sale

      window.location.href =
        getBasePath() + `pages/product-list.html?filter=${filter}`;
    });
  });
}

// NOTE Mobile 창 크기가 데스크톱으로 돌아오면 모바일 메뉴 닫기
window.addEventListener("resize", function () {
  const mobileDropdown = document.querySelector(".mobile-dropdown");
  if (mobileDropdown && window.innerWidth > 768) {
    mobileDropdown.classList.remove("active");
    document.body.style.overflow = "";
  }
});
