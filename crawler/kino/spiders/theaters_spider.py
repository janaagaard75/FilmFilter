import scrapy

from kino.items import TheaterItem

class TheatersSpider(scrapy.Spider):
    name = "theaters"
    allowed_domains = ["kino.dk"]
    start_urls = ["http://www.kino.dk/sitemap"]

    def parse(self, response):
        for theather_href in response.xpath('//a[starts-with(@href, "/biografer/") and not(starts-with(@href, "/biografer/sal/"))]/@href'):
            theater_url = response.urljoin(theather_href.extract())
            yield scrapy.Request(theater_url, callback=self.parse_theater_page)

    def parse_theater_page(self, response):
        pass
