'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { getCareerAdvice, CareerAdvice, ModelType } from '../services/ai-service';
import ReactMarkdown from 'react-markdown';
import { PaperAirplaneIcon, BookmarkIcon, LightBulbIcon, BoltIcon } from '@heroicons/react/24/outline';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  thoughtProcess?: string;
}

interface AdviceResult {
  isLoading: boolean;
  advice: CareerAdvice | null;
}

interface ChatComponentProps {
  conversationId: string;
  onSaveConversation: (title: string) => string;
}

export default function ChatComponent({ conversationId, onSaveConversation }: ChatComponentProps) {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [adviceResult, setAdviceResult] = useState<AdviceResult>({
    isLoading: false,
    advice: null,
  });
  const [modelType, setModelType] = useState<ModelType>('standard');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const newIdRef = useRef<string | null>(null);

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 当对话ID变化时加载对应的消息
  useEffect(() => {
    // 重置新会话ID引用
    newIdRef.current = null;
    
    if (conversationId === 'current') {
      // 新对话，清空消息
      setMessages([]);
    } else {
      // 加载保存的对话
      const savedMessages = localStorage.getItem(`messages-${conversationId}`);
      if (savedMessages) {
        try {
          setMessages(JSON.parse(savedMessages));
        } catch (e) {
          console.error('Failed to parse saved messages', e);
          setMessages([]);
        }
      } else {
        setMessages([]);
      }
    }
  }, [conversationId]);

  // 保存当前对话消息
  useEffect(() => {
    // 如果有新创建的会话ID，使用新ID保存消息
    if (newIdRef.current && messages.length > 0) {
      localStorage.setItem(`messages-${newIdRef.current}`, JSON.stringify(messages));
    } 
    // 如果是普通的历史会话，使用会话ID保存消息
    else if (conversationId !== 'current' && messages.length > 0) {
      localStorage.setItem(`messages-${conversationId}`, JSON.stringify(messages));
    }
  }, [conversationId, messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 自动调整输入框高度
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 添加用户消息
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    
    // 自动保存对话 - 如果是新对话且当前是第一条消息
    if (conversationId === 'current' && messages.length === 0) {
      // 使用输入文本的前30个字符作为对话标题
      const title = input.substring(0, 30) + (input.length > 30 ? '...' : '');
      // 保存对话但继续使用当前的conversationId
      const newId = onSaveConversation(title);
      
      // 保存新创建的会话ID
      if (newId) {
        newIdRef.current = newId;
      }
    }
    
    // 显示加载状态
    setAdviceResult({ isLoading: true, advice: null });
    
    try {
      // 获取AI回复
      const advice = await getCareerAdvice(input, modelType);
      
      // 确定输出的语言 - 如果用户明确要求中文，则使用中文，否则根据当前界面语言
      const userWantsChinese = input.includes('中文') || 
                            input.includes('用中文') || 
                            input.includes('使用中文') ||
                            input.includes('Chinese') ||
                            input.includes('in Chinese') ||
                            i18n.language === 'zh';
      
      // 思考过程内容
      const thoughtProcess = advice.thoughtProcess;
      
      // 格式化AI回复
      const formattedAdvice = userWantsChinese 
        ? `
## ${t('career.positions', { lng: 'zh' })}
${advice.recommendedPositions.join(', ')}

## ${t('career.companies', { lng: 'zh' })}
${advice.recommendedCompanies.join(', ')}

## ${t('career.salary', { lng: 'zh' })}
${advice.salarySuggestion}

## ${t('career.locations', { lng: 'zh' })}
${advice.locationSuggestion.join(', ')}

## ${t('career.skills', { lng: 'zh' })}
- ${advice.skillsToImprove.join('\n- ')}

## ${t('career.advice', { lng: 'zh' })}
${advice.additionalAdvice}
      `
        : `
## ${t('career.positions', { lng: 'en' })}
${advice.recommendedPositions.join(', ')}

## ${t('career.companies', { lng: 'en' })}
${advice.recommendedCompanies.join(', ')}

## ${t('career.salary', { lng: 'en' })}
${advice.salarySuggestion}

## ${t('career.locations', { lng: 'en' })}
${advice.locationSuggestion.join(', ')}

## ${t('career.skills', { lng: 'en' })}
- ${advice.skillsToImprove.join('\n- ')}

## ${t('career.advice', { lng: 'en' })}
${advice.additionalAdvice}
      `;
      
      // 添加AI回复
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: formattedAdvice,
        thoughtProcess: thoughtProcess 
      };
      
      // 更新消息列表
      setMessages((prev) => {
        const updatedMessages = [...prev, assistantMessage];
        
        // 如果这是一个新创建的会话，将消息保存到新会话ID下
        if (newIdRef.current) {
          localStorage.setItem(`messages-${newIdRef.current}`, JSON.stringify(updatedMessages));
        }
        
        return updatedMessages;
      });
      
      // 保存建议结果
      setAdviceResult({ isLoading: false, advice });
    } catch (error) {
      console.error('Error getting advice:', error);
      const errorMessage: Message = { 
        role: 'assistant', 
        content: t('error.advice') 
      };
      setMessages((prev) => [...prev, errorMessage]);
      setAdviceResult({ isLoading: false, advice: null });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md flex-1 flex flex-col overflow-hidden h-full">
        {/* 对话标题和模型选择 */}
        <div className="border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {conversationId === 'current' ? t('chat.new') : 'Chat'}
          </h2>
          <div className="flex items-center space-x-3">
            {/* 模型选择 */}
            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setModelType('standard')}
                className={`flex items-center px-3 py-1 rounded ${
                  modelType === 'standard' 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                title={t('model.standard.description')}
              >
                <BoltIcon className="w-4 h-4 mr-1" />
                <span className="text-sm">{t('model.standard.name')}</span>
              </button>
              <button
                onClick={() => setModelType('thinking')}
                className={`flex items-center px-3 py-1 rounded ${
                  modelType === 'thinking' 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                title={t('model.thinking.description')}
              >
                <LightBulbIcon className="w-4 h-4 mr-1" />
                <span className="text-sm">{t('model.thinking.name')}</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* 消息区域 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[65vh]">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p className="text-center max-w-md">
                {t('chat.empty')}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div key={index} className="space-y-2">
                  <div
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-3xl p-4 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-indigo-100 text-gray-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.role === 'assistant' ? (
                        <div className="prose prose-sm max-w-none">
                          <ReactMarkdown>
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <div className="whitespace-pre-line">{message.content}</div>
                      )}
                    </div>
                  </div>
                  
                  {/* 思考过程显示 - 当消息是AI助手且有思考过程时显示 */}
                  {message.role === 'assistant' && message.thoughtProcess && (
                    <div className="flex justify-start">
                      <div className="max-w-3xl p-3 rounded-lg bg-yellow-50 text-gray-700 border border-yellow-200">
                        <div className="flex items-center mb-2">
                          <LightBulbIcon className="h-4 w-4 mr-1 text-yellow-500" />
                          <span className="text-sm font-medium text-gray-600">{t('model.thinking.process')}</span>
                        </div>
                        <div className="whitespace-pre-line text-sm prose prose-sm max-w-none">
                          {message.thoughtProcess}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {adviceResult.isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-3xl p-4 rounded-lg bg-gray-100">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        {/* 输入区域 */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="mb-2 flex items-center">
              <div className="text-xs font-medium text-gray-500 mr-1">
                {t('chat.model')}:
              </div>
              <div className="text-xs flex-1">
                <span className={`font-medium ${modelType === 'thinking' ? 'text-yellow-600' : 'text-indigo-600'}`}>
                  {modelType === 'thinking' ? t('model.thinking.name') : t('model.standard.name')}
                </span>
                <span className="text-gray-400 ml-1">
                  ({modelType === 'thinking' ? t('model.thinking.hint') : t('model.standard.hint')})
                </span>
              </div>
            </div>
            
            <div className="flex items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('chat.placeholder')}
                className="flex-1 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[50px] max-h-[100px] resize-none"
                rows={1}
              />
              <button
                type="submit"
                disabled={adviceResult.isLoading}
                className="bg-indigo-600 text-white p-3 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-indigo-400 h-[50px]"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-2">
              {t('chat.tip')}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
} 