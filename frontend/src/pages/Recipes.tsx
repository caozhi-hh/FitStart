import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Flame } from 'lucide-react';
import { recipesApi } from '../api/client';
import type { Recipe } from '../types';

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecipes();
  }, [selectedType]);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      const data = await recipesApi.getAll(selectedType || undefined);
      setRecipes(data);
    } catch (error) {
      console.error('Failed to load recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">饮食推荐</h1>
        <p className="text-gray-600 mt-1">科学搭配，让训练效果翻倍</p>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索食谱..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedType('')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedType === '' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            全部
          </button>
          <button
            onClick={() => setSelectedType('增肌')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedType === '增肌' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            增肌
          </button>
          <button
            onClick={() => setSelectedType('减脂')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedType === '减脂' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            减脂
          </button>
        </div>
      </div>

      {/* 食谱列表 */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">加载中...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              to={`/recipes/${recipe.id}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              {/* 食谱图片占位 */}
              <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <span className="text-6xl">{recipe.type === '增肌' ? '💪' : '🥗'}</span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                    {recipe.name}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    recipe.type === '增肌' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {recipe.type}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4" />
                    {recipe.calories} 卡路里
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {recipe.prep_time} 分钟
                  </div>
                </div>
                <div className="flex gap-2 mt-3 text-xs">
                  <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded">蛋白质 {recipe.protein}g</span>
                  <span className="bg-yellow-50 text-yellow-600 px-2 py-1 rounded">碳水 {recipe.carbs}g</span>
                  <span className="bg-red-50 text-red-600 px-2 py-1 rounded">脂肪 {recipe.fat}g</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
