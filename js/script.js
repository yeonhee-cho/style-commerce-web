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

          //  특정 페이지에서만 특정 태그를 숨기기
          const currentPath = window.location.pathname;

          if (currentPath.includes("login.html")) {
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
