import scrapy
from datetime import datetime
from kino.items import ShowingItem

class TheatersSpider(scrapy.Spider):
    name = "showings"
    allowed_domains = ["kino.dk"]
    start_urls = ["http://www.kino.dk/sitemap"]

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
                else:
                    movie_url = 'NO_MOVIE_URL'

                version_item = title_item.xpath('h3/a/span/text()')
                if len(version_item) >= 1:
                    # Strip the first dash.
                    version = version_item.re(r' - (.*)')[0]
                else:
                    # No version info - defaulting to categorizing as a 2D movie.
                    version = '2D'

                request = scrapy.Request(response.url, callback=self.parse_showings_table)
                request.meta['movie_url'] = movie_url
                request.meta['showings_table_value'] = title_item.xpath('@value').extract_first()
                request.meta['theater_url'] = response.url
                request.meta['version'] = version
                yield request

                #showings_table = title_item.xpath('../div[@class="cinema-movie clearfix"]/div[@value="' + value + '"]')
                # for showings_column in showings_table.css('.cinema-movie-dates').xpath('li'):
                #     for showing_cell in showings_column.xpath('ul/li/a'):
                #         dayAndMonth = showings_column.xpath('div[2]/text()').extract_first().split('/')
                #         day = int(dayAndMonth[0])
                #         month = int(dayAndMonth[1])
                #         hourAndMinute = showing_cell.xpath('text()').extract_first().split(':')
                #         hour = int(hourAndMinute[0])
                #         minute = int(hourAndMinute[1])
                #         date_obj = datetime(2016, month, day, hour, minute)

                #         showing = ShowingItem()
                #         showing['movie_url'] = movie_url
                #         showing['theater_url'] = response.url
                #         showing['showing_url'] = response.urljoin(showing_cell.xpath('@href').extract_first())
                #         showing['start'] = date_obj.strftime('%Y-%m-%d %H:%M:00')
                #         showing['version'] = version
                #         yield showing

    def parse_showings_table(self, response):
        movie_url = response.meta['movie_url']
        showings_table_value = response.meta['showings_table_value']
        theater_url = response.meta['theater_url']
        version = response.meta['version']

        showings_table = response.xpath('//div[@class="cinema-movie clearfix"]/div[@value="' + showings_table_value + '"]')
        for showings_column in showings_table.css('.cinema-movie-dates').xpath('li'):
            for showing_cell in showings_column.xpath('ul/li/a'):
                dayAndMonth = showings_column.xpath('div[2]/text()').extract_first().split('/')
                day = int(dayAndMonth[0])
                month = int(dayAndMonth[1])
                hourAndMinute = showing_cell.xpath('text()').extract_first().split(':')
                hour = int(hourAndMinute[0])
                minute = int(hourAndMinute[1])
                date_obj = datetime(2016, month, day, hour, minute)

                showing = ShowingItem()
                showing['movie_url'] = movie_url
                showing['theater_url'] = theater_url
                showing['showing_url'] = response.urljoin(showing_cell.xpath('@href').extract_first())
                showing['start'] = date_obj.strftime('%Y-%m-%dT%H:%M:00')
                showing['version'] = version
                yield showing


#                     showing['movie_url'] = response.meta['movie_url']
#                     showing['theater_url'] = response.urljoin(movie_div.xpath('h3/a/@href')[0].extract())
#                     showing['showing_url'] = response.urljoin(showing_cell.xpath('@href')[0].extract())
#                     showing['start'] = date_obj.strftime('%Y-%m-%d %H:%M:00')
#                     yield showing

        # theater = TheaterItem()
        # address_line_1 = response.css('.cinema-address')[0].xpath('p/text()')[1].extract().strip()
        # address_line_2 = response.css('.cinema-address')[0].xpath('text()')[1].extract().strip()
        # theater['address'] = address_line_1 + ' ' + address_line_2
        # theater['name'] = response.xpath('//h1/text()').extract()[0]
        # theater['theater_url'] = response.url
        # return theater


# import scrapy
# from datetime import datetime
# from kino.items import ShowingItem

# class ShowingsSpider(scrapy.Spider):
#     name = 'showings'
#     allowed_domains = ['kino.dk']
#     start_urls = [
#         "http://www.kino.dk/aktuelle-film?page=0",
#         "http://www.kino.dk/aktuelle-film?page=1",
#         "http://www.kino.dk/aktuelle-film?page=2",
#         "http://www.kino.dk/aktuelle-film?page=3",
#         "http://www.kino.dk/aktuelle-film?page=4",
#         "http://www.kino.dk/aktuelle-film?page=5",
#         "http://www.kino.dk/aktuelle-film?page=6"
#     ]

#     def parse(self, response):
#         for movie_href in response.css('.movies-list-inner-wrap').xpath('./h2/a/@href'):
#             movie_url = response.urljoin(movie_href.extract())
#             yield scrapy.Request(movie_url, callback=self.parse_movie_page)

#     def parse_movie_page(self, response):
#         showings_url = response.urljoin(response.css('.button.color-red.versions-popup-button').xpath('@href')[0].extract())
#         request = scrapy.Request(showings_url, callback=self.parse_showings_page)
#         request.meta['movie_url'] = request.url
#         request.meta['recursive_calls'] = 4
#         return request

#     def parse_showings_page(self, response):
#         for movie_div in response.css('.booking-day-two-content').xpath('div[position()>1]'):
#             # Just using the first cinema-movie-dates for now, and don't worry about 3D version and so on.
#             showings_type = movie_div.css('.version-dependent-item')[0]
#             for showings_column in showings_type.css('.cinema-movie-dates').xpath('li'):
#                 for showing_cell in showings_column.xpath('ul/li/a'):
#                     dayAndMonth = showings_column.xpath('div[2]/text()')[0].extract().split('/')
#                     day = int(dayAndMonth[0])
#                     month = int(dayAndMonth[1])
#                     hourAndMinute = showing_cell.xpath('text()')[0].extract().split(':')
#                     hour = int(hourAndMinute[0])
#                     minute = int(hourAndMinute[1])
#                     date_obj = datetime(2016, month, day, hour, minute)

#                     showing = ShowingItem()
#                     showing['movie_url'] = response.meta['movie_url']
#                     showing['theater_url'] = response.urljoin(movie_div.xpath('h3/a/@href')[0].extract())
#                     showing['showing_url'] = response.urljoin(showing_cell.xpath('@href')[0].extract())
#                     showing['start'] = date_obj.strftime('%Y-%m-%d %H:%M:00')
#                     yield showing

#             # Better version instead of maximum number of recursive calls:
#             # If at least one show then crawl 'naeste uge' link.
#             # If a 'til naeste forestilling >' button, then crawl that link.
#             # movie_div.css('.jump-to-show').xpath('a/text()') == u'Til n\xe6ste forestilling >'
#             # Otherwize we're done with this cinema.
#             recursive_calls = response.meta['recursive_calls']
#             if recursive_calls > 0:
#                 next_page = showings_type.css('.showtimes-extra').xpath('a[last()]')
#                 if next_page:
#                     next_page_url = response.urljoin(next_page.xpath('@href')[0].extract())
#                     request = scrapy.Request(next_page_url, self.parse_showings_page)
#                     request.meta['movie_url'] = response.meta['movie_url']
#                     request.meta['recursive_calls'] = recursive_calls - 1
#                     yield request
