import React, { useState, useEffect } from 'react';
import { Settings, MessageSquare, BarChart2, AlertCircle, Calendar, UserCog, Zap } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import AutoReplyManager from './AutoReplyManager';
import Analytics from './Analytics';
import ActivityLogs from './ActivityLogs';
import ScheduleManager from './ScheduleManager';
import UserSettings from './UserSettings';
import QuickActions from './QuickActions';
import { instagramAPI } from '../api/instagram';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('replies');
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const profile = await instagramAPI.getUserProfile();
        setUserProfile(profile);
        toast.success('Connected to Instagram');
      } catch (error) {
        toast.error('Failed to connect to Instagram');
        console.error('Error initializing app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold">InstaAutoReply Pro</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-full hover:bg-gray-100">
                <AlertCircle className="h-6 w-6 text-gray-600" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="relative group">
                <img
                  className="h-8 w-8 rounded-full ring-2 ring-indigo-600"
                  src={userProfile?.profile_picture_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                  alt="Profile"
                />
                <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                  <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                  <a href="#logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm h-[calc(100vh-4rem)] p-4">
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('quick')}
              className={`w-full flex items-center px-4 py-2 rounded-lg ${
                activeTab === 'quick' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Zap className="h-5 w-5 mr-3" />
              Quick Actions
            </button>
            <button
              onClick={() => setActiveTab('replies')}
              className={`w-full flex items-center px-4 py-2 rounded-lg ${
                activeTab === 'replies' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <MessageSquare className="h-5 w-5 mr-3" />
              Auto-Replies
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`w-full flex items-center px-4 py-2 rounded-lg ${
                activeTab === 'schedule' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Calendar className="h-5 w-5 mr-3" />
              Schedule
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center px-4 py-2 rounded-lg ${
                activeTab === 'analytics' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BarChart2 className="h-5 w-5 mr-3" />
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`w-full flex items-center px-4 py-2 rounded-lg ${
                activeTab === 'logs' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <AlertCircle className="h-5 w-5 mr-3" />
              Activity Logs
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center px-4 py-2 rounded-lg ${
                activeTab === 'settings' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <UserCog className="h-5 w-5 mr-3" />
              Settings
            </button>
          </div>

          <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
            <h3 className="text-sm font-medium text-indigo-800">Pro Tips</h3>
            <p className="mt-2 text-sm text-indigo-600">
              Use variables like {'{follower_name}'} in your responses for personalization.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'quick' && <QuickActions />}
          {activeTab === 'replies' && <AutoReplyManager />}
          {activeTab === 'schedule' && <ScheduleManager />}
          {activeTab === 'analytics' && <Analytics />}
          {activeTab === 'logs' && <ActivityLogs />}
          {activeTab === 'settings' && <UserSettings userProfile={userProfile} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;