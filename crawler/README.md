# Installing Scrapy

Had to do the following to make the pip command work. Something about El Capitan shipping with lxml, but in an earlier version than the one required by Scrapy.

* Install Python using Homebrew `brew install python` to get a version of pip that works.
* If Xcode has not been run before, it might be necessary to start up Xcode, since this installs some additional tools.
* Run `xcode-select --install`. I think this adds some command line features to OS X.

Finally run:

    pip install scrapy

# Scraping kino.dk

Run the little demo with this command. Note that this will append to movies.json, not overwrite the file.

    rm output/movies.json & scrapy crawl movies
    rm output/showings.json & scrapy crawl showings
    rm output/theaters.json & scrapy crawl theaters

It's possible to start up Scrapy in a shell mode, making it really easy to test the selectors:

    scrapy shell http://www.kino.dk/aktuelle-film
