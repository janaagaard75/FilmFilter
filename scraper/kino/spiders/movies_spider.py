import scrapy

from kino.items import MovieItem

class MoviesSpider(scrapy.Spider):
    name = 'movies'
    allowed_domains = ['kino.dk']
    start_urls = [
        'http://www.kino.dk/aktuelle-film?page=0',
        'http://www.kino.dk/aktuelle-film?page=1',
        'http://www.kino.dk/aktuelle-film?page=2',
        'http://www.kino.dk/aktuelle-film?page=3',
        'http://www.kino.dk/aktuelle-film?page=4',
        'http://www.kino.dk/aktuelle-film?page=5',
        'http://www.kino.dk/aktuelle-film?page=6',
        'http://www.kino.dk/aktuelle-film?page=7',
        # TODO: Fix the movies below. A separate craper might be needed.
        'http://www.kino.dk/film-paa-vej?page=0'
        'http://www.kino.dk/film-paa-vej?page=1'
        'http://www.kino.dk/film-paa-vej?page=2'
        'http://www.kino.dk/film-paa-vej?page=3'
        'http://www.kino.dk/film-paa-vej?page=4'
        'http://www.kino.dk/film-paa-vej?page=5'
        'http://www.kino.dk/film-paa-vej?page=6'
        'http://www.kino.dk/film-paa-vej?page=7'
        'http://www.kino.dk/film-paa-vej?page=8'
        'http://www.kino.dk/film-paa-vej?page=9'
        'http://www.kino.dk/film-paa-vej?page=10'
        'http://www.kino.dk/film-paa-vej?page=11'
        'http://www.kino.dk/film-paa-vej?page=12'
        'http://www.kino.dk/film-paa-vej?page=13'
        'http://www.kino.dk/film-paa-vej?page=14'
        'http://www.kino.dk/film-paa-vej?page=15'
        'http://www.kino.dk/film-paa-vej?page=16'
        'http://www.kino.dk/film-paa-vej?page=17'
        'http://www.kino.dk/film-paa-vej?page=18'
        'http://www.kino.dk/film-paa-vej?page=19'
        'http://www.kino.dk/film-paa-vej?page=20'
        'http://www.kino.dk/film-paa-vej?page=21'
        'http://www.kino.dk/film-paa-vej?page=22'
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
            movie['originalTitle'] = ''
        movie['posterUrl'] = response.css('.field-field-movie-poster-image .field-item').xpath('img/@src').extract()[0]
        return movie
