"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineUpload, HiOutlineX } from "react-icons/hi";

export default function NewApplicationPage() {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [businessImages, setBusinessImages] = useState<File[]>([]);
  const [amountRequested, setAmountRequested] = useState("");
  const [product, setProduct] = useState("");
  const [applicationForm, setApplicationForm] = useState<File | null>(null);
  const [personImage, setPersonImage] = useState<File | null>(null);
  const [formNumber, setFormNumber] = useState("");

  const handleBusinessImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setBusinessImages(prev => [...prev, ...files].slice(0, 3)); // Max 3 images
    }
  };

  const removeBusinessImage = (index: number) => {
    setBusinessImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      industry: selectedIndustry,
      sector: selectedSector,
      businessImages,
      amountRequested,
      product,
      applicationForm,
      personImage,
      formNumber,
    });
    // Redirect after submission
    router.push("/dashboard/agent/applications");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">New Application</h2>
        <p className="text-gray-600 mt-2">Fill in the application details below</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        {/* Industry Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Industry Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Industry <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
                required
              >
                <option value="">Select Industry</option>
                <option value="agriculture">Agriculture & Livestock</option>
              </select>
            </div>

            {selectedIndustry === "agriculture" && (
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Sector <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  required
                >
                  <option value="">Select Sector</option>
                  <option value="poultry">Poultry</option>
                  <option value="cattle">Cattle</option>
                  <option value="crops">Crops</option>
                  <option value="mixed">Mixed Farming</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Business Images */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Business Images</h3>
          
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Business Images (Farm pictures, up to 3)
            </label>
            <div className="flex flex-wrap gap-4 mb-3">
              {businessImages.map((image, index) => (
                <div key={index} className="relative w-24 h-24 border border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Business ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeBusinessImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <HiOutlineX size={14} />
                  </button>
                </div>
              ))}
              
              {businessImages.length < 3 && (
                <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-900 transition">
                  <HiOutlineUpload className="text-gray-400 mb-1" size={20} />
                  <span className="text-xs text-gray-500">Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBusinessImages}
                    className="hidden"
                    multiple
                  />
                </label>
              )}
            </div>
            <p className="text-sm text-gray-500">
              Upload up to 3 images (JPEG, PNG)
            </p>
          </div>
        </div>

        {/* Application Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Application Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Amount Requested (₦) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={amountRequested}
                onChange={(e) => setAmountRequested(e.target.value)}
                placeholder="e.g., 500000"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Product <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="e.g., 50 bags of feeds"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Form Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formNumber}
                onChange={(e) => setFormNumber(e.target.value)}
                placeholder="e.g., FRM-2024-001"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
                required
              />
            </div>
          </div>
        </div>

        {/* Document Uploads */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Document Uploads</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Picture of Applicant <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-900 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPersonImage(e.target.files?.[0] || null)}
                  className="hidden"
                  id="person-image"
                  required
                />
                <label htmlFor="person-image" className="cursor-pointer">
                  <HiOutlineUpload className="mx-auto text-gray-400 mb-2" size={24} />
                  <span className="text-sm text-gray-600">
                    {personImage ? personImage.name : "Click to upload photo"}
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Physical Application Form <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-900 transition">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setApplicationForm(e.target.files?.[0] || null)}
                  className="hidden"
                  id="application-form"
                  required
                />
                <label htmlFor="application-form" className="cursor-pointer">
                  <HiOutlineUpload className="mx-auto text-gray-400 mb-2" size={24} />
                  <span className="text-sm text-gray-600">
                    {applicationForm ? applicationForm.name : "Click to upload form"}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition font-medium text-lg"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}