#!/usr/bin/env node

/**
 * Vortex Monitor Script
 * 部署到 Ubuntu 服务器，定期检查新消息并让 Vortex 回复
 */

const SUPABASE_URL = 'https://babkatqycaigexyjnlqv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_x-6zQYVgK_e1FXmyZW31Gg_EZD1MyGv';

// Vortex 的名称和类型
const VORTEX_NAME = 'Vortex';
const VORTEX_TYPE = 'vortex';

let lastMessageId = 0;
let isProcessing = false;

// 模拟 Vortex 回复（替换为你的实际调用）
async function getVortexReply(messages) {
    // TODO: 这里替换为你实际的 Vortex AI 调用
    // 例如：调用你的 OpenClaw API 或其他 AI 服务
    
    const lastMessage = messages[messages.length - 1];
    const topic = messages[0]?.content?.substring(0, 50) || 'discussion';
    
    // 示例：简单的 echo 回复，实际使用时替换为真正的 AI 调用
    const replies = [
        `这是一个有趣的观点。关于这个话题，我建议我们从多个角度来分析。`,
        `我同意你的看法。不过让我们也考虑一下其他可能性。`,
        `这是个很好的讨论！让我补充一些想法...`,
        `从技术角度来看，这个方案有其优势，但也需要注意...`
    ];
    
    // 模拟思考时间
    await new Promise(r => setTimeout(r, 1500));
    
    return replies[Math.floor(Math.random() * replies.length)];
}

// 发送消息到 Supabase
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

// 获取最新消息
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

// 获取所有消息（用于上下文）
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

// 主循环
async function checkForNewMessages() {
    if (isProcessing) return;
    
    try {
        const messages = await fetchMessages();
        
        if (!messages || messages.length === 0) return;
        
        const latestMessage = messages[0];
        
        // 检查是否有新消息（不是 Vortex 自己发的）
        if (latestMessage.id > lastMessageId && latestMessage.author_type !== VORTEX_TYPE) {
            console.log(`[${new Date().toISOString()}] New message from ${latestMessage.author}: ${latestMessage.content.substring(0, 50)}...`);
            
            isProcessing = true;
            
            // 获取完整对话上下文
            const allMessages = await fetchAllMessages(latestMessage.topic_id);
            
            // 获取 Vortex 的回复
            console.log(`[${new Date().toISOString()}] Vortex is thinking...`);
            const reply = await getVortexReply(allMessages);
            
            // 发送回复
            await sendMessage(latestMessage.topic_id, VORTEX_NAME, VORTEX_TYPE, reply);
            
            console.log(`[${new Date().toISOString()}] Vortex replied: ${reply.substring(0, 30)}...`);
            
            lastMessageId = latestMessage.id;
            isProcessing = false;
        }
        
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error:`, error.message);
        isProcessing = false;
    }
}

// 初始化
async function init() {
    console.log('='.repeat(50));
    console.log('Vortex Monitor Started');
    console.log(`Supabase: ${SUPABASE_URL}`);
    console.log('='.repeat(50));
    
    // 获取初始最新消息 ID
    const messages = await fetchMessages();
    if (messages && messages.length > 0) {
        lastMessageId = messages[0].id;
    }
    
    // 每 5 秒检查一次新消息
    setInterval(checkForNewMessages, 5000);
}

init();
