import React, { useState } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import type { UserSettings as UserSettingsType } from '../types';

const UserSettings: React.FC = () => {
  const [settings, setSettings] = useState<UserSettingsType>({
    dailyDMLimit: 100,
    defaultTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    notificationEmail: '',
    notificationPreferences: {
      errorAlerts: true,
      dailyReport: true,
      rateLimit: true,
    },
    blacklist: {
      users: [],
      words: [],
    },
    apiSettings: {
      rateLimit: 50,
      cooldownPeriod: 15,
    },
  });

  const [newBlacklistedUser, setNewBlacklistedUser] = useState('');
  const [newBlacklistedWord, setNewBlacklistedWord] = useState('');

  const handleAddBlacklistedUser = () => {
    if (!newBlacklistedUser) return;
    setSettings(prev => ({
      ...prev,
      blacklist: {
        ...prev.blacklist,
        users: [...prev.blacklist.users, newBlacklistedUser],
      },
    }));
    setNewBlacklistedUser('');
  };

  const handleAddBlacklistedWord = () => {
    if (!newBlacklistedWord) return;
    setSettings(prev => ({
      ...prev,
      blacklist: {
        ...prev.blacklist,
        words: [...prev.blacklist.words, newBlacklistedWord],
      },
    }));
    setNewBlacklistedWord('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">User Settings</h2>
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              <Save className="h-5 w-5 mr-2" />
              Save Changes
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* General Settings */}
            <section className="space-y-4">
              <h3 className="text-lg font-medium">General Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Daily DM Limit</label>
                  <input
                    type="number"
                    value={settings.dailyDMLimit}
                    onChange={(e) => setSettings(prev => ({ ...prev, dailyDMLimit: parseInt(e.target.value) }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Default Timezone</label>
                  <select
                    value={settings.defaultTimezone}
                    onChange={(e) => setSettings(prev => ({ ...prev, defaultTimezone: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    {Intl.supportedValuesOf('timeZone').map(tz => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* Notification Settings */}
            <section className="space-y-4">
              <h3 className="text-lg font-medium">Notification Settings</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Notification Email</label>
                <input
                  type="email"
                  value={settings.notificationEmail}
                  onChange={(e) => setSettings(prev => ({ ...prev, notificationEmail: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Notification Preferences</label>
                <div className="space-y-2">
                  {Object.entries(settings.notificationPreferences).map(([key, value]) => (
                    <label key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          notificationPreferences: {
                            ...prev.notificationPreferences,
                            [key]: e.target.checked,
                          },
                        }))}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {key.split(/(?=[A-Z])/).join(' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </section>

            {/* Blacklist Settings */}
            <section className="space-y-4">
              <h3 className="text-lg font-medium">Blacklist Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Blacklisted Users</label>
                  <div className="mt-1 flex space-x-2">
                    <input
                      type="text"
                      value={newBlacklistedUser}
                      onChange={(e) => setNewBlacklistedUser(e.target.value)}
                      placeholder="@username"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <button
                      onClick={handleAddBlacklistedUser}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {settings.blacklist.users.map(user => (
                      <span key={user} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100">
                        {user}
                        <button
                          onClick={() => setSettings(prev => ({
                            ...prev,
                            blacklist: {
                              ...prev.blacklist,
                              users: prev.blacklist.users.filter(u => u !== user),
                            },
                          }))}
                          className="ml-2 text-gray-400 hover:text-gray-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Blacklisted Words</label>
                  <div className="mt-1 flex space-x-2">
                    <input
                      type="text"
                      value={newBlacklistedWord}
                      onChange={(e) => setNewBlacklistedWord(e.target.value)}
                      placeholder="Enter word"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <button
                      onClick={handleAddBlacklistedWord}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {settings.blacklist.words.map(word => (
                      <span key={word} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100">
                        {word}
                        <button
                          onClick={() => setSettings(prev => ({
                            ...prev,
                            blacklist: {
                              ...prev.blacklist,
                              words: prev.blacklist.words.filter(w => w !== word),
                            },
                          }))}
                          className="ml-2 text-gray-400 hover:text-gray-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* API Settings */}
            <section className="space-y-4">
              <h3 className="text-lg font-medium">API Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rate Limit (requests/minute)</label>
                  <input
                    type="number"
                    value={settings.apiSettings.rateLimit}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      apiSettings: {
                        ...prev.apiSettings,
                        rateLimit: parseInt(e.target.value),
                      },
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Cooldown Period (minutes)</label>
                  <input
                    type="number"
                    value={settings.apiSettings.cooldownPeriod}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      apiSettings: {
                        ...prev.apiSettings,
                        cooldownPeriod: parseInt(e.target.value),
                      },
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </section>

            {/* Connection Status */}
            <section className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Instagram Connection Status</h3>
                  <p className="text-sm text-gray-600">Last synced: 5 minutes ago</p>
                </div>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Refresh Connection
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;