import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  Crown, 
  Activity, 
  Download,
  Clock,
  Shield,
  ArrowRight,
  Plus,
  TrendingUp
} from 'lucide-react';

// Mock data - in real app this would come from your backend
const mockUserData = {
  currentPlan: 'Free',
  redactionsUsed: 3,
  redactionsLimit: 5,
  documentsProcessed: 12,
  savedHours: 24,
};

const mockRecentDocuments = [
  { name: 'Legal_Contract_2025.pdf', status: 'Completed', date: '2 hours ago', redactions: 15 },
  { name: 'HR_Report_Jan.docx', status: 'Processing', date: '1 day ago', redactions: 8 },
  { name: 'Financial_Statement.xlsx', status: 'Completed', date: '2 days ago', redactions: 22 },
];

const DashboardPage: React.FC = () => {
  const { user } = useUser();
  const [showUpgrade, setShowUpgrade] = useState(false);

  const usagePercentage = (mockUserData.redactionsUsed / mockUserData.redactionsLimit) * 100;
  const isNearLimit = usagePercentage >= 80;

  const handleUpgrade = (planName: string) => {
    // Redirect to PayPal for payment
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=your-paypal-email&item_name=RedactPro ${planName} Plan&amount=${planName === 'Starter' ? '29' : planName === 'Professional' ? '79' : '199'}&currency_code=USD&return=https://yoursite.com/dashboard?upgrade=success`;
    window.open(paypalUrl, '_blank');
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="container-custom py-12">
        {/* Welcome Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName || 'User'}!
          </h1>
          <p className="text-lg text-gray-600">
            Manage your redaction projects and monitor your usage below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Usage Overview */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Usage Overview</h2>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  mockUserData.currentPlan === 'Free' ? 'bg-gray-100 text-gray-700' : 'gradient-bg text-white'
                }`}>
                  {mockUserData.currentPlan} Plan
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-purple-50 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {mockUserData.redactionsUsed}/{mockUserData.redactionsLimit}
                  </div>
                  <div className="text-sm text-gray-600">Redactions Used</div>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {mockUserData.documentsProcessed}
                  </div>
                  <div className="text-sm text-gray-600">Documents Processed</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {mockUserData.savedHours}h
                  </div>
                  <div className="text-sm text-gray-600">Time Saved</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Redaction Usage</span>
                  <span>{Math.round(usagePercentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isNearLimit ? 'bg-red-500' : 'bg-purple-500'
                    }`}
                    style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                  ></div>
                </div>
              </div>

              {isNearLimit && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">
                      You're approaching your redaction limit. Consider upgrading your plan.
                    </span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Recent Documents */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Documents</h2>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {mockRecentDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-8 h-8 text-gray-400" />
                      <div>
                        <h3 className="font-medium text-gray-900">{doc.name}</h3>
                        <p className="text-sm text-gray-600">{doc.date} • {doc.redactions} redactions</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        doc.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {doc.status}
                      </span>
                      {doc.status === 'Completed' && (
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors">
                  <div className="flex items-center space-x-3">
                    <Upload className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-gray-900">Upload Document</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-900">View Analytics</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-xl transition-colors">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900">History</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </motion.div>

            {/* Upgrade Card */}
            {mockUserData.currentPlan === 'Free' && (
              <motion.div
                className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Crown className="w-6 h-6" />
                  <h3 className="text-lg font-bold">Upgrade Your Plan</h3>
                </div>
                <p className="text-purple-100 mb-4">
                  Unlock unlimited redactions and advanced features to supercharge your workflow.
                </p>
                <button 
                  onClick={() => setShowUpgrade(true)}
                  className="w-full bg-white text-purple-600 font-medium py-2 px-4 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  View Plans
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgrade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Plan</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="font-bold text-gray-900">Starter</h3>
                <p className="text-2xl font-bold text-purple-600">$29<span className="text-sm text-gray-600">/month</span></p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• 100 redactions/month</li>
                  <li>• Basic templates</li>
                  <li>• Email support</li>
                </ul>
                <button 
                  onClick={() => handleUpgrade('Starter')}
                  className="w-full mt-4 bg-purple-600 text-white py-2 px-4 rounded-xl hover:bg-purple-700 transition-colors"
                >
                  Choose Starter
                </button>
              </div>
              <div className="border-2 border-purple-500 rounded-xl p-4 bg-purple-50">
                <h3 className="font-bold text-gray-900">Professional</h3>
                <p className="text-2xl font-bold text-purple-600">$79<span className="text-sm text-gray-600">/month</span></p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Unlimited redactions</li>
                  <li>• Advanced templates</li>
                  <li>• Priority support</li>
                  <li>• API access</li>
                </ul>
                <button 
                  onClick={() => handleUpgrade('Professional')}
                  className="w-full mt-4 bg-purple-600 text-white py-2 px-4 rounded-xl hover:bg-purple-700 transition-colors"
                >
                  Choose Professional
                </button>
              </div>
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="font-bold text-gray-900">Enterprise</h3>
                <p className="text-2xl font-bold text-purple-600">$199<span className="text-sm text-gray-600">/month</span></p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Everything in Professional</li>
                  <li>• Custom integrations</li>
                  <li>• Dedicated support</li>
                  <li>• On-premise option</li>
                </ul>
                <button 
                  onClick={() => handleUpgrade('Enterprise')}
                  className="w-full mt-4 bg-purple-600 text-white py-2 px-4 rounded-xl hover:bg-purple-700 transition-colors"
                >
                  Choose Enterprise
                </button>
              </div>
            </div>
            <button 
              onClick={() => setShowUpgrade(false)}
              className="w-full mt-6 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
