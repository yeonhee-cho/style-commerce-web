$(function () {
  // 로그인 체크
  setTimeout(() => {
    loginCheck();
    $("#logoutBtn").click(logoutFn);
  }, 100);
});

// TODO 가져오기 마이페이지에 나열
const loggedInUserString = sessionStorage.getItem("loggedInUser");
let loggedInUser = null;

//로그인 되어 있을 시 변경
function loginCheck() {
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  // TODO 가져오기 마이페이지에 나열
  if (loggedInUserString) {
    loggedInUser = JSON.parse(loggedInUserString);
  }
  if (loggedInUser) {
    console.log(loggedInUser.userId); // 안전하게 접근 가능
    console.log(loggedInUser.userName);
  }

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
