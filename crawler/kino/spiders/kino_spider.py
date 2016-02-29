import scrapy

from kino.items import MovieItem

class KinoSpider(scrapy.Spider):
    name = "kino"
    allowed_domains = ["kino.dk"]
    start_urls = [
        "http://www.kino.dk/aktuelle-film?page=0"
    ]

    def parse(self, response):
        for movie_href in response.css('.movies-list-inner-wrap').xpath('./h2/a/@href'):
            url = response.urljoin(movie_href.extract())
            yield scrapy.Request(url, callback=self.parse_movie_page)

    def parse_movie_page(self, response):
        movie = MovieItem()
        movie['danishTitle'] = response.css('.node-title').xpath('text()').extract()[0].strip()
        movie['originalTitle'] = response.css('.field-field-movie-original-title .field-item').xpath('text()[2]').extract()[0].strip()
        movie['url'] = response.url
        yield movie
