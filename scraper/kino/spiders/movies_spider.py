import scrapy
from kino.items import MovieItem

class MoviesSpider(scrapy.Spider):
    name = 'movies'
    allowed_domains = ['kino.dk']
    start_urls = ['http://www.kino.dk/sitemap']

    def parse(self, response):
        for theather_href in response.xpath('//a[starts-with(@href, "/biografer/") and not(starts-with(@href, "/biografer/sal/"))]/@href'):
            theater_url = response.urljoin(theather_href.extract())
            yield scrapy.Request(theater_url, callback=self.parse_theater_page)

    def parse_theater_page(self, response):
        for movie_wrapper in response.xpath('//div[@id="cinema-showtimes"]/div[@class="cinema-movie-wrapper"]'):
            for title_item in movie_wrapper.xpath('div[@class="version-dependent-item"]'):
                url_item = title_item.xpath('h3/a/@href')
                if len(url_item) >= 1:
                    movie_url = response.urljoin(url_item.extract_first())
                    yield scrapy.Request(movie_url, callback=self.parse_movie_page)

    def parse_movie_page(self, response):
        movie = MovieItem()
        movie['danishTitle'] = response.css('.pane-node-title').xpath('text()').extract_first().strip()
        movie['movieUrl'] = response.url
        original_title_field = response.css('.field-field-movie-original-title .field-item')
        if len(original_title_field) > 0:
            movie['originalTitle'] = original_title_field.xpath('text()[2]').extract_first().strip()
        else:
            movie['originalTitle'] = ''
        movie['posterUrl'] = response.css('.field-field-movie-poster-image .field-item').xpath('img/@src').extract_first()
        return movie