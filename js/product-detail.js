/* 구현 방법
  1.(임의 데이터) **
  2.js 데이터 추출해서 구현
*/
$(function () {
  productData();
  imgDetailModal();
});

function productData() {
  // localStorage에서 데이터 꺼내기
  const productDataString = localStorage.getItem("selectedProduct");

  console.log(productDataString);

  if (productDataString) {
    // 문자열 -> 객체
    const productData = JSON.parse(productDataString);

    // 데이터 넣기
    document.title = `${productData.product_name} - 상품 상세 | NOVER`;

    // 이미지 배열
    imgListScroll(productData);

    // 큰 이미지
    document.querySelector(".pd-image-area img").src =
      productData.image_urls[0];

    // 브랜드
    document.querySelector(".brand-image").src = productData.brand_logo;
    document.querySelector(".brand-image").alt = productData.brand_name;
    document.querySelector(".brand-name").textContent = productData.brand_name;
    document.querySelector(
      ".brand-like-btn span"
    ).textContent = `${productData.brand_likes.toLocaleString()}`;

    // 카테고리
    document.querySelector(".pd-cate-main").textContent =
      productData.category_main;
    document.querySelector(".pd-cate-sub").textContent =
      productData.category_sub;

    // 상품
    document.querySelector(".pd-title").textContent = productData.product_name;

    // 별점
    document.querySelector(".star-txt").textContent = productData.rating;

    // 리뷰
    document.querySelector(
      ".review"
    ).textContent = `후기 ${productData.review_count.toLocaleString()}개`;

    // 이미지 임시
    document.querySelector(".pds-image-box img").src =
      productData.image_urls[0];
    document.querySelector(".pds-image-box img").alt = productData.product_name;

    // 가격
    document.querySelector(".pd-price").textContent = `${
      productData.discount_rate === 0
        ? ""
        : productData.original_price.toLocaleString() + "원"
    }`;
    document.querySelector(".sale-per").textContent = `${
      productData.discount_rate === 0 ? "" : productData.discount_rate + "%"
    }`;

    document.querySelector(
      ".price-res"
    ).textContent = `${productData.sale_price.toLocaleString()}원`;

    // 좋아요
    document.querySelector(
      ".like-btn span"
    ).textContent = `${productData.product_likes.toLocaleString()}`;

    // 수량 영역
    numCheckFn(productData);

    // 상세 정보 이미지
    const detailInfoImg = document.querySelector("#detailInfoImg");

    productData.image_detail.forEach((imgUrl, index) => {
      const img = document.createElement("img");
      img.src = imgUrl;
      img.alt = `${productData.product_name} ${index + 1}`;
      detailInfoImg.appendChild(img);
    });
  }
}

// 이미지 왼쪽 영역 데이터 불러오기 + 슬라이드 기능
function imgListScroll(productData) {
  const imgList = document.querySelector(".pd-imglist-box");
  const prevBtn = document.getElementById("leftImgPrev");
  const nextBtn = document.getElementById("leftImgNext");
  const mainImage = document.querySelector(".pd-image-area img");
  const imageUrls = productData.image_urls;

  // 이미지 넣기
  imageUrls.forEach((url, index) => {
    const div = document.createElement("div");
    div.classList.add("pdimg-item");

    const img = document.createElement("img");
    img.src = url;
    img.alt = `상품 이미지 ${index + 1}`;

    // 클릭이벤트 -> 큰 이미지 변경
    img.addEventListener("click", () => {
      mainImage.src = url;
    });

    div.appendChild(img);
    imgList.appendChild(div);
  });

  // 이미지 로딩된 후 스크롤 버튼 생성
  const images = imgList.querySelectorAll("img");
  let loaded = 0;
  images.forEach((img) => {
    img.onload = () => {
      loaded++;
      if (loaded === images.length) updateBtns(); // 이미지 다 로드되면 버튼 상태 체크
    };
  });

  // 스크롤 이동 거리 계산
  function pageStep() {
    return Math.max(1, imgList.clientHeight - 16);
  }

  // 버튼 생성
  function updateBtns() {
    const scrollable = imgList.scrollHeight > imgList.clientHeight + 5;
    // 스크롤 필요 없는 경우 → 둘 다 숨김
    if (!scrollable) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
      return;
    }
    // 버튼 조건 숩김 보임 체크
    prevBtn.style.display = imgList.scrollTop <= 0 ? "none" : "block";
    nextBtn.style.display =
      imgList.scrollTop + imgList.clientHeight >= imgList.scrollHeight - 1
        ? "none"
        : "block";
  }

  // 버튼 클릭 시
  prevBtn.onclick = () =>
    imgList.scrollBy({ top: -pageStep(), behavior: "smooth" });
  nextBtn.onclick = () =>
    imgList.scrollBy({ top: pageStep(), behavior: "smooth" });

  // 스크롤 이벤트
  imgList.addEventListener("scroll", updateBtns);
  window.addEventListener("load", updateBtns);
}

// 이미지 디테일 보기 모달
function imgDetailModal() {
  // 큰 이미지 클릭 → 모달 열기
  const mainImage = document.querySelector(".pd-image-area img");
  const modal = document.getElementById("imageModal");
  const modalContent = document.getElementById("modalContent");
  const modalImage = document.getElementById("modalImage");
  const closeModal = modal.querySelector(".close-modal");

  mainImage.addEventListener("click", () => {
    modal.style.display = "block";
    modalImage.src = mainImage.src;
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
  modalContent.addEventListener("click", (e) => {
    if (e.target === modalContent) modalContent.style.display = "none";
  });
}

// 수량 체크 기능
function numCheckFn(productData) {
  // 수량 증가 값 변경
  const minusBtn = document.getElementById("minusBtn");
  const plusBtn = document.getElementById("plusBtn");
  const totalCount = document.getElementById("totalCount");
  const selectTotalPrice = document.getElementById("selectTotalPrice");
  const totalSelectTxt = document.getElementById("totalSelectTxt");

  let count = 1;
  const optionPrice = Number(productData.sale_price);

  minusBtn.addEventListener("click", () => {
    if (count > 1) count--;
    updatePrice();
  });

  plusBtn.addEventListener("click", () => {
    count++;
    updatePrice();
  });

  function updatePrice() {
    totalCount.textContent = count;
    totalCountTxt.textContent = `총 ${count}개`;
    selectTotalPrice.textContent =
      (optionPrice * count).toLocaleString() + "원";
    totalSelectTxt.textContent = (optionPrice * count).toLocaleString() + "원";
    minusBtn.disabled = count === 1;
  }

  updatePrice();
}
