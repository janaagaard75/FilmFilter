# Film Film Scraper

A scraper for www.kino.dk.

## Set up

### Installing Scrapy

Had to do the following to make the pip command work. Something about El Capitan shipping with lxml, but in an earlier version than the one required by Scrapy.

* Install Python 3 using Homebrew.

      brew install python3

* If Xcode has not been run before, it might be necessary to start up Xcode, since this installs some additional tools.
* Set up XCode. I think this adds some command line features to macOS.

      xcode-select --install

* Install Scrapy.

      pip install Scrapy

### Install shub

`shub` is the Scrapinghub command line client. Install shub and sign in.

    pip install shub
    shub login

### Upgrading Scrapy

    pip install --upgrade Scrapy

If upgrading fails, uninstall and then reinstall:

    pip uninstall Scrapy
    pip install Scrapy

## Deploying to Scrapinghub

    shub deploy

## Running Locally

### Installing Gulp

Install gulp-cli if it isn't already installed:

    npm install --global gulp-cli

### Installing Node packages

    yarn install

## Scraping kino.dk

Run the scraper with gulp:

    gulp

To scrape only part of kino.dk.

    gulp { movies | showings | theaters }

## Debugging

## Scraper

It's possible to start up Scrapy in a shell mode, great for testing the selectors:

    scrapy shell "http://www.kino.dk/aktuelle-film"

### JSON results

At <https://jqplay.org/> it's possible to play around with JSON Lines data. This commands selects all the unique movie URLs in showings.jsonl.

    unique_by(.movieUrl) | [ .[].movieUrl ]

And this command counts them. There are over 200, so the movies scraper is missing 2/3rds of all the movies.

    unique_by(.movieUrl) | length
