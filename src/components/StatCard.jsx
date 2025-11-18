export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-gray-800 shadow-xl p-6 rounded-xl border border-gray-700 flex flex-col justify-between">
      <div className="flex justify-between items-center text-gray-400">
        <span className="text-sm">{title}</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      </div>

      <p className="text-2xl font-bold mt-2 text-white">{value}</p>

      {subtitle && <p className="text-xs mt-1 text-gray-400">{subtitle}</p>}
    </div>
  );
}
