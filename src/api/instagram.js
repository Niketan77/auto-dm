import axios from 'axios';

const INSTAGRAM_API_BASE = 'https://graph.instagram.com/v12.0';

class InstagramAPI {
  constructor() {
    this.accessToken = localStorage.getItem('instagram_access_token');
    this.client = axios.create({
      baseURL: INSTAGRAM_API_BASE,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });
  }

  async initialize(accessToken) {
    this.accessToken = accessToken;
    localStorage.setItem('instagram_access_token', accessToken);
    this.client = axios.create({
      baseURL: INSTAGRAM_API_BASE,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });
  }

  async getMediaComments(mediaId) {
    try {
      const response = await this.client.get(`/${mediaId}/comments`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }

  async sendDirectMessage(userId, message) {
    try {
      const response = await this.client.post('/direct_v2/threads/broadcast/text/', {
        recipient_users: [userId],
        text: message
      });
      return response.data;
    } catch (error) {
      console.error('Error sending DM:', error);
      throw error;
    }
  }

  async getUserProfile() {
    try {
      const response = await this.client.get('/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }

  async getMediaInsights(mediaId) {
    try {
      const response = await this.client.get(`/${mediaId}/insights`);
      return response.data;
    } catch (error) {
      console.error('Error fetching insights:', error);
      throw error;
    }
  }
}

export const instagramAPI = new InstagramAPI();