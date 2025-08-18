$(function () {
  setTimeout(() => {
    // 개인정보 수집 및 이용 동의
    personalModal();
    // 스토어 이용약관 동의
    storeModal();
  }, 1000);
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

// 모달 열기
function openModal(openBtn, modal, closeBtn) {
  setTimeout(() => {
    if (openBtn) {
      openBtn.setAttribute("href", "#");
      openBtn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "block";
      });
    }
  }, 1000);

  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "none";
  });

  // 바깥 클릭 시 닫기
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      e.preventDefault();
      modal.style.display = "none";
    }
  });
}
