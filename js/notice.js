$(function () {
  $(".notice-text").hide();
  $(".openBtn").on("click", function () {
    const noticeItem = $(this).closest(".notice-item");
    noticeItem.find(".notice-text").slideToggle();
    $(this).toggleClass("active");
  });
});
