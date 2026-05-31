import { v4 as uuidv4 } from 'uuid';
import { initDatabase, saveDatabase, setInitializedDb } from '../config/database';

// 器械数据
const equipmentData = [
  // 有氧区
  {
    id: uuidv4(),
    name: '跑步机',
    category: '有氧器械',
    target_muscle: '腿部、心肺',
    description: '最基础的有氧训练设备，适合热身和燃脂',
    instructions: '1. 先设置合适的速度（新手建议4-6km/h）\n2. 保持身体直立，不要扶扶手\n3. 脚掌中部着地，步伐自然\n4. 保持均匀呼吸',
    common_mistakes: '❌ 步幅过大\n❌ 身体前倾过度\n❌ 扶着扶手跑步',
    difficulty: 'beginner'
  },
  {
    id: uuidv4(),
    name: '椭圆机',
    category: '有氧器械',
    target_muscle: '全身、心肺',
    description: '低冲击的全身有氧器械，保护关节',
    instructions: '1. 双脚踩在踏板上，手握把手\n2. 保持核心稳定\n3. 手脚协调运动\n4. 调整合适的阻力',
    common_mistakes: '❌ 身体晃动过大\n❌ 只用腿部发力',
    difficulty: 'beginner'
  },
  {
    id: uuidv4(),
    name: '划船机',
    category: '有氧器械',
    target_muscle: '背部、腿部、心肺',
    description: '全身性有氧运动，主要锻炼背部和腿部',
    instructions: '1. 坐在座椅上，双脚踩稳踏板\n2. 身体前倾，双手握住手柄\n3. 腿部蹬伸，同时手臂拉向身体\n4. 控制速度回放',
    common_mistakes: '❌ 只用手臂发力\n❌ 背部弯曲\n❌ 速度过快',
    difficulty: 'intermediate'
  },
  {
    id: uuidv4(),
    name: '动感单车',
    category: '有氧器械',
    target_muscle: '腿部、心肺',
    description: '高强度有氧训练，燃脂效果好',
    instructions: '1. 调整座椅高度（髋部高度）\n2. 调整把手位置\n3. 保持背部挺直\n4. 用前脚掌踩踏',
    common_mistakes: '❌ 座椅过高或过低\n❌ 身体左右摇晃\n❌ 阻力过小空转',
    difficulty: 'beginner'
  },
  // 力量区 - 上肢推
  {
    id: uuidv4(),
    name: '坐姿推胸机',
    category: '力量器械-胸部',
    target_muscle: '胸大肌、三角肌前束、肱三头肌',
    description: '最安全的胸部训练器械，适合新手入门',
    instructions: '1. 调整座椅高度，手柄与胸部齐平\n2. 背部贴紧靠背，挺胸收腹\n3. 握住手柄，向前推出\n4. 感受胸部收缩，缓慢还原',
    common_mistakes: '❌ 含胸驼背\n❌ 推出时耸肩\n❌ 还原速度过快',
    difficulty: 'beginner'
  },
  {
    id: uuidv4(),
    name: '蝴蝶机',
    category: '力量器械-胸部',
    target_muscle: '胸大肌中缝',
    description: '针对胸肌中缝的孤立训练',
    instructions: '1. 调整座椅高度\n2. 背部贴紧靠背\n3. 手臂弯曲90度，放在垫子上\n4. 向内夹紧，感受胸肌收缩',
    common_mistakes: '❌ 手臂伸直\n❌ 动作过快\n❌ 重量过大',
    difficulty: 'beginner'
  },
  {
    id: uuidv4(),
    name: '上斜推胸机',
    category: '力量器械-胸部',
    target_muscle: '胸大肌上束',
    description: '针对上胸部的训练器械',
    instructions: '1. 调整座椅高度\n2. 靠背角度约30-45度\n3. 向上斜上方推出\n4. 感受上胸收缩',
    common_mistakes: '❌ 角度调整不当\n❌ 推出时耸肩',
    difficulty: 'intermediate'
  },
  // 力量区 - 上肢拉
  {
    id: uuidv4(),
    name: '高位下拉机',
    category: '力量器械-背部',
    target_muscle: '背阔肌、大圆肌',
    description: '锻炼背部宽度的基础动作',
    instructions: '1. 坐在座椅上，大腿固定\n2. 宽握横杆，身体微后仰\n3. 下拉至锁骨位置\n4. 感受背部收缩，缓慢还原',
    common_mistakes: '❌ 身体过度后仰\n❌ 用手臂发力\n❌ 下拉过低或过高',
    difficulty: 'beginner'
  },
  {
    id: uuidv4(),
    name: '坐姿划船机',
    category: '力量器械-背部',
    target_muscle: '背阔肌、菱形肌',
    description: '锻炼背部厚度的经典器械',
    instructions: '1. 坐在座椅上，双脚踩稳\n2. 身体前倾握住手柄\n3. 拉向腹部，夹紧背部\n4. 缓慢还原，保持张力',
    common_mistakes: '❌ 身体过度摇晃\n❌ 还原时身体前倾\n❌ 只用手臂发力',
    difficulty: 'beginner'
  },
  {
    id: uuidv4(),
    name: '单臂哑铃划船',
    category: '力量器械-背部',
    target_muscle: '背阔肌',
    description: '单侧背部训练，改善不对称',
    instructions: '1. 一手一膝撑在凳上\n2. 另一手持哑铃自然下垂\n3. 拉起哑铃至腰侧\n4. 感受背部收缩',
    common_mistakes: '❌ 身体扭转\n❌ 重量过大\n❌ 借力甩动',
    difficulty: 'intermediate'
  },
  // 力量区 - 肩部
  {
    id: uuidv4(),
    name: '坐姿推肩机',
    category: '力量器械-肩部',
    target_muscle: '三角肌前束、中束',
    description: '最安全的肩部训练器械',
    instructions: '1. 坐在座椅上，背部贴紧\n2. 握住手柄，向上推起\n3. 手臂伸直但不过度\n4. 缓慢下放',
    common_mistakes: '❌ 耸肩\n❌ 推举时身体后仰\n❌ 下放过快',
    difficulty: 'beginner'
  },
  {
    id: uuidv4(),
    name: '侧平举机',
    category: '力量器械-肩部',
    target_muscle: '三角肌中束',
    description: '针对肩膀宽度的孤立训练',
    instructions: '1. 坐在座椅上，手臂放在垫子上\n2. 向两侧抬起至肩高\n3. 感受中束收缩\n4. 缓慢下放',
    common_mistakes: '❌ 抬得过高\n❌ 利用惯性\n❌ 耸肩',
    difficulty: 'beginner'
  },
  {
    id: uuidv4(),
    name: '反向飞鸟机',
    category: '力量器械-肩部',
    target_muscle: '三角肌后束',
    description: '针对后肩的训练器械',
    instructions: '1. 面向座椅坐好\n2. 双手握住手柄\n3. 向后拉开\n4. 感受后肩收缩',
    common_mistakes: '❌ 身体摇晃\n❌ 重量过大\n❌ 动作过快',
    difficulty: 'intermediate'
  },
  // 力量区 - 手臂
  {
    id: uuidv4(),
    name: '二头肌弯举机',
    category: '力量器械-手臂',
    target_muscle: '肱二头肌',
    description: '针对二头肌的孤立训练',
    instructions: '1. 坐在座椅上，手臂放在垫子上\n2. 握住手柄向上弯举\n3. 感受二头肌收缩\n4. 缓慢下放',
    common_mistakes: '❌ 利用身体晃动\n❌ 下放不完全\n❌ 重量过大',
    difficulty: 'beginner'
  },
  {
    id: uuidv4(),
    name: '三头肌下压机',
    category: '力量器械-手臂',
    target_muscle: '肱三头肌',
    description: '针对三头肌的孤立训练',
    instructions: '1. 面向器械站立\n2. 握住绳索或手柄\n3. 向下压至手臂伸直\n4. 感受三头肌收缩',
    common_mistakes: '❌ 身体前倾\n❌ 肘部外展\n❌ 还原过快',
    difficulty: 'beginner'
  },
  // 力量区 - 下肢
  {
    id: uuidv4(),
    name: '腿举机',
    category: '力量器械-腿部',
    target_muscle: '股四头肌、臀大肌',
    description: '安全的腿部复合训练器械',
    instructions: '1. 坐在座椅上，背部贴紧\n2. 双脚踩在踏板上（肩宽）\n3. 向前推出\n4. 缓慢还原',
    common_mistakes: '❌ 膝盖内扣\n❌ 脚放太低\n❌ 完全锁死膝盖',
    difficulty: 'beginner'
  },
  {
    id: uuidv4(),
    name: '腿屈伸机',
    category: '力量器械-腿部',
    target_muscle: '股四头肌',
    description: '针对大腿前侧的孤立训练',
    instructions: '1. 坐在座椅上，调整靠背\n2. 脚踝放在垫子后\n3. 向前抬起至腿伸直\n4. 缓慢下放',
    common_mistakes: '❌ 重量过大\n❌ 动作过快\n❌ 身体晃动',
    difficulty: 'beginner'
  },
  {
    id: uuidv4(),
    name: '腿弯举机',
    category: '力量器械-腿部',
    target_muscle: '腘绳肌',
    description: '针对大腿后侧的孤立训练',
    instructions: '1. 趴在器械上，调整位置\n2. 脚踝放在垫子下\n3. 向后弯举\n4. 感受后侧收缩',
    common_mistakes: '❌ 臀部抬起\n❌ 动作过快\n❌ 重量过大',
    difficulty: 'beginner'
  },
  {
    id: uuidv4(),
    name: '臀桥机',
    category: '力量器械-臀部',
    target_muscle: '臀大肌',
    description: '针对臀部的孤立训练',
    instructions: '1. 背部靠在垫子上\n2. 双脚踩在踏板上\n3. 臀部发力向上推起\n4. 顶峰收缩1-2秒',
    common_mistakes: '❌ 用腰部发力\n❌ 下落过快\n❌ 推得过高腰部过伸',
    difficulty: 'beginner'
  },
  {
    id: uuidv4(),
    name: '小腿提踵机',
    category: '力量器械-腿部',
    target_muscle: '小腿三头肌',
    description: '针对小腿的孤立训练',
    instructions: '1. 坐在座椅上，脚掌踩在踏板上\n2. 脚尖向上抬起\n3. 感受小腿收缩\n4. 缓慢下放',
    common_mistakes: '❌ 动作过快\n❌ 活动幅度不够',
    difficulty: 'beginner'
  }
];

