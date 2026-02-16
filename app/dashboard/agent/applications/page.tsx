"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineSearch } from "react-icons/hi";

export default function ApplicationsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const applications = [
    {
      id: "APP-001",
      name: "John Doe",
      business: "Doe Farms",
      date: "2024-02-01",
      status: "Pending",
    },
    {
      id: "APP-002",
      name: "Jane Smith",
      business: "Smith Agro",
      date: "2024-01-28",
      status: "Approved",
    },
    {
      id: "APP-003",
      name: "Samuel Lee",
      business: "Lee Trading",
      date: "2024-01-25",
      status: "Rejected",
    },
  ];

  // Filter applications based on search and status
  const filteredApplications = applications.filter((app) => {
    // Search filter (case insensitive) - checks ID, name, and business
    const matchesSearch = search === "" || 
      app.id.toLowerCase().includes(search.toLowerCase()) ||
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.business.toLowerCase().includes(search.toLowerCase());
    
    // Status filter - checks if status matches selected filter
    const matchesStatus = statusFilter === "" || 
      statusFilter === "All Status" || 
      app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      {/* Header with New Application Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
        <h2 className="text-3xl font-bold text-gray-900">Applications</h2>
        <button
          onClick={() => router.push("/dashboard/agent/applications/new")}
          className="bg-blue-900 text-white px-5 py-3 rounded-lg hover:bg-blue-800 transition font-medium mt-4 md:mt-0"
        >
          + New Application
        </button>
      </div>
      <p className="text-gray-800 mb-8">
        Manage and review submitted customer applications.
      </p>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative md:w-80">
          <HiOutlineSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            placeholder="Search by ID, name, or business..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
        </div>

        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredApplications.length} of {applications.length} applications
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-900 text-left">
            <tr>
              <th className="px-6 py-4 font-semibold">Application ID</th>
              <th className="px-6 py-4 font-semibold">Applicant</th>
              <th className="px-6 py-4 font-semibold">Business</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredApplications.map((app) => (
              <tr
                key={app.id}
                onClick={() => router.push(`/dashboard/agent/applications/${app.id}`)}
                className="border-t border-gray-200 hover:bg-gray-100 transition text-gray-900 cursor-pointer"
              >
                <td className="px-6 py-4 font-medium">{app.id}</td>
                <td className="px-6 py-4">{app.name}</td>
                <td className="px-6 py-4">{app.business}</td>
                <td className="px-6 py-4">{app.date}</td>

                {/* Status Badge */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        app.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : app.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {app.status}
                  </span>
                </td>

                {/* Action Button */}
                <td className="px-6 py-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/dashboard/agent/applications/${app.id}`);
                    }}
                    className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition font-medium"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredApplications.length === 0 && (
          <div className="text-center py-16 text-gray-700">
            <p className="text-lg font-medium mb-2">No applications found</p>
            <p className="text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}