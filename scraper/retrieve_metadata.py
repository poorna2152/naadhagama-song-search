import requests
import bs4
import json

base_url = "https://www.lklyrics.com/songs/"
f = open("song_lyric.json")
raw_data = json.load(f)
f.close()

links = []
for s in raw_data:
    links.append(
        base_url + s["title"].replace(" ", "_") + "/" + s["song"].replace(" ", "_")
    )

all_data = []
i = 0
for url in links:
    title = str(url.split("/")[-1]).replace("_", " ")
    print(str(i) + "." + title)
    i = i + 1
    request_result = requests.get(url)
    if not request_result.ok:
        continue
    soup = bs4.BeautifulSoup(request_result.text, "html.parser")
    table = soup.find("table")
    if table is None:
        continue
    headers = [header.text for header in table.find_all("th")]
    result = {"title": title}
    rows = table.find_all("tr")
    rows = rows[:-1]
    for row in rows:
        header = row.find("th").text.lower()
        data = row.find("td").text.replace("\t", "").replace("\n", "")
        result[header] = data.lower()
    all_data.append(result)

with open("./metadata.json", "w") as f:
    json.dump(all_data, f, ensure_ascii=False)
