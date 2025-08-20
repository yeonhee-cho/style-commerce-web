window.addEventListener("load", async () => {
  const allElements = document.querySelectorAll("[data-include-path]");

  await Promise.all(
    Array.from(allElements).map(async (el) => {
      const includePath = el.dataset.includePath;
      if (includePath) {
        try {
          const response = await fetch(includePath);
          if (response.ok) {
            let html = await response.text();
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;

            const currentPath = window.location.pathname;
            let basePath = "";
            if (currentPath.includes("/pages/account/")) {
              basePath = "../../";
            } else if (currentPath.includes("/pages/")) {
              basePath = "../";
            }

            // 여기부터 세그먼트 .active 효과 이벤트
            const filter = new URLSearchParams(window.location.search).get(
              "filter"
            );

            // 세그먼트 같은 메뉴 영역 변경해주기
            const segmentItems = tempDiv.querySelectorAll(
              ".segment-header .segment-wrap .segment-item"
            );
            segmentItems.forEach((el) => el.classList.remove("active"));

            const homeSeg = tempDiv.querySelector("#home");
            const productSeg = tempDiv.querySelector("#productAll");
            const recommendSeg = tempDiv.querySelector("#recommend");
            const rankingSeg = tempDiv.querySelector("#ranking");
            const saleSeg = tempDiv.querySelector("#sale");
            const liveScheduleSeg = tempDiv.querySelector("#liveSchedule");
            const contentSeg = tempDiv.querySelector("#contentList");

            if (currentPath === "/" || currentPath.includes("index.html")) {
              if (homeSeg) homeSeg.classList.add("active");
            } else if (filter === "recommend") {
              if (recommendSeg) recommendSeg.classList.add("active");
            } else if (filter === "ranking") {
              if (rankingSeg) rankingSeg.classList.add("active");
            } else if (filter === "sale") {
              if (saleSeg) saleSeg.classList.add("active");
            } else if (currentPath.includes("product-list.html")) {
              if (productSeg) productSeg.classList.add("active");
            } else if (currentPath.includes("live-schedule-list.html")) {
              if (liveScheduleSeg) liveScheduleSeg.classList.add("active");
            } else if (currentPath.includes("content-list.html")) {
              if (contentSeg) contentSeg.classList.add("active");
            }
            // 여기까지 세그먼트 .active 효과 이벤트

            // 경로 체크
            tempDiv.querySelectorAll("img").forEach((img) => {
              const src = img.getAttribute("src");
              if (src && !src.startsWith("http") && src.startsWith("image/")) {
                img.setAttribute("src", basePath + src);
              }
            });

            tempDiv.querySelectorAll("a[href]").forEach((link) => {
              const href = link.getAttribute("href");
              if (
                href &&
                !href.startsWith("http") &&
                !href.startsWith("#") &&
                !href.startsWith("mailto:")
              ) {
                if (href === "/") {
                  link.setAttribute("href", basePath + "index.html");
                } else if (href.startsWith("pages/")) {
                  link.setAttribute("href", basePath + href);
                }
              }
            });

            // 페이지 별 헤더 조건
            const search = tempDiv.querySelector(".search-header");
            const segment = tempDiv.querySelector(".segment-header");
            const middle = tempDiv.querySelector(".middle-header");
            const top = tempDiv.querySelector(".top-header");

            if (
              currentPath.includes("login.html") ||
              currentPath.includes("signup.html") ||
              currentPath.includes("mypage.html") ||
              currentPath.includes("product-detail.html") ||
              currentPath.includes("search-detail.html") ||
              currentPath.includes("notice.html") ||
              currentPath.includes("faq.html") ||
              currentPath.includes("inquiry.html") ||
              currentPath.includes("location-info.html") ||
              currentPath.includes("company-info.html") ||
              currentPath.includes("banner-detail.html") ||
              currentPath.includes("live-schedule-detail.html") ||
              currentPath.includes("content-detail.html")
            ) {
              if (search) search.style.display = "none";
              if (segment) segment.style.display = "none";
              if (middle) {
                middle.style.position = "sticky";
                middle.style.top = "56px";
              }
            }

            el.outerHTML = tempDiv.innerHTML;
          } else {
            console.error(`Failed to fetch ${includePath}: ${response.status}`);
          }
        } catch (error) {
          console.error(`Error fetching ${includePath}:`, error);
        }
      }
    })
  );
});

// 작업 전 내용
function workInProgress() {
  alert("아직 작업 중인 영역입니다.");
}

// .notWork 인 곳에 작업 중인 영역입니다 전부 넣기
$(function () {
  $(document).on("click", ".notWork", workInProgress);
});

// TODO onclick="alert('준비 중인 기능입니다.'); return false;"