// 食谱数据
const recipesData = [
  // 增肌食谱
  {
    id: uuidv4(),
    name: '经典鸡胸肉西兰花',
    type: '增肌',
    description: '健身餐的经典搭配，高蛋白低脂肪',
    ingredients: '鸡胸肉 200g\n西兰花 150g\n糙米 100g\n橄榄油 10ml\n盐、黑胡椒适量',
    steps: '1. 鸡胸肉切片，用盐和黑胡椒腌制10分钟\n2. 西兰花切小朵，焯水备用\n3. 平底锅刷橄榄油，煎鸡胸肉至两面金黄\n4. 糙米提前煮熟\n5. 装盘即可食用',
    calories: 480,
    protein: 45,
    carbs: 40,
    fat: 12,
    prep_time: 25
  },
  {
    id: uuidv4(),
    name: '牛肉土豆泥',
    type: '增肌',
    description: '高碳水高蛋白，适合训练后补充',
    ingredients: '牛排 200g\n土豆 200g\n牛奶 50ml\n黄油 10g\n盐适量',
    steps: '1. 土豆去皮切块，蒸熟\n2. 趁热加入牛奶和黄油，压成泥\n3. 牛排煎至喜欢的熟度\n4. 装盘，牛排搭配土豆泥',
    calories: 580,
    protein: 42,
    carbs: 50,
    fat: 22,
    prep_time: 30
  },
  {
    id: uuidv4(),
    name: '三文鱼牛油果沙拉',
    type: '增肌',
    description: '优质脂肪与蛋白质的完美结合',
    ingredients: '三文鱼 150g\n牛油果 1个\n混合生菜 100g\n柠檬汁 适量\n橄榄油 15ml',
    steps: '1. 三文鱼煎至表面金黄\n2. 牛油果切片\n3. 生菜洗净铺底\n4. 摆上三文鱼和牛油果\n5. 淋上柠檬汁和橄榄油',
    calories: 520,
    protein: 35,
    carbs: 15,
    fat: 38,
    prep_time: 15
  },
  {
    id: uuidv4(),
    name: '鸡蛋燕麦早餐',
    type: '增肌',
    description: '简单快手的增肌早餐',
    ingredients: '燕麦 80g\n鸡蛋 3个\n牛奶 200ml\n香蕉 1根\n坚果 20g',
    steps: '1. 燕麦加牛奶煮成粥\n2. 鸡蛋煮熟或煎熟\n3. 香蕉切片\n4. 燕麦粥上放上香蕉片和坚果\n5. 搭配鸡蛋一起食用',
    calories: 620,
    protein: 32,
    carbs: 65,
    fat: 22,
    prep_time: 15
  },
  // 减脂食谱
  {
    id: uuidv4(),
    name: '鸡胸肉蔬菜沙拉',
    type: '减脂',
    description: '低卡高蛋白，适合减脂期',
    ingredients: '鸡胸肉 150g\n生菜 100g\n番茄 1个\n黄瓜 1根\n油醋汁 适量',
    steps: '1. 鸡胸肉煮熟撕成丝\n2. 生菜洗净撕成小块\n3. 番茄和黄瓜切块\n4. 所有食材混合\n5. 淋上油醋汁',
    calories: 280,
    protein: 35,
    carbs: 12,
    fat: 8,
    prep_time: 15
  },
  {
    id: uuidv4(),
    name: '清蒸鱼配蔬菜',
    type: '减脂',
    description: '清淡健康，热量低',
    ingredients: '鲈鱼 1条\n西兰花 100g\n芦笋 100g\n姜丝、葱丝 适量\n蒸鱼豉油 适量',
    steps: '1. 鱼洗净，腹部划刀\n2. 放入姜丝，蒸8-10分钟\n3. 西兰花和芦笋焯水\n4. 鱼出锅后淋上蒸鱼豉油\n5. 搭配蔬菜食用',
    calories: 220,
    protein: 38,
    carbs: 8,
    fat: 5,
    prep_time: 20
  },
  {
    id: uuidv4(),
    name: '藜麦虾仁碗',
    type: '减脂',
    description: '营养均衡的低卡主食',
    ingredients: '藜麦 80g\n虾仁 150g\n玉米粒 50g\n青豆 50g\n小番茄 5个',
    steps: '1. 藜麦煮熟备用\n2. 虾仁焯水至熟\n3. 玉米粒和青豆焯水\n4. 小番茄对半切开\n5. 所有食材混合装碗',
    calories: 350,
    protein: 32,
    carbs: 42,
    fat: 6,
    prep_time: 20
  },
  {
    id: uuidv4(),
    name: '希腊酸奶坚果碗',
    type: '减脂',
    description: '高蛋白低卡加餐',
    ingredients: '希腊酸奶 200g\n蓝莓 50g\n草莓 50g\n坚果 15g\n蜂蜜 10g',
    steps: '1. 酸奶倒入碗中\n2. 放上蓝莓和草莓\n3. 撒上坚果\n4. 淋上少许蜂蜜',
    calories: 280,
    protein: 20,
    carbs: 28,
    fat: 10,
    prep_time: 5
  }
];

