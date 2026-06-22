function Skeleton() {
  return (
    <div className="grid gap-3">
      {[1, 2, 3].map((n) => (
        <div key={n} className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/5"></div>
        </div>
      ))}
    </div>
  )
}

export default Skeleton