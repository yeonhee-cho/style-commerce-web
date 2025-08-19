// html 연결 코드
window.addEventListener("load", async () => {
  const allElements = document.querySelectorAll("[data-include-path]");

  for (const el of allElements) {
    const includePath = el.dataset.includePath;
    if (includePath) {
      try {
        const response = await fetch(includePath);
        if (response.ok) {
          const html = await response.text();
          // [로그인 페이지 뷰]
          // include된 HTML을 임시로 div에 넣어서 DOM 조작하기
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = html;

          // 페이지 확인하기
          const currentPath = window.location.pathname;
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
          } else if (currentPath.includes("/product-list.html")) {
            if (productSeg) productSeg.classList.add("active");
          } else if (currentPath.includes("/live-schedule-list.html")) {
            if (liveScheduleSeg) liveScheduleSeg.classList.add("active");
          } else if (currentPath.includes("/content-list.html")) {
            if (contentSeg) contentSeg.classList.add("active");
          }

          // 페이지 별 헤더 확인
          if (
            currentPath.includes("login.html") ||
            currentPath.includes("signup.html") ||
            currentPath.includes("product-detail.html") ||
            currentPath.includes("/search-detail.html") ||
            currentPath.includes("/mypage.html") ||
            currentPath.includes("/notice.html") ||
            currentPath.includes("/faq.html") ||
            currentPath.includes("/inquiry.html") ||
            currentPath.includes("/location-info.html") ||
            currentPath.includes("/company-info.html") ||
            currentPath.includes("/banner-detail.html") ||
            currentPath.includes("/live-schedule-detail.html") ||
            currentPath.includes("/content-detail.html")
          ) {
            const search = tempDiv.querySelector(".search-header");
            const segment = tempDiv.querySelector(".segment-header");
            const middle = tempDiv.querySelector(".middle-header");
            if (search) search.style.display = "none";
            if (segment) segment.style.display = "none";
            if (middle) middle.style.position = "sticky";
            if (middle) middle.style.top = "56px";
            if (middle) middle.style.left = 0;
          }

          // 여기까지 로그인 뷰
          el.outerHTML = tempDiv.innerHTML;
        } else {
          console.error(`Failed to fetch ${includePath}: ${response.status}`);
        }
      } catch (error) {
        console.error(`Error fetching ${includePath}:`, error);
      }
    }
  }
});

$(function () {
  $(".notWork").click(workInProgress);
});

// 추후 작업 중인 영역입니다 버튼마다 넣어주기
function workInProgress() {
  alert("아직 작업 중인 영역입니다.");
}
