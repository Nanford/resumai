'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusIcon, ChatBubbleLeftRightIcon, TrashIcon } from '@heroicons/react/24/outline';
import LanguageSwitcher from './LanguageSwitcher';

interface Conversation {
  id: string;
  title: string;
}

interface SidebarProps {
  conversations: Conversation[];
  currentId: string;
  onNewConversation: () => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation?: (id: string) => void;
}

export default function Sidebar({ 
  conversations, 
  currentId, 
  onNewConversation, 
  onSelectConversation,
  onDeleteConversation
}: SidebarProps) {
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredConversation, setHoveredConversation] = useState<string | null>(null);

  return (
    <div 
      className={`bg-indigo-900 text-white transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* 侧边栏标题和折叠按钮 */}
      <div className="p-4 flex items-center justify-between border-b border-indigo-800">
        {!isCollapsed && (
          <h2 className="font-bold text-xl">ResuMAI</h2>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md hover:bg-indigo-800"
        >
          {isCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          )}
        </button>
      </div>
      
      {/* 新建对话按钮 */}
      <button
        onClick={onNewConversation}
        className="flex items-center m-3 p-2 bg-indigo-700 hover:bg-indigo-600 rounded-md transition-colors"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        {!isCollapsed && t('chat.new')}
      </button>
      
      {/* 历史对话列表 */}
      <div className="flex-1 overflow-y-auto">
        <div className={`px-3 py-2 ${isCollapsed ? 'hidden' : 'block'}`}>
          <h3 className="text-sm font-medium text-indigo-300 uppercase tracking-wider">
            {t('chat.history')}
          </h3>
        </div>
        <ul className="space-y-1 px-2">
          {conversations.filter(conv => conv.id !== 'current').map((conv) => (
            <li 
              key={conv.id}
              className="relative"
              onMouseEnter={() => setHoveredConversation(conv.id)}
              onMouseLeave={() => setHoveredConversation(null)}
            >
              <button
                onClick={() => onSelectConversation(conv.id)}
                className={`flex items-center w-full p-2 rounded-md transition-colors truncate ${
                  currentId === conv.id
                    ? 'bg-indigo-700'
                    : 'hover:bg-indigo-800'
                }`}
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="truncate">
                    {conv.title}
                  </span>
                )}
              </button>
              
              {/* 删除按钮 - 悬停时显示 */}
              {!isCollapsed && onDeleteConversation && hoveredConversation === conv.id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onDeleteConversation) {
                      onDeleteConversation(conv.id);
                    }
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-red-600 text-white"
                  title={t('chat.delete')}
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      {/* 底部语言切换器 */}
      <div className="p-4 border-t border-indigo-800">
        {!isCollapsed && <LanguageSwitcher />}
      </div>
    </div>
  );
} 