import React from "react";

function Footer() {
  return (
    <div className="footer w-full h-[4%] bg-[#0c1220] border-t border-gray-800/60 flex items-center justify-center shadow-inner">
      <span className="text-[10px] text-gray-500 font-medium select-none tracking-wider">
        SchemaFlow v1.0 &bull; Connected to Database
      </span>
    </div>
  );
}

export default Footer;
