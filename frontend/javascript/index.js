import '../styles/index.scss'
import Foundation from 'foundation-sites'
import scrollEffect from './scrollEffect.js'

scrollEffect()

Foundation.addToJquery($)

$(document).ready(function() {
  $(document).foundation();

  $('#homepage-signup').on('submit', function(e) {
    e.preventDefault();

    var name = $(this).find('input[name="name"]').val();
    var email = $(this).find('input[name="email"]').val();

    $('footer input[name="cm-name"]').val(name);
    $('footer input[name="cm-pdthjd-pdthjd"]').val(email);
    $('#footer-signup').submit();
  })
})

Snipcart.subscribe('cart.ready', function (data) {
  updateCartCount();
});
Snipcart.subscribe('item.added', function (item) {
  updateCartCount();
});
Snipcart.subscribe('item.removed', function (item) {
  updateCartCount();
});
Snipcart.subscribe('order.completed', function (data) {
  $('nav#menu .item-count').text('').addClass('empty');
});

function updateCartCount() {
  var count = Snipcart.api.items.count();
  if (count > 0) {
    $('nav#menu .item-count').text(count).removeClass('empty');
  } else {
    $('nav#menu .item-count').text('').addClass('empty');
  }
}

/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );


var transEndEventNames = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'msTransition': 'MSTransitionEnd',
    'transition': 'transitionend'
  },
  transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ]


$(document).ready(function() {
	var triggerBttn = document.querySelector( 'nav#menu > a' ),
		overlay = document.querySelector( 'div.overlay' ),
		closeBttn = overlay.querySelector( 'button.overlay-close' ),
		support = { transitions : Modernizr.csstransitions };

	const toggleOverlay = e => {
    e.preventDefault()
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
		}
	}

	triggerBttn.addEventListener( 'click', toggleOverlay );
	closeBttn.addEventListener( 'click', toggleOverlay );
});
