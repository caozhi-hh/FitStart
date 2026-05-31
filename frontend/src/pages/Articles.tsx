import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, Eye } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  cover_image_url?: string;
  views: number;
  likes: number;
  created_at: string;
  user?: {
    username: string;
  };
}

// 示例文章数据（实际项目中从 API 获取）
const sampleArticles: Article[] = [
  {
    id: '1',
    title: '新手健身必看：第一个月该怎么练？',
    content: `作为一个健身新手，第一个月是最关键的时期。很多人因为一开始就练得太猛，导致受伤或者放弃。今天分享一些实用的建议。

## 第一周：适应期

- 每周训练 3 次，每次 30-40 分钟
- 以固定器械为主，学习正确姿势
- 重量不要太重，重点是动作标准

## 第二周：增加强度

- 开始尝试自由重量（哑铃）
- 增加训练时间到 45-60 分钟
- 注意感受目标肌肉发力

## 第三周：形成习惯

- 固定训练时间，养成习惯
- 开始记录训练重量和次数
- 适当增加重量

## 第四周：看到变化

- 你会感觉精力更充沛
- 睡眠质量提升
- 肌肉开始有线条感

坚持下去，你会发现健身成为生活的一部分！`,
    category: '新手指南',
    tags: ['新手', '入门', '训练计划'],
    views: 1520,
    likes: 89,
    created_at: '2024-01-15',
  },
  {
    id: '2',
    title: '增肌期 vs 减脂期：饮食有什么区别？',
    content: `很多人搞不清楚增肌和减脂期间饮食应该怎么调整。简单来说：

## 增肌期饮食

**热量**：每天比消耗多 300-500 卡

**蛋白质**：每公斤体重 1.6-2g
- 鸡胸肉、牛肉、鱼、鸡蛋
- 训练后补充蛋白质很重要

**碳水**：训练前后多补充
- 燕麦、糙米、红薯、香蕉

## 减脂期饮食

**热量**：每天比消耗少 300-500 卡

**蛋白质**：保持高蛋白防止肌肉流失
- 每公斤体重 1.8-2.2g

**碳水**：适当减少
- 优先选择粗粮
- 晚上少吃碳水

## 共同点

- 多吃蔬菜补充纤维
- 保证充足水分
- 避免加工食品`,
    category: '饮食指南',
    tags: ['饮食', '增肌', '减脂'],
    views: 2340,
    likes: 156,
    created_at: '2024-01-18',
  },
  {
    id: '3',
    title: '健身常见错误：你中招了吗？',
    content: `很多新手在健身时会犯一些常见错误，今天总结一下，看看你有没有中招。

## ❌ 错误1：重量太大

很多人觉得重量越大越好，其实不然。新手最重要的是学会正确的动作模式，而不是追求重量。建议从轻重量开始，掌握姿势后再慢慢加重。

## ❌ 错误2：忽视热身

直接上大重量很容易受伤。建议：
- 5-10 分钟有氧热身
- 动态拉伸
- 第一组用轻重量预热

## ❌ 错误3：训练时间太长

超过 90 分钟的训练效果会递减，而且增加受伤风险。45-60 分钟是最佳时长。

## ❌ 错误4：忽视休息

肌肉是在休息时生长的！同一肌群需要 48-72 小时恢复。不要天天练同一个部位。

## ❌ 错误5：只练自己喜欢的

只练胸不练背，只练上身不练腿，会导致肌肉不平衡，体态问题，甚至受伤。要全面训练！`,
    category: '训练技巧',
    tags: ['错误', '技巧', '新手'],
    views: 3120,
    likes: 234,
    created_at: '2024-01-20',
  },
  {
    id: '4',
    title: '一周三分化训练计划详解',
    content: `三分化训练是最适合新手的训练方式，今天详细介绍一下。

## 什么是三分化？

把全身肌群分成三天练：
- Day 1: 胸 + 三头
- Day 2: 背 + 二头
- Day 3: 腿 + 肩

这样每个肌群每周训练一次，有充足的恢复时间。

## 具体安排

### 周一：胸部 + 三头肌
1. 坐姿推胸机 3x12
2. 蝴蝶机夹胸 3x12
3. 上斜推胸 3x12
4. 三头肌下压 3x15
5. 窄距俯卧撑 3x10

### 周三：背部 + 二头肌
1. 高位下拉 3x12
2. 坐姿划船 3x12
3. 单臂划船 3x10
4. 二头弯举 3x12
5. 锤式弯举 3x12

### 周五：腿部 + 肩部
1. 腿举 3x12
2. 腿屈伸 3x15
3. 腿弯举 3x15
4. 坐姿推肩 3x12
5. 侧平举 3x15

## 注意事项

- 组间休息 60-90 秒
- 选择能完成目标次数的重量
- 最后两组应该有些吃力`,
    category: '训练计划',
    tags: ['计划', '三分化', '新手'],
    views: 4520,
    likes: 312,
    created_at: '2024-01-22',
  },
  {
    id: '5',
    title: '深蹲全攻略：从零开始掌握动作之王',
    content: `深蹲被称为"动作之王"，是训练下肢和核心的最佳动作。今天详细讲解如何正确做深蹲。

## 深蹲的好处

- 锻炼全身70%以上的肌肉
- 提升睾酮和生长激素分泌
- 增强核心稳定性
- 改善体态和平衡能力

## 标准动作步骤

1. **站姿**：双脚与肩同宽，脚尖略微外展15-30度
2. **下蹲**：臀部向后坐，像坐在椅子上一样
3. **深度**：大腿与地面平行或略低
4. **膝盖**：膝盖方向与脚尖一致，不要内扣
5. **起身**：脚后跟发力，臀部夹紧站起

## 常见错误

❌ 膝盖内扣 - 容易损伤膝盖
❌ 脚后跟离地 - 重心不稳
❌ 弓背或过度挺腰 - 腰椎压力大
❌ 下蹲不够深 - 效果打折

## 新手建议

- 先用自重练习，掌握姿势
- 每天做3组，每组15-20个
- 姿势标准后再考虑负重`,
    category: '训练技巧',
    tags: ['深蹲', '腿部', '动作指导'],
    views: 5620,
    likes: 423,
    created_at: '2024-01-25',
  },
  {
    id: '6',
    title: '蛋白粉怎么选？新手必看指南',
    content: `市面上蛋白粉种类繁多，新手往往不知道怎么选择。这篇文章帮你理清思路。

## 蛋白粉类型

### 乳清蛋白
- 吸收最快，适合训练后
- 支链氨基酸含量高
- 口感较好

### 酪蛋白
- 吸收缓慢，适合睡前
- 饱腹感强
- 适合减脂期

### 大豆蛋白
- 植物蛋白
- 适合素食者
- 价格较低

### 分离乳清
- 乳糖含量低
- 纯度更高
- 价格较贵

## 选购要点

1. **看成分表**：蛋白质含量应在70%以上
2. **看配料**：添加剂越少越好
3. **看品牌**：选择知名品牌更有保障
4. **看口味**：先买小包装试味

## 使用建议

- 训练后30分钟内补充
- 每天1-2勺即可
- 不要完全依赖蛋白粉
- 正常饮食为主，蛋白粉为辅`,
    category: '饮食指南',
    tags: ['蛋白粉', '补剂', '营养'],
    views: 3890,
    likes: 267,
    created_at: '2024-01-28',
  },
  {
    id: '7',
    title: '上班族如何利用碎片时间健身？',
    content: `工作忙碌不是借口！即使没有大块时间去健身房，也可以通过碎片时间保持健康。

## 早晨起床（10分钟）

- 晨间拉伸 5分钟
- 俯卧撑 3组x15个
- 深蹲 3组x20个

## 通勤路上

- 提前一站下车步行
- 爬楼梯代替电梯
- 收腹站立，锻炼核心

## 午休时间（15分钟）

- 饭后散步10分钟
- 办公室简单拉伸
- 靠墙静蹲 3组x30秒

## 晚上下班后（20-30分钟）

- 家庭HIIT训练
- 瑜伽或普拉提
- 跳绳或原地跑

## 周末安排

- 户外跑步或骑行
- 健身房系统训练
- 游泳或球类运动

## 小贴士

- 每坐1小时起来活动5分钟
- 多喝水，增加走动次数
- 把运动融入生活，而不是当作任务`,
    category: '新手指南',
    tags: ['上班族', '碎片时间', '居家健身'],
    views: 4210,
    likes: 345,
    created_at: '2024-02-01',
  },
  {
    id: '8',
    title: '硬拉入门教程：打造强大后链肌群',
    content: `硬拉是训练后链肌群的王牌动作，也是力量训练三大项之一。今天教你如何安全有效地练习硬拉。

## 硬拉的好处

- 强化背部、臀部、腘绳肌
- 提升整体力量水平
- 改善体态，预防腰痛
- 功能性动作，日常实用

## 标准硬拉步骤

1. **站距**：双脚与髋同宽，杠铃贴住小腿
2. **握距**：双手略宽于肩，正握或正反握
3. **起始姿势**：臀部后推，背部挺直，胸部挺起
4. **拉起**：脚掌发力，臀部向前推，杠铃贴身上升
5. **锁定**：站直，臀部夹紧，肩膀后收
6. **下放**：臀部后推，控制下放

## 关键要点

✅ 背部始终保持挺直
✅ 核心收紧，保护腰椎
✅ 杠铃紧贴身体移动
✅ 肩胛骨在杠铃正上方

## 新手建议

- 从空杆开始练习
- 先掌握罗马尼亚硬拉
- 使用镜子观察姿势
- 建议找教练指导`,
    category: '训练技巧',
    tags: ['硬拉', '背部', '力量训练'],
    views: 3560,
    likes: 289,
    created_at: '2024-02-05',
  },
  {
    id: '9',
    title: '健身前中后该怎么吃？营养时机全解析',
    content: `训练前中后的营养补充直接影响训练效果和恢复速度。这篇文章告诉你什么时候该吃什么。

## 训练前（1-2小时）

**目的**：提供能量，避免低血糖

**推荐食物**：
- 复合碳水：燕麦、全麦面包、香蕉
- 适量蛋白质：鸡蛋、酸奶
- 避免高脂肪和高纤维（消化慢）

**加餐建议**：
- 1根香蕉 + 1杯酸奶
- 2片全麦面包 + 花生酱
- 燕麦粥 + 蜂蜜

## 训练中

**目的**：维持水合状态，补充电解质

**推荐**：
- 普通训练：白水即可
- 长时间训练（>1小时）：运动饮料
- 高强度训练：BCAA支链氨基酸

## 训练后（30分钟内）

**目的**：补充消耗，促进恢复

**黄金比例**：碳水:蛋白质 = 3:1

**推荐食物**：
- 蛋白粉 + 香蕉
- 鸡胸肉 + 糙米饭
- 牛肉 + 红薯

## 注意事项

- 训练前不要空腹，也不要吃太饱
- 训练中少量多次补水
- 训练后尽快补充营养`,
    category: '饮食指南',
    tags: ['营养时机', '训练饮食', '恢复'],
    views: 4780,
    likes: 398,
    created_at: '2024-02-08',
  },
  {
    id: '10',
    title: '如何制定适合自己的健身目标？',
    content: `没有目标的健身就像没有目的地的航行。学会制定SMART目标，让你的健身之路更清晰。

## SMART原则

- **S**pecific（具体的）：不要说"我想变壮"，要说"我想把胸围增加5cm"
- **M**easurable（可衡量的）：用数字说话，如体重、围度、力量数据
- **A**chievable（可实现的）：目标要有挑战但不过于困难
- **R**elevant（相关的）：目标要与你的生活相关
- **T**ime-bound（有时限的）：设定截止日期

## 不同阶段的目标设定

### 新手期（0-3个月）
- 学习20个基础动作
- 建立每周3次训练习惯
- 掌握正确姿势

### 进阶期（3-12个月）
- 卧推达到体重0.8倍
- 深蹲达到体重1倍
- 体脂下降3-5%

### 高级期（1年以上）
- 参加一次健身比赛
- 完成一个高难度动作
- 达到理想身材

## 记录与调整

- 每周拍照记录变化
- 每月测量围度和体重
- 根据进度调整计划
- 庆祝小目标的达成`,
    category: '新手指南',
    tags: ['目标设定', '计划', '心态'],
    views: 2890,
    likes: 212,
    created_at: '2024-02-12',
  },
  {
    id: '11',
    title: '卧推技巧详解：打造完美胸肌',
    content: `卧推是训练胸肌的经典动作，也是很多人最爱的训练项目。今天详细讲解卧推的正确技巧。

## 标准卧推步骤

1. **躺下**：眼睛在杠铃正下方
2. **握距**：略宽于肩，手腕保持中立
3. **起杠**：肩胛骨后收下沉，胸部挺起
4. **下放**：控制速度，杠铃下放到胸口
5. **推起**：胸部发力，推至手臂伸直

## 肌肉发力技巧

- 想象要把杠铃掰弯（激活背阔肌）
- 脚踩地面，形成稳定支撑
- 臀部贴紧凳子，核心收紧
- 推起时呼气，下放时吸气

## 常见错误

❌ 手腕弯曲 - 容易受伤
❌ 肘部外展90度 - 肩关节压力大
❌ 臀部抬起 - 借力，效果差
❌ 下放太快 - 控制力不足

## 进阶变式

- 上斜卧推：针对上胸
- 下斜卧推：针对下胸
- 窄距卧推：针对三头肌
- 哑铃卧推：活动范围更大`,
    category: '训练技巧',
    tags: ['卧推', '胸肌', '力量训练'],
    views: 5230,
    likes: 412,
    created_at: '2024-02-15',
  },
  {
    id: '12',
    title: '休息日该怎么安排？主动恢复指南',
    content: `休息日不是躺着不动！科学的主动恢复能让你下次训练表现更好。

## 为什么需要休息日？

- 肌肉在休息时生长
- 神经系统需要恢复
- 预防过度训练
- 降低受伤风险

## 主动恢复活动

### 轻度有氧（20-30分钟）
- 快走
- 慢跑
- 骑行
- 游泳

### 拉伸放松（15-20分钟）
- 泡沫轴滚动
- 静态拉伸
- 瑜伽

### 其他活动
- 散步
- 轻度家务
- 泡澡桑拿

## 休息日营养

- 蛋白质不能少，继续补充
- 碳水可以适当减少
- 多喝水，帮助代谢
- 保证充足睡眠（7-9小时）

## 安排建议

- 每周安排1-2个休息日
- 高强度训练后必须休息
- 感觉疲劳时主动休息
- 不要连续高强度训练超过3天`,
    category: '训练计划',
    tags: ['休息', '恢复', '计划'],
    views: 2450,
    likes: 178,
    created_at: '2024-02-18',
  },
];

