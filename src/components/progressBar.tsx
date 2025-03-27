"use client"
export default function ProgressBar() {
  return (
    <>
      <div className="mt-8 w-64 mx-auto">
        <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
          <div className="h-full bg-[#d90000] rounded-full animate-[loading_2s_ease-in-out_infinite]" />
        </div>
      </div>
      <style jsx>{`
      @keyframes loading {
        0% { width: 0% }
        50% { width: 100% }
        100% { width: 0% }
      }
    `}</style>
    </>
  )
}