import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, ChevronRight } from 'lucide-react';
import { recipesApi } from '../api/client';
import type { Recipe } from '../types';

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await recipesApi.getById(id);
      setRecipe(data);
    } catch (error) {
      console.error('Failed to load recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500">加载中...</div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">食谱不存在</p>
        <Link to="/recipes" className="text-primary-600 hover:underline">
          返回食谱列表
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 返回按钮 */}
      <Link
        to="/recipes"
        className="inline-flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        返回食谱列表
      </Link>

      {/* 食谱头部 */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        {/* 食谱封面 */}
        <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
          <span className="text-8xl">{recipe.type === '增肌' ? '💪' : '🥗'}</span>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-sm px-3 py-1 rounded-full ${
              recipe.type === '增肌'
                ? 'bg-orange-100 text-orange-700'
                : 'bg-green-100 text-green-700'
            }`}>
              {recipe.type}
            </span>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <Clock className="w-4 h-4" />
              {recipe.prep_time} 分钟
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe.name}</h1>
          <p className="text-gray-600">{recipe.description}</p>
        </div>
      </div>

      {/* 营养信息 */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">营养信息</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{recipe.calories}</div>
            <div className="text-sm text-gray-600">卡路里</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{recipe.protein}g</div>
            <div className="text-sm text-gray-600">蛋白质</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{recipe.carbs}g</div>
            <div className="text-sm text-gray-600">碳水化合物</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{recipe.fat}g</div>
            <div className="text-sm text-gray-600">脂肪</div>
          </div>
        </div>
      </div>

      {/* 食材清单 */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">食材清单</h2>
        <div className="space-y-2">
          {recipe.ingredients.split('\n').map((ingredient, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <ChevronRight className="w-4 h-4 text-primary-500" />
              <span>{ingredient}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 制作步骤 */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">制作步骤</h2>
        <div className="space-y-4">
          {recipe.steps.split('\n').map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <p className="flex-1 text-gray-700 pt-1">
                {step.replace(/^\d+\.\s*/, '')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 小贴士 */}
      <div className="bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-3">💡 小贴士</h3>
        <ul className="space-y-2 text-blue-800 text-sm">
          <li>• 建议提前准备好所有食材</li>
          <li>• 可以一次做两份，第二天继续吃</li>
          <li>• 根据个人口味调整调料用量</li>
        </ul>
      </div>
    </div>
  );
}
