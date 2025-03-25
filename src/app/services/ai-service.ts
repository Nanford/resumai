import axios from 'axios';

export interface CareerAdvice {
  recommendedPositions: string[];
  recommendedCompanies: string[];
  salarySuggestion: string;
  locationSuggestion: string[];
  skillsToImprove: string[];
  additionalAdvice: string;
  thoughtProcess?: string; // 思考过程
}

export type ModelType = 'standard' | 'thinking';

// 实际环境中连接DeepSeek API的函数
export async function getCareerAdvice(resumeInfo: string, modelType: ModelType = 'standard'): Promise<CareerAdvice> {
  try {
    // 在实际部署时，应从环境变量中获取API密钥
    const DEEPSEEK_API_KEY = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY;
    
    if (DEEPSEEK_API_KEY) {
      try {
        // 根据模型类型设置不同的系统提示语
        let systemPrompt = '';
        if (modelType === 'thinking') {
          systemPrompt = '你是一位职业顾问AI助手，根据用户提供的履历信息，分析并给出职业建议。请按照如下两个步骤回答：\n1. 思考过程：详细分析用户背景、技能、行业趋势等，展示你的分析思路。\n2. 建议结果：以JSON格式返回以下字段：recommendedPositions(推荐职位数组), recommendedCompanies(推荐公司类型数组), salarySuggestion(薪资建议字符串), locationSuggestion(位置建议数组), skillsToImprove(需要提升的技能数组), additionalAdvice(额外建议字符串), thoughtProcess(思考过程的总结)';
        } else {
          systemPrompt = '你是一位职业顾问AI助手，根据用户提供的履历信息，分析并给出职业建议。请以JSON格式返回以下字段：recommendedPositions(推荐职位数组), recommendedCompanies(推荐公司类型数组), salarySuggestion(薪资建议字符串), locationSuggestion(位置建议数组), skillsToImprove(需要提升的技能数组), additionalAdvice(额外建议字符串)';
        }
        
        // 使用与Python示例相同的API调用方式
        const response = await axios.post('https://api.deepseek.com/v1/chat/completions', {
          model: modelType === 'thinking' ? 'deepseek-reasoner' : 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: resumeInfo
            }
          ],
          temperature: modelType === 'thinking' ? 0.8 : 0.7,
          max_tokens: modelType === 'thinking' ? 1200 : 800
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
          }
        });
        
        // 解析API响应
        const responseData = response.data;
        if (responseData.choices && responseData.choices[0]?.message?.content) {
          const content = responseData.choices[0].message.content;
          
          if (modelType === 'thinking') {
            // 提取思考过程和JSON结果
            const parts = content.split(/\n*\d+\.\s*(?:建议结果|最终建议|JSON结果)：\s*/);
            if (parts.length >= 2) {
              const thoughtProcess = parts[0].replace(/^\n*\d+\.\s*(?:思考过程|分析)：\s*/, '').trim();
              const jsonPart = parts[1];
              
              try {
                // 尝试从后半部分提取JSON
                const jsonMatch = jsonPart.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                  const advice = JSON.parse(jsonMatch[0]);
                  advice.thoughtProcess = thoughtProcess;
                  return advice;
                } else {
                  // 如果无法提取JSON，返回模拟数据并记录错误
                  console.error('Failed to extract JSON from thinking response');
                  return getMockCareerAdvice(resumeInfo, 'thinking', thoughtProcess);
                }
              } catch (e) {
                // 如果无法解析JSON，则返回模拟数据并记录错误
                console.error('Failed to parse thinking response as JSON:', e);
                return getMockCareerAdvice(resumeInfo, 'thinking', thoughtProcess);
              }
            } else {
              // 处理没有明确分隔的情况
              try {
                // 尝试直接从内容中提取JSON部分
                const jsonMatch = content.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                  // 提取思考过程 - 所有JSON之前的内容
                  const jsonStartIndex = content.indexOf(jsonMatch[0]);
                  const thoughtProcess = content.substring(0, jsonStartIndex).trim();
                  
                  const advice = JSON.parse(jsonMatch[0]);
                  advice.thoughtProcess = thoughtProcess;
                  return advice;
                } else {
                  // 如果无法提取JSON，返回模拟数据
                  return getMockCareerAdvice(resumeInfo, 'thinking');
                }
              } catch (e) {
                // 如果无法解析JSON，返回模拟数据
                console.error('Failed to parse unstructured thinking response:', e);
                return getMockCareerAdvice(resumeInfo, 'thinking');
              }
            }
          } else {
            try {
              // 尝试解析JSON响应
              const jsonMatch = content.match(/\{[\s\S]*\}/);
              if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
              } else {
                // 如果无法提取JSON，返回模拟数据
                console.error('Failed to extract JSON from response');
                return getMockCareerAdvice(resumeInfo);
              }
            } catch (e) {
              // 如果无法解析JSON，则返回模拟数据并记录错误
              console.error('Failed to parse API response as JSON:', e);
              return getMockCareerAdvice(resumeInfo);
            }
          }
        } else {
          // 如果响应格式不符合预期，返回模拟数据
          return getMockCareerAdvice(resumeInfo, modelType);
        }
      } catch (apiError) {
        // API调用失败，记录错误并返回模拟数据
        console.error('API call failed:', apiError);
        return getMockCareerAdvice(resumeInfo, modelType);
      }
    } else {
      // 如果没有API密钥，使用模拟数据
      console.log('No API key found, using mock data');
      return getMockCareerAdvice(resumeInfo, modelType);
    }
  } catch (error) {
    console.error('Error in career advice service:', error);
    throw new Error('Failed to get career advice');
  }
}

