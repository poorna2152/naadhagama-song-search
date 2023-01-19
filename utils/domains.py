import json

songs = {}
with open("../dataset/song-lyric.json", encoding='utf8') as fp:
    songs = json.load(fp)

domains = []
for s in songs:
    for m in s["metaphors"]:
        if (m["domain"] not in domains):
            domains.append(m["domain"])

with open("./domains.json", "w", encoding='utf8') as f:
    json.dump(domains, f, ensure_ascii=False)