# Set up

## Installing Scrapy

Had to do the following to make the pip command work. Something about El Capitan shipping with lxml, but in an earlier version than the one required by Scrapy.

* Install Python using Homebrew `brew install python` to get a version of pip that works.
* If Xcode has not been run before, it might be necessary to start up Xcode, since this installs some additional tools.
* Run `xcode-select --install`. I think this adds some command line features to macOS.

Finally run:

    pip install scrapy

## Installing Gulp

Install gulp-cli if it isn't already installed

    npm --global gulp-cli

## Installing Node packages

    npm install

# Scraping kino.dk

Run the scraper with gulp

    gulp

To scrape only part of kino.dk

    gulp { movies | showings | theaters }

# Debugging

## Scraper

It's possible to start up Scrapy in a shell mode, making it really easy to test the selectors:

    scrapy shell "http://www.kino.dk/aktuelle-film"

## JSON results

At https://jqplay.org/ it's possible to play around with JSON Lines data. This commands selects all the unique movie URLs in showings.jsonl.

    unique_by(.movieUrl) | [ .[].movieUrl ]

And this command counts them. There are over 200, so the movies scraper is missing 2/3rds of all the movies.

    unique_by(.movieUrl) | length