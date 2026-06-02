import React from 'react'

function TextArea({schema, setSchema}) {
  return (
    <>
      <textarea
        value={schema}
        onChange={e => setSchema(e.target.value)}
        placeholder="// Design your schema here..."
        className="w-full h-full p-4 text-xs font-mono text-gray-300 bg-[#080c14] border-0 focus:outline-none resize-none selection:bg-blue-500/20 scrollbar-thin"
      />
    </>
  )
}

export default TextArea