"use client";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { IoMdLogOut } from "react-icons/io";

export function SidebarLogout() {

  const router = useRouter();
  const handleLogout = async () => {
    try {
      // Make a POST request to the logout API
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Clear local state or context if using any
        // Example: authContext.setUser(null);
        // Redirect to login or home page
        router.push("/");
      } else {
        console.error("Failed to logout");
        const data = await response.json();
        alert(data.message || "An error occurred during logout.");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      alert("An unexpected error occurred. Please try again.");
    }

    document.cookie = 'session-us=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem("cart");
    // Optionally, you might want to redirect the user or update app state
    window.location.href = '/';
  }

  return <div className="flex py-1 px-2 mt-1 hover:bg-red-600 text-red-600 hover:text-white hover:rounded-md rounded-md cursor-pointer transition-colors duration-300" onClick={async () => handleLogout}>
    <div className='flex-2 pr-3 items-center flex'><IoMdLogOut /></div>
    <div className='flex-1 whitespace-nowrap'>Log Out</div>
  </div>
}