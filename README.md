
# Sinhala Song Metaphor Search Engine

This search engine allows users to search for metaphors in Sinhala songs of singers of Naadhagama and Kuweni Concert. It utilizes Elasticsearch for indexing and searching song lyrics, and a Node.js backend for handling search queries and returning results to the user. The frontend is built with React.




## Features

- Search for metaphors by specifying domain, target, singer and lyricist.
  - ධනිත් ශ්‍රී ගැයූ ගීත වල උපමා
  - කාන්තාව ගැන උපමා
  - ධනිත් ශ්‍රී ගැයූ ගීත වල ආදරය ගැන උපමා
- Search for metaphors in multiple domains phrases in Sinhala song lyrics
  - කාන්තාව සහ ආදරය ගැන උපමා
- View song lyrics and associated metaphorical phrases


## Techniques

- Create a custom analyzer with a stop word analyzer and custom stemming.
- Provide a custom stop word list and stemming rules list. 
- Query boosting using named entities and keywords.
- Nested queries with filters to extract out the required metaphors from the songs.


## Run Locally

Clone the project

```bash
  https://github.com/poorna2152/naadhagama-song-search.git
```

Setup the elasticsearch index using `bulkdata.py` to create and add the index to elasticsearch.

```bash
  python bulkdata.py
```

To run the frontend

```bash
  cd ui
  npm install
  npm start
```

To run the backend

```bash
  cd backend
  npm install
  npm start
```

