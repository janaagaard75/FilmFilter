# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy

class MovieItem(scrapy.Item):
    # define the fields for your item here like:
    danish_title = scrapy.Field()
    original_title = scrapy.Field()
    poster_url = scrapy.Field()
    url = scrapy.Field()
