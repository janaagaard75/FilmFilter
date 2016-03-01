# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

import json

class KinoPipeline(object):
    def process_item(self, item, spider):
        return item

class JsonPipeline(object):
    def process_item(self, item, spider):
        line = json.dumps(dict(item), ensure_ascii=False, indent=4) + "\n"
        return line
