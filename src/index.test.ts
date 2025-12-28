import { describe, it, expect } from 'vitest';
import { match } from '../src/index';

describe('Matcher Tests', () => {
  describe('Chinese', () => {
    const chineseTestCases = [
      {
        target: 'zh-CN',
        candidates: ['zh-Hans', 'zh-Hant', 'en', 'zh-CN'],
        expected: ['zh-CN', 'zh-Hans', 'zh-Hant']
      },
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
      {
        target: 'zh-CN',
        candidates: ['zh-SG', 'zh'],
        expected: ['zh-SG', 'zh']
      },
      {
        target: 'zh-MO',
        candidates: ['zh', 'zh-Hant', 'zh-CN'],
        expected: ['zh-Hant', 'zh', 'zh-CN']
      },
      {
        target: 'zh-Hans-CN',
        candidates: ['zh-CN', 'zh-Hans'],
        expected: ['zh-Hans', 'zh-CN']
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
        target: 'zh-TW',
        candidates: ['zh-Hant', 'zh-Hans', 'zh-HK'],
        expected: ['zh-Hant', 'zh-HK', 'zh-Hans']
      }
    ];

    chineseTestCases.forEach(({ target, candidates, expected }) => {
      it(`${target} & ${JSON.stringify(candidates)}`, () => {
        expect(match(target, candidates)).toEqual(expected);
      });
    });
  });

  describe('Others', () => {
    const englishTestCases = [
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
      {
        target: 'ja-JP',
        candidates: ['ja', 'ja-JP-mac', 'en-US'],
        expected: ['ja-JP-mac', 'ja']
      },
      {
        target: 'en-US',
        candidates: ['en-GB', 'en-AU', 'en-CA'],
        expected: ['en-GB', 'en-AU', 'en-CA']
      },
      {
        target: 'en-IN',
        candidates: ['en', 'en-US', 'en-GB'],
        expected: ['en', 'en-US', 'en-GB']
      },
      {
        target: 'fr',
        candidates: ['fr-CA', 'fr-FR', 'es'],
        expected: ['fr-FR', 'fr-CA']
      }
    ];

    englishTestCases.forEach(({ target, candidates, expected }) => {
      it(`${target} & ${JSON.stringify(candidates)}`, () => {
        expect(match(target, candidates)).toEqual(expected);
      });
    });
  });

  describe('Edge Cases', () => {
    const edgeCases = [
      {
        target: 'zh',
        candidates: ['en', 'fr'],
        expected: []
      },
      {
        target: 'zh-CN',
        candidates: [],
        expected: []
      }
    ];

    edgeCases.forEach(({ target, candidates, expected }) => {
      it(`${target} & ${JSON.stringify(candidates)}`, () => {
        expect(match(target, candidates)).toEqual(expected);
      });
    });
  });
});
