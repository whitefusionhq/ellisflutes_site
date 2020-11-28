var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = 0;

  function hasScrolled() {
    var st = $(window).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
      return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
      // Scroll Down
      $('nav#menu').addClass('smaller');
    } else if (st < lastScrollTop && st < navbarHeight) {
      // Scroll Up
//			if(st + $(window).height() < ($(document).height() - 100)) {
        $('nav#menu').removeClass('smaller');
//			}
    }

    lastScrollTop = st;
  }


export default function() {
  // Source: https://medium.com/@mariusc23/hide-header-on-scroll-down-show-on-scroll-up-67bbaae9a78c
  // Hide Header on on scroll down

  $(window).scroll(function(event){
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      if (navbarHeight == 0) {
        navbarHeight = $('nav#menu').outerHeight();
      }
      hasScrolled();
      didScroll = false;
    }
  }, 250);

}

