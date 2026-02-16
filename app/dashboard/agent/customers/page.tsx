"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineUserAdd, HiOutlineSearch } from "react-icons/hi";

type Customer = {
  id: number;
  name: string;
  email: string;
  status: string;
  joined: string;
  businessName: string;
  phone: string;
  password: string;
  kyc: File | null;
};

const mockCustomers: Customer[] = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active", joined: "2024-01-10", businessName: "Doe Inc.", phone: "1234567890", password: "", kyc: null },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive", joined: "2023-12-22", businessName: "Smith LLC", phone: "0987654321", password: "", kyc: null },
  { id: 3, name: "Samuel Lee", email: "samuel@example.com", status: "Active", joined: "2024-02-01", businessName: "Lee Trading", phone: "5555555555", password: "", kyc: null },
];

export default function CustomersPage() {
  const router = useRouter();
  const [customers] = useState(mockCustomers);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filtered = customers.filter(
    (c) =>
      (!search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())) &&
      (!status || c.status === status)
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
        <h2 className="text-3xl font-bold text-gray-900">Customers</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-900 text-white px-5 py-3 rounded-lg hover:bg-blue-800 transition font-medium mt-4 md:mt-0"
        >
          <HiOutlineUserAdd />
          Add Customer
        </button>
      </div>
      <p className="text-gray-800 mb-8">
        Manage registered customers.
      </p>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative md:w-80">
          <HiOutlineSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 text-gray-900 placeholder-gray-500"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 text-gray-900"
        >
          <option value="">All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-gray-900">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Name</th>
              <th className="px-6 py-4 text-left font-semibold">Email</th>
              <th className="px-6 py-4 text-left font-semibold">Status</th>
              <th className="px-6 py-4 text-left font-semibold">Joined</th>
              <th className="px-6 py-4 text-left font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((c) => (
              <tr
                key={c.id}
                onClick={() =>
                  router.push(`/dashboard/agent/customers/${c.id}`)
                }
                className="border-t border-gray-200 hover:bg-gray-100 transition cursor-pointer text-gray-900"
              >
                <td className="px-6 py-4 font-medium">{c.name}</td>
                <td className="px-6 py-4">{c.email}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      c.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>

                <td className="px-6 py-4">{c.joined}</td>

                <td className="px-6 py-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/dashboard/agent/customers/${c.id}`);
                    }}
                    className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition font-medium text-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-700">
            No customers found.
          </div>
        )}
      </div>

      {/* Simple Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">New Customer</h3>
            <p className="text-gray-700 mb-6">
              Customer form will go here.
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}