// 提供模拟数据的函数
function getMockCareerAdvice(resumeInfo: string, modelType: ModelType = 'standard', thoughtProcess?: string): Promise<CareerAdvice> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟分析简历内容 - 在实际场景中，这部分由AI完成
      const hasTechKeywords = resumeInfo.toLowerCase().includes('javascript') || 
                             resumeInfo.toLowerCase().includes('react') || 
                             resumeInfo.toLowerCase().includes('开发') ||
                             resumeInfo.toLowerCase().includes('程序');
      
      const hasDesignKeywords = resumeInfo.toLowerCase().includes('设计') || 
                               resumeInfo.toLowerCase().includes('ui') || 
                               resumeInfo.toLowerCase().includes('ux');
      
      const hasManagementKeywords = resumeInfo.toLowerCase().includes('管理') || 
                                   resumeInfo.toLowerCase().includes('leader') || 
                                   resumeInfo.toLowerCase().includes('项目经理');
      
      let advice: CareerAdvice;
      
      if (hasTechKeywords) {
        advice = {
          recommendedPositions: ['前端开发工程师', '全栈开发工程师', 'UI/UX开发工程师'],
          recommendedCompanies: ['科技初创公司', '互联网大厂', '金融科技公司'],
          salarySuggestion: '20-35万/年，根据经验和技能水平',
          locationSuggestion: ['北京', '上海', '深圳', '杭州', '远程工作'],
          skillsToImprove: ['React高级特性', 'TypeScript深入学习', '设计系统', '微前端架构'],
          additionalAdvice: '建议参与开源项目，建立个人技术博客，提升个人品牌。参加行业会议和技术社区活动，扩展人脉网络。',
        };
      } else if (hasDesignKeywords) {
        advice = {
          recommendedPositions: ['UI设计师', 'UX设计师', '产品设计师'],
          recommendedCompanies: ['设计工作室', '互联网公司', '广告创意公司'],
          salarySuggestion: '15-30万/年，视作品集质量和经验而定',
          locationSuggestion: ['上海', '北京', '深圳', '杭州'],
          skillsToImprove: ['Figma', 'Adobe XD', '用户研究方法', '交互设计原则'],
          additionalAdvice: '建立精美的设计作品集，参与设计比赛，关注最新设计趋势，积极参与设计社区讨论。',
        };
      } else if (hasManagementKeywords) {
        advice = {
          recommendedPositions: ['项目经理', '产品经理', '技术主管'],
          recommendedCompanies: ['大型企业', '科技公司', '咨询公司'],
          salarySuggestion: '30-50万/年，取决于管理经验和行业背景',
          locationSuggestion: ['北京', '上海', '广州', '深圳'],
          skillsToImprove: ['敏捷项目管理', '团队领导力', '商业策略', '数据分析'],
          additionalAdvice: '获取相关管理认证，如PMP，提升跨部门沟通能力，建立行业人脉，参加管理培训课程。',
        };
      } else {
        advice = {
          recommendedPositions: ['内容运营', '市场专员', '客户服务专家'],
          recommendedCompanies: ['互联网公司', '创业公司', '传统企业的新媒体部门'],
          salarySuggestion: '10-20万/年，根据经验和专业背景',
          locationSuggestion: ['全国主要城市', '远程工作'],
          skillsToImprove: ['内容创作', '社交媒体营销', '数据分析', '用户心理学'],
          additionalAdvice: '建立个人品牌，学习数字营销技能，了解行业趋势，提高沟通和表达能力。',
        };
      }
      
      // 如果是思考模型，添加思考过程
      if (modelType === 'thinking') {
        if (thoughtProcess) {
          advice.thoughtProcess = thoughtProcess;
        } else {
          advice.thoughtProcess = `我分析了您提供的信息，注意到以下几点：\n\n1. ${
            hasTechKeywords ? '您有技术背景，尤其在编程领域有经验' :
            hasDesignKeywords ? '您的设计技能非常突出' :
            hasManagementKeywords ? '您有管理经验和领导才能' :
            '您的背景多元化，适合多种职业发展路径'
          }\n\n2. 当前就业市场中，${
            hasTechKeywords ? '技术人才需求持续增长，尤其是有前端和全栈经验的开发者' :
            hasDesignKeywords ? '优秀的设计师可以在产品设计和用户体验领域找到很好的机会' :
            hasManagementKeywords ? '有经验的管理人才在大型科技公司和初创公司都有较大需求' :
            '内容创作和数字营销领域有大量机会'
          }\n\n3. 考虑到您的技能组合和市场趋势，我推荐您专注于${
            hasTechKeywords ? '前端和全栈开发岗位，特别是涉及现代框架如React的职位' :
            hasDesignKeywords ? 'UI/UX设计岗位，尤其是产品设计师角色' :
            hasManagementKeywords ? '项目管理或技术管理岗位，您的领导技能会在这些角色中得到充分发挥' :
            '内容创作和营销职位，您的多元背景将是优势'
          }`;
        }
      }
      
      resolve(advice);
    }, 2000);
  });
} 