"use client";

import { useState } from "react";
import {
  HiOutlineUser,
  HiOutlineBell,
  HiOutlineShieldCheck,
  HiOutlineCreditCard,
  HiOutlineGlobe,
  HiOutlineDeviceMobile,
  HiOutlineKey,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineCamera,
  HiOutlineSave,
  HiOutlineRefresh,
  HiOutlineTrash,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlinePencil,
  HiOutlineLogout,
} from "react-icons/hi";

type NotificationSetting = {
  id: string;
  label: string;
  email: boolean;
  push: boolean;
  sms: boolean;
};

type SecurityLog = {
  id: number;
  action: string;
  device: string;
  location: string;
  ip: string;
  timestamp: string;
  status: 'success' | 'failed';
};

export default function AgentSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Profile State
  const [profile, setProfile] = useState({
    firstName: "Elijah",
    lastName: "Johnson",
    email: "elijah.johnson@primeliquidity.com",
    phone: "+234 801 234 5678",
    alternatePhone: "",
    dateOfBirth: "1985-06-15",
    gender: "male",
    address: "42 Marina Street, Lagos Island",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    postalCode: "101234",
    bio: "Senior Loan Agent with 5+ years of experience in agricultural financing.",
    profileImage: null,
  });

  // Notification Settings
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    { id: "new-app", label: "New Applications", email: true, push: true, sms: false },
    { id: "app-updates", label: "Application Updates", email: true, push: true, sms: true },
    { id: "customer-messages", label: "Customer Messages", email: true, push: true, sms: false },
    { id: "disbursements", label: "Disbursements", email: true, push: true, sms: true },
    { id: "repayments", label: "Repayments", email: true, push: true, sms: false },
    { id: "system-alerts", label: "System Alerts", email: true, push: true, sms: false },
    { id: "marketing", label: "Marketing & Promotions", email: false, push: false, sms: false },
  ]);

  // Security Logs
  const [securityLogs] = useState<SecurityLog[]>([
    { id: 1, action: "Login", device: "Chrome / Windows", location: "Lagos, Nigeria", ip: "197.210.84.123", timestamp: "2024-02-01 09:30 AM", status: "success" },
    { id: 2, action: "Login", device: "Safari / iPhone", location: "Lagos, Nigeria", ip: "197.210.85.456", timestamp: "2024-01-31 06:15 PM", status: "success" },
    { id: 3, action: "Password Change", device: "Firefox / Windows", location: "Abuja, Nigeria", ip: "197.220.12.78", timestamp: "2024-01-30 11:20 AM", status: "success" },
    { id: 4, action: "Failed Login", device: "Chrome / MacOS", location: "Unknown", ip: "45.123.67.89", timestamp: "2024-01-29 03:45 AM", status: "failed" },
    { id: 5, action: "Profile Update", device: "Edge / Windows", location: "Lagos, Nigeria", ip: "197.210.84.123", timestamp: "2024-01-28 02:30 PM", status: "success" },
  ]);

  // Security Settings
  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    sessionTimeout: "30",
    loginAlerts: true,
    deviceManagement: true,
  });

  // Password Change
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // Bank Account
  const [bankAccount, setBankAccount] = useState({
    accountName: "Elijah Johnson",
    accountNumber: "0123456789",
    bankName: "First Bank of Nigeria",
    bvn: "***********",
    taxId: "",
  });

  const handleNotificationChange = (id: string, type: 'email' | 'push' | 'sms') => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, [type]: !notif[type] } : notif
      )
    );
  };

  const handleSaveProfile = () => {
    console.log("Saving profile:", profile);
    setIsEditing(false);
    // Show success message
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      alert("Passwords don't match");
      return;
    }
    console.log("Changing password");
    setPasswordData({ current: "", new: "", confirm: "" });
  };

  const tabs = [
    { id: "profile", name: "Profile", icon: HiOutlineUser },
    { id: "notifications", name: "Notifications", icon: HiOutlineBell },
    { id: "security", name: "Security", icon: HiOutlineShieldCheck },
    { id: "payments", name: "Payment Details", icon: HiOutlineCreditCard },
    { id: "preferences", name: "Preferences", icon: HiOutlineGlobe },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account preferences and security settings</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex gap-8 overflow-x-auto pb-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-1 py-3 font-medium border-b-2 transition
                  ${activeTab === tab.id
                    ? 'border-blue-900 text-blue-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <Icon size={20} />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h3>
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center text-3xl font-bold text-white uppercase">
                  {profile.firstName[0]}{profile.lastName[0]}
                </div>
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md border border-gray-200 hover:bg-gray-50 transition">
                  <HiOutlineCamera size={18} className="text-gray-600" />
                </button>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Upload a profile picture</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition text-sm font-medium">
                    Upload New
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                <p className="text-sm text-gray-500 mt-1">Update your personal details</p>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 text-blue-900 hover:bg-blue-50 rounded-lg transition text-sm font-medium"
                >
                  <HiOutlinePencil size={18} />
                  Edit Profile
                </button>
              )}
            </div>

            <div className="p-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Phone</label>
                      <input
                        type="tel"
                        value={profile.alternatePhone}
                        onChange={(e) => setProfile({ ...profile, alternatePhone: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select
                        value={profile.gender}
                        onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        value={profile.city}
                        onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        value={profile.state}
                        onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                      <input
                        type="text"
                        value={profile.postalCode}
                        onChange={(e) => setProfile({ ...profile, postalCode: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2 px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition font-medium"
                    >
                      <HiOutlineSave size={18} />
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Full Name</p>
                    <p className="text-gray-900 font-medium">{profile.firstName} {profile.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email Address</p>
                    <p className="text-gray-900">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                    <p className="text-gray-900">{profile.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                    <p className="text-gray-900">{profile.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Gender</p>
                    <p className="text-gray-900 capitalize">{profile.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Address</p>
                    <p className="text-gray-900">{profile.address}, {profile.city}, {profile.state} {profile.postalCode}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500 mb-1">Bio</p>
                    <p className="text-gray-900">{profile.bio}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
            <p className="text-sm text-gray-500 mt-1">Choose how you want to receive notifications</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Notification Type</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Push</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">SMS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {notifications.map((notif) => (
                  <tr key={notif.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{notif.label}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleNotificationChange(notif.id, 'email')}
                        className={`w-6 h-6 rounded border flex items-center justify-center mx-auto transition
                          ${notif.email ? 'bg-blue-900 border-blue-900 text-white' : 'border-gray-300 hover:border-gray-400'}`}
                      >
                        {notif.email && <HiOutlineCheck size={14} />}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleNotificationChange(notif.id, 'push')}
                        className={`w-6 h-6 rounded border flex items-center justify-center mx-auto transition
                          ${notif.push ? 'bg-blue-900 border-blue-900 text-white' : 'border-gray-300 hover:border-gray-400'}`}
                      >
                        {notif.push && <HiOutlineCheck size={14} />}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleNotificationChange(notif.id, 'sms')}
                        className={`w-6 h-6 rounded border flex items-center justify-center mx-auto transition
                          ${notif.sms ? 'bg-blue-900 border-blue-900 text-white' : 'border-gray-300 hover:border-gray-400'}`}
                      >
                        {notif.sms && <HiOutlineCheck size={14} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <button className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition font-medium">
              Save Notification Preferences
            </button>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="space-y-6">
          {/* Two-Factor Authentication */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account</p>
              </div>
              <button
                onClick={() => setShow2FA(!show2FA)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  security.twoFactorEnabled ? 'bg-blue-900' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    security.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            {show2FA && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900 mb-3">Scan the QR code with your authenticator app</p>
                <div className="flex gap-4 items-center">
                  <div className="w-32 h-32 bg-white p-2 rounded-lg border border-blue-200">
                    {/* Placeholder for QR code */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-900 to-blue-700 rounded"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Setup Key:</p>
                    <code className="text-sm bg-white px-3 py-2 rounded border border-blue-200">ABCD EFGH IJKL MNOP</code>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
            <form onSubmit={handlePasswordChange} className="max-w-md space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input
                  type="password"
                  value={passwordData.current}
                  onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={passwordData.new}
                  onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordData.confirm}
                  onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition font-medium"
              >
                Update Password
              </button>
            </form>
          </div>

          {/* Security Logs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Security Activity</h3>
              <p className="text-sm text-gray-500 mt-1">Last 5 security events</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Device</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">IP Address</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Timestamp</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {securityLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-900">{log.action}</td>
                      <td className="px-6 py-4 text-gray-600">{log.device}</td>
                      <td className="px-6 py-4 text-gray-600">{log.location}</td>
                      <td className="px-6 py-4 text-gray-600">{log.ip}</td>
                      <td className="px-6 py-4 text-gray-600">{log.timestamp}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          log.status === 'success' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Session Management */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Management</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Current Session</p>
                  <p className="text-sm text-gray-500">Chrome on Windows • Started 2 hours ago</p>
                </div>
                <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                  Logout
                </button>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Session Timeout</span>
                  <select
                    value={security.sessionTimeout}
                    onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Details Tab */}
      {activeTab === "payments" && (
        <div className="space-y-6">
          {/* Bank Account */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Bank Account Details</h3>
              <p className="text-sm text-gray-500 mt-1">Where your commissions will be paid</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Account Name</p>
                  <p className="text-gray-900 font-medium">{bankAccount.accountName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Account Number</p>
                  <p className="text-gray-900 font-medium">{bankAccount.accountNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Bank Name</p>
                  <p className="text-gray-900">{bankAccount.bankName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">BVN</p>
                  <p className="text-gray-900">{bankAccount.bvn}</p>
                </div>
              </div>
              <button className="mt-4 px-4 py-2 text-blue-900 hover:bg-blue-50 rounded-lg transition text-sm font-medium">
                Update Bank Details
              </button>
            </div>
          </div>

          {/* Commission History */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Commission History</h3>
              <p className="text-sm text-gray-500 mt-1">Last 5 transactions</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Application ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Loan Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Commission</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-gray-600">2024-02-01</td>
                    <td className="px-6 py-4 text-gray-900 font-medium">APP-001</td>
                    <td className="px-6 py-4 text-gray-600">John Doe</td>
                    <td className="px-6 py-4 text-gray-900">₦500,000</td>
                    <td className="px-6 py-4 text-green-600 font-medium">₦12,500</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Paid</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-600">2024-01-28</td>
                    <td className="px-6 py-4 text-gray-900 font-medium">APP-002</td>
                    <td className="px-6 py-4 text-gray-600">Jane Smith</td>
                    <td className="px-6 py-4 text-gray-900">₦750,000</td>
                    <td className="px-6 py-4 text-green-600 font-medium">₦18,750</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Paid</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-600">2024-01-25</td>
                    <td className="px-6 py-4 text-gray-900 font-medium">APP-003</td>
                    <td className="px-6 py-4 text-gray-600">Samuel Lee</td>
                    <td className="px-6 py-4 text-gray-900">₦300,000</td>
                    <td className="px-6 py-4 text-yellow-600 font-medium">₦7,500</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Pending</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === "preferences" && (
        <div className="space-y-6">
          {/* Language & Region */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Language & Region</h3>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:outline-none">
                  <option>English (Nigeria)</option>
                  <option>English (UK)</option>
                  <option>English (US)</option>
                  <option>French</option>
                  <option>Hausa</option>
                  <option>Yoruba</option>
                  <option>Igbo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:outline-none">
                  <option>West Africa Time (UTC+1)</option>
                  <option>Greenwich Mean Time (UTC+0)</option>
                  <option>Central European Time (UTC+1)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:outline-none">
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:outline-none">
                  <option>Nigerian Naira (₦)</option>
                  <option>US Dollar ($)</option>
                  <option>Euro (€)</option>
                  <option>British Pound (£)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Display Settings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Display Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-gray-700">Compact Mode</span>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                  <span className="inline-block h-4 w-4 transform translate-x-1 rounded-full bg-white" />
                </button>
              </label>
              <label className="flex items-center justify-between">
                <span className="text-gray-700">Dark Mode</span>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                  <span className="inline-block h-4 w-4 transform translate-x-1 rounded-full bg-white" />
                </button>
              </label>
              <label className="flex items-center justify-between">
                <span className="text-gray-700">Show Animations</span>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-900">
                  <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white" />
                </button>
              </label>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Rows Per Page</label>
                <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:outline-none">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data & Privacy */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Data & Privacy</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-700 mb-2">Download your data</p>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium flex items-center gap-2">
                  <HiOutlineRefresh size={18} />
                  Request Data Export
                </button>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-red-600 mb-2">Danger Zone</p>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium flex items-center gap-2"
                >
                  <HiOutlineTrash size={18} />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Delete Account</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log("Account deleted");
                  setShowDeleteConfirm(false);
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}