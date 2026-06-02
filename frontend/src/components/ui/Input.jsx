import React from "react";

function Input({
  label,
  field,
  type = "text",
  placeholder,
  data,
  setData,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] text-gray-400 tracking-wider uppercase font-semibold">
        {label}
      </label>

      <input
        className="w-full bg-[#131926]/60 border border-gray-800/80 rounded-lg px-3.5 py-2.5
        text-xs text-white placeholder:text-gray-600
        focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/20 focus:bg-[#161d30]/80
        transition-all duration-200"
        type={type}
        placeholder={placeholder}
        value={data[field]}
        onChange={(e) =>
          setData({
            ...data,
            [field]: e.target.value,
          })
        }
      />
    </div>
  );
}

export default Input;