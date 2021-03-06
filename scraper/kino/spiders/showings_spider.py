import scrapy
from datetime import datetime
from urlparse import urldefrag
from kino.items import ShowingItem

class ShowingsSpider(scrapy.Spider):
    name = 'showings'
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
                    movie_title = ''
                    version_item = title_item.xpath('h3/a/span/text()')
                else:
                    movie_url = 'NO_MOVIE_URL'
                    movie_title = title_item.xpath('h3/text()').extract_first()
                    version_item = title_item.xpath('h3/span/text()')

                if len(version_item) >= 1:
                    # Strip the first dash.
                    version_string = version_item.re(r' - (.*)')[0]
                else:
                    # Categorize as 2D when there is no version info.
                    version_string = '2D'

                version = version_string.split(' - ')

                request = scrapy.Request(response.url, callback=self.parse_showings_table)
                request.meta['movieTitle'] = movie_title
                request.meta['movieUrl'] = movie_url
                request.meta['showingsTableValue'] = title_item.xpath('@value').extract_first()
                request.meta['theaterUrl'] = response.url
                request.meta['version'] = version
                yield request

    def parse_showings_table(self, response):
        movie_title = response.meta['movieTitle']
        movie_url = response.meta['movieUrl']
        showings_table_value = response.meta['showingsTableValue']
        theater_url = response.meta['theaterUrl']
        version = response.meta['version']

        showings_table = response.xpath('//div[@class="cinema-movie clearfix"]/div[@value="' + showings_table_value + '"]')
        at_least_one_showing_found = False

        jump_links = showings_table.css('.jump-to-show').xpath('a')
        if len(jump_links) >= 1:
            jump_link = jump_links[-1]
            if jump_link.xpath('text()').extract_first().endswith(u'>'):
                jump_url = urldefrag(response.urljoin(jump_link.xpath('@href').extract_first()))[0]
                request = scrapy.Request(jump_url, callback=self.parse_showings_table)
                request.meta['movieTitle'] = movie_title
                request.meta['movieUrl'] = movie_url
                request.meta['showingsTableValue'] = showings_table_value
                request.meta['theaterUrl'] = theater_url
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
                    #seating_info = showing_cell.xpath('@title').extract_first()[len('<div>'):len('</div>')]
                    seating_info = showing_cell.xpath('@title').extract_first()[len('<div>'):-len('</div>')].split('</div><div>')
                    date_obj = datetime(datetime.now().year, month, day, hour, minute)
                    if date_obj < datetime.now():
                        date_obj = datetime(datetime.now().year + 1, month, day, hour, minute)

                    showing = ShowingItem()
                    showing['movieTitle'] = movie_title
                    showing['movieUrl'] = movie_url
                    showing['theaterUrl'] = theater_url
                    showing['seatingInfo'] = seating_info
                    showing['showingUrl'] = response.urljoin(showing_cell.xpath('@href').extract_first())
                    showing['start'] = date_obj.strftime('%Y-%m-%dT%H:%M:00')
                    showing['version'] = version
                    yield showing

            if at_least_one_showing_found:
                next_page = showings_table.css('.showtimes-extra').xpath('a[last()]')
                if next_page:
                    next_page_url = urldefrag(response.urljoin(next_page.xpath('@href')[0].extract()))[0]
                    request = scrapy.Request(next_page_url, callback=self.parse_showings_table)
                    request.meta['movieTitle'] = movie_title
                    request.meta['movieUrl'] = movie_url
                    request.meta['showingsTableValue'] = showings_table_value
                    request.meta['theaterUrl'] = theater_url
                    request.meta['version'] = version
                    yield request