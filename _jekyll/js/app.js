$(document).foundation();

Snipcart.subscribe('cart.ready', function (data) {
  updateCartCount();
});
Snipcart.subscribe('item.added', function (item) {
  updateCartCount();
});
Snipcart.subscribe('item.removed', function (item) {
  updateCartCount();
});

function updateCartCount() {
  var count = Snipcart.api.items.count();
  if (count > 0) {
    count = "(" + count + ")"
  } else {
    count = "";
  }
  $('#cart-icon .item-count').text(count);
}
