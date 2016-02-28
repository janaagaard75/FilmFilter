import scrapy

from tutorial.items import MovieItem

class KinoSpider(scrapy.Spider):
    name = "kino"
    allowed_domains = ["kino.dk"]
    start_urls = [
        "http://www.kino.dk/aktuelle-film?page=0"
    ]

    def parse(self, response):
        for movieLink in response.css('.movies-list-inner-wrap').xpath('./h2/a'):
            movie = MovieItem()
            movie['danishTitle'] = movieLink.xpath('text()').extract()
            movie['url'] = movieLink.xpath('@href').extract()
            yield movie