// 训练计划数据
const workoutPlansData = [
  {
    id: uuidv4(),
    name: '新手一周三分化训练',
    description: '适合健身新手的入门训练计划，每周3次训练，每个肌群每周训练1次',
    level: 'beginner',
    duration_weeks: 8,
    days_per_week: 3,
    schedule: JSON.stringify({
      '周一': {
        name: '胸部 + 三头肌',
        exercises: [
          { name: '坐姿推胸机', sets: 3, reps: '12-15', rest: '60-90秒' },
          { name: '蝴蝶机夹胸', sets: 3, reps: '12-15', rest: '60秒' },
          { name: '上斜推胸机', sets: 3, reps: '12-15', rest: '60-90秒' },
          { name: '三头肌下压', sets: 3, reps: '12-15', rest: '60秒' },
          { name: '三头肌屈伸', sets: 3, reps: '12-15', rest: '60秒' }
        ]
      },
      '周三': {
        name: '背部 + 二头肌',
        exercises: [
          { name: '高位下拉', sets: 3, reps: '12-15', rest: '60-90秒' },
          { name: '坐姿划船', sets: 3, reps: '12-15', rest: '60-90秒' },
          { name: '单臂哑铃划船', sets: 3, reps: '12-15', rest: '60秒' },
          { name: '二头肌弯举', sets: 3, reps: '12-15', rest: '60秒' },
          { name: '锤式弯举', sets: 3, reps: '12-15', rest: '60秒' }
        ]
      },
      '周五': {
        name: '腿部 + 肩部',
        exercises: [
          { name: '腿举', sets: 3, reps: '12-15', rest: '90-120秒' },
          { name: '腿屈伸', sets: 3, reps: '12-15', rest: '60秒' },
          { name: '腿弯举', sets: 3, reps: '12-15', rest: '60秒' },
          { name: '坐姿推肩', sets: 3, reps: '12-15', rest: '60-90秒' },
          { name: '侧平举', sets: 3, reps: '12-15', rest: '60秒' }
        ]
      }
    })
  },
  {
    id: uuidv4(),
    name: '新手一周四分化训练',
    description: '进阶版新手计划，每周4次训练，更快看到效果',
    level: 'beginner',
    duration_weeks: 8,
    days_per_week: 4,
    schedule: JSON.stringify({
      '周一': {
        name: '胸部',
        exercises: [
          { name: '坐姿推胸机', sets: 4, reps: '10-12', rest: '60-90秒' },
          { name: '蝴蝶机夹胸', sets: 3, reps: '12-15', rest: '60秒' },
          { name: '上斜推胸机', sets: 4, reps: '10-12', rest: '60-90秒' },
          { name: '俯卧撑', sets: 3, reps: '力竭', rest: '60秒' }
        ]
      },
      '周二': {
        name: '背部',
        exercises: [
          { name: '高位下拉', sets: 4, reps: '10-12', rest: '60-90秒' },
          { name: '坐姿划船', sets: 4, reps: '10-12', rest: '60-90秒' },
          { name: '单臂哑铃划船', sets: 3, reps: '12', rest: '60秒' },
          { name: '背部伸展', sets: 3, reps: '15', rest: '60秒' }
        ]
      },
      '周四': {
        name: '腿部',
        exercises: [
          { name: '腿举', sets: 4, reps: '10-12', rest: '90-120秒' },
          { name: '腿屈伸', sets: 3, reps: '12-15', rest: '60秒' },
          { name: '腿弯举', sets: 3, reps: '12-15', rest: '60秒' },
          { name: '臀桥', sets: 3, reps: '15', rest: '60秒' },
          { name: '小腿提踵', sets: 4, reps: '15-20', rest: '60秒' }
        ]
      },
      '周五': {
        name: '肩部 + 手臂',
        exercises: [
          { name: '坐姿推肩', sets: 4, reps: '10-12', rest: '60-90秒' },
          { name: '侧平举', sets: 3, reps: '12-15', rest: '60秒' },
          { name: '反向飞鸟', sets: 3, reps: '12-15', rest: '60秒' },
          { name: '二头肌弯举', sets: 3, reps: '12-15', rest: '60秒' },
          { name: '三头肌下压', sets: 3, reps: '12-15', rest: '60秒' }
        ]
      }
    })
  },
  {
    id: uuidv4(),
    name: '新手减脂训练计划',
    description: '结合力量训练和有氧运动，帮助新手减脂塑形',
    level: 'beginner',
    duration_weeks: 12,
    days_per_week: 5,
    schedule: JSON.stringify({
      '周一': {
        name: '上肢力量 + 有氧',
        exercises: [
          { name: '坐姿推胸机', sets: 3, reps: '12-15', rest: '45秒' },
          { name: '高位下拉', sets: 3, reps: '12-15', rest: '45秒' },
          { name: '坐姿推肩', sets: 3, reps: '12-15', rest: '45秒' },
          { name: '跑步机', sets: 1, reps: '20分钟', rest: '0', note: '中等强度' }
        ]
      },
      '周二': {
        name: '下肢力量',
        exercises: [
          { name: '腿举', sets: 3, reps: '12-15', rest: '60秒' },
          { name: '腿屈伸', sets: 3, reps: '12-15', rest: '45秒' },
          { name: '腿弯举', sets: 3, reps: '12-15', rest: '45秒' },
          { name: '臀桥', sets: 3, reps: '15', rest: '45秒' }
        ]
      },
      '周三': {
        name: '纯有氧日',
        exercises: [
          { name: '椭圆机或跑步机', sets: 1, reps: '30-40分钟', rest: '0', note: '中等强度' }
        ]
      },
      '周四': {
        name: '上肢力量 + 有氧',
        exercises: [
          { name: '坐姿划船', sets: 3, reps: '12-15', rest: '45秒' },
          { name: '蝴蝶机夹胸', sets: 3, reps: '12-15', rest: '45秒' },
          { name: '二头肌弯举', sets: 3, reps: '12-15', rest: '45秒' },
          { name: '三头肌下压', sets: 3, reps: '12-15', rest: '45秒' },
          { name: '划船机', sets: 1, reps: '15分钟', rest: '0', note: '中等强度' }
        ]
      },
      '周五': {
        name: '全身循环 + 有氧',
        exercises: [
          { name: '深蹲或腿举', sets: 3, reps: '15', rest: '30秒' },
          { name: '俯卧撑', sets: 3, reps: '10-15', rest: '30秒' },
          { name: '划船', sets: 3, reps: '15', rest: '30秒' },
          { name: '平板支撑', sets: 3, reps: '30秒', rest: '30秒' },
          { name: '跑步机', sets: 1, reps: '20分钟', rest: '0', note: 'HIIT间歇跑' }
        ]
      }
    })
  },
  {
    id: uuidv4(),
    name: '进阶五分化训练计划',
    description: '适合有一定基础的训练者，每周5次训练，每个肌群进行更深入的刺激',
    level: 'intermediate',
    duration_weeks: 12,
    days_per_week: 5,
    schedule: JSON.stringify({
      '周一': {
        name: '胸部专项',
        exercises: [
          { name: '平板卧推', sets: 4, reps: '8-10', rest: '90-120秒' },
          { name: '上斜卧推', sets: 4, reps: '8-10', rest: '90秒' },
          { name: '蝴蝶机夹胸', sets: 3, reps: '12-15', rest: '60秒' },
          { name: '龙门架夹胸', sets: 3, reps: '12-15', rest: '60秒' },
          { name: '俯卧撑', sets: 3, reps: '力竭', rest: '60秒' }
        ]
      },
      '周二': {
        name: '背部专项',
        exercises: [
          { name: '引体向上或高位下拉', sets: 4, reps: '8-12', rest: '90秒' },
          { name: '杠铃划船', sets: 4, reps: '8-10', rest: '90秒' },
          { name: '坐姿划船', sets: 3, reps: '10-12', rest: '60秒' },
          { name: '单臂哑铃划船', sets: 3, reps: '10-12', rest: '60秒' },
          { name: '直臂下压', sets: 3, reps: '12-15', rest: '60秒' }
        ]
      },
      '周三': {
        name: '腿部专项',
        exercises: [
          { name: '深蹲', sets: 4, reps: '8-10', rest: '120秒' },
          { name: '腿举', sets: 4, reps: '10-12', rest: '90秒' },
          { name: '腿屈伸', sets: 3, reps: '12-15', rest: '60秒' },
          { name: '腿弯举', sets: 3, reps: '12-15', rest: '60秒' },
          { name: '臀桥', sets: 4, reps: '12-15', rest: '60秒' },
          { name: '小腿提踵', sets: 4, reps: '15-20', rest: '60秒' }
        ]
      },
      '周四': {
        name: '肩部专项',
        exercises: [
          { name: '坐姿哑铃推举', sets: 4, reps: '8-10', rest: '90秒' },
          { name: '侧平举', sets: 4, reps: '12-15', rest: '60秒' },
          { name: '前平举', sets: 3, reps: '12-15', rest: '60秒' },
          { name: '反向飞鸟', sets: 4, reps: '12-15', rest: '60秒' },
          { name: '耸肩', sets: 3, reps: '12-15', rest: '60秒' }
        ]
      },
      '周五': {
        name: '手臂专项',
        exercises: [
          { name: '杠铃弯举', sets: 4, reps: '8-10', rest: '60秒' },
          { name: '锤式弯举', sets: 3, reps: '10-12', rest: '60秒' },
          { name: '集中弯举', sets: 3, reps: '12-15', rest: '60秒' },
          { name: '三头肌下压', sets: 4, reps: '10-12', rest: '60秒' },
          { name: '仰卧三头臂屈伸', sets: 3, reps: '10-12', rest: '60秒' },
          { name: '窄距卧推', sets: 3, reps: '8-10', rest: '60秒' }
        ]
      }
    })
  },
  {
    id: uuidv4(),
    name: '居家徒手训练计划',
    description: '无需器械，在家就能完成的全身训练计划，适合没有健身房条件的新手',
    level: 'beginner',
    duration_weeks: 8,
    days_per_week: 4,
    schedule: JSON.stringify({
      '周一': {
        name: '上肢推+核心',
        exercises: [
          { name: '标准俯卧撑', sets: 3, reps: '10-15', rest: '60秒' },
          { name: '宽距俯卧撑', sets: 3, reps: '8-12', rest: '60秒' },
          { name: '钻石俯卧撑', sets: 3, reps: '8-10', rest: '60秒' },
          { name: '平板支撑', sets: 3, reps: '30-45秒', rest: '60秒' },
          { name: '卷腹', sets: 3, reps: '15-20', rest: '45秒' }
        ]
      },
      '周二': {
        name: '下肢+有氧',
        exercises: [
          { name: '深蹲', sets: 4, reps: '15-20', rest: '60秒' },
          { name: '箭步蹲', sets: 3, reps: '12/腿', rest: '60秒' },
          { name: '臀桥', sets: 3, reps: '15-20', rest: '45秒' },
          { name: '原地高抬腿', sets: 3, reps: '30秒', rest: '30秒' },
          { name: '波比跳', sets: 3, reps: '10', rest: '60秒' }
        ]
      },
      '周四': {
        name: '上肢拉+核心',
        exercises: [
          { name: '门框划船', sets: 3, reps: '12-15', rest: '60秒' },
          { name: '超人式', sets: 3, reps: '12-15', rest: '45秒' },
          { name: '俯卧YW伸展', sets: 3, reps: '12', rest: '45秒' },
          { name: '侧平板支撑', sets: 3, reps: '20-30秒/边', rest: '45秒' },
          { name: '俄罗斯转体', sets: 3, reps: '15/边', rest: '45秒' }
        ]
      },
      '周五': {
        name: '全身HIIT',
        exercises: [
          { name: '开合跳', sets: 1, reps: '30秒', rest: '15秒', note: '循环4轮' },
          { name: '深蹲跳', sets: 1, reps: '15', rest: '15秒', note: '循环4轮' },
          { name: '俯卧撑', sets: 1, reps: '10', rest: '15秒', note: '循环4轮' },
          { name: '登山跑', sets: 1, reps: '20/腿', rest: '15秒', note: '循环4轮' },
          { name: '波比跳', sets: 1, reps: '8', rest: '60秒', note: '循环4轮' }
        ]
      }
    })
  },
  {
    id: uuidv4(),
    name: '增肌力量进阶计划',
    description: '以复合动作为主的力量训练计划，注重力量和肌肉量的双重提升',
    level: 'intermediate',
    duration_weeks: 12,
    days_per_week: 4,
    schedule: JSON.stringify({
      '周一': {
        name: '胸部+三头',
        exercises: [
          { name: '平板杠铃卧推', sets: 5, reps: '5-8', rest: '120秒', note: '主项' },
          { name: '上斜哑铃卧推', sets: 4, reps: '8-10', rest: '90秒' },
          { name: '蝴蝶机夹胸', sets: 3, reps: '12-15', rest: '60秒' },
          { name: '窄距卧推', sets: 4, reps: '8-10', rest: '90秒' },
          { name: '三头肌下压', sets: 3, reps: '12-15', rest: '60秒' }
        ]
      },
      '周二': {
        name: '背部+二头',
        exercises: [
          { name: '杠铃划船', sets: 5, reps: '5-8', rest: '120秒', note: '主项' },
          { name: '引体向上', sets: 4, reps: '6-10', rest: '90秒' },
          { name: '坐姿划船', sets: 3, reps: '10-12', rest: '60秒' },
          { name: '杠铃弯举', sets: 4, reps: '8-10', rest: '60秒' },
          { name: '锤式弯举', sets: 3, reps: '10-12', rest: '60秒' }
        ]
      },
      '周四': {
        name: '腿部',
        exercises: [
          { name: '杠铃深蹲', sets: 5, reps: '5-8', rest: '180秒', note: '主项' },
          { name: '罗马尼亚硬拉', sets: 4, reps: '8-10', rest: '90秒' },
          { name: '腿举', sets: 4, reps: '10-12', rest: '90秒' },
          { name: '腿屈伸', sets: 3, reps: '12-15', rest: '60秒' },
          { name: '腿弯举', sets: 3, reps: '12-15', rest: '60秒' },
          { name: '小腿提踵', sets: 4, reps: '15-20', rest: '60秒' }
        ]
      },
      '周五': {
        name: '肩部+核心',
        exercises: [
          { name: '站姿杠铃推举', sets: 5, reps: '5-8', rest: '120秒', note: '主项' },
          { name: '哑铃侧平举', sets: 4, reps: '12-15', rest: '60秒' },
          { name: '反向飞鸟', sets: 4, reps: '12-15', rest: '60秒' },
          { name: '面拉', sets: 3, reps: '15-20', rest: '60秒' },
          { name: '悬垂举腿', sets: 3, reps: '12-15', rest: '60秒' },
          { name: '平板支撑', sets: 3, reps: '45-60秒', rest: '60秒' }
        ]
      }
    })
  }
];

