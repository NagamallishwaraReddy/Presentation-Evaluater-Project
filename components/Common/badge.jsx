export default function Badge({ type = "evaluated", children }) {
  return (
    <span
      className={`px-3 py-1 rounded-md text-xs font-medium ${
        type === "evaluated"
          ? "bg-green-100 text-green-700"
          : type === "pending"
          ? "bg-orange-100 text-orange-700"
          : type === "processing"
          ? "bg-blue-100 text-blue-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {children}
    </span>
  );
}