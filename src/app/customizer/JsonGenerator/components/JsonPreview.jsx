export const JsonPreview = ({ data }) => (
  <pre
    className="p-3 overflow-auto wrap-break-word whitespace-pre-wrap"
    data-testid="preview-json"
  >
    {JSON.stringify(
      data,
      (_, value) => (typeof value === "bigint" ? value.toString() : value),
      2,
    )}
  </pre>
);
