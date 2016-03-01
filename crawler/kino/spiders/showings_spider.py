import scrapy

from kino.items import ShowingItem

class ShowingsSpider(scrapy.Spider):
    name = 'showings'
    allowed_domains = ['kino.dk']
    start_urls = [
        "http://www.kino.dk/aktuelle-film?page=0"#,
        #"http://www.kino.dk/aktuelle-film?page=1",
        #"http://www.kino.dk/aktuelle-film?page=2",
        #"http://www.kino.dk/aktuelle-film?page=3",
        #"http://www.kino.dk/aktuelle-film?page=4",
        #"http://www.kino.dk/aktuelle-film?page=5",
        #"http://www.kino.dk/aktuelle-film?page=6"
    ]

    def parse(self, response):
        for movie_href in response.css('.movies-list-inner-wrap').xpath('./h2/a/@href'):
            movie_url = response.urljoin(movie_href.extract())
            yield scrapy.Request(movie_url, callback=self.parse_movie_page)

    def parse_movie_page(self, response):
        showings_url = response.urljoin(response.css('.button.color-red.versions-popup-button').xpath('@href')[0].extract())
        request = scrapy.Request(showings_url, callback=self.parse_showings_page)
        request.meta['movie_url'] = request.url
        return request

    def parse_showings_page(self, response):
        for movie_div in response.css('.booking-day-two-content').xpath('div[position()>1]'):
            # Just using the first cinema-movie-dates for now.
            for showings_column in movie_div.css('.cinema-movie-dates')[0].xpath('li'):
                showing = ShowingItem()
                showing['movie_url'] = response.meta['movie_url']
                showing['theater_url'] = response.urljoin(movie_div.xpath('h3/a/@href').extract()[0])
                date = showings_column.xpath('div[2]/text()').extract()
                showing['start'] = date
                yield showing
