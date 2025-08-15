// 1.(임의 데이터) **
// 2.js 데이터 추출해서 구현
$(function () {
  productData();
});

function productData() {
  // localStorage에서 데이터 꺼내기
  const productDataString = localStorage.getItem("selectedProduct");

  if (productDataString) {
    // 문자열 -> 객체
    const productData = JSON.parse(productDataString);

    // 데이터 넣기
    // 이미지
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
    document.querySelector(
      ".pd-price"
    ).textContent = `${productData.original_price.toLocaleString()}원`;
    document.querySelector(
      ".sale-per"
    ).textContent = `${productData.discount_rate}%`;
    document.querySelector(
      ".price-res"
    ).textContent = `${productData.sale_price.toLocaleString()}원`;

    // 좋아요
    document.querySelector(
      ".like-btn span"
    ).textContent = `${productData.product_likes.toLocaleString()}`;

    // 수량 증가 값 변경
    const minusBtn = document.getElementById("minusBtn");
    const plusBtn = document.getElementById("plusBtn");
    const totalCount = document.getElementById("totalCount");
    const selectTotalPrice = document.getElementById("selectTotalPrice");
    const totalSelectTxt = document.getElementById("totalSelectTxt");

    let count = 1;
    const optionPrice = Number(productData.sale_price);
    console.log(optionPrice);

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
      totalSelectTxt.textContent =
        (optionPrice * count).toLocaleString() + "원";
      minusBtn.disabled = count === 1;
    }

    updatePrice();
  }
}
