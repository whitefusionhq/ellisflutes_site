---
layout: homepage
---

<div class="no-para-margin fade-on-load" markdown="1">

<div class="slideshow-container">

<div id="cycler">
{% for slideshow_image_id in site.slideshow_image_ids %}
  <figure {% if forloop.index0 == 0 %}class="base" {% endif %}style="background-image:url({{ slideshow_image_id | cloudinary_url:'w_2048,h_4000,c_limit,a_exif,q_75' }})"></figure>
{% endfor %}
</div>

</div>

<!-- ![Boehm Head Joints](/assets/MixedHeadjoints.jpg) -->
</div>

<div class="blue-tag static fade-on-load" markdown="1">
Our Boehm Head Joints are now ready for order! [Here are all the details…](/headjoints)
</div>

<div class="row no-para-margin fade-on-load">
  <div class="columns medium-6 no-padding" markdown="1">
![Bansuri](/assets/BansuriGroup.jpg)
<div class="blue-tag static" markdown="1">
The latest batch of Irish Flutes are here and [they sound truly amazing…](/irish-flutes)
</div>
  </div>
  <div class="columns medium-6 no-padding" markdown="1">
![Shakuhachi](/assets/ShakuhachiGroup.jpg)
<div class="blue-tag static" markdown="1">
Check out our world flute lines [such as the Shakuhachi and Xiao…](/world-flutes)
</div>
  </div>
</div>

<br/><br/>

### Stay in Touch
{:class='text-center'}

Sign up for the <strong>Geoffrey Ellis Flutes newsletter</strong> and get notified whenever new products are in stock.
{:class='text-center'}

<form style="max-width:250px;margin: 0 auto" action="https://www.createsend.com/t/subscribeerror?description=" method="post" data-id="5B5E7037DA78A748374AD499497E309E63343B84B65325393DB5D4503F8C8F42CC792579B0261F03C50F43F2A1B8B874C7542608F5804CB14BB4A41EBEF25097">

  <input name="cm-name" type="text" placeholder="your name" />
  <input name="cm-pdthjd-pdthjd" type="email" placeholder="email address" />

  <p class="text-center"><input type="submit" class="button" value="Subscribe" /></p>
</form>

<br/><br/>

<div class="blue row"><div class="right-col-background"></div>
  <div class="columns medium-6 no-padding no-para-margin pull-right" markdown="1">
![img](/assets/lathe.jpg)
  </div>
  <div class="columns medium-6 top-padding max-text with-left-space" markdown="1">
### About the Maker
{:class='text-center'}

Geoffrey Ellis has been a respected maker of world flutes since 1997. He lives in the redwood forest in _Northern California_, taking advantage of the quiet and solitude to give his full attention to his craft. His ongoing collaborations with top flautists and gifted fellow makers has resulted in an _exquisite portfolio_ of world flutes that are played by amateur and professional musicians around the globe.

<br/>
[Read Geoffrey's Biography](/about){:class='button hollow white'}
{:class='text-center'}
  </div>
</div>

<div class="amber row"><div class="left-col-background"></div>
  <div class="columns medium-6 no-padding no-para-margin" markdown="1">
![img](/assets/working-on-headjoints.jpg)
  </div>
  <div class="columns medium-6 top-padding max-text with-right-space" markdown="1">
### Artisan Craftsmanship
{:class='text-center'}

In addition to crafting precision musical instruments, there is a beautiful aesthetic to Geoffrey’s flutes that players have come to recognize, and the _widespread appeal_ of these flutes for both casual enthusiasts and professional performers is undeniable.  When you order a flute from Geoffrey Ellis, expect to receive a high-quality, stable, and reliable instrument that will _last a lifetime_.

<br/>
[All About the Flutemaking Process](/process){:class='button hollow white'}
{:class='text-center'}
  </div>
</div>

<div class="blue row"><div class="right-col-background"></div>
  <div class="columns medium-6 no-padding no-para-margin pull-right" markdown="1">
![img](/assets/working-on-headjoints.jpg)
  </div>
  <div class="columns medium-6 top-padding max-text with-left-space" markdown="1">
### How to Order
{:class='text-center'}

Many of Geoffrey Ellis' available flute models can be purchased from our in-stock store. (<a href="#" onclick="document.querySelector('nav#menu > a').click();return false">Open the menu to start browsing.</a>) In addition, if the flute you're looking for isn't in stock, <a href="#">you can subscribe to our newsletter</a> to get updated on new flutes in stock. If you know the type of flute you want, you can place a custom order. Due to the current waitlist for Geoffrey Ellis Flutes custom orders, expect a delivery time upwards of six months.

<br/>
[Custom Order](/custom-order){:class='button hollow white'}
{:class='text-center'}
  </div>
</div>

<script type="text/javascript">
function cycleImages(){
      var $active = $('#cycler .active');
      var $next = ($active.next().not('.base').length > 0) ? $active.next().not('.base') : $('#cycler figure').not('.base').first();
      $next.css('z-index',2);//move the next image up the pile
      $active.fadeOut(1500,function(){//fade out the top image
	      $active.css('z-index',1).show().removeClass('active');//reset the z-index and unhide the image
          $next.css('z-index',3).addClass('active');//make the next image the top one
      });
    }

$(document).ready(function(){
$('#cycler figure.base').clone().prependTo('#cycler');
$('#cycler figure.base').last().removeClass('base').addClass('active');
$('#cycler figure').show();
// run every 6s
setInterval('cycleImages()', 6000);
})</script>