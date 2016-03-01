import scrapy
from datetime import datetime
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
        request.meta['recursive_calls'] = 4
        return request

    def parse_showings_page(self, response):
        for movie_div in response.css('.booking-day-two-content').xpath('div[position()>1]'):
            # Just using the first cinema-movie-dates for now, and don't worry about 3D version and so on.
            showings_type = movie_div.css('.version-dependent-item')[0]
            for showings_column in showings_type.css('.cinema-movie-dates').xpath('li'):
                for showing_cell in showings_column.xpath('ul/li/a'):
                    dayAndMonth = showings_column.xpath('div[2]/text()')[0].extract().split('/')
                    day = int(dayAndMonth[0])
                    month = int(dayAndMonth[1])
                    hourAndMinute = showing_cell.xpath('text()')[0].extract().split(':')
                    hour = int(hourAndMinute[0])
                    minute = int(hourAndMinute[1])
                    date_obj = datetime(2016, month, day, hour, minute)

                    showing = ShowingItem()
                    showing['movie_url'] = response.meta['movie_url']
                    showing['theater_url'] = response.urljoin(movie_div.xpath('h3/a/@href')[0].extract())
                    showing['showing_url'] = response.urljoin(showing_cell.xpath('@href')[0].extract())
                    showing['start'] = date_obj.strftime('%Y-%m-%d %H:%M:00')
                    yield showing

            recursive_calls = response.meta['recursive_calls']
            if recursive_calls > 0:
                next_page = showings_type.css('.showtimes-extra').xpath('a[last()]')
                if next_page:
                    next_page_url = response.urljoin(next_page.xpath('@href')[0].extract())
                    request = scrapy.Request(next_page_url, self.parse_showings_page)
                    request.meta['movie_url'] = response.meta['movie_url']
                    request.meta['recursive_calls'] = recursive_calls - 1
                    yield request
