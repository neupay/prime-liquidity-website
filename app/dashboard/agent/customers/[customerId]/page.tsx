"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: "active" | "inactive" | "pending";
  phone: string;
  password?: string;
  // KYC Information
  nationality: string;
  stateOfOrigin: string;
  residentialAddress: string;
  idCardType: "nin" | "passport" | "drivers_license" | "voters_card";
  idCardNumber: string;
  idCardFile?: File | null;
  
  // KYB Information
  businessName: string;
  businessAddress: string;
  businessEmail: string;
  businessPhone: string;
  businessType: "sole_proprietorship" | "partnership" | "limited_liability" | "cooperative";
  registrationNumber: string;
  dateEstablished: string;
  numberOfEmployees: number;
  farmSize: string; // in hectares
  farmLocation: string;
  cropTypes: string[];
  businessPhotos: File[];
  cacDocument?: File | null;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
};

// Initial empty state for new customer
const initialCustomerState: Omit<Customer, "id" | "createdAt" | "updatedAt"> = {
  firstName: "",
  lastName: "",
  email: "",
  status: "pending",
  phone: "",
  password: "",
  nationality: "",
  stateOfOrigin: "",
  residentialAddress: "",
  idCardType: "nin",
  idCardNumber: "",
  idCardFile: null,
  businessName: "",
  businessAddress: "",
  businessEmail: "",
  businessPhone: "",
  businessType: "sole_proprietorship",
  registrationNumber: "",
  dateEstablished: "",
  numberOfEmployees: 0,
  farmSize: "",
  farmLocation: "",
  cropTypes: [],
  businessPhotos: [],
  cacDocument: null,
};

