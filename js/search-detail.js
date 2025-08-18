$(function () {
  loadProducts();

  // 엔터키 검색 추가
  $("#searchInput").keypress(function (e) {
    if (e.key === "Enter") {
      searchFn();
    }
  });

  // 실시간 검색 기능 추가
  $("#searchInput").on("input", searchFn);
});

let products = {};

function loadProducts() {
  $.get("../json/products.json")
    .done(function (data) {
      products = data;
    })
    .fail();
}

function searchFn() {
  const keyword = $("#searchInput").val().trim();
  const allProducts = Object.values(products);

  let result;

  if (!keyword) {
    result = allProducts;
  } else {
    result = allProducts.filter(
      (product) =>
        product.brand_name.includes(keyword) ||
        product.product_name.includes(keyword) ||
        product.category_main.includes(keyword) ||
        product.category_sub.includes(keyword)
    );
    displayResults(result, keyword);
  }
}

// 검색 결과 보여주기
function displayResults(result, keyword) {
  const searchResult = $("#result");

  if (!result || result.length === 0) {
    $("#searchNum").text(``);
    searchResult.html(
      `<div class="no-result"> ${
        $("#searchInput").val().trim()
          ? "검색 결과가 없습니다."
          : "검색어를 입력해주세요."
      }</div>`
    );
    return;
  }

  $("#searchNum").text(`총 ${result.length} 개`);

  // 검색 결과가 존재한다면
  const productHTMLS = result.map((product) => {
    let brandName = product.brand_name;
    let productName = product.product_name;
    // let categoryMain = product.category_main;
    // let categorySub = product.category_sub;

    if (keyword) {
      const regex = new RegExp(keyword, "gi");
      brandName = product.brand_name.replace(
        regex,
        `<span class="highlight">${keyword}</span>`
      );
      productName = product.product_name.replace(
        regex,
        `<span class="highlight">${keyword}</span>`
      );
    }

    return `
        <div class="product-item">
            <a href="product-detail.html" data-id='${product.productId}'>
                <div class="pd-image">
                <img src="${product.image_urls[0]}" alt="${
      product.brand_name
    }" />
                <label class="pd-like-btn">
                    <input type="checkbox"  ${
                      product.is_liked ? "checked" : ""
                    }></input>
                </label>
                </div>
                <div class="pd-text-area">
                <p class="pd-brand">${brandName}</p>
                <p class="pd-tit">
                    ${productName}
                </p>
                <p class="pd-price">
                    <span class="discount-per">${product.discount_rate}%</span>
                    ${product.sale_price.toLocaleString()}원
                </p>
                </div>
            </a>
        </div>`;
  });
  searchResult.html(productHTMLS.join(""));

  if (result && result.length > 0) {
    goDetail(result);
  }
}

function goDetail(result) {
  document.querySelectorAll(".product-item a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const id = this.dataset.id;
      const product = result.find((p) => String(p.productId) === id);
      if (product) {
        localStorage.setItem("selectedProduct", JSON.stringify(product));
      } else {
        console.error("상품을 찾을 수 없습니다:", id);
      }

      window.location.href = this.getAttribute("href");
    });
  });
}
