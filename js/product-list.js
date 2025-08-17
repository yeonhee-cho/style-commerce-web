$(function () {
  addProducts();
});

// 상품 등록
function addProducts() {
  $.get("../json/products.json").done(function (data) {
    if (data) {
      $("#pdResult").html(
        data
          .map(
            (i) => `
            <div class="product-item">
              <a href="product-detail.html" data-product='${JSON.stringify(i)}'>
                  <div class="pd-image">
                    <img src="${i.image_urls[0]}" alt="${i.brand_name}" />
                    <!-- 활성화 시 "like-red" -->
                    <label class="pd-like-btn">
                      <input type="checkbox"  ${
                        i.is_liked ? "checked" : ""
                      }></input>
                    </label>
                  </div>
                  <div class="pd-text-area">
                    <p class="pd-brand">${i.brand_name}</p>
                    <p class="pd-tit">
                      ${i.product_name}
                    </p>
                    <p class="pd-price">
                      <span class="discount-per">${i.discount_rate}%</span>
                      ${i.sale_price.toLocaleString()}원
                    </p>
                  </div>
              </a>
            </div>
            `
          )
          .join("")
      );

      document.querySelectorAll(".product-item a").forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault();

          const product = this.dataset.product; // data-product 가져오기
          localStorage.setItem("selectedProduct", product); // 이미 문자열이므로 바로 저장

          window.location.href = this.getAttribute("href"); // 페이지 이동
        });
      });
    }
  });
}
