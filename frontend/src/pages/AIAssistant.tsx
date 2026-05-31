import { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const quickQuestions = [
  '新手应该从哪些器械开始？',
  '一周练几次比较合适？',
  '增肌期和减脂期有什么区别？',
  '健身前后的饮食怎么安排？',
  '如何避免运动损伤？',
  '每次训练多长时间合适？',
  '深蹲的正确姿势是什么？',
  '卧推怎么练？',
  '蛋白粉该怎么选？',
  '如何制定健身目标？',
];

// 简单的 AI 回复逻辑（实际项目中可以接入真正的 AI API）
const getAIResponse = (question: string): string => {
  const q = question.toLowerCase();

  if (q.includes('器械') || q.includes('开始')) {
    return `新手建议从固定器械开始，因为它们更安全、更容易掌握。推荐顺序：

1. **有氧器械**：跑步机、椭圆机（热身 5-10 分钟）
2. **胸部**：坐姿推胸机
3. **背部**：高位下拉机、坐姿划船机
4. **腿部**：腿举机、腿屈伸机
5. **肩部**：坐姿推肩机

先从轻重量开始，重点是学会正确的动作模式，而不是追求重量。每组 12-15 次，每次训练选择 4-5 个器械即可。`;
  }

  if (q.includes('一周') || q.includes('频率')) {
    return `对于新手，建议采用**三分化训练**：

📅 **周一**：胸部 + 三头肌
📅 **周三**：背部 + 二头肌
📅 **周五**：腿部 + 肩部

每周 3 次训练，每次 45-60 分钟。休息日可以做轻度有氧或完全休息。

重点是**规律性**，坚持比强度更重要！`;
  }

  if (q.includes('增肌') || q.includes('减脂')) {
    return `**增肌期**：
- 热量盈余：每天多摄入 300-500 卡路里
- 高蛋白：每公斤体重 1.6-2g 蛋白质
- 重视复合动作：深蹲、硬拉、卧推
- 训练重点：力量增长

**减脂期**：
- 热量缺口：每天少摄入 300-500 卡路里
- 保持蛋白质摄入：防止肌肉流失
- 增加有氧：每周 3-4 次，每次 20-30 分钟
- 训练重点：保持肌肉量

建议新手先增肌 3-6 个月，再考虑减脂！`;
  }

  if (q.includes('饮食') || q.includes('吃')) {
    return `**训练前**（1-2 小时）：
- 碳水为主：燕麦、香蕉、全麦面包
- 适量蛋白质：鸡蛋、酸奶
- 避免高脂肪食物

**训练后**（30 分钟内）：
- 快速碳水：香蕉、运动饮料
- 优质蛋白质：鸡胸肉、蛋白粉
- 这是肌肉恢复的黄金时间！

**日常饮食**：
- 三大营养素比例：碳水 50%、蛋白质 30%、脂肪 20%
- 多吃蔬菜水果，保证维生素摄入`;
  }

  if (q.includes('损伤') || q.includes('受伤')) {
    return `预防运动损伤的关键：

1. **充分热身**：5-10 分钟有氧 + 动态拉伸
2. **循序渐进**：先轻重量学动作，再慢慢加重
3. **正确姿势**：宁可重量轻，动作一定要标准
4. **不要借力**：用目标肌肉发力，不要甩动
5. **充足休息**：同一肌群休息 48-72 小时
6. **听从身体**：感到疼痛立即停止

⚠️ 如果已经受伤，请立即停止训练并咨询医生！`;
  }

  if (q.includes('多长') || q.includes('时间')) {
    return `理想的训练时长：

⏱️ **热身**：5-10 分钟
⏱️ **力量训练**：45-60 分钟
⏱️ **有氧（可选）**：15-20 分钟
⏱️ **拉伸放松**：5-10 分钟

**总时长**：60-90 分钟足够了！

超过 90 分钟可能导致：
- 皮质醇升高（分解肌肉）
- 注意力下降（增加受伤风险）
- 训练效果递减

质量比时间更重要！`;
  }

  if (q.includes('深蹲')) {
    return `**深蹲正确姿势**：

1️⃣ **站姿**：双脚与肩同宽，脚尖外展15-30度
2️⃣ **下蹲**：臀部向后坐，像坐在椅子上
3️⃣ **深度**：大腿与地面平行或略低
4️⃣ **膝盖**：方向与脚尖一致，不要内扣
5️⃣ **起身**：脚后跟发力，臀部夹紧

**常见错误**：
❌ 膝盖内扣 - 容易损伤膝盖
❌ 脚后跟离地 - 重心不稳
❌ 弓背或过度挺腰 - 腰椎压力大

**新手建议**：先用自重练习，每天3组×15-20个`;
  }

  if (q.includes('卧推')) {
    return `**卧推技巧详解**：

1️⃣ **躺下**：眼睛在杠铃正下方
2️⃣ **握距**：略宽于肩，手腕保持中立
3️⃣ **起杠**：肩胛骨后收下沉，胸部挺起
4️⃣ **下放**：控制速度，杠铃下放到胸口
5️⃣ **推起**：胸部发力，推至手臂伸直

**发力技巧**：
- 想象要把杠铃掰弯（激活背阔肌）
- 脚踩地面，形成稳定支撑
- 臀部贴紧凳子，核心收紧

**常见错误**：
❌ 手腕弯曲 - 容易受伤
❌ 肘部外展90度 - 肩关节压力大
❌ 臀部抬起 - 借力效果差`;
  }

  if (q.includes('蛋白粉')) {
    return `**蛋白粉类型**：

🥛 **乳清蛋白**：吸收最快，适合训练后
🧀 **酪蛋白**：吸收缓慢，适合睡前
🌱 **大豆蛋白**：植物蛋白，适合素食者
⚗️ **分离乳清**：纯度更高，乳糖含量低

**选购要点**：
1. 蛋白质含量应在70%以上
2. 添加剂越少越好
3. 选择知名品牌
4. 先买小包装试味

**使用建议**：
- 训练后30分钟内补充
- 每天1-2勺即可
- 正常饮食为主，蛋白粉为辅`;
  }

  if (q.includes('目标') || q.includes('计划') || q.includes('制定')) {
    return `**SMART目标设定法**：

📌 **S**pecific（具体的）
不要说"我想变壮"，要说"我想把胸围增加5cm"

📊 **M**easurable（可衡量的）
用数字说话，如体重、围度、力量数据

🎯 **A**chievable（可实现的）
目标要有挑战但不过于困难

🔗 **R**elevant（相关的）
目标要与你的生活相关

⏰ **T**ime-bound（有时限的）
设定截止日期

**新手期目标（0-3个月）**：
- 学习20个基础动作
- 建立每周3次训练习惯
- 掌握正确姿势

**进阶期目标（3-12个月）**：
- 卧推达到体重0.8倍
- 深蹲达到体重1倍
- 体脂下降3-5%`;
  }

  if (q.includes('硬拉')) {
    return `**硬拉入门教程**：

1️⃣ **站距**：双脚与髋同宽，杠铃贴住小腿
2️⃣ **握距**：双手略宽于肩，正握或正反握
3️⃣ **起始姿势**：臀部后推，背部挺直，胸部挺起
4️⃣ **拉起**：脚掌发力，臀部向前推
5️⃣ **锁定**：站直，臀部夹紧，肩膀后收

**关键要点**：
✅ 背部始终保持挺直
✅ 核心收紧，保护腰椎
✅ 杠铃紧贴身体移动

**新手建议**：
- 从空杆开始练习
- 先掌握罗马尼亚硬拉
- 建议找教练指导`;
  }

  if (q.includes('热身') || q.includes('拉伸')) {
    return `**完整热身流程**：

🔥 **有氧热身**（5-10分钟）
- 跑步机快走/慢跑
- 椭圆机
- 动感单车

🤸 **动态拉伸**（5分钟）
- 手臂环绕
- 腿部摆动
- 髋部旋转
- 猫牛式

🏋️ **热身组**
- 第一个动作用轻重量做1-2组
- 每组15-20次

**训练后拉伸**（5-10分钟）：
- 静态拉伸训练过的肌群
- 每个动作保持20-30秒
- 配合深呼吸`;
  }

  if (q.includes('休息') || q.includes('恢复')) {
    return `**休息的重要性**：

肌肉是在休息时生长的！科学安排休息日能让你进步更快。

**休息日安排**：
- 每周1-2个完全休息日
- 同一肌群需要48-72小时恢复
- 不要连续高强度训练超过3天

**主动恢复活动**：
🚶 轻度有氧（快走、慢跑）
💆 泡沫轴滚动
🧘 瑜伽或拉伸
🛁 泡澡桑拿

**休息日营养**：
- 蛋白质不能少
- 碳水可以适当减少
- 保证7-9小时睡眠`;
  }

  if (q.includes('有氧') || q.includes('减脂')) {
    return `**有氧训练指南**：

**有氧类型**：
🏃 跑步机 - 最基础
🚴 椭圆机 - 低冲击，保护关节
🚣 划船机 - 全身性
🚴 动感单车 - 高强度

**最佳时间**：
- 力量训练后：15-20分钟
- 单独有氧日：30-45分钟

**减脂建议**：
- 每周3-4次有氧
- 结合力量训练效果更好
- 尝试HIIT间歇训练

**心率区间**：
- 燃脂区间：最大心率的60-70%
- 最大心率 = 220 - 年龄`;
  }

  return `感谢你的提问！作为健身新手，你可以问我关于：

🏋️ **器械使用**：各种器械的正确使用方法
💪 **训练计划**：如何制定适合自己的训练计划
🥗 **饮食建议**：增肌减脂的饮食搭配
⚠️ **注意事项**：避免运动损伤的方法

你可以点击下方的快捷问题，或者直接输入你的问题！`;
};

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '你好！我是 FitStart AI 助手 🤖\n\n我可以帮你解答健身相关的问题，比如器械使用、训练计划、饮食建议等。\n\n有什么想问的吗？',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // 模拟 AI 响应延迟
    setTimeout(() => {
      const response = getAIResponse(userMessage);
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 500);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('你的浏览器不支持语音识别');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.continuous = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      {/* 页面标题 */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900">AI 健身助手</h1>
        <p className="text-gray-600 mt-1">有任何健身问题都可以问我</p>
      </div>

      {/* 消息区域 */}
      <div className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user' ? 'bg-primary-100' : 'bg-purple-100'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-4 h-4 text-primary-600" />
                ) : (
                  <Bot className="w-4 h-4 text-purple-600" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="whitespace-pre-wrap text-sm">{message.content}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <Bot className="w-4 h-4 text-purple-600" />
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 快捷问题 */}
        {messages.length <= 2 && (
          <div className="px-4 pb-2">
            <div className="text-xs text-gray-500 mb-2">快捷问题</div>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 输入区域 */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <button
              onClick={toggleVoice}
              className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                isListening ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="输入你的问题..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="flex-shrink-0 bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
