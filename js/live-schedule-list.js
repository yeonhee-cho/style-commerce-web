$(function () {
  addSchedule();
});

function addSchedule() {
  $.get("../json/schedule.json").done(function (data) {
    if (data) {
      $("#scheduleResult").html(
        data.map(
          (i) => `
             <div class="schedule-item">
                <div class="schedule-image">
                  <img src="${i.thumbnail}" alt="${i.title}" />
                  <p class="schdate-box">${i.d_day}</p>
                </div>
                <div class="schedule-text-area">
                  <p>${i.title}</p>
                </div>
              </div>
            `
        )
      );
    }
  });
}
