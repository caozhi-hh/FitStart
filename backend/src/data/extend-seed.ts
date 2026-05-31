import { v4 as uuidv4 } from 'uuid';
import { initDatabase, saveDatabase } from '../config/database';

// 扩展器械数据
const additionalEquipment = [
  // 核心力量区
  {
    id: uuidv4(),
    name: '罗马椅',
    category: '力量器械-核心',
    target_muscle: '竖脊肌、臀大肌、腘绳肌',
    description: '训练下背部和臀部的重要器械，改善体态',
    instructions: '1. 调整靠垫位置，大腿上部贴紧靠垫\n2. 双手交叉抱胸或放头后\n3. 缓慢向下弯曲脊柱\n4. 用下背部力量拉起身体\n5. 保持颈部自然，不要抬头',
    common_mistakes: '❌ 动作过快利用惯性\n❌ 抬头或低头过度\n❌ 下放过低\n❌ 负重过大',
    difficulty: 'intermediate'
  },
  {
    id: uuidv4(),
    name: '健腹轮',
    category: '力量器械-核心',
    target_muscle: '腹直肌、核心肌群',
    description: '高效的核心训练工具，难度较大',
    instructions: '1. 跪姿开始，双手握住健腹轮\n2. 核心收紧，缓慢向前推出\n3. 保持背部平直，不要塌腰\n4. 感受腹部拉伸\n5. 用腹肌力量拉回',
    common_mistakes: '❌ 塌腰导致腰痛\n❌ 动作幅度过大\n❌ 速度过快',
    difficulty: 'advanced'
  },
  {
    id: uuidv4(),
    name: '卷腹机',
    category: '力量器械-核心',
    target_muscle: '腹直肌',
    description: '安全的腹肌训练器械，适合新手',
    instructions: '1. 调整座椅和靠背\n2. 双手握住手柄\n3. 用腹肌力量向前卷起\n4. 感受腹部收缩\n5. 缓慢还原',
    common_mistakes: '❌ 用手臂发力\n❌ 动作过快\n❌ 下背离开靠背',
    difficulty: 'beginner'
  },
  // 自由重量
  {
    id: uuidv4(),
    name: '哑铃',
    category: '自由重量',
    target_muscle: '全身',
    description: '最灵活的自由重量，可训练全身肌群',
    instructions: '常见动作：\n1. 哑铃弯举 - 二头肌\n2. 哑铃推举 - 肩部\n3. 哑铃划船 - 背部\n4. 哑铃深蹲 - 腿部\n5. 哑铃卧推 - 胸部',
    common_mistakes: '❌ 重量选择不当\n❌ 动作不标准\n❌ 左右不平衡',
    difficulty: 'beginner'
  },
  {
    id: uuidv4(),
    name: '杠铃',
    category: '自由重量',
    target_muscle: '全身',
    description: '力量训练的王牌器械，适合大重量训练',
    instructions: '常见动作：\n1. 杠铃深蹲 - 腿部之王\n2. 杠铃硬拉 - 后链肌群\n3. 杠铃卧推 - 胸部经典\n4. 杠铃划船 - 背部厚度\n5. 杠铃推举 - 肩部力量',
    common_mistakes: '❌ 热身不足\n❌ 重量贪大\n❌ 护具缺失\n❌ 姿势错误',
    difficulty: 'intermediate'
  },
  {
    id: uuidv4(),
    name: '龙门架',
    category: '自由重量',
    target_muscle: '全身',
    description: '多功能训练器械，滑轮系统提供恒定张力',
    instructions: '常见用法：\n1. 高位下拉 - 背阔肌\n2. 绳索夹胸 - 胸肌中缝\n3. 绳索弯举 - 二头肌\n4. 绳索面拉 - 后肩\n5. 绳索侧平举 - 中束',
    common_mistakes: '❌ 重量过大\n❌ 动作不完整\n❌ 核心不稳',
    difficulty: 'intermediate'
  },
  {
    id: uuidv4(),
    name: '壶铃',
    category: '自由重量',
    target_muscle: '全身、爆发力',
    description: '功能性训练工具，提升爆发力和协调性',
    instructions: '常见动作：\n1. 壶铃摆荡 - 后链爆发力\n2. 壶铃高翻 - 全身协调\n3. 壶铃推举 - 肩部力量\n4. 土耳其起立 - 核心稳定\n5. 壶铃深蹲 - 腿部力量',
    common_mistakes: '❌ 用手臂而非髋部发力\n❌ 重量过大\n❌ 动作不连贯',
    difficulty: 'intermediate'
  },
  // 功能性训练区
  {
    id: uuidv4(),
    name: 'TRX悬挂训练带',
    category: '功能性训练',
    target_muscle: '全身、核心',
    description: '利用自身体重训练，提升稳定性和协调性',
    instructions: '常见动作：\n1. TRX俯卧撑 - 胸部+核心\n2. TRX划船 - 背部\n3. TRX深蹲 - 腿部\n4. TRX平板支撑 - 核心\n5. TRX飞鸟 - 胸肌',
    common_mistakes: '❌ 核心不稳\n❌ 带子长度不当\n❌ 动作幅度过大',
    difficulty: 'intermediate'
  },
  {
    id: uuidv4(),
    name: '弹力带',
    category: '功能性训练',
    target_muscle: '全身',
    description: '便携式阻力训练工具，适合热身和辅助训练',
    instructions: '常见用法：\n1. 弹力带深蹲 - 腿部\n2. 弹力带划船 - 背部\n3. 弹力带面拉 - 后肩\n4. 弹力带侧向走 - 臀中肌\n5. 弹力带拉伸 - 热身/放松',
    common_mistakes: '❌ 阻力选择不当\n❌ 固定点不牢固\n❌ 动作控制不好',
    difficulty: 'beginner'
  },
  {
    id: uuidv4(),
    name: '战绳',
    category: '功能性训练',
    target_muscle: '全身、心肺',
    description: '高强度全身训练，提升爆发力和心肺功能',
    instructions: '1. 双脚与肩同宽，膝盖微弯\n2. 双手各握一根绳端\n3. 交替上下挥动绳子\n4. 保持核心收紧\n5. 持续 30 秒为一组',
    common_mistakes: '❌ 只用手臂发力\n❌ 背部弯曲\n❌ 呼吸不配合',
    difficulty: 'intermediate'
  },
  // 拉伸恢复区
  {
    id: uuidv4(),
    name: '泡沫轴',
    category: '拉伸恢复',
    target_muscle: '全身筋膜',
    description: '自我筋膜放松工具，缓解肌肉紧张',
    instructions: '1. 将泡沫轴放在需要放松的部位下\n2. 用体重施加压力\n3. 缓慢滚动寻找痛点\n4. 在痛点停留 30-60 秒\n5. 常用部位：大腿、小腿、背部',
    common_mistakes: '❌ 滚动速度过快\n❌ 直接滚腰椎\n❌ 压力过大',
    difficulty: 'beginner'
  },
  {
    id: uuidv4(),
    name: '瑜伽垫',
    category: '拉伸恢复',
    target_muscle: '全身',
    description: '瑜伽、拉伸、核心训练必备',
    instructions: '用途：\n1. 瑜伽练习\n2. 拉伸放松\n3. 核心训练（平板支撑等）\n4. 自重训练\n5. 冥想放松',
    common_mistakes: '❌ 垫子滑动\n❌ 厚度选择不当\n❌ 清洁不及时',
    difficulty: 'beginner'
  }
];

