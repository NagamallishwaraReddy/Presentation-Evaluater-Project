export default function Toast({ type = "success", message }) {
  return (
    <div className="bg-white border rounded-lg shadow-md p-4 w-80">
      <h3 className={`font-semibold ${
          type === "success"
            ? "text-green-600"
            : type === "warning"
            ? "text-orange-500"
            : "text-red-500"
        }`}
      >
        {type === "success"
          ? "Success"
          : type === "warning"
          ? "Warning"
          : "Error"}
      </h3>
      <p className="text-sm text-gray-600 mt-1">
        {message}
      </p>
    </div>
  );
}