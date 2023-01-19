import json

singers = []
composers = []
lyricists = []

songs = {}
with open("song-lyric.json", encoding='utf8') as fp:
    songs = json.load(fp)

def add_if_not(source, entities):
    if not isinstance(entities, list):
        if (entities not in source):
            source.append(entities)
        return
    for entity in entities:
        if (entity not in source):
            source.append(entity)

for s in songs:
    for singer in s["singer"]:
        add_if_not(singers, singer.split())
    for composer in s["composer"]:
        add_if_not(composers, composer.split())
    for lyricist in s["lyricist"]:
        add_if_not(lyricists, lyricist.split())

output = {
    "singers": singers,
    "composers": composers,
    "lyricists": lyricists
}
with open("./named_entities.json", "w", encoding='utf8') as f:
    json.dump(output, f, ensure_ascii=False)
