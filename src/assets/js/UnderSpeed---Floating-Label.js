$(".sarici").click(function () {
  $("#giris").focus();
});

$('#giris').keyup(function () {
  var value = $.trim($("#giris").val());
  if (value.length > 0) {
    $("#aciklama").animate({"font-size": "14px"}, 200);
    $("#aciklama").css("color", "#3276b2");
    $("#giris").animate({"font-size": "30px"}, 300);
  } else {
    $("#aciklama").animate({"font-size": "30px"}, 200);
    $("#aciklama").css("color", "#000");
    $("#giris").animate({"font-size": "14px"}, 100);
  }
});


