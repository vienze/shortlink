$(document).ready(function () {
  $("#getShortLink").click(function () {
    let link = $("#inputLink").val();
    getShortLink(link);
  });

  function getShortLink(url) {
    $("#getShortLink").text("Memproses...");
    // ajax
    $.ajax({
      url: "https://api.shrtco.de/v2/shorten?url=" + url,
      method: "GET",
      dataType: "json",
      success: function (respons) {
        let ressult = respons.result.short_link;
        $(".wrapper-result").show().css("display", "flex");
        $("#result").text(ressult);
        $("#getShortLink").text("Short Link");
        $("#inputLink").val("");
        $(".success").slideDown(500);
        setTimeout(() => {
          $(".success").slideUp();
        }, 2000);
        $("#copy").click(function () {
          copyText(ressult);
        });
      },
      error: function (xhr, status, error) {
        $(".error").slideDown(500);
        setTimeout(() => {
          $(".error").slideUp();
        }, 2000);
        $("#inputLink").val("");
      },
    });
    // end ajax
  }

  function copyText(textCopied) {
    $("<input>")
      .addClass("copied")
      .attr("type", "text")
      .attr("value", textCopied)
      .appendTo("body")
      .select();
    document.execCommand("copy");
    $(".copied").remove();
    $("#copy").text("Berhasil disalin");
    setTimeout(() => {
      $("#copy").text("Salin Link");
    }, 3000);
  }
});
