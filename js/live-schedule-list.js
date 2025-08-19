$(function () {
  addSchedule();
});

function addSchedule() {
  $.get("../json/schedule.json").done(function (data) {
    if (data) {
      $("#scheduleResult").html(
        data
          .map(
            (i) => `
              <div class="schedule-item">
                <a href="/pages/live-schedule-detail.html" data-schedule ='${JSON.stringify(
                  i
                )}' >
                  <div class="schedule-image">
                    <img src="${i.thumbnail}" alt="${i.title}" />
                    <p class="schdate-box">${i.d_day}</p>
                  </div>
                  <div class="schedule-text-area">
                    <p>${i.title}</p>
                  </div>
                </a>
              </div>
            `
          )
          .join("")
      );
      document.querySelectorAll(".schedule-item a").forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault();

          const schedule = this.dataset.schedule;
          console.log(schedule);

          localStorage.setItem("selectedSchedule", schedule);

          window.location.href = this.getAttribute("href");
        });
      });
    }
  });
}
