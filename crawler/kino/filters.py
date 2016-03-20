from scrapy.dupefilters import RFPDupeFilter

class NoDupeFilter(RFPDupeFilter):
    def request_seen(self, request):
        return False