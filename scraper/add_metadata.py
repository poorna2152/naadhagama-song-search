import json
import random

years = ["2019", "2020", "2021", "2022"]

with open("./song_lyric.json") as fp:
    songs = json.load(fp)

with open("./metadata.json") as fp:
    metadata = json.load(fp)

def format_singer(n):
    if not isinstance(n, list):
        if "ft" in n:
            n = n.split("ft")
        else:
            n = [n]
    print(n)
    return n

for s in songs:
    title = s["title"]
    s["year"] = random.choice(years)
    s["album"] = title
    s["singer"] = format_singer(s["singer"])
    metaphors = s["metaphors"]
    for m in metaphors:
        m["domain"] = "ආදරය"
        if "interpretation" not in m:
            m["interpretation"] = m["target"]
    for d in metadata:
        if d["title"] == title:
            for key in d.keys():
                if key != "title":
                    s[key] = d[key]
            break
    else:
        s["lyricist"] = ""
        s["composer"] = ""

ordered_songs = []
field_order = [
    "title",
    "singer",
    "lyricist",
    "composer",
    "album",
    "year",
    "song",
    "metaphors",
]
metaphor_order = ["domain", "source", "target", "interpretation"]
for s in songs:
    new_s = {}
    for o in field_order:
        new_s[o] = s[o]
    new_s["metaphors"] = []
    for m in s["metaphors"]:
        new_m = {}
        for o in metaphor_order:
            new_m[o] = m[o]
        new_s["metaphors"].append(new_m)
    ordered_songs.append(new_s)
with open("./formatted_song_lyric.json", "w") as f:
    json.dump(ordered_songs, f, ensure_ascii=False)
