$(function () {
  // 로그인 체크
  setTimeout(() => {
    loginCheck();
    $("#logoutBtn").click(logoutFn);
    goSearch();
    filter();
    filterTop();
  }, 1000);
});

// 로그인 되어 있을 시 변경
function loginCheck() {
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const mypageLink = document.querySelector('a[href="/pages/mypage.html"]');

  // 가져오기
  const loggedInUserString = sessionStorage.getItem("loggedInUser");
  let loggedInUser = null;
  if (loggedInUserString) {
    loggedInUser = JSON.parse(loggedInUserString);
  } else {
  }

  if (loggedInUser) {
    // 로그인 상태
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
    if (mypageLink) {
      mypageLink.setAttribute("href", "/pages/mypage.html");
      mypageLink.onclick = null;
    }
  } else {
    // 로그아웃 상태
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
    if (mypageLink) {
      mypageLink.setAttribute("href", "#");
      mypageLink.onclick = function (e) {
        e.preventDefault();
        alert("로그인 후 이용할 수 있습니다.\n로그인 페이지로 이동합니다.");
        window.location.href = "/pages/account/login.html";
      };
    }
  }
}

// 로그아웃
function logoutFn() {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  sessionStorage.removeItem("loggedInUser");
  console.log("loggedInUser:", loggedInUser);
  alert("로그아웃 완료");

  window.location.href = "/pages/account/login.html"; // 로그인 페이지로 이동
}

// 검색
function goSearch() {
  const mainSearchbar = document.getElementById("mainSearchbar");

  mainSearchbar.addEventListener("click", () => {
    window.location.href = "/pages/search-detail.html";
  });
}

// 상품 filter 하단 seg
function filter() {
  document.querySelectorAll(".sort").forEach((item) => {
    if (item) {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const filter = item.dataset.filter; // recommend, ranking, sale

        window.location.href = `/pages/product-list.html?filter=${filter}`;
      });
    }
  });
}

// 상품 filter 상단 메뉴
function filterTop() {
  document.querySelectorAll(".menu-sort").forEach((item) => {
    if (item) {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const filter = item.dataset.filter; // recommend, ranking, sale
        console.log(filter);

        window.location.href = `/pages/product-list.html?filter=${filter}`;
      });
    }
  });
}
