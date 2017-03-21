import scrapy

from kino.items import MovieItem

class MoviesSpider(scrapy.Spider):
    name = 'movies'
    allowed_domains = ['kino.dk']
    aktuelle_film_urls = map(lambda n: "http://www.kino.dk/aktuelle-film?page=%d" % n, range(10))
    film_paa_vej_urls = map(lambda n: "http://www.kino.dk/film-paa-vej?page=%d" % n, range(30))
    start_urls = aktuelle_film_urls + film_paa_vej_urls

    def parse(self, response):
        for movie_href in response.css('.movies-list-inner-wrap').xpath('./h2/a/@href'):
            movieUrl = response.urljoin(movie_href.extract())
            yield scrapy.Request(movieUrl, callback=self.parse_movie_page)

    def parse_movie_page(self, response):
        movie = MovieItem()
        movie['danishTitle'] = response.css('.node-title').xpath('text()').extract_first().strip()
        movie['movieUrl'] = response.url
        original_title_field = response.css('.field-field-movie-original-title .field-item')
        if len(original_title_field) > 0:
            movie['originalTitle'] = original_title_field.xpath('text()[2]').extract_first().strip()
        else:
            movie['originalTitle'] = ''
        movie['posterUrl'] = response.css('.field-field-movie-poster-image .field-item').xpath('img/@src').extract_first()
        return movie