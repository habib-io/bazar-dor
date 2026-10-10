export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="skeleton h-32 w-full"></div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="skeleton h-24"></div>
        <div className="skeleton h-24"></div>
        <div className="skeleton h-24"></div>
      </div>
      <div className="skeleton h-64 w-full"></div>
    </div>
  );
}