import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 翻译资源
const resources = {
  en: {
    translation: {
      'site.title': 'ResuMAI - AI Resume Assistant',
      'site.description': 'Get personalized career advice and resume tips with AI',
      'site.subDescription': 'A free tool for job seekers to find their ideal career path. Use our AI to get personalized recommendations.',
      'home.placeholder': 'Share your career history, skills, and goals...',
      'home.button': 'Get Advice',
      'home.back': 'Back to Home',
      'community.title': 'Community',
      'community.description': 'Share experiences and get advice from other job seekers',
      'language': 'Language',
      'chat.title': 'Career Advisor',
      'chat.new': 'New Conversation',
      'chat.history': 'History',
      'chat.placeholder': 'Tell me about your experience, education, and career goals...',
      'chat.button': 'Send',
      'chat.empty': 'Start a new conversation by typing in the box below.',
      'chat.tip': 'Press Enter to send, Shift+Enter for a new line. For response in Chinese, include "in Chinese" or "中文" in your message.',
      'chat.save.title': 'Save Conversation',
      'chat.save.placeholder': 'Enter a title for this conversation',
      'chat.save.button': 'Save',
      'chat.save.cancel': 'Cancel',
      'chat.save.confirm': 'Save',
      'chat.model': 'Model',
      'model.standard.name': 'Standard',
      'model.standard.description': 'Fast, concise career advice',
      'model.standard.hint': 'quick responses',
      'model.thinking.name': 'DeepThink',
      'model.thinking.description': 'Shows detailed thinking process and reasoning',
      'model.thinking.hint': 'includes analysis',
      'model.thinking.process': 'Thinking Process',
      'post.like': 'Like',
      'post.comment': 'Comment',
      'post.share': 'Share',
      'error.advice': 'Sorry, there was an error getting career advice. Please try again later.',
      'career.positions': 'Recommended Positions',
      'career.companies': 'Recommended Companies',
      'career.salary': 'Salary Suggestion',
      'career.locations': 'Recommended Locations',
      'career.skills': 'Skills to Improve',
      'career.advice': 'Additional Advice',
      'community.post.placeholder': 'Share your job seeking experience, questions, or advice...',
      'community.post.button': 'Post',
      'hero.highlight': 'AI-Powered Career Guidance',
      'hero.title': 'Find Your Perfect Career Path',
      'hero.description': 'Let our AI analyze your skills and experience to recommend the best career opportunities for you.',
      'hero.cta': 'Get Started',
      'features.title': 'How ResuMAI Helps You',
      'features.subtitle': 'Advanced tools designed to enhance your job search experience',
      'features.ai.title': 'Smart AI Analysis',
      'features.ai.description': 'Our advanced AI analyzes your skills, experience, and goals to provide personalized career recommendations.',
      'features.community.title': 'Supportive Community',
      'features.community.description': 'Connect with fellow job seekers, share experiences, and learn from others in similar positions.',
      'features.personalized.title': 'Tailored Advice',
      'features.personalized.description': 'Get specific salary ranges, company recommendations, and skill improvement suggestions relevant to your profile.',
      'cta.title': 'Ready to advance your career?',
      'cta.description': 'Join thousands of job seekers who have found their ideal positions with ResuMAI.',
      'cta.button': 'Start Free Career Analysis',
      'footer.rights': 'All rights reserved.'
    },
  },
  zh: {
    translation: {
      'site.title': 'ResuMAI - AI简历助手',
      'site.description': '获取AI提供的个性化职业建议和简历技巧',
      'site.subDescription': '一个为求职者提供的免费工具，帮助找到理想的职业路径。使用我们的AI获取个性化推荐。',
      'home.placeholder': '分享你的职业经历、技能和目标...',
      'home.button': '获取建议',
      'home.back': '返回首页',
      'community.title': '社区',
      'community.description': '分享经验并从其他求职者获取建议',
      'language': '语言',
      'chat.title': '职业顾问',
      'chat.new': '新建对话',
      'chat.history': '历史记录',
      'chat.placeholder': '告诉我你的经验、教育背景和职业目标...',
      'chat.button': '发送',
      'chat.empty': '在下方输入框中开始新的对话。',
      'chat.tip': '按回车键发送，Shift+回车换行。如需中文回复，请在消息中包含"中文"或"用中文"。',
      'chat.save.title': '保存对话',
      'chat.save.placeholder': '为此对话输入标题',
      'chat.save.button': '保存',
      'chat.save.cancel': '取消',
      'chat.save.confirm': '保存',
      'chat.model': '模型',
      'model.standard.name': '标准模式',
      'model.standard.description': '快速、简洁的职业建议',
      'model.standard.hint': '简洁回复',
      'model.thinking.name': '深度思考',
      'model.thinking.description': '显示详细的思考过程和推理',
      'model.thinking.hint': '包含分析过程',
      'model.thinking.process': '思考过程',
      'post.like': '点赞',
      'post.comment': '评论',
      'post.share': '分享',
      'error.advice': '抱歉，获取职业建议时出现了错误，请稍后再试。',
      'career.positions': '推荐职位',
      'career.companies': '推荐公司类型',
      'career.salary': '薪资建议',
      'career.locations': '推荐工作地点',
      'career.skills': '需要提升的技能',
      'career.advice': '额外建议',
      'community.post.placeholder': '分享你的求职经验、问题或建议...',
      'community.post.button': '发布',
      'hero.highlight': 'AI驱动的职业指导',
      'hero.title': '找到你的完美职业路径',
      'hero.description': '让我们的AI分析你的技能和经验，为你推荐最佳的职业机会。',
      'hero.cta': '立即开始',
      'features.title': 'ResuMAI如何帮助您',
      'features.subtitle': '专为提升求职体验而设计的先进工具',
      'features.ai.title': '智能AI分析',
      'features.ai.description': '我们的先进AI会分析你的技能、经验和目标，提供个性化的职业推荐。',
      'features.community.title': '支持性社区',
      'features.community.description': '与其他求职者联系，分享经验，向处于类似位置的人学习。',
      'features.personalized.title': '量身定制的建议',
      'features.personalized.description': '获取与你的个人资料相关的具体薪资范围、公司推荐和技能提升建议。',
      'cta.title': '准备好提升你的职业生涯了吗？',
      'cta.description': '加入已经通过ResuMAI找到理想职位的数千名求职者行列。',
      'cta.button': '开始免费职业分析',
      'footer.rights': '版权所有。'
    },
  },
};

// 初始化i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // 默认语言
    interpolation: {
      escapeValue: false, // 不转义HTML
    },
  });

export default i18n; 