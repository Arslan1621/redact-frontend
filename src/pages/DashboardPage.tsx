import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Dashboard Page
        </h1>
        <p className="text-lg text-gray-600">
          Welcome to your dashboard! This page is working correctly.
        </p>
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Test Dashboard</h2>
          <p className="text-gray-600">
            If you can see this, the routing is working properly.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-900">Documents</h3>
              <p className="text-blue-600">12 processed</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-900">Redactions</h3>
              <p className="text-green-600">3/5 used</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-bold text-purple-900">Time Saved</h3>
              <p className="text-purple-600">24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
