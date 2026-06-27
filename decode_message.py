"""
Coding Exercise: Decoding a Secret Message

This script fetches a published Google Doc, parses a table of (x, character, y)
entries, places each character at its (x, y) coordinate in a 2D grid, and
prints the grid so the characters form a readable message.

Coordinate convention (derived from the example showing letter 'F'):
  - x increases to the RIGHT  (column index)
  - y increases DOWNWARD       (row index)
  i.e. (0, 0) is the TOP-LEFT corner of the grid.
"""

import urllib.request
from html.parser import HTMLParser


# ---------------------------------------------------------------------------
# Minimal HTML table parser
# ---------------------------------------------------------------------------

class TableParser(HTMLParser):
    """Extract all <td> text content from an HTML page, row by row."""

    def __init__(self):
        super().__init__()
        self.rows = []          # list of rows; each row is a list of cell texts
        self._current_row = None
        self._current_cell = None
        self._in_cell = False

    def handle_starttag(self, tag, attrs):
        if tag == "tr":
            self._current_row = []
        elif tag == "td" and self._current_row is not None:
            self._current_cell = []
            self._in_cell = True

    def handle_endtag(self, tag):
        if tag == "td" and self._in_cell:
            self.rows.append(self._current_row)  # temporarily unused; see below
            self._current_row.append("".join(self._current_cell).strip())
            self._in_cell = False
            self._current_cell = None
        elif tag == "tr" and self._current_row is not None:
            # Only keep non-empty rows
            if self._current_row:
                self.rows.append(self._current_row)
            self._current_row = None

    def handle_data(self, data):
        if self._in_cell:
            self._current_cell.append(data)


# ---------------------------------------------------------------------------
# Core function
# ---------------------------------------------------------------------------

def decode_secret_message(url: str) -> None:
    """
    Fetch the Google Doc at *url*, parse the (x, character, y) table,
    build a 2-D grid, and print it so the characters spell a message.

    Parameters
    ----------
    url : str
        URL of the published Google Doc containing the input data.
    """
    # 1. Fetch the page
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0"}
    )
    with urllib.request.urlopen(req) as response:
        html = response.read().decode("utf-8")

    # 2. Parse all table rows
    parser = TableParser()
    parser.feed(html)

    # The parser appended a row object both when a <td> closed AND when a
    # <tr> closed, so we need a cleaner pass.  Re-parse with a correct
    # single-pass approach.
    rows = _parse_table_rows(html)

    # 3. Skip the header row (x-coordinate | Character | y-coordinate)
    data_rows = []
    for row in rows:
        if len(row) == 3:
            x_str, char, y_str = row
            try:
                x = int(x_str)
                y = int(y_str)
                data_rows.append((x, char, y))
            except ValueError:
                # Header row or malformed — skip
                pass

    if not data_rows:
        print("No data found.")
        return

    # 4. Determine grid dimensions
    max_x = max(x for x, _, y in data_rows)
    max_y = max(y for x, _, y in data_rows)

    # 5. Build the grid (list of lists), filled with spaces
    width  = max_x + 1
    height = max_y + 1
    grid = [[" "] * width for _ in range(height)]

    for x, char, y in data_rows:
        grid[y][x] = char

    # 6. Print row by row (y=0 at the top)
    for row in grid:
        print("".join(row))


def _parse_table_rows(html: str):
    """
    Clean single-pass HTML table row extractor.
    Returns a list of rows where each row is a list of cell text strings.
    """

    class _Parser(HTMLParser):
        def __init__(self):
            super().__init__()
            self.all_rows = []
            self._row = None
            self._cell_buf = None

        def handle_starttag(self, tag, attrs):
            if tag == "tr":
                self._row = []
            elif tag == "td" and self._row is not None:
                self._cell_buf = []

        def handle_endtag(self, tag):
            if tag == "td" and self._cell_buf is not None:
                self._row.append("".join(self._cell_buf).strip())
                self._cell_buf = None
            elif tag == "tr" and self._row is not None:
                if self._row:
                    self.all_rows.append(self._row)
                self._row = None

        def handle_data(self, data):
            if self._cell_buf is not None:
                self._cell_buf.append(data)

    p = _Parser()
    p.feed(html)
    return p.all_rows


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    TARGET_URL = (
        "https://docs.google.com/document/d/e/"
        "2PACX-1vSvM5gDlNvt7npYHhp_XfsJvuntUhq184By5xO_pA4b_gCWeXb6dM6ZxwN8rE6S4ghUsCj2VKR21oEP"
        "/pub"
    )
    decode_secret_message(TARGET_URL)
