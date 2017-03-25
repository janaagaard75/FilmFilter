import scrapy

from kino.items import MovieItem

class MoviesSpider(scrapy.Spider):
    name = 'movies'
    allowed_domains = ['kino.dk']
    start_urls = ['http://www.kino.dk/sitemap']

    def parse(self, response):
        # TODO: Select all the hrefs that start with /film/.
        for movie_href in response.xpath('//a[starts-with(@href, "/film/")]'):
            movie_url = response.urljoin(movie_href.extract())
            yield scrapy.Request(movie_url, callback=self.parse_movie_page)

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