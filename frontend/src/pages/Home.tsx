import { Link } from 'react-router-dom';
import { Dumbbell, Apple, Calendar, BookOpen, MessageCircle, ArrowRight, Target, Users, Lightbulb } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Dumbbell,
      title: '器械百科',
      description: '20+ 种健身器械使用教程，图文详解，新手也能快速上手',
      path: '/equipment',
      color: 'bg-blue-500',
    },
    {
      icon: Apple,
      title: '饮食推荐',
      description: '增肌减脂食谱推荐，科学搭配，让你的训练效果翻倍',
      path: '/recipes',
      color: 'bg-green-500',
    },
    {
      icon: Calendar,
      title: '训练计划',
      description: '新手专属训练计划，三分化、四分化任你选择',
      path: '/plans',
      color: 'bg-purple-500',
    },
    {
      icon: BookOpen,
      title: '经验分享',
      description: '健身达人经验分享，少走弯路，快速进步',
      path: '/articles',
      color: 'bg-orange-500',
    },
  ];

  const tips = [
    { icon: Target, text: '从轻重量开始，先学会正确姿势' },
    { icon: Users, text: '找到适合自己的训练计划' },
    { icon: Lightbulb, text: '饮食和训练同样重要' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero 区域 */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          欢迎来到 <span className="text-primary-600">FitStart</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          专为健身新手打造的知识平台，让你少走弯路，快速上手健身
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/equipment"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            <Dumbbell className="w-5 h-5" />
            开始学习器械
          </Link>
          <Link
            to="/plans"
            className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            查看训练计划
          </Link>
        </div>
      </section>

      {/* 新手提示 */}
      <section className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">💡 新手必看</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-4">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Icon className="w-5 h-5 text-primary-600" />
                </div>
                <p className="text-gray-700">{tip.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 功能卡片 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">探索功能</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={index}
                to={feature.path}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`inline-flex p-3 rounded-lg ${feature.color} text-white mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                <span className="inline-flex items-center text-primary-600 text-sm font-medium">
                  前往查看
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* AI 助手推广 */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
        <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-90" />
        <h2 className="text-2xl font-bold mb-2">有健身问题？问 AI 助手！</h2>
        <p className="text-white/80 mb-6 max-w-xl mx-auto">
          不知道怎么练？不确定饮食怎么搭配？AI 助手随时为你解答
        </p>
        <Link
          to="/ai-assistant"
          className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          开始对话
        </Link>
      </section>

      {/* 快速统计 */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: '器械教程', value: '20+' },
          { label: '健身食谱', value: '8+' },
          { label: '训练计划', value: '3套' },
          { label: '新手友好', value: '100%' },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-primary-600 mb-1">{stat.value}</div>
            <div className="text-gray-600 text-sm">{stat.label}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
