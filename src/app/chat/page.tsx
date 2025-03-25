'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ChatComponent from '../components/ChatComponent';
import Sidebar from '../components/Sidebar';
import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/outline';

interface Conversation {
  id: string;
  title: string;
}

export default function ChatPage() {
  const { t } = useTranslation();
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: 'current', title: 'New Conversation' }
  ]);
  const [currentConversationId, setCurrentConversationId] = useState('current');

  // 加载保存的对话历史
  useEffect(() => {
    const savedConversations = localStorage.getItem('conversations');
    if (savedConversations) {
      try {
        const parsed = JSON.parse(savedConversations);
        setConversations([
          { id: 'current', title: 'New Conversation' },
          ...parsed
        ]);
      } catch (e) {
        console.error('Failed to parse saved conversations', e);
      }
    }
  }, []);

  const handleNewConversation = () => {
    setCurrentConversationId('current');
  };

  const handleSelectConversation = (id: string) => {
    setCurrentConversationId(id);
  };

  const handleSaveConversation = (title: string) => {
    const newId = `conv-${Date.now()}`;
    const newConversation = { id: newId, title };
    
    setConversations(prev => {
      const updated = [
        { id: 'current', title: 'New Conversation' },
        newConversation,
        ...prev.filter(conv => conv.id !== 'current')
      ];
      
      // 保存到本地存储
      localStorage.setItem('conversations', 
        JSON.stringify(updated.filter(conv => conv.id !== 'current')));
      
      return updated;
    });
    
    // 返回新创建的会话ID，供调用方使用
    return newId;
  };

  const handleDeleteConversation = (id: string) => {
    // 如果删除的是当前对话，切换到新对话
    if (id === currentConversationId) {
      setCurrentConversationId('current');
    }
    
    // 从列表中删除对话
    setConversations(prev => {
      const updated = prev.filter(conv => conv.id !== id);
      
      // 更新本地存储
      localStorage.setItem('conversations',
        JSON.stringify(updated.filter(conv => conv.id !== 'current')));
      
      return updated;
    });
    
    // 删除对话内容
    localStorage.removeItem(`messages-${id}`);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* 返回主页按钮 - 固定在右上角 */}
      <div className="fixed top-4 right-4 z-10">
        <Link 
          href="/" 
          className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md text-indigo-600 hover:bg-indigo-50"
          aria-label={t('home.back')}
        >
          <HomeIcon className="h-6 w-6" />
        </Link>
      </div>
      
      {/* 侧边栏 */}
      <Sidebar
        conversations={conversations}
        currentId={currentConversationId}
        onNewConversation={handleNewConversation}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={handleDeleteConversation}
      />
      
      {/* 主内容区 */}
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <div className="flex-1 overflow-hidden h-full">
          <div className="h-14"></div> {/* 顶部间距，为右上角按钮留出空间 */}
          <ChatComponent 
            conversationId={currentConversationId}
            onSaveConversation={handleSaveConversation}
          />
        </div>
      </div>
    </div>
  );
} 