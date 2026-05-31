// Cloudflare Pages Functions - 简化版内存数据

// 内存数据
const equipmentData = [
  { id: '1', name: '哑铃', category: 'free_weights', target_muscle: '全身', description: '适合初学者的基础器械', difficulty: 'beginner' },
  { id: '2', name: '跑步机', category: 'cardio', target_muscle: '心肺/腿部', description: '有氧运动基础设备', difficulty: 'beginner' },
  { id: '3', name: '瑜伽垫', category: 'accessories', target_muscle: '全身', description: '瑜伽、拉伸必备', difficulty: 'beginner' },
  { id: '4', name: '壶铃', category: 'free_weights', target_muscle: '全身/核心', description: '功能性训练器械', difficulty: 'intermediate' },
  { id: '5', name: '弹力带', category: 'accessories', target_muscle: '全身', description: '轻便、多功能的训练工具', difficulty: 'beginner' },
];

const recipesData = [
  { id: '1', name: '高蛋白燕麦早餐', type: 'breakfast', description: '简单快手的高蛋白早餐', ingredients: '燕麦,蛋白粉,香蕉,牛奶', steps: '1. 燕麦加牛奶煮软\n2. 加入蛋白粉搅拌\n3. 放上香蕉片', calories: 350, protein: 25, carbs: 45, fat: 8 },
  { id: '2', name: '鸡胸肉沙拉', type: 'lunch', description: '低脂高蛋白午餐', ingredients: '鸡胸肉,生菜,番茄,黄瓜,橄榄油', steps: '1. 鸡胸肉煎熟切片\n2. 蔬菜洗净切好\n3. 淋上橄榄油', calories: 280, protein: 35, carbs: 15, fat: 10 },
  { id: '3', name: '三文鱼藜麦饭', type: 'dinner', description: '营养均衡的晚餐', ingredients: '三文鱼,藜麦,西兰花,柠檬', steps: '1. 藜麦煮熟\n2. 三文鱼煎至金黄\n3. 搭配西兰花摆盘', calories: 420, protein: 30, carbs: 35, fat: 18 },
];

const workoutPlansData = [
  { id: '1', name: '新手7天入门计划', description: '适合健身小白的入门计划', level: 'beginner', duration_weeks: 1, days_per_week: 3, schedule: JSON.stringify([
    { day: 1, focus: '全身', exercises: ['深蹲', '俯卧撑', '平板支撑'] },
    { day: 2, focus: '休息', exercises: [] },
    { day: 3, focus: '上肢', exercises: ['哑铃弯举', '俯卧撑', '肩推'] },
    { day: 4, focus: '休息', exercises: [] },
    { day: 5, focus: '下肢', exercises: ['深蹲', '箭步蹲', '臀桥'] },
  ])},
  { id: '2', name: '增肌基础计划', description: '4周增肌训练计划', level: 'beginner', duration_weeks: 4, days_per_week: 4, schedule: JSON.stringify([
    { day: 1, focus: '胸/三头', exercises: ['卧推', '飞鸟', '三头下压'] },
    { day: 2, focus: '背/二头', exercises: ['划船', '引体向上', '弯举'] },
    { day: 3, focus: '休息', exercises: [] },
    { day: 4, focus: '腿/肩', exercises: ['深蹲', '腿举', '肩推'] },
  ])},
];

const articlesData = [
  { id: '1', title: '健身新手必读：如何开始你的健身之旅', content: '健身是一段美好的旅程，对于新手来说，最重要的是建立正确的观念和习惯。首先，不要急于求成，健身是一个长期的过程。其次，学会正确的动作姿势比追求重量更重要。最后，合理饮食和充足休息同样重要。', category: 'guide', tags: '新手,指南', views: 1234, likes: 89, created_at: '2024-01-15' },
  { id: '2', title: '正确深蹲的5个要点', content: '深蹲是最基础也是最重要的动作之一。正确的深蹲技巧：1. 双脚与肩同宽 2. 膝盖对准脚尖方向 3. 下蹲时臀部后坐 4. 保持背部挺直 5. 蹲至大腿与地面平行', category: 'technique', tags: '深蹲,动作', views: 856, likes: 67, created_at: '2024-01-18' },
  { id: '3', title: '增肌饮食指南', content: '增肌需要充足的蛋白质摄入，建议每公斤体重摄入1.6-2.2克蛋白质。优质蛋白质来源包括鸡胸肉、鱼、蛋、牛肉和乳制品。同时不要忽视碳水化合物和健康脂肪的摄入。', category: 'nutrition', tags: '饮食,增肌', views: 2341, likes: 156, created_at: '2024-01-20' },
];

// 内存用户存储
const users: any[] = [];

export function onRequest(context: any) {
  return new Response(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// 导出数据供其他函数使用
export { equipmentData, recipesData, workoutPlansData, articlesData, users };
