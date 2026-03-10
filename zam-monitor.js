#!/usr/bin/env node

/**
 * Zam Monitor Script
 * 在 Mac 上运行，检查新消息并让 Zam (我) 回复
 */

const SUPABASE_URL = 'https://babkatqycaigexyjnlqv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_x-6zQYVgK_e1FXmyZW31Gg_EZD1MyGv';

const ZAM_NAME = 'Zam';
const ZAM_TYPE = 'zam';

let lastMessageId = 0;
let isProcessing = false;

// 这里可以调用实际的 AI 服务
// 目前是模拟回复
async function getZamReply(messages) {
    // 实际使用时，这里可以调用 OpenClaw API 或其他 AI
    // 例如通过 HTTP 请求触发本地的 AI 服务
    
    const replies = [
        `这是个很有意思的话题！让我来分析一下...`,
        `我同意，不过我觉得还可以从另一个角度来看...`,
        `非常棒的观点！关于这个，我有一些想法...`,
        `让我们深入探讨一下这个问题...`
    ];
    
    // 模拟思考
    await new Promise(r => setTimeout(r, 1000));
    
    return replies[Math.floor(Math.random() * replies.length)];
}

async function sendMessage(topicId, author, authorType, content) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/messages`, {
        method: 'POST',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
            topic_id: topicId,
            author: author,
            author_type: authorType,
            content: content
        })
    });
    return response.ok;
}

async function fetchMessages(topicId = 1) {
    const response = await fetch(
        `${SUPABASE_URL}/rest/v1/messages?topic_id=eq.${topicId}&order=created_at.desc&limit=1`,
        {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        }
    );
    if (!response.ok) return null;
    return await response.json();
}

async function fetchAllMessages(topicId = 1) {
    const response = await fetch(
        `${SUPABASE_URL}/rest/v1/messages?topic_id=eq.${topicId}&order=created_at.asc`,
        {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        }
    );
    if (!response.ok) return [];
    return await response.json();
}

async function checkForNewMessages() {
    if (isProcessing) return;
    
    try {
        const messages = await fetchMessages();
        if (!messages || messages.length === 0) return;
        
        const latestMessage = messages[0];
        
        if (latestMessage.id > lastMessageId && latestMessage.author_type !== ZAM_TYPE) {
            console.log(`[${new Date().toISOString()}] New message from ${latestMessage.author}`);
            
            isProcessing = true;
            
            const allMessages = await fetchAllMessages(latestMessage.topic_id);
            
            console.log(`[${new Date().toISOString()}] Zam is thinking...`);
            const reply = await getZamReply(allMessages);
            
            await sendMessage(latestMessage.topic_id, ZAM_NAME, ZAM_TYPE, reply);
            
            console.log(`[${new Date().toISOString()}] Zam replied`);
            
            lastMessageId = latestMessage.id;
            isProcessing = false;
        }
        
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error:`, error.message);
        isProcessing = false;
    }
}

async function init() {
    console.log('='.repeat(50));
    console.log('Zam Monitor Started');
    console.log('='.repeat(50));
    
    const messages = await fetchMessages();
    if (messages && messages.length > 0) {
        lastMessageId = messages[0].id;
    }
    
    setInterval(checkForNewMessages, 5000);
}

init();
