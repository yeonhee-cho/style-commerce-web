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

            const search = tempDiv.querySelector(".search-header");
            const segment = tempDiv.querySelector(".segment-header");
            const middle = tempDiv.querySelector(".middle-header");
            const top = tempDiv.querySelector(".top-header");

            if (
              currentPath.includes("login.html") ||
              currentPath.includes("signup.html") ||
              currentPath.includes("mypage.html")
            ) {
              if (search) search.style.display = "none";
              if (segment) segment.style.display = "none";
              if (middle) {
                middle.style.position = "sticky";
                middle.style.top = "56px";
              }
            } else if (currentPath.includes("product-detail.html")) {
              if (search) search.style.display = "none";
              if (segment) segment.style.display = "none";
              if (middle) middle.style.display = "none";
            } else if (currentPath.includes("search-detail.html")) {
              if (search) search.style.display = "none";
              if (middle) middle.style.display = "none";
              if (top) top.style.position = "static";
              if (segment) segment.style.position = "static";
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
