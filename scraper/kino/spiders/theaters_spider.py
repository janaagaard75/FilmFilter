import scrapy

from kino.items import TheaterItem

class TheatersSpider(scrapy.Spider):
    name = "theaters"
    allowed_domains = ["kino.dk"]
    start_urls = ["http://www.kino.dk/sitemap"]

    def parse(self, response):
        for theather_href in response.xpath('//a[starts-with(@href, "/biografer/") and not(starts-with(@href, "/biografer/sal/"))]/@href'):
            theaterUrl = response.urljoin(theather_href.extract())
            yield scrapy.Request(theaterUrl, callback=self.parse_theater_page)

    def parse_theater_page(self, response):
        theater = TheaterItem()
        # address_line_1_item = response.css('.cinema-address')
        # if len(address_line_1_item) >= 1:
        #     address_line_1 = address_line_1_item[0].xpath('p/text()')[1].extract().strip()
        #     address_line_2 = response.css('.cinema-address')[0].xpath('text()')[1].extract().strip()
        #     address = address_line_1 + ' ' + address_line_2
        # else:
        #     address = 'NO_ADDRESS'
        theater['address'] = response.css('.cinema-address').xpath('/text()').extract()
        theater['name'] = response.xpath('//h1/text()').extract()[0]
        theater['theaterUrl'] = response.url
        return theater
