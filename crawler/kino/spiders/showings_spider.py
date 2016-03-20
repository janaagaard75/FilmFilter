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
                    # Defaulting to categorizing as a 2D movie when there is not version info.
                    version = '2D'

                request = scrapy.Request(response.url, callback=self.parse_showings_table)
                request.meta['movie_url'] = movie_url
                request.meta['showings_table_value'] = title_item.xpath('@value').extract_first()
                request.meta['theater_url'] = response.url
                request.meta['version'] = version
                yield request


    def parse_showings_table(self, response):
        movie_url = response.meta['movie_url']
        showings_table_value = response.meta['showings_table_value']
        theater_url = response.meta['theater_url']
        version = response.meta['version']

        showings_table = response.xpath('//div[@class="cinema-movie clearfix"]/div[@value="' + showings_table_value + '"]')
        at_least_one_showing_found = False

        jump_links = showings_table.css('.jump-to-show').xpath('a')
        if len(jump_links) >= 1:
            jump_link = jump_links[-1]
            if jump_link.xpath('text()').extract_first().endswith(u'>'):
                jump_url = response.urljoin(jump_link.xpath('@href').extract_first())
                request = scrapy.Request(jump_url, callback=self.parse_showings_table)
                request.meta['movie_url'] = movie_url
                request.meta['showings_table_value'] = showings_table_value
                request.meta['theater_url'] = theater_url
                request.meta['version'] = version
                yield request

        else:
            for showings_column in showings_table.css('.cinema-movie-dates').xpath('li'):
                for showing_cell in showings_column.xpath('ul/li/a'):
                    at_least_one_showing_found = True
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

            if at_least_one_showing_found:
                next_page = showings_table.css('.showtimes-extra').xpath('a[last()]')
                if next_page:
                    next_page_url = response.urljoin(next_page.xpath('@href')[0].extract())
                    request = scrapy.Request(next_page_url, callback=self.parse_showings_table)
                    request.meta['movie_url'] = movie_url
                    request.meta['showings_table_value'] = showings_table_value
                    request.meta['theater_url'] = theater_url
                    request.meta['version'] = version
                    yield request
