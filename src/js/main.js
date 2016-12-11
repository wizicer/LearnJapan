$(document).ready(function() {
  // Closing menu with ESC
  document.addEventListener('keyup', function(e){
      if(e.keyCode == 27 && $('.search-overlay').length) {
          close_search();
      }
  });

  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();      
    });

    function hamburger_cross() {

      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }
  
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });  

  $("table").addClass("table");
  $('.theme-link').click(function(e){
    e.preventDefault();
    settheme($(this).attr('data-theme'));
  });

  if (supports_storage) {
    var theme = localStorage.theme;
    if (theme) settheme(theme);
  } else {
    /* Don't annoy user with options that don't persist */
    $('#theme-dropdown').hide();
  }
});

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

var supports_storage = supports_html5_storage();

function settheme(theme, persist) {
  if (typeof persist === 'undefined') { persist = true; }
  var themeurl = basethemeurl + theme + ".min.css"; 
  $('link[title="theme"]').attr('href', themeurl);
  if (supports_storage && persist) localStorage.theme = theme;
}
