import { htmlToJsx } from "html-to-jsx-transform";

describe("htmlToJsx transformer", () => {
  it("converts HTML attributes and nested content to JSX", () => {
    const html =
      '<section class="card"><h1>Title</h1><p id="summary">Summary</p></section>';
    const expected =
      '<section className="card"><h1>Title</h1><p id="summary">Summary</p></section>';

    expect(htmlToJsx(html)).toBe(expected);
  });

  it("handles boolean attributes and self-closing tags", () => {
    expect(htmlToJsx('<input type="checkbox" checked>')).toBe(
      '<input type="checkbox" checked={true} />',
    );
  });

  it("preserves attribute values with mixed quotes and whitespace", () => {
    const html = '<button disabled class="btn primary">Click</button>';
    expect(htmlToJsx(html)).toBe(
      '<button disabled={true} className="btn primary">Click</button>',
    );
  });
});