async function seed() {
  console.log('开始导入健身知识库数据...');

  const db = await initDatabase();

  // 清空现有数据
  db.exec('DELETE FROM equipment');
  db.exec('DELETE FROM recipes');
  db.exec('DELETE FROM workout_plans');

  // 插入器械数据
  const insertEquipment = db.prepare(`
    INSERT INTO equipment (id, name, category, target_muscle, description, instructions, common_mistakes, difficulty)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const equipment of equipmentData) {
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
  }
  console.log(`✅ 已导入 ${equipmentData.length} 个器械数据`);

  // 插入食谱数据
  const insertRecipe = db.prepare(`
    INSERT INTO recipes (id, name, type, description, ingredients, steps, calories, protein, carbs, fat, prep_time)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const recipe of recipesData) {
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
  }
  console.log(`✅ 已导入 ${recipesData.length} 个食谱数据`);

  // 插入训练计划数据
  const insertPlan = db.prepare(`
    INSERT INTO workout_plans (id, name, description, level, duration_weeks, days_per_week, schedule)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  for (const plan of workoutPlansData) {
    insertPlan.run(
      plan.id,
      plan.name,
      plan.description,
      plan.level,
      plan.duration_weeks,
      plan.days_per_week,
      plan.schedule
    );
  }
  console.log(`✅ 已导入 ${workoutPlansData.length} 个训练计划数据`);

  // 保存数据库
  saveDatabase();

  console.log('\n🎉 健身知识库数据导入完成！');
}

seed().catch(console.error);
