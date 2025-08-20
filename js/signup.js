$(function () {
  // validation 확인
  idCheckFn();
  pwCheckFn();
  nameCheckFn();
  emailCheckFn();
  agreeCheck();
  pwTypeCheck();

  // 회원가입 버튼
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
const agreeResult = document.getElementById("agreeResult");

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
  $("#pwCheckViewType").click(function () {
    if (passwordCheckInput.type === "password") {
      passwordCheckInput.type = "text";
      pwCheckViewType.classList.add("active");
    } else {
      passwordCheckInput.type = "password";
      pwCheckViewType.classList.remove("active");
    }
  });
}

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
      idResult.innerHTML = `<p class="validation red">이미 사용 중인 아이디입니다.</p>`;
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
      passwordResult.innerHTML = `<p class="validation green">비밀번호가 일치합니다.</p>`;
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
    if (!userEmailValue) {
      emailResult.innerHTML = `<p class="validation red">이메일을 입력해 주세요.</p>`;
    } else if (!validateEmail(userEmailValue)) {
      emailResult.innerHTML = `<p class="validation red">이메일 형식에 맞지 않습니다. 다시 한 번 확인해주세요.</p>`;
    } else {
      emailResult.innerHTML = `<p class="validation green">사용 가능한 이메일입니다.</p>`;
    }
  });
}

// 오류 시 이동
function goIdInput() {
  userIdInput.focus();
  userIdInput.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
  });
}
function goPwInput() {
  passwordInput.focus();
  passwordInput.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
  });
}
function goNameInput() {
  userNameInput.focus();
  userNameInput.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
  });
}
function goEmailInput() {
  userEmailInput.focus();
  userEmailInput.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
  });
}

// 회원가입 데이터 전송
function signupFn() {
  const userIdValue = userIdInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const passwordCheckValue = passwordCheckInput.value.trim();
  const userNameValue = userNameInput.value.trim();
  const userEmailValue = userEmailInput.value.trim();
  const recommenderValue = recommenderInput.value.trim();
  const agreeMarketing = document.getElementById("agreeMarketing");

  const users = JSON.parse(localStorage.getItem("userList") || "[]");

  // 유효성 체크
  if (!userIdValue) {
    alert("아이디를 입력해 주세요.");
    goIdInput();
    return;
  }
  if (users.some((u) => u.userId === userIdValue)) {
    alert("이미 사용 중인 아이디입니다.");
    goIdInput();
    return;
  }
  if (!passwordValue || !isValidPassword(passwordValue)) {
    alert("비밀번호 조건을 확인해 주세요.");
    goPwInput();
    return;
  }
  if (passwordValue !== passwordCheckValue) {
    alert("비밀번호가 일치하지 않습니다.");
    goPwInput();
    return;
  }
  if (
    !userNameValue ||
    !isValidName(userNameValue) ||
    userNameValue.length < 2 ||
    userNameValue.length > 10
  ) {
    alert("이름 조건을 확인해 주세요.");
    goNameInput();
    return;
  }
  if (!userEmailValue || !validateEmail(userEmailValue)) {
    alert("이메일 형식을 확인해 주세요.");
    goEmailInput();
    return;
  }

  const agreeAge = document.getElementById("agreeAge");
  const agreePersonal = document.getElementById("agreePersonal");
  const agreeStore = document.getElementById("agreeStore");
  console.log(agreeAge.checked, agreePersonal.checked, agreeStore.checked);

  if (!agreeAge.checked) {
    agreeResult.innerHTML = `<p class="validation red">
                                  만 14세 이상 가입 가능합니다.
                                </p>`;
    agreeAge.focus();
    agreeAge.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  if (!agreePersonal.checked) {
    agreeResult.innerHTML = `<p class="validation red">
                                  개인정보 수집 및 이용 동의가 필요합니다.
                                </p>`;
    agreePersonal.focus();
    agreePersonal.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  if (!agreeStore.checked) {
    agreeResult.innerHTML = `<p class="validation red">
                              스토어 이용약관 동의가 필요합니다.
                            </p>`;
    agreeStore.focus();
    agreeStore.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  console.log("agreeMarketing.checked", agreeMarketing.checked);

  const newUser = {
    userId: userIdValue,
    password: passwordValue,
    passwordCheck: passwordCheckValue,
    userName: userNameValue,
    userEmail: userEmailValue,
    recommender: recommenderValue,
    marketingSwitch: agreeMarketing.checked,
  };

  users.push(newUser);
  localStorage.setItem("userList", JSON.stringify(users));
  sessionStorage.setItem("loggedInUser", JSON.stringify(newUser));

  setTimeout(() => {
    window.location.href = "/";
    alert("회원가입이 완료되었습니다.");
  }, 50);
}

// 전체 동의
function agreeCheck() {
  const agreeAll = document.getElementById("agreeAll");

  const agreeItems = document.querySelectorAll(
    "#agreeAge, #agreePersonal, #agreeStore, #agreeMarketing"
  );

  // 전체 동의 클릭 시 -> 나머지 체크박스 전부 선택/해제
  agreeAll.addEventListener("change", () => {
    agreeItems.forEach((checkbox) => {
      checkbox.checked = agreeAll.checked;
    });
  });

  // 개별 체크박스 변경 시 -> 전체 동의 상태 업데이트
  agreeItems.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const allChecked = Array.from(agreeItems).every((cb) => cb.checked);
      agreeAll.checked = allChecked;
    });
  });
}

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
