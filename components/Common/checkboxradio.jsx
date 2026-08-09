export default function CheckboxRadio() {
  return (
    <div className="bg-white p-4 rounded-xl border">
        <label className="block mb-3 text-[#164E63]">
            <input type="checkbox" className="mr-2 accent-[#008B84]" />
            Option 1
        </label>
        <label className="block mb-3 text-[#164E63]">
            <input type="checkbox" className="mr-2 accent-[#008B84]" />Option 2
        </label>
        <label className="block mb-3 text-[#164E63]">
            <input type="checkbox" className="mr-2 accent-[#008B84]" />Option 3
        </label>
        <label className="block text-[#164E63]">
            <input type="radio" name="gender" className="mr-2 accent-[#008B84]" />Male
        </label>
        <label className="block text-[#164E63]">
            <input type="radio" name="gender" className="mr-2 accent-[#008B84]" />Female
        </label>
    </div>
  );
}