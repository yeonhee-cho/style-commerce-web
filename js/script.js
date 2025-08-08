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
          el.outerHTML = html;
        } else {
          console.error(`Failed to fetch ${includePath}: ${response.status}`);
        }
      } catch (error) {
        console.error(`Error fetching ${includePath}:`, error);
      }
    }
  }
});