export default function CustomerFormPage() {
  const params = useParams();
  const router = useRouter();
  const customerId = params?.customerId ? Number(params.customerId) : null;
  const isEditMode = !!customerId;

  const [formData, setFormData] = useState<Omit<Customer, "id" | "createdAt" | "updatedAt">>(initialCustomerState);
  const [activeTab, setActiveTab] = useState<"personal" | "kyc" | "kyb">("personal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditMode) {
      // Fetch customer data for editing
      // This would be an API call in production
      const fetchCustomer = async () => {
        try {
          // Mock API call
          // const response = await fetch(`/api/customers/${customerId}`);
          // const data = await response.json();
          // setFormData(data);
        } catch (error) {
          console.error("Error fetching customer:", error);
        }
      };
      fetchCustomer();
    }
  }, [customerId, isEditMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: fieldName === "businessPhotos" ? Array.from(files) : files[0]
      }));
    }
  };

  const handleCropTypesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const crops = e.target.value.split(",").map(crop => crop.trim());
    setFormData(prev => ({ ...prev, cropTypes: crops }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Personal Info validation
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    
    // KYC validation
    if (!formData.nationality) newErrors.nationality = "Nationality is required";
    if (!formData.stateOfOrigin) newErrors.stateOfOrigin = "State of origin is required";
    if (!formData.residentialAddress) newErrors.residentialAddress = "Residential address is required";
    if (!formData.idCardNumber) newErrors.idCardNumber = "ID card number is required";
    
    // KYB validation
    if (!formData.businessName) newErrors.businessName = "Business name is required";
    if (!formData.businessAddress) newErrors.businessAddress = "Business address is required";
    if (!formData.businessEmail) newErrors.businessEmail = "Business email is required";
    if (!formData.businessPhone) newErrors.businessPhone = "Business phone is required";
    if (!formData.farmSize) newErrors.farmSize = "Farm size is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Switch to first tab with errors
      if (errors.firstName || errors.lastName || errors.email || errors.phone) {
        setActiveTab("personal");
      } else if (errors.nationality || errors.idCardNumber) {
        setActiveTab("kyc");
      } else {
        setActiveTab("kyb");
      }
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Form submitted:", formData);
      // In production: await fetch('/api/customers', { method: 'POST', body: JSON.stringify(formData) })
      
      // Show success message and redirect
      alert(isEditMode ? "Customer updated successfully!" : "Customer added successfully!");
      router.push("/customers");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const TabButton = ({ tab, label }: { tab: typeof activeTab; label: string }) => (
    <button
      type="button"
      onClick={() => setActiveTab(tab)}
      className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-colors ${
        activeTab === tab
          ? "bg-white text-[#0f172a] border-t-2 border-x-2 border-gray-200 -mb-px"
          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="text-[#0f172a] hover:underline font-semibold flex items-center gap-2 mb-4"
          >
            ← Back to Customers
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? "Edit Customer" : "Add New Customer"}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEditMode 
              ? "Update customer information and KYC/KYB details"
              : "Fill in the customer details to create a new account"}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="customer-form"
            disabled={isSubmitting}
            className="px-8 py-2.5 bg-[#0f172a] text-white rounded-lg hover:bg-[#020617] font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin">⏳</span>
                {isEditMode ? "Updating..." : "Saving..."}
              </>
            ) : (
              <>{isEditMode ? "Update Customer" : "Save Customer"}</>
            )}
          </button>
        </div>
      </div>

      {/* Main Form */}
      <form id="customer-form" onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          <TabButton tab="personal" label="Personal Information" />
          <TabButton tab="kyc" label="KYC Verification" />
          <TabButton tab="kyb" label="Business Information (KYB)" />
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {/* Personal Information Tab */}
          {activeTab === "personal" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#0f172a] focus:border-transparent ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#0f172a] ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#0f172a] ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="customer@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#0f172a] ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="+234 XXX XXX XXXX"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                {!isEditMode && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Temporary Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#0f172a]"
                      placeholder="Leave blank to auto-generate"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#0f172a]"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* KYC Tab */}
          {activeTab === "kyc" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nationality <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#0f172a] ${
                      errors.nationality ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="e.g., Nigerian"
                  />
                  {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State of Origin <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="stateOfOrigin"
                    value={formData.stateOfOrigin}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#0f172a] ${
                      errors.stateOfOrigin ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="e.g., Lagos"
                  />
                  {errors.stateOfOrigin && <p className="text-red-500 text-sm mt-1">{errors.stateOfOrigin}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Residential Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="residentialAddress"
                    value={formData.residentialAddress}
                    onChange={handleInputChange}
                    rows={2}
                    className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#0f172a] ${
                      errors.residentialAddress ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Full residential address"
                  />
                  {errors.residentialAddress && <p className="text-red-500 text-sm mt-1">{errors.residentialAddress}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID Card Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="idCardType"
                    value={formData.idCardType}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#0f172a]"
                  >
                    <option value="nin">National Identification Number (NIN)</option>
                    <option value="passport">International Passport</option>
                    <option value="drivers_license">Driver's License</option>
                    <option value="voters_card">Voter's Card</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID Card Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="idCardNumber"
                    value={formData.idCardNumber}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#0f172a] ${
                      errors.idCardNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter ID number"
                  />
                  {errors.idCardNumber && <p className="text-red-500 text-sm mt-1">{errors.idCardNumber}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload ID Card (Front & Back)
                  </label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, "idCardFile")}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#0f172a]"
                  />
                  <p className="text-xs text-gray-500 mt-1">Accepted formats: JPG, PNG, PDF (Max 5MB)</p>
                </div>
              </div>
            </div>
          )}

          {/* KYB Tab */}
          {activeTab === "kyb" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#0f172a] ${
                      errors.businessName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Registered business name"
                  />
                  {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="businessEmail"
                    value={formData.businessEmail}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#0f172a] ${
                      errors.businessEmail ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="business@company.com"
                  />
                  {errors.businessEmail && <p className="text-red-500 text-sm mt-1">{errors.businessEmail}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="businessPhone"
                    value={formData.businessPhone}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#0f172a] ${
                      errors.businessPhone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Business contact number"
                  />
                  {errors.businessPhone && <p className="text-red-500 text-sm mt-1">{errors.businessPhone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Type
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#0f172a]"
                  >
                    <option value="sole_proprietorship">Sole Proprietorship</option>
                    <option value="partnership">Partnership</option>
                    <option value="limited_liability">Limited Liability Company</option>
                    <option value="cooperative">Cooperative Society</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#0f172a]"
                    placeholder="CAC registration number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Established
                  </label>
                  <input
                    type="date"
                    name="dateEstablished"
                    value={formData.dateEstablished}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#0f172a]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Employees
                  </label>
                  <input
                    type="number"
                    name="numberOfEmployees"
                    value={formData.numberOfEmployees}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#0f172a]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="businessAddress"
                    value={formData.businessAddress}
                    onChange={handleInputChange}
                    rows={2}
                    className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#0f172a] ${
                      errors.businessAddress ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Full business address"
                  />
                  {errors.businessAddress && <p className="text-red-500 text-sm mt-1">{errors.businessAddress}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Farm Size (hectares) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="farmSize"
                    value={formData.farmSize}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#0f172a] ${
                      errors.farmSize ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="e.g., 50 hectares"
                  />
                  {errors.farmSize && <p className="text-red-500 text-sm mt-1">{errors.farmSize}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Farm Location
                  </label>
                  <input
                    type="text"
                    name="farmLocation"
                    value={formData.farmLocation}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#0f172a]"
                    placeholder="City, State"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Crop Types (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.cropTypes.join(", ")}
                    onChange={handleCropTypesChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#0f172a]"
                    placeholder="e.g., Maize, Cassava, Rice"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CAC Document (Optional)
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, "cacDocument")}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Photos (2-3 images)
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "businessPhotos")}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload photos of your farm, products, or business premises
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Form Footer */}
        <div className="border-t border-gray-200 px-8 py-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-2.5 bg-[#0f172a] text-white rounded-lg hover:bg-[#020617] font-medium disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : isEditMode ? "Update Customer" : "Save Customer"}
          </button>
        </div>
      </form>
    </div>
  );
}