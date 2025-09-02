
$('#closericonfornavbar').click(function () {
  $('.thesidebar').css('transform', 'translateX(100%)');
  $('#closericonfornavbar').addClass('rotateevent');
});

$('.fa-outdent').click(function () {
  $('.thesidebar').css('transform', 'unset');
  $('#closericonfornavbar').removeClass('rotateevent');
  $('#closericonfornavbar').addClass('rotateeventtorevers');
});



