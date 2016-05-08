import scrapy

from kino.items import MovieItem

class MoviesSpider(scrapy.Spider):
    name = "movies"
    allowed_domains = ["kino.dk"]
    start_urls = [
        "http://www.kino.dk/aktuelle-film?page=0",
        "http://www.kino.dk/aktuelle-film?page=1",
        "http://www.kino.dk/aktuelle-film?page=2",
        "http://www.kino.dk/aktuelle-film?page=3",
        "http://www.kino.dk/aktuelle-film?page=4",
        "http://www.kino.dk/aktuelle-film?page=5",
        "http://www.kino.dk/aktuelle-film?page=6"
    ]

    def parse(self, response):
        for movie_href in response.css('.movies-list-inner-wrap').xpath('./h2/a/@href'):
            movieUrl = response.urljoin(movie_href.extract())
            yield scrapy.Request(movieUrl, callback=self.parse_movie_page)

    def parse_movie_page(self, response):
        movie = MovieItem()
        movie['danishTitle'] = response.css('.node-title').xpath('text()').extract()[0].strip()
        movie['movieUrl'] = response.url
        original_title_field = response.css('.field-field-movie-original-title .field-item')
        if len(original_title_field) > 0:
            movie['originalTitle'] = original_title_field.xpath('text()[2]').extract()[0].strip()
        else:
            movie['originalTitle'] = ""
        movie['posterUrl'] = response.css('.field-field-movie-poster-image .field-item').xpath('img/@src').extract()[0]
        return movie