// 扩展食谱数据
const additionalRecipes = [
  // 更多增肌食谱
  {
    id: uuidv4(),
    name: '意式鸡肉意面',
    type: '增肌',
    description: '碳水+蛋白质的完美组合，训练后的理想选择',
    ingredients: '全麦意面 100g\n鸡胸肉 150g\n番茄酱 100g\n洋葱 50g\n橄榄油 10ml\n罗勒叶适量',
    steps: '1. 意面按包装说明煮熟\n2. 鸡胸肉切丁煎至金黄\n3. 洋葱切碎炒香\n4. 加入番茄酱煮 5 分钟\n5. 混合意面和酱汁\n6. 撒上罗勒叶',
    calories: 550,
    protein: 45,
    carbs: 60,
    fat: 15,
    prep_time: 25
  },
  {
    id: uuidv4(),
    name: '希腊酸奶碗',
    type: '增肌',
    description: '高蛋白早餐或加餐，简单美味',
    ingredients: '希腊酸奶 200g\n燕麦 30g\n蓝莓 50g\n蜂蜜 15g\n核桃 15g\n奇亚籽 10g',
    steps: '1. 希腊酸奶倒入碗中\n2. 加入燕麦和奇亚籽\n3. 放上蓝莓\n4. 淋上蜂蜜\n5. 撒上核桃碎',
    calories: 380,
    protein: 25,
    carbs: 40,
    fat: 12,
    prep_time: 5
  },
  {
    id: uuidv4(),
    name: '牛肉西兰花炒饭',
    type: '增肌',
    description: '中式增肌餐，营养均衡',
    ingredients: '牛肉末 150g\n西兰花 100g\n糙米饭 150g\n鸡蛋 2个\n蒜、姜适量\n生抽 10ml',
    steps: '1. 西兰花焯水切小朵\n2. 鸡蛋打散炒熟备用\n3. 牛肉末炒散至变色\n4. 加入糙米饭炒散\n5. 加入西兰花和鸡蛋\n6. 调味翻炒均匀',
    calories: 520,
    protein: 38,
    carbs: 50,
    fat: 18,
    prep_time: 20
  },
  // 更多减脂食谱
  {
    id: uuidv4(),
    name: '金枪鱼蔬菜沙拉',
    type: '减脂',
    description: '低卡高蛋白，5分钟快手餐',
    ingredients: '金枪鱼罐头 100g\n生菜 100g\n小番茄 8个\n黄瓜 1根\n柠檬汁 适量\n黑胡椒适量',
    steps: '1. 金枪鱼沥干水分\n2. 蔬菜洗净切好\n3. 所有食材混合\n4. 挤上柠檬汁\n5. 撒上黑胡椒',
    calories: 180,
    protein: 28,
    carbs: 8,
    fat: 4,
    prep_time: 5
  },
  {
    id: uuidv4(),
    name: '鸡胸肉蔬菜汤',
    type: '减脂',
    description: '暖胃又饱腹，减脂期的好选择',
    ingredients: '鸡胸肉 100g\n西兰花 50g\n胡萝卜 50g\n蘑菇 50g\n姜片 3片\n盐适量',
    steps: '1. 鸡胸肉切块\n2. 蔬菜切块备用\n3. 水烧开，放入姜片\n4. 加入鸡肉煮 5 分钟\n5. 加入蔬菜再煮 5 分钟\n6. 调味即可',
    calories: 150,
    protein: 25,
    carbs: 10,
    fat: 2,
    prep_time: 15
  },
  {
    id: uuidv4(),
    name: '蛋白蔬菜饼',
    type: '减脂',
    description: '高蛋白低碳水，减脂期早餐',
    ingredients: '鸡蛋蛋白 4个\n菠菜 100g\n蘑菇 50g\n洋葱 30g\n盐、胡椒适量\n橄榄油 5ml',
    steps: '1. 蔬菜切碎\n2. 蛋白打散，加入蔬菜\n3. 平底锅刷少量油\n4. 倒入蛋液，小火煎熟\n5. 翻面煎至金黄',
    calories: 160,
    protein: 20,
    carbs: 6,
    fat: 5,
    prep_time: 10
  },
  {
    id: uuidv4(),
    name: '烤三文鱼配芦笋',
    type: '减脂',
    description: '优质蛋白+健康脂肪',
    ingredients: '三文鱼 150g\n芦笋 100g\n柠檬 1/2个\n迷迭香适量\n盐、胡椒适量',
    steps: '1. 三文鱼用盐、胡椒腌制\n2. 芦笋洗净去老根\n3. 烤箱预热 200°C\n4. 三文鱼和芦笋烤 15 分钟\n5. 挤上柠檬汁',
    calories: 280,
    protein: 32,
    carbs: 5,
    fat: 15,
    prep_time: 20
  }
];

