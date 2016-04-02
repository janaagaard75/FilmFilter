# FilmFilter

A side project testing how a filtering approach could work when selecting a movie.

# Scraper

## Set up

### Installing Scrapy

Had to do the following to make the pip command work. Something about El Capitan shipping with lxml, but in an earlier version than the one required by Scrapy.

* Install Python using Homebrew `brew install python` to get a version of pip that works.
* If Xcode has not been run before, it might be necessary to start up Xcode, since this installs some additional tools.
* Run `xcode-select --install`. I think this adds some command line features to OS X.

Finally run:

    cd crawler
    pip install scrapy

### Installing Gulp

Install gulp-cli globally (if it isn't already installed)

    sudo npm install --global gulp-cli

### Installing Node packages

    npm install

## Scraping kino.dk

Run the scraper with gulp

    gulp scrape

To scrape only part of kino.dk

    gulp { scrape-movies | scrape-showings | scrape-theaters }

## Debugging

It's possible to start up Scrapy in a shell mode, making it really easy to test the selectors:

    scrapy shell "http://www.kino.dk/aktuelle-film"
