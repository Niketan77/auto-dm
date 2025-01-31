export interface AutoReply {
  id: string;
  keyword: string;
  response: string;
  isEnabled: boolean;
  postType: 'reel' | 'story' | 'both';
  createdAt: Date;
  schedule?: Schedule;
  conditions?: ReplyConditions;
}

export interface Schedule {
  startTime?: string;
  endTime?: string;
  daysOfWeek: string[];
  timezone: string;
}

export interface ReplyConditions {
  minFollowers?: number;
  maxRepliesPerUser?: number;
  blacklistedWords?: string[];
  whitelistedUsers?: string[];
  cooldownPeriod?: number; // in minutes
}

export interface AnalyticsData {
  totalDMsSent: number;
  totalCommentsProcessed: number;
  keywordMatches: number;
  errorCount: number;
  responseRate: number;
  avgResponseTime: number;
  topKeywords: KeywordStat[];
  dailyStats: DailyStat[];
  userEngagement: UserEngagement[];
}

export interface KeywordStat {
  keyword: string;
  matches: number;
  successRate: number;
}

export interface DailyStat {
  date: string;
  dmsSent: number;
  commentsProcessed: number;
  successRate: number;
}

export interface UserEngagement {
  username: string;
  interactions: number;
  lastInteraction: Date;
  responseRate: number;
}

export interface ActivityLog {
  id: string;
  type: 'dm_sent' | 'error' | 'keyword_match' | 'rate_limit' | 'blacklist_match' | 'schedule_start' | 'schedule_end';
  message: string;
  timestamp: Date;
  details?: {
    username?: string;
    keyword?: string;
    error?: string;
    postType?: string;
  };
}

export interface UserSettings {
  dailyDMLimit: number;
  defaultTimezone: string;
  notificationEmail: string;
  notificationPreferences: {
    errorAlerts: boolean;
    dailyReport: boolean;
    rateLimit: boolean;
  };
  blacklist: {
    users: string[];
    words: string[];
  };
  apiSettings: {
    rateLimit: number;
    cooldownPeriod: number;
  };
}