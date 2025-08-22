import { describe, it, expect } from 'vitest'; // 使用 `expect`
import { matchLanguages } from '../src/index';

const testCases = [
  // 中文测试用例
  {
    target: 'zh-CN',
    candidates: ['zh-Hans', 'zh-Hant', 'en'],
    expected: ['zh-Hans', 'zh-Hant']
  },
  {
    target: 'zh-TW',
    candidates: ['zh-Hans', 'zh-Hant', 'zh'],
    expected: ['zh-Hant', 'zh', 'zh-Hans']
  },
  {
    target: 'zh-HK',
    candidates: ['zh-CN', 'zh-TW', 'zh-MO'],
    expected: ['zh-TW', 'zh-MO', 'zh-CN']
  },
  {
    target: 'zh-SG',
    candidates: ['zh-Hans', 'zh-Hant', 'zh'],
    expected: ['zh-Hans', 'zh', 'zh-Hant']
  },
  {
    target: 'zh',
    candidates: ['zh-CN', 'zh-TW', 'zh-HK'],
    expected: ['zh-CN', 'zh-TW', 'zh-HK']
  },
  {
    target: 'zh-Hant',
    candidates: ['zh-TW', 'zh-HK', 'zh-MO'],
    expected: ['zh-TW', 'zh-HK', 'zh-MO']
  },
  { target: 'zh-CN', candidates: ['zh-SG', 'zh'], expected: ['zh-SG', 'zh'] },
  {
    target: 'zh-MO',
    candidates: ['zh', 'zh-Hant', 'zh-CN'],
    expected: ['zh-Hant', 'zh', 'zh-CN']
  },
  // 英语测试用例
  {
    target: 'en',
    candidates: ['en-US', 'en-GB', 'en-AU'],
    expected: ['en-US', 'en-GB', 'en-AU']
  },
  {
    target: 'en-AU',
    candidates: ['en', 'en-US', 'en-CA'],
    expected: ['en', 'en-US', 'en-CA']
  },
  {
    target: 'en-GB',
    candidates: ['en-US', 'en-IE', 'en'],
    expected: ['en', 'en-US', 'en-IE']
  },
  {
    target: 'en-CA',
    candidates: ['en-US', 'en', 'en-AU'],
    expected: ['en', 'en-US', 'en-AU']
  },
  // 混合语言测试用例
  {
    target: 'fr',
    candidates: ['fr-CA', 'fr-FR', 'es'],
    expected: ['fr-FR', 'fr-CA']
  },
  {
    target: 'ja-JP',
    candidates: ['ja', 'ja-JP-mac', 'en-US'],
    expected: ['ja-JP-mac', 'ja']
  },
  // 边界测试用例
  { target: 'zh', candidates: ['en', 'fr'], expected: [] },
  { target: 'zh-CN', candidates: [], expected: [] },
  {
    target: 'zh-Hans-CN',
    candidates: ['zh-CN', 'zh-Hans'],
    expected: ['zh-Hans', 'zh-CN']
  },
  {
    target: 'en-US',
    candidates: ['en-GB', 'en-AU', 'en-CA'],
    expected: ['en-GB', 'en-AU', 'en-CA']
  },
  {
    target: 'zh-HK',
    candidates: ['zh-Hant', 'zh-Hans', 'zh'],
    expected: ['zh-Hant', 'zh', 'zh-Hans']
  },
  {
    target: 'zh-SG',
    candidates: ['zh-Hans-SG', 'zh-CN'],
    expected: ['zh-Hans-SG', 'zh-CN']
  },
  {
    target: 'en-IN',
    candidates: ['en', 'en-US', 'en-GB'],
    expected: ['en', 'en-US', 'en-GB']
  },
  {
    target: 'zh-TW',
    candidates: ['zh-Hant', 'zh-Hans', 'zh-HK'],
    expected: ['zh-Hant', 'zh-HK', 'zh-Hans']
  }
];

describe('matchLanguages', () => {
  testCases.forEach(({ target, candidates, expected }) => {
    it(`matches ${target} with ${candidates}`, () => {
      expect(matchLanguages(target, candidates)).toEqual(expected);
    });
  });
});
