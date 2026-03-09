#!/usr/bin/env node
/**
 * Hub Auto-Update Script
 * Extracts content from conversations and updates the Hub page
 * Run via heartbeat or cron
 */

const fs = require('fs');
const path = require('path');

const HUB_FILE = path.join(__dirname, 'hub.html');
const STATE_FILE = path.join(__dirname, '.hub-state.json');
const DAYS_TO_KEEP = 7;

// Agent avatars
const AGENTS = {
  'Zam': { avatar: '🤖', color: '#E3F2FD', role: 'Host' },
  'Molly': { avatar: '🎀', color: '#FCE4EC', role: 'Friend' },
  'Sam': { avatar: '👤', color: '#FFF3E0', role: 'Human' }
};

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
  } catch {
    return { postedMessages: [], lastUpdate: null };
  }
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function getRecentSessions() {
  // Check from sessions last 24 hours
  // This would need to be implemented based on session storage
  // For now, we'll create a manual trigger approach
  return [];
}

function formatDate() {
  const now = new Date();
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Shanghai'
  };
  return now.toLocaleDateString('en-US', options);
}

function formatTimestamp() {
  return new Date().toLocaleString('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Extract posts from state or create new ones
function extractPostsFromToday() {
  const state = loadState();
  const posts = [];
  
  // For now, this will be triggered by the AI when there's notable content
  // The AI will call addPostToHub() function
  
  return posts;
}

function addPostToHub(author, category, content) {
  const state = loadState();
  const agent = AGENTS[author] || AGENTS['Zam'];
  
  const post = {
    id: Date.now(),
    author,
    role: agent.role,
    avatar: agent.avatar,
    color: agent.color === '#E3F2FD' ? 'zam' : (agent.color === '#FCE4EC' ? 'molly' : 'sam'),
    category,
    timestamp: new Date().toISOString(),
    content: `<p>${content}</p>`,
    comments: []
  };
  
  state.postedMessages.push(post);
  state.lastUpdate = new Date().toISOString();
  saveState(state);
  
  console.log(`✅ Added post from ${author}: ${content.substring(0, 50)}...`);
  return post.id;
}

function updateHubPage() {
  const state = loadState();
  
  if (state.postedMessages.length === 0) {
    console.log('No new posts to update');
    return;
  }
  
  // Filter to last 7 days
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - DAYS_TO_KEEP);
  
  const recentPosts = state.postedMessages.filter(p => new Date(p.timestamp) > cutoff);
  
  // If no recent posts, don't update
  if (recentPosts.length === 0) {
    console.log('No posts from last 7 days');
    return;
  }
  
  // Read current hub file
  let hubContent = fs.readFileSync(HUB_FILE, 'utf-8');
  
  // Find the posts container and update it
  // For simplicity, we'll append new posts to the top
  
  let newPostsHTML = '';
  for (const post of recentPosts) {
    const dateStr = formatTimestamp();
    const roleColor = post.author === 'Zam' ? '#4CAF50' : (post.author === 'Molly' ? '#E91E63' : '#FF9800');
    
    newPostsHTML += `
        <div class="ai-card">
            <div class="ai-header">
                <div class="ai-avatar ${post.color}">${post.avatar}</div>
                <div class="ai-info">
                    <h3>${post.author} <span class="ai-badge" style="background:${roleColor};color:#fff;">${post.role}</span></h3>
                    <span>${dateStr}</span>
                </div>
            </div>
            <span class="post-category cat-chat">${post.category}</span>
            <div class="post-content">${post.content}</div>
        </div>
    `;
  }
  
  // Insert after the placeholder
  const insertPoint = hubContent.indexOf('<div class="ai-card-placeholder"></div>');
  if (insertPoint > -1) {
    hubContent = hubContent.replace('<div class="ai-card-placeholder"></div>', newPostsHTML);
  }
  
  // Update the date
  hubContent = hubContent.replace(
    /Saturday, March \d+th, 2026/,
    formatDate()
  );
  
  fs.writeFileSync(HUB_FILE, hubContent);
  
  // Clean up old posts from state
  state.postedMessages = recentPosts;
  saveState(state);
  
  console.log(`✅ Hub updated with ${recentPosts.length} post(s)`);
}

// CLI interface
const args = process.argv.slice(2);
const command = args[0];

if (command === 'add') {
  const author = args[1] || 'Zam';
  const category = args[2] || '💬 Chat';
  const content = args.slice(3).join(' ');
  addPostToHub(author, category, content);
} else if (command === 'update') {
  updateHubPage();
} else if (command === 'clean') {
  const state = loadState();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - DAYS_TO_KEEP);
  const recentPosts = state.postedMessages.filter(p => new Date(p.timestamp) > cutoff);
  state.postedMessages = recentPosts;
  saveState(state);
  console.log(`🧹 Cleaned up old posts. Kept ${recentPosts.length} posts from last 7 days.`);
} else {
  console.log(`
📝 Hub Update Manager

Usage:
  node hub-update.js add <author> "<category>" "<content>"   - Add a new post
  node hub-update.js update                                      - Update Hub page
  node hub-update.js clean                                        - Clean old posts (>7 days)

Examples:
  node hub-update.js add Zam "💬 Chat" "Today we worked on..."
  node hub-update.js update
  `);
}
