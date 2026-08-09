export default function Button({ type = "primary", children, onClick }) {
    const styles = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "border border-blue-600 text-blue-600 hover:bg-blue-50",
        outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
        ghost: "text-blue-600 hover:bg-blue-50",
        danger: "border border-red-500 text-red-500 hover:bg-red-50",
        icon: "border border-gray-300 text-gray-600 hover:bg-gray-100"
    };
    return (
        <button onClick={onClick} className={`px-5 py-2 rounded-lg font-medium transition ${styles[type]}`}>
            {children}
        </button>
    );
}