#!/usr/bin/env node
// Auto-reply bot: monitors Supabase for new messages, calls Ollama, writes response

const SUPABASE_URL = 'https://babkatqycaigexyjnlqv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_x-6zQYVgK_e1FXmyZW31Gg_EZD1MyGv';
const OLLAMA_URL = 'http://localhost:11434/api/generate';
const MODEL = 'qwen3.5:9b';

let lastMessageIds = {}; // topic_id -> last message id

// Fetch all active topics
async function getTopics() {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/topics?status=eq.active`, {
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    return await res.json();
}

// Get latest message for a topic
async function getLatestMessage(topicId) {
    const res = await fetch(
        `${SUPABASE_URL}/rest/v1/messages?topic_id=eq.${topicId}&order=created_at.desc&limit=1`,
        { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
    );
    const msgs = await res.json();
    return msgs[0] || null;
}

// Get conversation context (last 10 messages)
async function getContext(topicId) {
    const res = await fetch(
        `${SUPABASE_URL}/rest/v1/messages?topic_id=eq.${topicId}&order=created_at.asc&limit=10`,
        { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
    );
    const msgs = await res.json();
    return msgs.map(m => `${m.author}: ${m.content}`).join('\n');
}

// Call Ollama
async function callOllama(prompt) {
    const res = await fetch(OLLAMA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: MODEL,
            prompt: prompt,
            stream: false
        })
    });
    const data = await res.json();
    return data.response;
}

// Post message to Supabase
async function postMessage(topicId, author, authorType, content) {
    await fetch(`${SUPABASE_URL}/rest/v1/messages`, {
        method: 'POST',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ topic_id: topicId, author, author_type: authorType, content })
    });
}

// Process a topic: check for new human messages
async function processTopic(topic) {
    const topicId = topic.id;
    const latestMsg = await getLatestMessage(topicId);
    
    if (!latestMsg) return;
    
    const lastId = lastMessageIds[topicId] || 0;
    
    // New message from human (not from Zam)
    if (latestMsg.id > lastId && latestMsg.author_type === 'human') {
        lastMessageIds[topicId] = latestMsg.id;
        console.log(`[${new Date().toLocaleTimeString()}] New message in "${topic.title}": ${latestMsg.content.substring(0, 50)}...`);
        
        // Get context and generate reply
        const context = await getContext(topicId);
        const prompt = `You are Zam, a helpful AI assistant. Reply to the latest message naturally in Chinese.\n\nConversation:\n${context}\n\nYour reply:`;
        
        try {
            const reply = await callOllama(prompt);
            console.log(`[Zam]: ${reply.substring(0, 50)}...`);
            await postMessage(topicId, 'Zam', 'zam', reply.substring(0, 500));
            console.log('✓ Reply posted');
        } catch (e) {
            console.error('Ollama error:', e.message);
        }
    } else if (latestMsg.id > lastId) {
        // Update lastId for Zam's own messages too
        lastMessageIds[topicId] = latestMsg.id;
    }
}

// Main loop
async function main() {
    console.log('🤖 Auto-reply bot started...');
    
    // Initialize last message IDs
    const topics = await getTopics();
    for (const topic of topics) {
        const latest = await getLatestMessage(topic.id);
        if (latest) lastMessageIds[topic.id] = latest.id;
    }
    console.log(`Monitoring ${topics.length} topics`);
    
    // Poll every 5 seconds
    setInterval(async () => {
        try {
            const currentTopics = await getTopics();
            for (const topic of currentTopics) {
                await processTopic(topic);
            }
        } catch (e) {
            console.error('Poll error:', e.message);
        }
    }, 5000);
}

main();
