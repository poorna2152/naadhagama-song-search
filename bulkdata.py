from elasticsearch import Elasticsearch, helpers, exceptions
from elasticsearch_dsl import Index
import json, re
import codecs
import unicodedata
# import queries

client = Elasticsearch(HOST="http://localhost", PORT=9200, request_timeout=60)
INDEX = 'test-lyrics'

# # Creating index if not manually created
def create_index_if_not_exists():
    """Create the given ElasticSearch index and ignore error if it already exists"""
    index = Index(INDEX, using=client)
    res = index.create()
    print(res)
    # try:
    #     index = Index(INDEX, using=client)
    #     index.create(index)
    # except exceptions.RequestError as ex:
    #     if ex.error == 'resource_already_exists_exception':
    #         pass
    #     else:
    #         raise ex

def read_all_songs():
    with open('dataset/song-lyric.json', 'r', encoding='utf-8-sig') as f:
        all_songs = json.loads(f.read())
        return all_songs

def genData(song_array):
    for song in song_array:
        # Fields-capturing
        print(song)
        title = song.get("title", None)
        singer = song.get("singer",None)
        lyricist = song.get("lyricist", None)
        composer = song.get("composer", None)
        album = song.get("album", None)
        year = song.get("year", None)
        lyrics = song.get("lyrics", None)
        metaphors = song.get("metaphors", None)

        yield {
            "_index": INDEX,
            "_source": {
                "title": title,
                "singer": singer,
                "lyricist": lyricist,
                "composer": composer,
                "album": album,
                "year": year,
                "lyrics": lyrics,
                "metaphors": metaphors
            },
        }

create_index_if_not_exists()
# print("index created")
all_songs = read_all_songs()
# print(all_songs)
helpers.bulk(client,genData(all_songs))
