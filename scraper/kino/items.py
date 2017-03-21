# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy

class MovieItem(scrapy.Item):
    danishTitle = scrapy.Field()
    length = scrapy.Field() # TODO
    movieUrl = scrapy.Field() # ID of the movie.
    originalTitle = scrapy.Field()
    posterUrl = scrapy.Field()

class TheaterItem(scrapy.Item):
    address = scrapy.Field()
    name = scrapy.Field()
    theaterUrl = scrapy.Field() # ID of the theater.

class ShowingItem(scrapy.Item):
    movieTitle = scrapy.Field() # Name of the movie, in case the movie doesn't have a separate page.
    movieUrl = scrapy.Field() # Reference to the movie.
    seatingInfo = scrapy.Field() # Number of seats, number of booked seats and room number.
    showingUrl = scrapy.Field() # ID of the showing.
    start = scrapy.Field() # Date and time.
    theaterUrl = scrapy.Field() # Reference to the theater.
    version = scrapy.Field() # 2D, 3D, IMAX etc.