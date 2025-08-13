$(function () {
  // 개인정보 수집 및 이용 동의
  personalModal();
  // 스토어 이용약관 동의
  storeModal();
  // 마케팅 활용 및 광고성 정보 수신 동의
  marketingModal();
});

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
