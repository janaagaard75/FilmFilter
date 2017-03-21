# -*- coding: utf-8 -*-

BOT_NAME = 'kino'

SPIDER_MODULES = ['kino.spiders']
NEWSPIDER_MODULE = 'kino.spiders'

# Crawl responsibly by identifying yourself (and your website) on the user-agent
USER_AGENT = 'FilmFinder'

# Configure maximum concurrent requests performed by Scrapy (default: 16)
#CONCURRENT_REQUESTS=32

# Disable cookies (enabled by default)
COOKIES_ENABLED=False

# Using a feed exporter instead of the pipeline.
FEED_EXPORTERS = {
    'json': 'scrapy.exporters.JsonItemExporter',
    'jsonlines': 'scrapy.exporters.JsonLinesItemExporter',
}
FEED_URI='file:output/%(name)s.jsonl'
FEED_FORMAT='jsonlines'

# Enable and configure the AutoThrottle extension (disabled by default)
# See http://doc.scrapy.org/en/latest/topics/autothrottle.html
# NOTE: AutoThrottle will honour the standard settings for concurrency and delay
AUTOTHROTTLE_ENABLED=True

# Enable and configure HTTP caching (disabled by default)
# See http://scrapy.readthedocs.org/en/latest/topics/downloader-middleware.html#httpcache-middleware-settings
HTTPCACHE_ENABLED=True
HTTPCACHE_EXPIRATION_SECS=3600 # 1 hour. Pages aren't cached between crawls.
HTTPCACHE_STORAGE='scrapy.extensions.httpcache.FilesystemCacheStorage'

# Turn off de-duplication of URls since we visit the same URLs multiple times when crawling showings.
DUPEFILTER_CLASS = 'kino.filters.NoDupeFilter'

# Possilbe values: 'CRITICAL', 'ERROR', 'WARNING', 'INFO', 'DEBUG'.
LOG_LEVEL='INFO'