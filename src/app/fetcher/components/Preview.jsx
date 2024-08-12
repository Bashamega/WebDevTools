export function Preview({ data }) {
    return (
      <pre>
        <code>{data ? JSON.stringify(data, null, 2) : "No Data"}</code>
      </pre>
    );
  }
  