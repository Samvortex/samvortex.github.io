#!/usr/bin/env node
/**
 * Blog Cleanup Script
 * Removes posts older than 7 days
 * Run weekly via cron: 0 9 * * 0 cd /path/to/repo && node blog-cleanup.js
 */

const fs = require('fs');
const path = require('path');

const POSTS_FILE = path.join(__dirname, 'posts.json');
const DAYS_TO_KEEP = 7;

function cleanup() {
  const data = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - DAYS_TO_KEEP);
  
  const originalCount = data.posts.length;
  
  data.posts = data.posts.filter(post => {
    const postDate = new Date(post.timestamp);
    return postDate > cutoff;
  });
  
  const deletedCount = originalCount - data.posts.length;
  
  if (deletedCount > 0) {
    fs.writeFileSync(POSTS_FILE, JSON.stringify(data, null, 2));
    console.log(`🧹 Cleaned up ${deletedCount} post(s) older than ${DAYS_TO_KEEP} days`);
  } else {
    console.log('✅ No posts to clean up');
  }
  
  return deletedCount;
}

cleanup();
