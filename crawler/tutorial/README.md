# Installing Scrapy

## Prequisites

* Had to install Python using Homebrew to make it work: `brew install python`.
* It might also be necessary to start up Xcode, since it installs some additional tools on first run.
* Also run `xcode-select --install`.

## Installation

    pip install scrapy

# Run with this command

    scrapy crawl kino -o movie.json

## To test scraping possiblities run

    scrapy shell http://www.kino.dk/aktuelle-film
