$(function () {
  idCheckFn();
  pwCheckFn();
  nameCheckFn();
  emailCheckFn();

  $("#signupBtn").click(function (e) {
    e.preventDefault();
    signupFn();
  });

  // 개인정보 수집 및 이용 동의
  personalModal();
  // 스토어 이용약관 동의
  storeModal();
  // 마케팅 활용 및 광고성 정보 수신 동의
  marketingModal();
});

// 회원가입
const userIdInput = document.getElementById("userId");
const passwordInput = document.getElementById("password");
const passwordCheckInput = document.getElementById("passwordCheck");
const userNameInput = document.getElementById("userName");
const userEmailInput = document.getElementById("userEmail");
const recommenderInput = document.getElementById("recommender");

const idResult = document.getElementById("idResult");
const passwordResult = document.getElementById("passwordResult");
const nameResult = document.getElementById("nameResult");
const emailResult = document.getElementById("emailResult");

// 유효성 검사 - 비밀번호
function isValidPassword(pw) {
  // 최소 8자, 숫자, 영문, 특수문자 포함
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  return regex.test(pw);
}

// 이름 유효성 검사
function isValidName(name) {
  const regex = /^[가-힣a-zA-Z]+$/;
  return regex.test(name);
}

// 이메일 체크
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// 아이디 체크
function idCheckFn() {
  userIdInput.addEventListener("input", () => {
    const userIdValue = userIdInput.value.trim();

    const users = JSON.parse(localStorage.getItem("userList") || "[]");

    if (!userIdValue) {
      idResult.innerHTML = `<p class="validation red">아이디를 입력해 주세요.</p>`;
    } else if (users.some((u) => u.userId === userIdValue)) {
      nameResult.innerHTML = `<p class="validation red">이름에 특수문자는 사용할 수 없습니다.</p>`;
    } else {
      idResult.innerHTML = `<p class="validation green">사용 가능한 아이디입니다.</p>`;
    }
  });
}

// 비밀번호 체크
function pwCheckFn() {
  passwordInput.addEventListener("input", () => {
    const passwordValue = passwordInput.value.trim();

    if (!passwordValue) {
      passwordResult.innerHTML = `<p class="validation red">비밀번호를 입력해 주세요.</p>`;
    } else if (!isValidPassword(passwordValue)) {
      passwordResult.innerHTML = `<p class="validation red">비밀번호는 최소 8자, 숫자/영문/특수문자 포함이어야 합니다.</p>`;
    } else {
      passwordResult.innerHTML = `<p class="validation green">사용 가능한 비밀번호입니다.</p>`;
    }
  });
  passwordCheckInput.addEventListener("input", () => {
    const passwordValue = passwordInput.value.trim();
    const passwordCheckValue = passwordCheckInput.value.trim();

    if (!passwordCheckValue) {
      passwordResult.innerHTML = `<p class="validation red">비밀번호 확인을 입력해 주세요.</p>`;
    } else if (passwordCheckValue && passwordValue !== passwordCheckValue) {
      passwordResult.innerHTML = `<p class="validation red">비밀번호가 일치하지 않습니다.</p>`;
    } else {
      passwordCheckResult.innerHTML = `<p class="validation green">비밀번호가 일치합니다.</p>`;
    }
  });
}

// 이름 체크
function nameCheckFn() {
  userNameInput.addEventListener("input", () => {
    const userNameValue = userNameInput.value.trim();

    if (!userNameValue) {
      nameResult.innerHTML = `<p class="validation red">이름을 입력해 주세요.</p>`;
    } else if (!isValidName(userNameValue)) {
      nameResult.innerHTML = `<p class="validation red">특수문자 및 공백은 사용할 수 없습니다.</p>`;
    } else if (userNameValue.length < 2 || userNameValue.length > 10) {
      nameResult.innerHTML = `<p class="validation red">이름은 최소 2자, 최대 10자 이내여야 합니다.</p>`;
    } else {
      nameResult.innerHTML = `<p class="validation green">사용 가능한 이름입니다.</p>`;
    }
  });
}

// 이메일 체크
function emailCheckFn() {
  userEmailInput.addEventListener("input", () => {
    const userEmailValue = userEmailInput.value.trim();
    if (!userEmailInput) {
      emailResult.innerHTML = `<p class="validation red">이메일을 입력해 주세요.</p>`;
    } else if (!validateEmail(userEmailValue)) {
      emailResult.innerHTML = `<p class="validation red">이메일 형식에 맞지 않습니다. 다시 한 번 확인해주세요.</p>`;
    } else {
      emailResult.innerHTML = `<p class="validation green">사용 가능한 이메일입니다.</p>`;
    }
  });
}

//

function signupFn() {}

// 개인정보 수집 및 이용 동의
function personalModal() {
  const openBtn = document.getElementById("openPersonalModal");
  const modal = document.getElementById("personalModal");
  const closeBtn = document.getElementById("personalClose");
  openModal(openBtn, modal, closeBtn);
}

// 스토어 이용약관 동의
function storeModal() {
  const openBtn = document.getElementById("openStoreModal");
  const modal = document.getElementById("storeModal");
  const closeBtn = document.getElementById("storeClose");
  openModal(openBtn, modal, closeBtn);
}

// 마케팅 활용 및 광고성 정보 수신 동의
function marketingModal() {
  const openBtn = document.getElementById("openMarketingModal");
  const modal = document.getElementById("marketingModal");
  const closeBtn = document.getElementById("marketingClose");
  openModal(openBtn, modal, closeBtn);
}

// 모달 열기
function openModal(openBtn, modal, closeBtn) {
  openBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // 바깥 클릭 시 닫기
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}