const categories = ['全部', '新手指南', '训练技巧', '饮食指南', '训练计划'];

export default function Articles() {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = sampleArticles.filter((article) => {
    const matchesCategory = selectedCategory === '全部' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN');
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">经验分享</h1>
        <p className="text-gray-600 mt-1">学习健身达人的经验，少走弯路</p>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索文章..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 文章列表 */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <Link
            key={article.id}
            to={`/articles/${article.id}`}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
          >
            {/* 封面图占位 */}
            <div className="h-40 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <span className="text-4xl">📝</span>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-primary-100 text-primary-600 rounded">
                  {article.category}
                </span>
                <span className="text-xs text-gray-400">{formatDate(article.created_at)}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 mb-2">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                {article.content.substring(0, 100)}...
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {article.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {article.likes}
                  </span>
                </div>
              </div>
              {article.tags && (
                <div className="flex gap-1 mt-3">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs text-gray-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* 写文章入口 */}
      <div className="bg-gradient-to-r from-primary-500 to-purple-500 rounded-xl p-6 text-center text-white">
        <h3 className="text-xl font-bold mb-2">有健身经验想分享？</h3>
        <p className="text-white/80 mb-4">帮助更多新手少走弯路</p>
        <button className="bg-white text-primary-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          发布文章
        </button>
      </div>
    </div>
  );
}
