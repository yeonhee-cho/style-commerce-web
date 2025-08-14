$(function () {
  pwTypeCheck();
  $("#loginBtn").click(loginFn);
});
const userIdInput = document.getElementById("userId");
const passwordInput = document.getElementById("password");

// 비밀번호 보이기/ 안보이기
function pwTypeCheck() {
  $("#pwViewType").click(function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      pwViewType.classList.add("active");
    } else {
      passwordInput.type = "password";
      pwViewType.classList.remove("active");
    }
  });
}

// 로그인
function loginFn() {
  const userId = userIdInput.value.trim();
  const password = passwordInput.value.trim();

  if (!userId && !password) {
    alert("아이디와 비밀번호를 입력하세요.");
    return;
  }
  if (!userId) {
    alert("아이디를 입력하세요.");
    return;
  }
  if (!password) {
    alert("비밀번호를 입력하세요.");
    return;
  }

  const usersJSON = localStorage.getItem("userList");
  if (!usersJSON) {
    alert("가입된 사용자가 없습니다.");
    return;
  }

  const users = JSON.parse(usersJSON);
  console.log("유저 목록", users);

  // 유저 찾기
  const foundUser = users.find((u) => u.userId === userId);
  if (!foundUser) {
    alert("아이디가 일치하지 않습니다.");
    return;
  }
  if (foundUser.password !== password) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  alert("로그인 성공!");
  sessionStorage.setItem(
    "loggedInUser",
    JSON.stringify({
      userId: foundUser.userId,
      userName: foundUser.userName,
      userEmail: foundUser.userEmail,
      recommender: foundUser.recommender,
      marketingSwitch: foundUser.marketingSwitch,
    })
  );

  console.log(sessionStorage);
  window.location.href = "/";
}
