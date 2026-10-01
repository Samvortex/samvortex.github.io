// 站点级常量
export const SITE = {
  title: 'Samvortex Hub',
  tagline: '技术研究 · 对比 · 评估',
  description:
    'Sam Xu 的技术与研究信息发布中心：深度研究、产品对比、选型评估、思考碎片。',
  author: 'Sam Xu',
  email: 'sam@samvortex.com',
  locale: 'zh-CN',
  url: 'https://samvortex.com',
  ogImage: '/og-default.png',
  github: 'https://github.com/Samvortex',
  repo: 'https://github.com/Samvortex/samvortex.github.io',
} as const;

// 分类元数据：单点定义，导航/列表/文章页都引用这里
export const CATEGORIES = {
  research: {
    label: '研究',
    singular: '研究报告',
    plural: '研究报告',
    description: '对技术、架构、行业趋势的深度研究。',
    order: 1,
  },
  compare: {
    label: '对比',
    singular: '对比',
    plural: '对比',
    description: '产品/方案的横向 / 纵向对比。',
    order: 2,
  },
  evaluation: {
    label: '评估',
    singular: '评估',
    plural: '评估',
    description: '工具与平台的选型评估、PoC 总结。',
    order: 3,
  },
  notes: {
    label: '杂谈',
    singular: '杂谈',
    plural: '杂谈',
    description: '短记录、随笔、思考碎片。',
    order: 4,
  },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;
