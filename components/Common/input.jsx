export default function Input({label,type = "text",placeholder}) {
    return (
        <div className="mb-4">
            {/* Label */}
            <label className="block mb-1 text-sm font-medium text-[#164E63]">{label}</label>
            {/* Input */}
            <input type={type} placeholder={placeholder} 
            className="
                w-full
                border border-gray-300
                rounded-lg
                px-4 py-2
                text-gray-700
                bg-white
                outline-none
                transition
                duration-200
                focus:border-[#008B84]
                focus:ring-2
                focus:ring-[#008B84]/20
                hover:border-[#0074B7]
                placeholder:text-gray-400"
            />
        </div>
    );
}