async function extendSeed() {
  console.log('开始扩展知识库数据...');

  const db = await initDatabase();

  // 插入更多器械数据
  const insertEquipment = db.prepare(`
    INSERT INTO equipment (id, name, category, target_muscle, description, instructions, common_mistakes, difficulty)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const equipment of additionalEquipment) {
    try {
      insertEquipment.run(
        equipment.id,
        equipment.name,
        equipment.category,
        equipment.target_muscle,
        equipment.description,
        equipment.instructions,
        equipment.common_mistakes,
        equipment.difficulty
      );
    } catch (error) {
      console.log(`跳过已存在的器械: ${equipment.name}`);
    }
  }
  console.log(`✅ 新增 ${additionalEquipment.length} 个器械数据`);

  // 插入更多食谱数据
  const insertRecipe = db.prepare(`
    INSERT INTO recipes (id, name, type, description, ingredients, steps, calories, protein, carbs, fat, prep_time)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const recipe of additionalRecipes) {
    try {
      insertRecipe.run(
        recipe.id,
        recipe.name,
        recipe.type,
        recipe.description,
        recipe.ingredients,
        recipe.steps,
        recipe.calories,
        recipe.protein,
        recipe.carbs,
        recipe.fat,
        recipe.prep_time
      );
    } catch (error) {
      console.log(`跳过已存在的食谱: ${recipe.name}`);
    }
  }
  console.log(`✅ 新增 ${additionalRecipes.length} 个食谱数据`);

  // 保存数据库
  saveDatabase();

  console.log('\n🎉 知识库扩展完成！');
}

extendSeed().catch(console.error);
