import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ToggleLeft as Toggle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { instagramAPI } from '../api/instagram';

const AutoReplyManager = () => {
  const [replies, setReplies] = useState([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [newResponse, setNewResponse] = useState('');
  const [postType, setPostType] = useState('both');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Load saved replies from localStorage
    const savedReplies = localStorage.getItem('autoReplies');
    if (savedReplies) {
      setReplies(JSON.parse(savedReplies));
    }
  }, []);

  useEffect(() => {
    // Save replies to localStorage whenever they change
    localStorage.setItem('autoReplies', JSON.stringify(replies));
  }, [replies]);

  const handleAddReply = async () => {
    if (!newKeyword || !newResponse) {
      toast.error('Please fill in both keyword and response');
      return;
    }

    setIsProcessing(true);
    try {
      const newReply = {
        id: Date.now().toString(),
        keyword: newKeyword,
        response: newResponse,
        isEnabled: true,
        postType,
        createdAt: new Date().toISOString(),
      };

      setReplies([...replies, newReply]);
      setNewKeyword('');
      setNewResponse('');
      toast.success('Auto-reply rule added successfully');
    } catch (error) {
      console.error('Error adding reply:', error);
      toast.error('Failed to add auto-reply rule');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteReply = async (id) => {
    try {
      setReplies(replies.filter(reply => reply.id !== id));
      toast.success('Auto-reply rule deleted');
    } catch (error) {
      console.error('Error deleting reply:', error);
      toast.error('Failed to delete auto-reply rule');
    }
  };

  const handleToggleReply = async (id) => {
    try {
      setReplies(
        replies.map(reply =>
          reply.id === id ? { ...reply, isEnabled: !reply.isEnabled } : reply
        )
      );
      toast.success('Rule status updated');
    } catch (error) {
      console.error('Error toggling reply:', error);
      toast.error('Failed to update rule status');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Auto-Reply Rules</h2>
        
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">Keyword</label>
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., 'price', 'info'"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Response Message</label>
            <textarea
              value={newResponse}
              onChange={(e) => setNewResponse(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="Hi {follower_name}, thanks for your interest!"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Apply to</label>
            <select
              value={postType}
              onChange={(e) => setPostType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="both">Both Reels & Stories</option>
              <option value="reel">Reels Only</option>
              <option value="story">Stories Only</option>
            </select>
          </div>

          <button
            onClick={handleAddReply}
            disabled={isProcessing}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            <Plus className="h-5 w-5 mr-2" />
            {isProcessing ? 'Adding...' : 'Add Rule'}
          </button>
        </div>

        <div className="space-y-4">
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <p className="font-medium">Keyword: {reply.keyword}</p>
                <p className="text-gray-600">Response: {reply.response}</p>
                <p className="text-sm text-gray-500">
                  Applied to: {reply.postType === 'both' ? 'Reels & Stories' : reply.postType}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleToggleReply(reply.id)}
                  className={`p-2 rounded-full ${
                    reply.isEnabled ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Toggle className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteReply(reply.id)}
                  className="p-2 rounded-full hover:bg-red-100 text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoReplyManager;