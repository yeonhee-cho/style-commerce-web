$(function () {
  // 로그인 체크
  setTimeout(() => {
    loginCheck();
    $("#logoutBtn").click(logoutFn);
  }, 100);
});

//로그인 되어 있을 시 변경
function loginCheck() {
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const loggedInUser = sessionStorage.getItem("loggedInUser");

  if (loggedInUser) {
    // 로그인 상태
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
  } else {
    // 로그아웃 상태
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
  }
}

function logoutFn() {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  sessionStorage.removeItem("loggedInUser");
  console.log("loggedInUser:", loggedInUser);
  alert("로그아웃 완료");

  window.location.href = "/pages/account/login.html"; // 로그인 페이지로 이동
}
