# First Presbyterian Church of Santa Rosa Website

This site is built using the Jekyll static site generator along with ZURB Foundation 6. It uses Gulp for SASS processing and Bower to load in Foundation's initial CSS/JS components.

We use Foreman to start `foundation watch` (basically runs Gulp) and `jekyll serve`. The CSS file is auto-generated into the `_jekyll/css` folder, and we've manually copied the main Foundation JS file into `_jekyll/js`.

## Get Started

Make sure you have `rvm` installed. The `.ruby-version` file will set up a new gemset for rvm when you `cd` into the project folder.

1. Run `bundle install`
2. Run `gem install foreman`
3. Run `foreman start`.
4. You should be able to view the site now at [http://127.0.0.1:4001/](http://127.0.0.1:4001/). If you need to change the port number from 4001, just edit the `Procfile`.

—[WHITEFUSION*UX](http://ux.whitefusion.io)
