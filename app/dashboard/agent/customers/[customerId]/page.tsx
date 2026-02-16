"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

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
  idCardType?: string;
  idCardFile?: File | null;
  personalAddress?: string;
  businessAddress?: string;
  farmSize?: string;
  nationality?: string;
  state?: string;
  businessContact?: string;
  businessPhotos?: File[];
  numberOfEmployees?: number;
  dateStarted?: string;
  cacFile?: File | null;
};

const mockCustomers: Customer[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    joined: "2024-01-10",
    businessName: "Doe Inc.",
    phone: "1234567890",
    password: "",
    kyc: null,
    idCardType: "NIN",
    idCardFile: null,
    personalAddress: "123 Main St, Lagos",
    businessAddress: "456 Business Rd, Lagos",
    farmSize: "10 hectares",
    nationality: "Nigerian",
    state: "Lagos",
    businessContact: "08012345678",
    businessPhotos: [],
    numberOfEmployees: 12,
    dateStarted: "2018-05-01",
    cacFile: null,
  },
];

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const customerId = Number(params.customerId);

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [showKycModal, setShowKycModal] = useState(false);

  useEffect(() => {
    const found = mockCustomers.find((c) => c.id === customerId);
    setCustomer(found || null);
  }, [customerId]);

  if (!customer) {
    return <div className="p-8">Customer not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-10 min-h-[80vh]">
      {/* Back button */}
      <button
        className="mb-8 text-[#0f172a] hover:underline font-semibold"
        onClick={() => router.back()}
      >
        ← Back to Customers
      </button>

      <h2 className="text-3xl font-extrabold mb-8 text-gray-900">
        Customer Details
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* PERSONAL INFO */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-10 border min-h-[340px] md:min-h-[420px] lg:min-h-[500px] flex flex-col">
          <h3 className="text-lg font-semibold mb-6 text-gray-900">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-gray-800 text-base flex-1">
            <p><strong>Name:</strong> {customer.name}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Phone:</strong> {customer.phone}</p>
            <p><strong>Joined:</strong> {customer.joined}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  customer.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {customer.status}
              </span>
            </p>
            <p><strong>Nationality:</strong> {customer.nationality}</p>
            <p><strong>State:</strong> {customer.state}</p>
            <p><strong>Address:</strong> {customer.personalAddress}</p>
          </div>
        </div>
        {/* KYC & KYB INFO */}
        <div className="w-full md:w-[480px] lg:w-[600px] bg-white rounded-2xl shadow-lg p-10 border min-h-[340px] md:min-h-[420px] lg:min-h-[500px] flex flex-col">
          <h3 className="text-lg font-semibold mb-6 text-gray-900">KYC & KYB Information</h3>
          {!customer.kyc ? (
            <div className="flex-1 flex flex-col justify-center items-center text-gray-600 text-base">
              <span className="mb-4 font-medium">No KYC/KYB data</span>
              <button
                className="px-5 py-3 bg-[#0f172a] text-white rounded-lg font-semibold hover:bg-[#020617] text-base"
                onClick={() => setShowKycModal(true)}
              >
                Add KYC/KYB
              </button>
            </div>
          ) : (
            <div className="space-y-6 flex-1 flex flex-col justify-between text-gray-800">
              {/* KYC Section */}
              <div>
                <h4 className="font-semibold text-base mb-2 text-gray-900">KYC</h4>
                <p><strong>ID Type:</strong> {customer.idCardType || "Not provided"}</p>
                {customer.idCardFile && customer.idCardFile instanceof File && (
                  <>
                    {customer.idCardFile.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(customer.idCardFile)}
                        className="w-full h-40 object-contain rounded border mb-2"
                      />
                    ) : (
                      <a
                        href={URL.createObjectURL(customer.idCardFile)}
                        target="_blank"
                        className="text-blue-700 underline"
                      >
                        View ID File
                      </a>
                    )}
                  </>
                )}
                <p><strong>Customer Address:</strong> {customer.personalAddress}</p>
              </div>
              <hr className="my-2 border-gray-200" />
              {/* KYB Section */}
              <div>
                <h4 className="font-semibold text-base mb-2 text-gray-900">KYB</h4>
                <p><strong>Business Name:</strong> {customer.businessName}</p>
                <p><strong>Business Address:</strong> {customer.businessAddress}</p>
                <p><strong>Business Size:</strong> {customer.numberOfEmployees}</p>
                <p><strong>Farm Size:</strong> {customer.farmSize}</p>
                <p><strong>Business Contact:</strong> {customer.businessContact}</p>
                <p><strong>Date Started:</strong> {customer.dateStarted}</p>
                {/* CAC Document */}
                {customer.cacFile && customer.cacFile instanceof File && (
                  <div className="mb-2">
                    <a
                      href={URL.createObjectURL(customer.cacFile)}
                      target="_blank"
                      className="text-blue-700 underline"
                    >
                      View CAC Document
                    </a>
                  </div>
                )}
                {/* Business Photos */}
                {customer.businessPhotos && customer.businessPhotos.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {customer.businessPhotos.map((photo, idx) =>
                      photo && photo instanceof File ? (
                        <img
                          key={idx}
                          src={URL.createObjectURL(photo)}
                          className="h-24 w-full object-cover rounded border"
                        />
                      ) : null
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* MODAL */}
      {showKycModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-2xl relative">
            <button
              onClick={() => setShowKycModal(false)}
              className="absolute right-6 top-4 text-2xl text-[#0f172a] hover:text-[#020617]"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold mb-6">KYC & KYB Form</h3>
            <form className="space-y-8 max-h-[70vh] overflow-y-auto">
              {/* KYC Section */}
              <fieldset className="border rounded-xl p-6 shadow-sm mb-6">
                <legend className="px-2 text-lg font-bold text-[#0f172a]">KYC (Customer)</legend>
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">ID Card Type</label>
                    <select className="w-full border p-2 rounded-lg">
                      <option>Select ID Type</option>
                      <option>NIN</option>
                      <option>International Passport</option>
                      <option>Driver's License</option>
                      <option>Voter's Card</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">ID Card File</label>
                    <input type="file" className="w-full border p-2 rounded-lg" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Customer Address</label>
                    <input type="text" className="w-full border p-2 rounded-lg" />
                  </div>
                </div>
              </fieldset>
              {/* KYB Section */}
              <fieldset className="border rounded-xl p-6 shadow-sm mb-6">
                <legend className="px-2 text-lg font-bold text-[#0f172a]">KYB (Business)</legend>
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Business Name</label>
                    <input type="text" className="w-full border p-2 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Business Address</label>
                    <input type="text" className="w-full border p-2 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Business Size (Employees)</label>
                    <input type="number" className="w-full border p-2 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Farm Size</label>
                    <input type="text" className="w-full border p-2 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Business Contact</label>
                    <input type="text" className="w-full border p-2 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Date Started</label>
                    <input type="date" className="w-full border p-2 rounded-lg" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">CAC Document (Optional)</label>
                    <input type="file" className="w-full border p-2 rounded-lg" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Business Pictures <span className='text-xs text-gray-500'>(2-3 images)</span></label>
                    <input type="file" multiple accept="image/*" className="w-full border p-2 rounded-lg" />
                  </div>
                </div>
              </fieldset>
              <div className="flex justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowKycModal(false)}
                  className="px-6 py-2 rounded-lg border bg-[#0f172a] text-white hover:bg-[#020617]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2 rounded-lg bg-[#0f172a] text-white hover:bg-[#020617]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
