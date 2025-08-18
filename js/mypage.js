$(function () {
  getMyData();
  saveMyData();
});

function getMyData() {
  const loggedInUserString = sessionStorage.getItem("loggedInUser");
  let loggedInUser = null;

  if (loggedInUserString) {
    loggedInUser = JSON.parse(loggedInUserString);
  }
  if (loggedInUser) {
    console.log(loggedInUser.userId); // 안전하게 접근 가능
    console.log(loggedInUser.userName);
    console.log(loggedInUser.userEmail);
    console.log(loggedInUser.recommender);
    console.log(loggedInUser.marketingSwitch);

    document.querySelector("#myId").textContent = loggedInUser.userId;
    document.querySelector("#myName").textContent = loggedInUser.userName;
    document.querySelector("#myEmail").textContent = loggedInUser.userEmail;
    document.querySelector("#myRecommender").textContent =
      loggedInUser.recommender;
    document.querySelector("#myMarketing").checked =
      loggedInUser.marketingSwitch;
  }
}

// 마케팅 동의 저장
function saveMyData() {
  const saveMypage = document.getElementById("saveMypage");
  saveMypage.addEventListener("click", () => {
    const loggedInUserString = sessionStorage.getItem("loggedInUser");

    if (loggedInUserString) {
      let loggedInUser = JSON.parse(loggedInUserString);
      // 현재 체크박스 값 업데이트
      const marketingSwitch = document.querySelector("#myMarketing").checked;
      loggedInUser.marketingSwitch = marketingSwitch;
      // sessionStorage에 저장
      sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

      alert("마케팅 동의 설정이 저장되었습니다.");
    } else {
      alert("로그인 정보가 없습니다.");
    }
  });
}
