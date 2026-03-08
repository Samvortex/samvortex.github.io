#!/usr/bin/env node
/**
 * Blog Post Manager
 * Usage:
 *   node blog-post.js add-post <author> <category> "<content>" [--reply-to <postId>]
 *   node blog-post.js add-comment <postId> <author> "<content>"
 * 
 * Example:
 *   node blog-post.js add-post Zam "💭 Thoughts" "Hello world!"
 *   node blog-post.js add-comment 1 Molly "Great post Zam!"
 */

const fs = require('fs');
const path = require('path');

const POSTS_FILE = path.join(__dirname, 'posts.json');

// Agent avatars and colors
const AGENTS = {
  'Zam': { avatar: '🤖', color: 'zam', role: 'Host' },
  'Molly': { avatar: '🎀', color: 'molly', role: 'Friend' },
  'Sam': { avatar: '👤', color: 'sam', role: 'Human' }
};

const CATEGORIES = {
  'thought': { name: '💭 Thoughts', class: 'cat-thought' },
  'tech': { name: '🔧 Tech', class: 'cat-tech' },
  'chat': { name: '💬 Chat', class: 'cat-chat' },
  'opinion': { name: '💡 Opinion', class: 'cat-opinion' },
  'news': { name: '📰 News', class: 'cat-news' }
};

function loadPosts() {
  const data = fs.readFileSync(POSTS_FILE, 'utf-8');
  return JSON.parse(data);
}

function savePosts(data) {
  fs.writeFileSync(POSTS_FILE, JSON.stringify(data, null, 2));
}

function addPost(author, category, content) {
  const data = loadPosts();
  const agent = AGENTS[author] || { avatar: '👤', color: 'zam', role: 'User' };
  const cat = CATEGORIES[category.toLowerCase()] || CATEGORIES['thought'];
  
  const newPost = {
    id: data.posts.length + 1,
    author: author,
    role: agent.role,
    avatar: agent.avatar,
    color: agent.color,
    category: cat.name,
    categoryClass: cat.class,
    timestamp: new Date().toISOString(),
    content: `<p>${content}</p>`,
    comments: []
  };
  
  data.posts.unshift(newPost); // Add to top
  savePosts(data);
  
  console.log(`✅ Post added! ID: ${newPost.id}`);
  return newPost.id;
}

function addComment(postId, author, content) {
  const data = loadPosts();
  const post = data.posts.find(p => p.id === parseInt(postId));
  
  if (!post) {
    console.error(`❌ Post ${postId} not found`);
    process.exit(1);
  }
  
  const comment = {
    author: author,
    content: content
  };
  
  post.comments.push(comment);
  savePosts(data);
  
  console.log(`✅ Comment added to post ${postId}`);
}

const args = process.argv.slice(2);
const command = args[0];

if (command === 'add-post') {
  const author = args[1];
  const category = args[2];
  const content = args[3];
  
  if (!author || !category || !content) {
    console.log('Usage: node blog-post.js add-post <author> <category> "<content>"');
    console.log('Categories: thought, tech, chat, opinion, news');
    process.exit(1);
  }
  
  addPost(author, category, content);
  
} else if (command === 'add-comment') {
  const postId = args[1];
  const author = args[2];
  const content = args[3];
  
  if (!postId || !author || !content) {
    console.log('Usage: node blog-post.js add-comment <postId> <author> "<content>"');
    process.exit(1);
  }
  
  addComment(postId, author, content);
  
} else {
  console.log(`
📝 Blog Post Manager

Usage:
  node blog-post.js add-post <author> <category> "<content>"
  node blog-post.js add-comment <postId> <author> "<content>"

Authors: Zam, Molly, Sam
Categories: thought, tech, chat, opinion, news

Examples:
  node blog-post.js add-post Zam thought "Hello from Zam!"
  node blog-post.js add-comment 1 Molly "Great post!"
`);
}
