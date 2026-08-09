export default function Card({ title, score }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <h2 className="font-semibold text-[#164E63]">{title}</h2>
            <p className="text-sm text-gray-500 mt-1">AI in Education.pptx</p>
            <p className="text-xs text-gray-400 mt-1">May 20, 2024 • 12.4 MB</p>
            <div className="flex items-center justify-between mt-4">
                <span className="bg-[#E6F5EE] text-[#269B61] px-3 py-1 rounded-md text-xs font-medium">Evaluated</span>
                <p className="text-2xl font-bold text-[#164E63]">{score}
                    <span className="text-sm font-normal text-gray-400">/100</span>
                </p>
            </div>
        </div>
    );
}