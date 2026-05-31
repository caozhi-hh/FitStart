import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { workoutPlansApi } from '../api/client';
import type { WorkoutPlan } from '../types';

export default function WorkoutPlanDetail() {
  const { id } = useParams<{ id: string }>();
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedDays, setExpandedDays] = useState<string[]>([]);

  useEffect(() => {
    loadPlan();
  }, [id]);

  const loadPlan = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await workoutPlansApi.getById(id);
      setPlan(data);
    } catch (error) {
      console.error('Failed to load plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDay = (day: string) => {
    setExpandedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
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
        return '新手入门';
      case 'intermediate':
        return '进阶训练';
      case 'advanced':
        return '高级训练';
      default:
        return level;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500">加载中...</div>
    );
  }

  if (!plan) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">训练计划不存在</p>
        <Link to="/plans" className="text-primary-600 hover:underline">
          返回训练计划列表
        </Link>
      </div>
    );
  }

  const schedule = plan.schedule as Record<string, { name: string; exercises: Array<{ name: string; sets: number; reps: string; rest: string; note?: string }> }>;

  return (
    <div className="space-y-8">
      {/* 返回按钮 */}
      <Link
        to="/plans"
        className="inline-flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        返回训练计划列表
      </Link>

      {/* 计划头部 */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className={`text-sm px-3 py-1 rounded-full ${getLevelColor(plan.level)}`}>
              {getLevelLabel(plan.level)}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-3">{plan.name}</h1>
          </div>
        </div>
        <p className="text-gray-600 mb-6">{plan.description}</p>
        <div className="flex items-center gap-6 text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>每周 {plan.days_per_week} 天训练</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{plan.duration_weeks} 周计划</span>
          </div>
        </div>
      </div>

      {/* 训练日程 */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">训练日程</h2>
        {Object.entries(schedule).map(([day, daySchedule]) => (
          <div key={day} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <button
              onClick={() => toggleDay(day)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="text-primary-600 font-bold">{day.slice(2)}</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">{day}</div>
                  <div className="text-sm text-gray-500">{daySchedule.name}</div>
                </div>
              </div>
              {expandedDays.includes(day) ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {expandedDays.includes(day) && (
              <div className="border-t p-4">
                <div className="space-y-3">
                  {daySchedule.exercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{exercise.name}</div>
                        <div className="text-sm text-gray-500">
                          {exercise.sets} 组 × {exercise.reps}
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">
                        休息 {exercise.rest}
                      </div>
                      {exercise.note && (
                        <div className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded">
                          {exercise.note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 训练提示 */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">💡 训练提示</h3>
        <ul className="space-y-2 text-gray-700 text-sm">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>训练前充分热身 5-10 分钟</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>选择能完成目标次数的重量，最后两组应该有些吃力</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>组间休息 60-90 秒，不要休息太久</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>训练后拉伸放松 5-10 分钟</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>保证充足睡眠和营养摄入</span>
          </li>
        </ul>
      </div>

      {/* 开始训练按钮 */}
      <div className="flex gap-4">
        <button className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors">
          开始训练
        </button>
        <button className="px-6 py-3 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
          收藏计划
        </button>
      </div>
    </div>
  );
}
