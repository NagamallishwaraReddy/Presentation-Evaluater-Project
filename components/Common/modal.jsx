export default function Modal({ open, onClose }) {
    if (!open) return null;
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl w-80 border border-gray-200 shadow-lg">
          <h2 className="text-xl font-bold text-[#164E63]">Delete Presentation</h2>
            <p className="my-4 text-sm text-gray-600">Are you sure you want to delete "AI in Education.pptx"?
              <br />This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button onClick={onClose} className="border border-[#9BB7C1] text-[#164E63] px-4 py-2 rounded-lg">Cancel</button>
              <button className="bg-[#008B84] text-white px-4 py-2 rounded-lg">Delete</button>
            </div>
        </div>
      </div>
    );
}