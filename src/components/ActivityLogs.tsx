import React from 'react';
import { Clock, Filter, Download } from 'lucide-react';
import type { ActivityLog } from '../types';

const ActivityLogs: React.FC = () => {
  // Mock data - would come from API in production
  const logs: ActivityLog[] = [
    {
      id: '1',
      type: 'dm_sent',
      message: 'DM sent to @user123 in response to keyword "price"',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      details: {
        username: '@user123',
        keyword: 'price',
        postType: 'reel',
      },
    },
    {
      id: '2',
      type: 'keyword_match',
      message: 'Keyword "info" matched in comment by @user456',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      details: {
        username: '@user456',
        keyword: 'info',
      },
    },
    {
      id: '3',
      type: 'error',
      message: 'Failed to send DM: Rate limit exceeded',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      details: {
        error: 'Rate limit exceeded',
      },
    },
    {
      id: '4',
      type: 'schedule_start',
      message: 'Auto-reply schedule started for weekday schedule',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
    },
    {
      id: '5',
      type: 'blacklist_match',
      message: 'Blocked interaction with blacklisted user @spam_account',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      details: {
        username: '@spam_account',
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Activity Logs</h2>
            <div className="flex space-x-4">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Filter className="h-5 w-5 mr-2" />
                Filter
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Download className="h-5 w-5 mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm font-medium text-green-600">Successful Actions</p>
              <p className="text-2xl font-semibold text-green-900">127</p>
              <p className="text-sm text-green-600">Last 24 hours</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-sm font-medium text-yellow-600">Warnings</p>
              <p className="text-2xl font-semibold text-yellow-900">12</p>
              <p className="text-sm text-yellow-600">Require attention</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-sm font-medium text-red-600">Errors</p>
              <p className="text-2xl font-semibold text-red-900">3</p>
              <p className="text-sm text-red-600">Need resolution</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className={`p-4 rounded-lg flex items-start ${
                  log.type === 'error'
                    ? 'bg-red-50'
                    : log.type === 'dm_sent'
                    ? 'bg-green-50'
                    : log.type === 'blacklist_match'
                    ? 'bg-yellow-50'
                    : 'bg-blue-50'
                }`}
              >
                <Clock className="h-5 w-5 mt-1 mr-3" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <p className={`font-medium ${
                      log.type === 'error'
                        ? 'text-red-800'
                        : log.type === 'dm_sent'
                        ? 'text-green-800'
                        : log.type === 'blacklist_match'
                        ? 'text-yellow-800'
                        : 'text-blue-800'
                    }`}>
                      {log.message}
                    </p>
                    <span className="text-sm text-gray-600">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  {log.details && (
                    <div className="mt-2 text-sm text-gray-600">
                      {Object.entries(log.details).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <span className="font-medium">{key}:</span>
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs