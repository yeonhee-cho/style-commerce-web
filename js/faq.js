$(function () {
  $(".faq-text").hide();
  $(".openBtn").on("click", function () {
    const faqItem = $(this).closest(".faq-item");
    faqItem.find(".faq-text").slideToggle();
    $(this).toggleClass("active");
  });
});
