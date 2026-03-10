"use client";

import { useEffect, useState } from "react";
import type { DemoRequest } from "@/lib/supabase";

export default function DemoRequestsAdmin() {
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/demo-requests");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setRequests(data || []);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError("Failed to load demo requests. Ensure SUPABASE_SERVICE_ROLE_KEY is set in .env.local");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main>
        <div className="container mx-auto px-6 py-12 max-w-6xl">
          <p className="text-gray-500">Loading...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="container mx-auto px-6 py-12 max-w-6xl">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Demo Requests</h1>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No demo requests yet
                  </td>
                </tr>
              ) : (
                requests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.name || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.company || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.created_at
                        ? new Date(request.created_at).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {request.status || "pending"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
