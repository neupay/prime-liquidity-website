"use client";

import { useState } from "react";
import {
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineCash,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXCircle,
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
  HiOutlineArrowRight,
  HiOutlineEye,
  HiOutlineUserGroup,
} from "react-icons/hi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for charts
const weeklyData = [
  { name: "Mon", applications: 4, approvals: 2 },
  { name: "Tue", applications: 6, approvals: 3 },
  { name: "Wed", applications: 8, approvals: 5 },
  { name: "Thu", applications: 5, approvals: 4 },
  { name: "Fri", applications: 7, approvals: 4 },
  { name: "Sat", applications: 3, approvals: 2 },
  { name: "Sun", applications: 2, approvals: 1 },
];

const statusData = [
  { name: "Pending", value: 18, color: "#FBBF24" },
  { name: "Approved", value: 24, color: "#34D399" },
  { name: "Rejected", value: 6, color: "#F87171" },
];

const recentApplications = [
  { id: "APP-001", name: "John Doe", business: "Doe Farms", amount: "₦500,000", status: "Pending", date: "2024-02-01" },
  { id: "APP-002", name: "Jane Smith", business: "Smith Agro", amount: "₦750,000", status: "Approved", date: "2024-01-28" },
  { id: "APP-003", name: "Samuel Lee", business: "Lee Trading", amount: "₦300,000", status: "Rejected", date: "2024-01-25" },
  { id: "APP-004", name: "Michael Brown", business: "Brown Ent", amount: "₦1,200,000", status: "Pending", date: "2024-02-02" },
];

const performanceMetrics = [
  { label: "Conversion Rate", value: "68%", trend: "+12%", positive: true },
  { label: "Avg. Processing Time", value: "2.4 days", trend: "-0.8 days", positive: true },
  { label: "Customer Satisfaction", value: "4.8/5", trend: "+0.3", positive: true },
];

export default function AgentOverviewPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "Approved":
        return <HiOutlineCheckCircle className="text-green-600" size={16} />;
      case "Rejected":
        return <HiOutlineXCircle className="text-red-600" size={16} />;
      default:
        return <HiOutlineClock className="text-yellow-600" size={16} />;
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header with Welcome and Date */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Elijah 👋</h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your portfolio today.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="mt-2 text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"
          >
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="quarter">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Active Customers</p>
              <h3 className="text-3xl font-bold mt-2 text-gray-900">124</h3>
              <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                <HiOutlineTrendingUp /> +12 this month
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <HiOutlineUsers className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Pending Applications</p>
              <h3 className="text-3xl font-bold mt-2 text-gray-900">18</h3>
              <p className="text-sm text-yellow-600 mt-2 flex items-center gap-1">
                <HiOutlineClock /> 5 awaiting review
              </p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <HiOutlineDocumentText className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Disbursed</p>
              <h3 className="text-3xl font-bold mt-2 text-gray-900">₦18.5M</h3>
              <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                <HiOutlineTrendingUp /> +₦2.3M this week
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <HiOutlineCash className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Active Loans</p>
              <h3 className="text-3xl font-bold mt-2 text-gray-900">86</h3>
              <p className="text-sm text-blue-600 mt-2 flex items-center gap-1">
                <HiOutlineUserGroup /> 42 paying on time
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <HiOutlineTrendingUp className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Application Activity</h3>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-gray-600">Applications</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-gray-600">Approvals</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="applications" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.1} />
                <Area type="monotone" dataKey="approvals" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {statusData.map((item) => (
              <div key={item.name} className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs text-gray-600">{item.name}</span>
                </div>
                <p className="text-sm font-semibold text-gray-900 mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">{metric.label}</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
              <span className={`text-sm flex items-center gap-1 ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                {metric.positive ? <HiOutlineTrendingUp /> : <HiOutlineTrendingDown />}
                {metric.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Applications Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
            <p className="text-sm text-gray-500 mt-1">Latest applications requiring attention</p>
          </div>
          <button 
            onClick={() => router.push("/dashboard/agent/applications")}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
          >
            View All <HiOutlineArrowRight />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{app.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{app.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{app.business}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{app.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{app.date}</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                      {getStatusIcon(app.status)}
                      {app.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm">
                      <HiOutlineEye size={16} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition flex items-center justify-between group">
          <span className="font-medium text-gray-700">New Application</span>
          <span className="text-blue-600 group-hover:translate-x-1 transition">→</span>
        </button>
        <button className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition flex items-center justify-between group">
          <span className="font-medium text-gray-700">Add Customer</span>
          <span className="text-blue-600 group-hover:translate-x-1 transition">→</span>
        </button>
        <button className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition flex items-center justify-between group">
          <span className="font-medium text-gray-700">Generate Report</span>
          <span className="text-blue-600 group-hover:translate-x-1 transition">→</span>
        </button>
        <button className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition flex items-center justify-between group">
          <span className="font-medium text-gray-700">View Schedule</span>
          <span className="text-blue-600 group-hover:translate-x-1 transition">→</span>
        </button>
      </div>
    </div>
  );
}