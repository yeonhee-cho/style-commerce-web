$(function () {
  addContents();
});

// 콘텐츠 등록
function addContents() {
  $.get("../json/contents.json").done(function (datas) {
    if (datas) {
      $("#contResult").html(
        datas
          .map((data) => {
            const content = data.content;
            const products = data.products || [];
            const moreBtn = data.more_button;

            // 하단 이미지 리스트 부분
            let productHTML = "";
            if (products.length > 0) {
              productHTML += `<div class="con-image-list">`;

              const productCount = moreBtn
                ? Math.min(products.length, 3)
                : Math.min(products.length, 4);

              for (let i = 0; i < productCount; i++) {
                const p = products[i];

                productHTML += `
                <div class="con-image-item">
                  <a href="${p.url}">
                    <img src="${p.image}" alt="${p.brand + i}" />
                  </a>
                </div>
              `;
              }
              if (moreBtn) {
                productHTML += `
              <div class="con-image-item">
                <a href="${moreBtn.url}">
                  <img src="${moreBtn.image}" alt="더보기" />
                </a>
                <span>${moreBtn.label.replace("개", "개<br>")}</span>
              </div>
            `;
              }

              productHTML += `</div>`;
            }

            return `
            <div class="content-item">
                <div class="cont-item-inner">
                  <div class="con-image">
                    <img src="${data.content.thumbnail}" alt="${
              data.content.title
            }" />
                  </div>
                  <div class="con-text-area">
                    <p class="con-cate">${data.content.category}</p>
                    <p class="con-tit">${data.content.title}</p>
                    <p class="con-con">
                      ${data.content.description}
                    </p>
                    <div class="cont-status-wrap">
                      <div class="cont-status">
                        <span class="cont-status-time">${
                          data.content.publish_date
                        }</span>
                        <div class="cont-status-view">
                          <div class="view-icon"></div>
                          <span class="view-num">${data.content.views}</span>
                        </div>
                      </div>
                      <div class="con-brand-wrap">
                        <p class="brand-txt">${data.content.authors.name}</p>
                        ${
                          data.content.authors.count
                            ? `<p class="brand-txt-etc">외 ${data.content.authors.count.toLocaleString()}개</p>`
                            : ""
                        }
                      </div>
                    </div>
                  </div>
                </div>
                ${productHTML}       
              </div>
            `;
          })
          .join("")
      );
    }
  });
}
