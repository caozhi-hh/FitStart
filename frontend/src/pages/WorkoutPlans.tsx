import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { workoutPlansApi } from '../api/client';
import type { WorkoutPlan } from '../types';

export default function WorkoutPlans() {
  const [plans, setPlans] = useState<WorkoutPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      setLoading(true);
      const data = await workoutPlansApi.getAll();
      setPlans(data);
    } catch (error) {
      console.error('Failed to load plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner':
        return '新手';
      case 'intermediate':
        return '进阶';
      case 'advanced':
        return '高级';
      default:
        return level;
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">训练计划</h1>
        <p className="text-gray-600 mt-1">新手专属训练计划，科学训练快速进步</p>
      </div>

      {/* 训练计划列表 */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">加载中...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <span className={`text-xs px-3 py-1 rounded-full ${getLevelColor(plan.level)}`}>
                  {getLevelLabel(plan.level)}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  每周 {plan.days_per_week} 天
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {plan.duration_weeks} 周
                </div>
              </div>
              {/* 训练日程预览 */}
              <div className="border-t pt-4">
                <div className="text-sm font-medium text-gray-700 mb-2">训练日程</div>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(plan.schedule).map((day) => (
                    <span
                      key={day}
                      className="bg-primary-50 text-primary-600 text-xs px-2 py-1 rounded"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                to={`/plans/${plan.id}`}
                className="mt-4 flex items-center text-primary-600 text-sm font-medium hover:text-primary-700"
              >
                查看详细计划
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* 新手提示 */}
      <div className="bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-2">💡 新手建议</h3>
        <ul className="space-y-2 text-blue-800 text-sm">
          <li>• 从一周三次的三分化训练开始</li>
          <li>• 每次训练 45-60 分钟即可</li>
          <li>• 保证充足睡眠和营养摄入</li>
          <li>• 循序渐进，不要急于求成</li>
        </ul>
      </div>
    </div>
  );
}
