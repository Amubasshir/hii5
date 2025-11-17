import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 p-6 flex flex-col space-y-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <nav className="flex flex-col space-y-3">
        <Link className="hover:text-purple-400" href="/dashboard">
          Home
        </Link>
        <Link className="hover:text-purple-400" href="/dashboard/settings">
          Settings
        </Link>
        <Link className="hover:text-purple-400" href="/dashboard/users">
          Users
        </Link>
      </nav>
    </div>
  );
}
