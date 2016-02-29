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
        showing = ShowingItem()
        showing['movie_url'] = response.meta['movie_url']
        # //h3.title-cinema/a@href gi'r theater_url.
        # .cinema-movie-dates indeholder tiderne.
        return showing
