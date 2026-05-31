import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, CheckCircle } from 'lucide-react';
import { equipmentApi } from '../api/client';
import type { Equipment } from '../types';

export default function EquipmentDetail() {
  const { id } = useParams<{ id: string }>();
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEquipment();
  }, [id]);

  const loadEquipment = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await equipmentApi.getById(id);
      setEquipment(data);
    } catch (error) {
      console.error('Failed to load equipment:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500">加载中...</div>
    );
  }

  if (!equipment) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">器械不存在</p>
        <Link to="/equipment" className="text-primary-600 hover:underline">
          返回器械列表
        </Link>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
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

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '新手友好';
      case 'intermediate':
        return '进阶训练';
      case 'advanced':
        return '高级训练';
      default:
        return difficulty;
    }
  };

  return (
    <div className="space-y-8">
      {/* 返回按钮 */}
      <Link
        to="/equipment"
        className="inline-flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        返回器械列表
      </Link>

      {/* 标题区域 */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{equipment.name}</h1>
            <div className="flex items-center gap-3">
              <span className="text-primary-600">{equipment.category}</span>
              <span className={`text-sm px-3 py-1 rounded-full ${getDifficultyColor(equipment.difficulty)}`}>
                {getDifficultyLabel(equipment.difficulty)}
              </span>
            </div>
          </div>
        </div>
        <p className="text-gray-600">{equipment.description}</p>
        <div className="mt-4 text-sm">
          <span className="font-medium text-gray-700">目标肌群：</span>
          <span className="text-primary-600 ml-2">{equipment.target_muscle}</span>
        </div>
      </div>

      {/* 使用说明 */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          使用步骤
        </h2>
        <div className="space-y-3">
          {equipment.instructions.split('\n').map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              <p className="text-gray-700">{step.replace(/^\d+\.\s*/, '')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 常见错误 */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          常见错误
        </h2>
        <div className="space-y-2">
          {equipment.common_mistakes.split('\n').map((mistake, index) => (
            <div key={index} className="text-red-600 bg-red-50 px-4 py-2 rounded-lg">
              {mistake}
            </div>
          ))}
        </div>
      </div>

      {/* 视频教程 */}
      {equipment.video_url && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">视频教程</h2>
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">视频加载中...</p>
          </div>
        </div>
      )}
    </div>
  );
}
