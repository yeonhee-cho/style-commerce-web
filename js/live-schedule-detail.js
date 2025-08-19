$(function () {
  scheduleData();
});

function scheduleData() {
  const scheduleDataString = localStorage.getItem("selectedSchedule");
  console.log(scheduleDataString);

  if (scheduleDataString) {
    const scheduleData = JSON.parse(scheduleDataString);
    document.title = `${scheduleData.title} - 라이브 편성표 상세 | NOVER`;

    document.querySelector(".live-schedule-img img").src =
      scheduleData.thumbnail;
    document.querySelector(".live-schedule-img img").alt = scheduleData.title;
    document.querySelector(".live-schedule-maintit").textContent =
      scheduleData.title;
    document.querySelector(".live-schedule-txt").textContent =
      scheduleData.d_day;
  }
}
