import scrapy

from kino.items import MovieItem

class MoviesSpider(scrapy.Spider):
    name = "movies"
    allowed_domains = ["kino.dk"]
    start_urls = ["http://www.kino.dk/aktuelle-film?page=0"]

    def parse(self, response):
        for movie_href in response.css('.movies-list-inner-wrap').xpath('./h2/a/@href'):
            movie_url = response.urljoin(movie_href.extract())
            yield scrapy.Request(movie_url, callback=self.parse_movie_page)

    def parse_movie_page(self, response):
        movie = MovieItem()
        movie['danish_title'] = response.css('.node-title').xpath('text()').extract()[0].strip()
        movie['movie_url'] = response.url
        movie['original_title'] = response.css('.field-field-movie-original-title .field-item').xpath('text()[2]').extract()[0].strip()
        movie['poster_url'] = response.css('.field-field-movie-poster-image .field-item').xpath('img/@src').extract()[0]
        yield movie
