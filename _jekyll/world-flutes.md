---
title: World Flutes
layout: product_line
product_category: world-flutes
special_boxes: true
custom_ordering: |
  Bansuri

  _$9999-$10000000_

  Rim Blown Flutes

  _etc._

  Some more info about putting in a custom order.
---

<div class="row medium-up-2 large-up-2 fade-on-load">
{% assign world_flutes = site.world_flutes %}
{% for flute in world_flutes %}
<div class="column column-block"><div class="blue content-box" markdown="1">
### {{ flute.title }}

<div class="full-width flute-image" style="background-image: url({{ flute.cloudinary_id | cloudinary_url:'a_exif,c_limit,h_4000,q_75,w_2048' }})"></div>

<div style="min-height:5rem" markdown="1">
{{ flute.subtitle }}
</div>

[Learn More]({{ flute.url }}){:class='button hollow white'}
{:class='text-center'}
</div></div>
{% endfor %}
</div>
