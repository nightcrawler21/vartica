from hashlib import md5
from dateutil import parser as dt_parse
from datetime import datetime, timezone


def make_id(url: str) -> str:
    return md5(url.encode()).hexdigest()


def parse_date(entry):
    try:
        return dt_parse.parse(entry.get("published") or entry.get("updated"))
    except Exception:
        return datetime.now(timezone.utc)
