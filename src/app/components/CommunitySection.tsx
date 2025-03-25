'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  HeartIcon, 
  ChatBubbleLeftIcon, 
  ShareIcon 
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/20/solid';

interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

export default function CommunitySection() {
  const { t, i18n } = useTranslation();
  const isChineseLanguage = i18n.language === 'zh';
  
  // 模拟社区帖子数据
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: isChineseLanguage ? '张小明' : 'Zhang Xiaoming',
      avatar: 'https://i.pravatar.cc/150?img=1',
      content: isChineseLanguage 
        ? '刚刚完成了ResuMAI的职业测评，推荐我去做前端开发工程师，感觉非常合理！大家有在这个领域工作的前辈吗？想请教一下该如何准备面试。'
        : 'Just completed the ResuMAI career assessment, which recommended me to be a front-end developer. It feels very reasonable! Are there any seniors working in this field? I would like to ask how to prepare for the interview.',
      timestamp: isChineseLanguage ? '1小时前' : '1 hour ago',
      likes: 24,
      comments: 5,
      isLiked: false,
    },
    {
      id: 2,
      author: isChineseLanguage ? '李华' : 'Li Hua',
      avatar: 'https://i.pravatar.cc/150?img=2',
      content: isChineseLanguage
        ? '分享一个好消息！通过ResuMAI的建议优化了简历，刚刚收到了字节跳动的面试邀请！感谢这个平台提供的帮助！'
        : 'Sharing some good news! I optimized my resume based on ResuMAI\'s suggestions and just received an interview invitation from ByteDance! Thanks for the help provided by this platform!',
      timestamp: isChineseLanguage ? '3小时前' : '3 hours ago',
      likes: 56,
      comments: 12,
      isLiked: true,
    },
    {
      id: 3,
      author: isChineseLanguage ? '王芳' : 'Wang Fang',
      avatar: 'https://i.pravatar.cc/150?img=5',
      content: isChineseLanguage
        ? '有没有转行到产品经理的朋友？AI建议我考虑产品方向，但我是技术背景，不确定能否胜任。想听听大家的意见。'
        : 'Are there any friends who have transitioned to product manager roles? AI suggested I consider the product direction, but I have a technical background and I\'m not sure if I can handle it. I would like to hear your opinions.',
      timestamp: isChineseLanguage ? '昨天' : 'Yesterday',
      likes: 18,
      comments: 8,
      isLiked: false,
    },
  ]);

  const [newPost, setNewPost] = useState('');

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    const newPostObj: Post = {
      id: posts.length + 1,
      author: isChineseLanguage ? '我' : 'Me',
      avatar: 'https://i.pravatar.cc/150?img=7',
      content: newPost,
      timestamp: isChineseLanguage ? '刚刚' : 'Just now',
      likes: 0,
      comments: 0,
      isLiked: false,
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost('');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
          {t('community.title')}
        </h2>
        <p className="text-gray-600 text-center mb-6">
          {t('community.description')}
        </p>
        
        <form onSubmit={handleAddPost} className="mb-6">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
            placeholder={t('community.post.placeholder')}
          ></textarea>
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {t('community.post.button')}
            </button>
          </div>
        </form>
        
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="border-b border-gray-200 pb-6 last:border-0">
              <div className="flex items-start mb-2">
                <img 
                  src={post.avatar} 
                  alt={post.author} 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{post.author}</h3>
                  <p className="text-sm text-gray-500">{post.timestamp}</p>
                </div>
              </div>
              <p className="text-gray-800 mb-3">{post.content}</p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => handleLike(post.id)}
                  className="flex items-center text-gray-500 hover:text-indigo-600"
                >
                  {post.isLiked ? (
                    <HeartSolidIcon className="h-5 w-5 text-red-500 mr-1" />
                  ) : (
                    <HeartIcon className="h-5 w-5 mr-1" />
                  )}
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-indigo-600">
                  <ChatBubbleLeftIcon className="h-5 w-5 mr-1" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-indigo-600">
                  <ShareIcon className="h-5 w-5 mr-1" />
                  <span>{t('post.share')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 