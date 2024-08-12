export function Entry({ onSubmit, isDarkMode }) {
  const methods = [
    {
      text: "GET",
      color: "#ff09e1",
    },
    {
      text: "POST",
      color: "#007bff",
    },
    {
      text: "PUT",
      color: "#28a745",
    },
    {
      text: "DELETE",
      color: "#dc3545",
    },
    {
      text: "PATCH",
      color: "#ffc107",
    },
    {
      text: "OPTIONS",
      color: "#17a2b8",
    },
    {
      text: "HEAD",
      color: "#6c757d",
    },
  ];

  return (
    <form className="flex items-center justify-between" onSubmit={onSubmit}>
      <input
        placeholder="https://..."
        required={true}
        type="url"
        className={`w-full p-5 border rounded-lg shadow ${
          isDarkMode
            ? "bg-gray-900 border-gray-900 text-white"
            : "bg-white border-gray-200 text-black"
        }`}
        name="web"
      />
      <select
        onChange={(e) => setValue({ ...value, method: e.target.value })}
        className={`ml-2 p-5 border rounded-lg ${
          isDarkMode
            ? "bg-gray-900 border-gray-900 text-white"
            : "bg-white border-gray-200 text-black"
        }`}
        name="method"
      >
        {methods.map((method) => (
          <option
            key={method.text}
            value={method.text}
            className=" font-bold"
            style={{ color: method.color }}
          >
            {method.text}
          </option>
        ))}
      </select>
      <button className="mx-5 p-5 bg-blue-500 text-white hover:bg-blue-800 transition-colors duration-150 rounded-lg w-[100px]">
        Fetch
      </button>
    </form>
  );
}
