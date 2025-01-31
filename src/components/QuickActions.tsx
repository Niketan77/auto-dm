import React from 'react';
import { Play, Pause, RefreshCw, Shield, MessageCircle, Users } from 'lucide-react';

const QuickActions: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Quick Actions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* System Status */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">System Status</h3>
            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">Active</span>
          </div>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">
              <Pause className="h-5 w-5 mr-2" />
              Pause All Responses
            </button>
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <RefreshCw className="h-5 w-5 mr-2" />
              Refresh Connection
            </button>
          </div>
        </div>

        {/* Rate Limits */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Rate Limits</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>DMs Sent Today</span>
                <span>45/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>API Calls</span>
                <span>2,450/5,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '49%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Rules */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Active Rules</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <MessageCircle className="h-5 w-5 text-indigo-600 mr-2" />
                <span className="text-sm font-medium">Auto-Replies</span>
              </div>
              <span className="text-sm font-medium text-indigo-600">12 Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-indigo-600 mr-2" />
                <span className="text-sm font-medium">Blacklist Rules</span>
              </div>
              <span className="text-sm font-medium text-indigo-600">5 Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-indigo-600 mr-2" />
                <span className="text-sm font-medium">User Filters</span>
              </div>
              <span className="text-sm font-medium text-indigo-600">3 Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h3 className="text-lg font-medium mb-4">Recent Activity Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-green-800 text-sm font-medium">Last Hour</div>
            <div className="mt-2 text-2xl font-semibold text-green-900">23</div>
            <div className="text-green-600 text-sm">Successful Responses</div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="text-yellow-800 text-sm font-medium">Pending</div>
            <div className="mt-2 text-2xl font-semibold text-yellow-900">7</div>
            <div className="text-yellow-600 text-sm">Queued Messages</div>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <div className="text-red-800 text-sm font-medium">Issues</div>
            <div className="mt-2 text-2xl font-semibold text-red-900">2</div>
            <div className="text-red-600 text-sm">Require Attention</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions