export default function Navbar() {
    return (
      <nav className="bg-gray-900 p-4 text-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">Online Product Management</h1>
          <div className="space-x-4">
            <a href="#" className="hover:underline">
              Login
            </a>
            <a href="#" className="hover:underline">
              Signup
            </a>
          </div>
        </div>
      </nav>
    );
  }
  