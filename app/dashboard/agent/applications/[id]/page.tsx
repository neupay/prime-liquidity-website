"use client";

import { useRouter } from "next/navigation";
import { HiOutlineArrowLeft, HiOutlineDownload } from "react-icons/hi";

// This would typically come from an API/database based on the ID
const mockApplication = {
  id: "APP-001",
  formNumber: "FRM-2024-001",
  applicantName: "John Doe",
  businessName: "Doe Farms",
  industry: "Agriculture & Livestock",
  sector: "Poultry",
  amountRequested: "500,000",
  product: "50 bags of poultry feed",
  dateSubmitted: "2024-02-01",
  status: "Pending",
  businessImages: [
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
  ],
  applicantImage: "https://via.placeholder.com/150",
  applicationForm: "application_form_001.pdf",
  contactInfo: {
    phone: "+234 801 234 5678",
    email: "john.doe@example.com",
    address: "123 Farm Road, Lagos State"
  }
};

export default function ApplicationDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  // In a real app, you'd fetch the application data using params.id
  const application = mockApplication;

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <HiOutlineArrowLeft size={24} className="text-gray-600" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Application Details</h2>
          <p className="text-gray-600 mt-1">ID: {application.id}</p>
        </div>
        <div className="ml-auto">
          <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(application.status)}`}>
            {application.status}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Applicant Info Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Applicant Information</h3>
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Applicant Photo */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={application.applicantImage}
                    alt={application.applicantName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Applicant Details */}
              <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Full Name</p>
                  <p className="text-gray-900 font-medium">{application.applicantName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Business Name</p>
                  <p className="text-gray-900 font-medium">{application.businessName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                  <p className="text-gray-900">{application.contactInfo.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-gray-900">{application.contactInfo.email}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Business Address</p>
                  <p className="text-gray-900">{application.contactInfo.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Details Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Application Details</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Form Number</p>
                <p className="text-gray-900 font-medium">{application.formNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Industry</p>
                <p className="text-gray-900">{application.industry}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Sector</p>
                <p className="text-gray-900">{application.sector}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Amount Requested</p>
                <p className="text-gray-900 font-medium">₦{application.amountRequested}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Product/Items</p>
                <p className="text-gray-900">{application.product}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Date Submitted</p>
                <p className="text-gray-900">{application.dateSubmitted}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Business Images Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Business Images</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {application.businessImages.map((image, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={image}
                      alt={`Business ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition">
                    <HiOutlineDownload size={16} className="text-gray-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Documents Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Documents</h3>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <HiOutlineDownload className="text-blue-900" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Physical Application Form</p>
                  <p className="text-sm text-gray-500">{application.applicationForm}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition text-sm font-medium">
                Download
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={() => router.push(`/dashboard/agent/applications/${params.id}/edit`)}
            className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition font-medium"
          >
            Edit Application
          </button>
          <button
            onClick={() => {
              // Handle approve/reject logic
              console.log("Process application");
            }}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
          >
            Process Application
          </button>
          <button
            onClick={() => router.push("/dashboard/agent/applications")}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium ml-auto"
          >
            Back to Applications
          </button>
        </div>
      </div>
    </div>
  );
}