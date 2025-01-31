import React from 'react';
import { BarChart2, MessageSquare, AlertTriangle, Hash, TrendingUp, Users, Clock } from 'lucide-react';
import type { AnalyticsData, KeywordStat, DailyStat } from '../types';

const Analytics: React.FC = () => {
  // Mock data - would come from API in production
  const analyticsData: AnalyticsData = {
    totalDMsSent: 156,
    totalCommentsProcessed: 342,
    keywordMatches: 189,
    errorCount: 3,
    responseRate: 92.5,
    avgResponseTime: 2.3,
    topKeywords: [
      { keyword: 'price', matches: 78, successRate: 95 },
      { keyword: 'info', matches: 45, successRate: 88 },
      { keyword: 'details', matches: 34, successRate: 91 },
    ],
    dailyStats: [
      { date: '2024-02-20', dmsSent: 32, commentsProcessed: 67, successRate: 94 },
      { date: '2024-02-21', dmsSent: 28, commentsProcessed: 59, successRate: 91 },
      { date: '2024-02-22', dmsSent: 35, commentsProcessed: 72, successRate: 93 },
    ],
    userEngagement: [
      { username: '@user123', interactions: 12, lastInteraction: new Date(), responseRate: 100 },
      { username: '@user456', interactions: 8, lastInteraction: new Date(), responseRate: 87.5 },
      { username: '@user789', interactions: 5, lastInteraction: new Date(), responseRate: 80 },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-indigo-50 p-6 rounded-lg">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-indigo-600">Total DMs Sent</p>
              <p className="text-2xl font-semibold text-indigo-900">
                {analyticsData.totalDMsSent}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center">
            <BarChart2 className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">Comments Processed</p>
              <p className="text-2xl font-semibold text-green-900">
                {analyticsData.totalCommentsProcessed}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center">
            <Hash className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">Keyword Matches</p>
              <p className="text-2xl font-semibold text-blue-900">
                {analyticsData.keywordMatches}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-6 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-red-600">Errors</p>
              <p className="text-2xl font-semibold text-red-900">
                {analyticsData.errorCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Response Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Response Rate</span>
                <span className="text-sm font-medium text-green-600">{analyticsData.responseRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${analyticsData.responseRate}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Average Response Time</span>
              </div>
              <span className="text-sm font-medium">{analyticsData.avgResponseTime} minutes</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Top Keywords</h3>
          <div className="space-y-4">
            {analyticsData.topKeywords.map((keyword: KeywordStat) => (
              <div key={keyword.keyword} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Hash className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium">{keyword.keyword}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{keyword.matches} matches</span>
                  <span className="text-sm text-green-600">{keyword.successRate}% success</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Stats Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Daily Activity</h3>
        <div className="h-64">
          {/* Chart would go here - using placeholder for now */}
          <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg">
            <TrendingUp className="h-8 w-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* User Engagement */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Top User Engagement</h3>
        <div className="space-y-4">
          {analyticsData.userEngagement.map((user) => (
            <div key={user.username} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-gray-600">
                    Last interaction: {user.lastInteraction.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{user.interactions} interactions</p>
                <p className="text-sm text-green-600">{user.responseRate}% response rate</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics