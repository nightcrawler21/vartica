#!/usr/bin/env python
import json, feedparser, yaml, pathlib, itertools
from concurrent.futures import ThreadPoolExecutor
from ingest.utils import make_id, parse_date

ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCES = ROOT / "sources.yaml"
OUTFILE = ROOT / "fixtures" / "latest.json"
MAX_PER_FEED = 5


def load_sources():
    with open(SOURCES) as fp:
        return yaml.safe_load(fp)


def fetch_feed(src):
    parsed = feedparser.parse(src["rss"])
    items = itertools.islice(parsed.entries, MAX_PER_FEED)
    articles = []
    for e in items:
        articles.append(
            {
                "id": make_id(e.link),
                "title": e.title,
                "summary": e.get("summary", "")[:200],
                "pub_date": parse_date(e).isoformat(),
                "publisher": src["name"],
                "publisher_logo": "",  # TODO: add later
                "bias": src["bias"],
                "image": (e.get("media_content") or [{}])[0].get("url", ""),
            }
        )
    return articles


def main():
    sources = load_sources()
    with ThreadPoolExecutor(max_workers=12) as exc:
        all_articles = list(itertools.chain.from_iterable(exc.map(fetch_feed, sources)))

    # sort newest first
    all_articles.sort(key=lambda a: a["pub_date"], reverse=True)

    OUTFILE.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTFILE, "w") as fp:
        json.dump(all_articles, fp, ensure_ascii=False, indent=2)

    print(f"wrote {len(all_articles)} articles → {OUTFILE}")


if __name__ == "__main__":
    main()
