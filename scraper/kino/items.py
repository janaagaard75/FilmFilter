# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy

class MovieItem(scrapy.Item):
    danish_title = scrapy.Field()
    length = scrapy.Field() # TODO
    movie_url = scrapy.Field() # ID of the movie.
    original_title = scrapy.Field()
    poster_url = scrapy.Field()

class TheaterItem(scrapy.Item):
    address = scrapy.Field()
    name = scrapy.Field()
    theater_url = scrapy.Field() # ID of the theater.

class ShowingItem(scrapy.Item):
    movie_url = scrapy.Field() # Reference to the movie.
    showing_url = scrapy.Field() # ID of the showing.
    start = scrapy.Field() # Date and time.
    theater_url = scrapy.Field() # Reference to the theater.
    version = scrapy.Field() # 2D, 3D, languages etc. This is just a string for now, but should be split into several fields.