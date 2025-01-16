import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);  // User state to hold user info
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Toggle the dropdown menu
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/check", { method: "GET" });
        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn);
        setUser(data.user);  // Assuming `user` is the returned object
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Handle logout
  const handleLogout = () => {
    document.cookie = 'session-us=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem("cart");
    // Optionally, you might want to redirect the user or update app state
    window.location.href = '/';
  };

  return (
    <div className="relative">
      <button
        className="flex items-center focus:outline-none align-middle"
        onClick={toggleDropdown}
        aria-label="Profile menu"
      >
        <div className="w-8 h-8 bg-gray-300 rounded-full align-middle"></div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-black rounded-lg shadow-lg z-10">
          <div className="py-1">
            <Link href="/profile">
              <div className="block px-4 py-2 text-white hover:bg-gray-800">
                Profile
              </div>
            </Link>
            {user?.isSuperAdmin && (
              <Link href="/dashboard/orders">
                <div className="block px-4 py-2 text-white hover:bg-gray-800">
                  Dashboard
                </div>
              </Link>
            )}
            <Link href="/orders">
              <div className="block px-4 py-2 text-white hover:bg-gray-800">
                Orders
              </div>
            </Link>
            <button
              className="block w-full px-4 py-2 text-left text-white hover:bg-gray-800"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
