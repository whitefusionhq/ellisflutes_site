import '../styles/index.scss'
import Foundation from 'foundation-sites'
import scrollEffect from './scrollEffect.js'
import "./checkProductStock"
import "./bambooComponent.js"

import "@shoelace-style/shoelace/dist/themes/light.css"
import "@shoelace-style/shoelace/dist/components/dialog/dialog.js"

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

let justAddedItem = false
let cartOpened = false

const addPoBoxes = () => {
  let intervalTimer = null
  let intervalCount = 0
  if (!document.querySelector("#no-po-boxes")) {
    setTimeout(() => {
      intervalTimer = setInterval(() => {
        if (document.querySelector("#snipcart-actions") && !document.querySelector("#no-po-boxes")) {
          const poboxes = document.createElement("p")
          poboxes.id = "no-po-boxes"
          poboxes.style.color = "#333"
          poboxes.innerHTML = `NOTE: Shipping address must be a residential or business address, and <b>not</b> a P.O. Box. Domestic carrier is now UPS and they do not deliver to P.O. Boxes.`
          document.querySelector("#snipcart-actions").append(poboxes)
          clearInterval(intervalTimer)
        } else if (intervalCount > 20) {
          clearInterval(intervalTimer)
        } else {
          intervalCount++
        }
      }, 100)
    }, 100)
  }
}

Snipcart.subscribe('item.added', function (item) {
  updateCartCount();
  lockItemOnBackend(item)

  if (cartOpened && !document.querySelector("#product-lockout-notice")) {
    setTimeout(() => {
      addLockoutMessage()
      addPoBoxes()
    }, 50)
  } else {
    justAddedItem = true
  }
});

Snipcart.subscribe('cart.opened', function() {
  console.info("wee")
  cartOpened = true
  if (justAddedItem && !document.querySelector("#product-lockout-notice")) {
    addLockoutMessage()
  }
  addPoBoxes()
  justAddedItem = false
})
Snipcart.subscribe('cart.closed', function() {
  cartOpened = false
  if (document.querySelector("#product-lockout-notice")) {
    document.querySelector("#product-lockout-notice").remove()
  }
});

Snipcart.subscribe('page.validating', function(ev, data) {
  console.info(ev, data)
  if((ev.type == 'shipping-address' || ev.type == 'billing-address' && data.shippingSameAsBilling) && data.address1.match(/^P\.? ?O\.? ?Box/)) {
      ev.addError('address1', 'Please use a residential or business address. Domestic carrier does not ship to P.O. Boxes.');
  }
});

Snipcart.subscribe('item.removed', function (item) {
  updateCartCount();
  unlockItemOnBackend(item)
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

function addLockoutMessage() {
  const el = document.createElement("p")
  el.id = "product-lockout-notice"
  el.style.color = "#333"
  el.style.marginBottom = "1rem"
  el.innerHTML = `<b style="color:red">!!</b> You have a 7 minute lock on the product you just added to your cart. If you don't checkout within that time, the product will be made available for purchase to the public once more.`
  document.querySelector("#snipcart-actions").append(el)
}

function lockItemOnBackend(item) {
  const apiUrl = document.body.dataset.apiUrl
  $.post(`${apiUrl}/lock_product`, { 
    sku: item.id
  })
}

function unlockItemOnBackend(item) {
  const apiUrl = document.body.dataset.apiUrl
  $.post(`${apiUrl}/unlock_product`, { 
    sku: item.id
  })
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
