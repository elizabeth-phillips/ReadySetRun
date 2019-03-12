$(window, document, undefined).ready(function () {

  $('.input').blur(function () {
    var $this = $(this);
    if ($this.val())
      $this.addClass('used');
    else
      $this.removeClass('used');
  });

  $('#tab1').on('click', function () {
    $('#tab1').addClass('login-shadow');
    $('#tab2').removeClass('signup-shadow');
    //  alert("clicked on login");
  });

  $('#tab2').on('click', function () {
    $('#tab2').addClass('signup-shadow');
    $('#tab1').removeClass('login-shadow');
  });

  $('#signedUp').on('click', function () {
    alert("Congratulations, You are registered!!");
  });

});