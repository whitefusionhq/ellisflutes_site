---
layout: cool_post
title: My Cool Post
---

I am a post

I am a very cool post

More post stuff

W00t!

{% pagecomponent pullquote %}
This really is ANOTHER _pull_ quote!!!
{% endpagecomponent %}

GitHub Pages is powered by Jekyll. However, all Pages sites are generated using the --safe option to disable custom plugins for security reasons. Unfortunately, this means your plugins won’t work if you’re deploying to GitHub Pages.

You can still use GitHub Pages to publish your site, but you’ll need to convert the site locally and push the generated static files to your GitHub repository instead of the Jekyll source files.

{% pagecomponent pullquote float="right" %}
and This **really** is aNOTHER _pull_ quote, dontcha know
{% endpagecomponent %}


{% contentfor sb1 %}
This is a sidebar!
{% endcontentfor %}
