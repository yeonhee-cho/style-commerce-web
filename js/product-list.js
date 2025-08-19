$(function () {
  addProducts();

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  const filter = getQueryParam("filter") || "recommend";

  if (filter) {
    addProductsWithSort(filter);
    $(function () {
      const filter = getQueryParam("filter") || "recommend";
      addProductsWithSort(filter);
    });
  } else {
    addProducts();
  }
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
                      <span class="discount-per">${
                        i.discount_rate === 0 ? "" : i.discount_rate + "%"
                      }</span>
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

// 상단 type 값 별 메뉴
function menuFilter(filter) {
  $.get("../json/products.json").done(function (data) {
    if (!data) return;

    let sortedData = [...data];

    if (filter === "woman") {
      filteredData = data.filter((item) => item.type === "woman");
    } else if (filter === "man") {
      filteredData = data.filter((item) => item.type === "man");
    } else if (filter === "bag") {
      filteredData = data.filter((item) => item.type === "bag");
    } else if (filter === "acc") {
      filteredData = data.filter((item) => item.type === "acc");
    } else if (filter === "shoes") {
      filteredData = data.filter((item) => item.type === "shoes");
    }

    $("#pdResult").html(
      filteredData
        .map(
          (i) => `
          <div class="product-item">
            <a href="product-detail.html" data-product='${JSON.stringify(i)}'>
                <div class="pd-image">
                  <img src="${i.image_urls[0]}" alt="${i.brand_name}" />
                  <label class="pd-like-btn">
                    <input type="checkbox"  ${
                      i.is_liked ? "checked" : ""
                    }></input>
                  </label>
                </div>
                <div class="pd-text-area">
                  <p class="pd-brand">${i.brand_name}</p>
                  <p class="pd-tit">${i.product_name}</p>
                  <p class="pd-price">
                    <span class="discount-per">${
                      i.discount_rate === 0 ? "" : i.discount_rate + "%"
                    }</span>
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

        const product = this.dataset.product;
        localStorage.setItem("selectedProduct", product);

        window.location.href = this.getAttribute("href");
      });
    });
  });
}

// 순위 별 메뉴
function segmentSort(filter) {
  $.get("../json/products.json").done(function (data) {
    if (!data) return;

    let sortedData = [...data];

    if (filter === "ranking") {
      sortedData.sort((a, b) => a.ranking_order - b.ranking_order);
    } else if (filter === "recommend") {
      sortedData.sort((a, b) => a.recommend_order - b.recommend_order);
    } else if (filter === "sale") {
      sortedData.sort((a, b) => a.sale_order - b.sale_order);
    }

    $("#pdResult").html(
      sortedData
        .map(
          (i) => `
          <div class="product-item">
            <a href="product-detail.html" data-product='${JSON.stringify(i)}'>
                <div class="pd-image">
                  <img src="${i.image_urls[0]}" alt="${i.brand_name}" />
                  <label class="pd-like-btn">
                    <input type="checkbox"  ${
                      i.is_liked ? "checked" : ""
                    }></input>
                  </label>
                  <div class="numtag">${
                    filter === "ranking"
                      ? i.ranking_order
                      : filter === "recommend"
                      ? i.recommend_order
                      : i.sale_order
                  }</div>
                </div>
                <div class="pd-text-area">
                  <p class="pd-brand">${i.brand_name}</p>
                  <p class="pd-tit">${i.product_name}</p>
                  <p class="pd-price">
                    <span class="discount-per">${
                      i.discount_rate === 0 ? "" : i.discount_rate + "%"
                    }</span>
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

        const product = this.dataset.product;
        localStorage.setItem("selectedProduct", product);

        window.location.href = this.getAttribute("href");
      });
    });
  });
}

function addProductsWithSort(filter) {
  if (filter === "recommend" || filter === "ranking" || filter === "sale") {
    segmentSort(filter);
  } else if (
    filter === "woman" ||
    filter === "man" ||
    filter === "bag" ||
    filter === "acc" ||
    filter === "shoes"
  ) {
    menuFilter(filter);
  }
}
