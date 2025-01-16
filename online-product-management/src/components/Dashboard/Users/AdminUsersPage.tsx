"use client";

import React, { useState, useEffect } from "react";

interface User {
    userId: number;
    name: string;
    email: string;
    isSuperAdmin: boolean;
    createdAt: string;
}

const AdminUsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const usersPerPage = 5;

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `/api/admin/users?page=${currentPage}&limit=${usersPerPage}`
                );
                const data = await response.json();
                if (response.ok) {
                    setUsers(data.users);
                    setTotalUsers(data.totalUsers);
                } else {
                    console.error(data.error || "Failed to fetch users.");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [currentPage]);

    const totalPages = Math.ceil(totalUsers / usersPerPage);

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Users Dashoboard
            </h2>

            {isLoading ? (
                <p>Loading users...</p>
            ) : (
                <div>
                    <table className="table-auto w-full bg-white rounded-lg shadow-md mb-4">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2">User ID</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Super Admin</th>
                                <th className="px-4 py-2">Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user.userId}
                                    className="text-center border-t hover:bg-gray-50"
                                >
                                    <td className="px-4 py-2">{user.userId}</td>
                                    <td className="px-4 py-2">{user.name}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2">
                                        {user.isSuperAdmin ? "Yes" : "No"}
                                    </td>
                                    <td className="px-4 py-2">
                                        {new Date(user.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <div className="flex justify-between mt-6">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50 hover:bg-gray-800 transition-all"
                        >
                            Previous
                        </button>
                        <span className="text-lg font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50 hover:bg-gray-800 transition-all"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsersPage;
