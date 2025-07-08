# Locale Matcher

[![npm](https://img.shields.io/npm/v/@kuriyota/locale-matcher)](https://www.npmjs.com/package/@kuriyota/locale-matcher)

智能语言标签匹配库，用于匹配和排序最符合用户偏好的语言标签。

A smart language tag matcher library for matching and sorting the most suitable language tags for users.

## 功能特性 Features

- 支持语言-脚本-地区三级匹配（如 `zh-Hans-CN`）
- 基于优先级的智能排序
- 内置常见语言变体规则（中文繁简、西里尔/拉丁字母等
- 100% 测试覆盖率
- Supports language-script-region matching (e.g. `zh-Hans-CN`)
- Smart sorting
- Built-in rules for common language variants (e.g. Chinese simplified/traditional, Cyrillic/Latin letters, etc.)
- 100% test coverage


## 安装 Install

```bash
npm install @kuriyota/locale-matcher
# 或
pnpm add @kuriyota/locale-matcher
```

## 使用示例 Usage

```typescript
import { matchLanguages } from '@kuriyota/locale-matcher';

// 基本匹配 Basic Match
matchLanguages('zh-CN', ['zh-Hans', 'zh-Hant', 'en']); 
// => ['zh-Hans', 'zh-Hant']

// 自动推断脚本 Auto Detect Script
matchLanguages('zh-TW', ['zh-Hans', 'zh-Hant', 'zh']); 
// => ['zh-Hant', 'zh', 'zh-Hans']

// 多语言场景 Multi-language
matchLanguages('fr', ['fr-CA', 'fr-FR', 'es']); 
// => ['fr-FR', 'fr-CA']
```

## 匹配规则 Match Rules

1. **语言匹配**：首先过滤出相同语言的候选
2. **脚本匹配**（优先级最高）：
   - 完全匹配 +1000 分
   - 无脚本 +500 分
3. **地区匹配**：
   - 完全匹配 +500 分
   - 关联地区匹配 +300 分
4. **排序规则**：
   - 按总分降序
   - 按内置脚本优先级（如 `Hans` > `Hant`）
   - 按内置地区优先级（如 `CN` > `TW` > `HK`）
   - 按字母顺序