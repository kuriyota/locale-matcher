/**
 * Locale Matcher 数据定义文件
 * Locale Matcher data definition file
 *
 * 包含语言匹配所需的基础数据，如脚本变体、默认地区和默认脚本优先级等
 * Contains basic data needed for locale matching, such as script variants, default regions and default script priorities
 */

// 脚本变体定义 Script Variants Definition
export const scriptVariants: Record<
  string,
  { script: string; regions: string[] }[]
> = {
  zh: [
    { script: 'Hans', regions: ['CN', 'SG'] },
    { script: 'Hant', regions: ['TW', 'HK', 'MO'] }
  ],
  sr: [
    { script: 'Cyrl', regions: ['RS', 'ME'] },
    { script: 'Latn', regions: ['ME', 'XK'] }
  ],
  az: [
    { script: 'Latn', regions: ['AZ'] },
    { script: 'Cyrl', regions: ['AZ'] }
  ],
  uz: [
    { script: 'Latn', regions: ['UZ'] },
    { script: 'Cyrl', regions: ['UZ'] }
  ],
  tg: [
    { script: 'Cyrl', regions: ['TJ'] },
    { script: 'Arab', regions: ['AF'] }
  ],
  ku: [
    { script: 'Latn', regions: ['TR', 'SY'] },
    { script: 'Arab', regions: ['IQ', 'IR'] }
  ],
  ms: [
    { script: 'Latn', regions: ['MY', 'SG', 'ID'] },
    { script: 'Arab', regions: ['MY', 'BN'] }
  ],
  mn: [
    { script: 'Cyrl', regions: ['MN'] },
    { script: 'Mong', regions: ['CN'] }
  ]
};

// 默认地区优先级 Default Region Priority
export const defaultRegions: Record<string, string[]> = {
  zh: ['CN', 'TW', 'HK', 'MO', 'SG'],
  en: ['US', 'GB', 'AU', 'CA'],
  es: ['ES', 'MX', 'US', 'AR'],
  fr: ['FR', 'CA', 'BE', 'CH'],
  de: ['DE', 'AT', 'CH'],
  ja: ['JP'],
  ko: ['KR', 'KP'],
  ru: ['RU', 'UA', 'BY'],
  ar: ['SA', 'EG', 'AE'],
  pt: ['PT', 'BR'],
  it: ['IT', 'CH'],
  hi: ['IN'],
  bn: ['BD', 'IN'],
  pa: ['IN', 'PK'],
  fa: ['IR', 'AF'],
  ur: ['PK', 'IN'],
  vi: ['VN'],
  th: ['TH'],
  id: ['ID'],
  ms: ['MY', 'SG', 'ID', 'BN'],
  nl: ['NL', 'BE'],
  pl: ['PL'],
  tr: ['TR'],
  sv: ['SE', 'FI'],
  da: ['DK'],
  no: ['NO'],
  fi: ['FI'],
  el: ['GR', 'CY'],
  mn: ['MN', 'CN']
};

// 默认脚本优先级 Default Script Priority
export const defaultScripts: Record<string, string[]> = {
  zh: ['Hans', 'Hant'],
  sr: ['Latn', 'Cyrl'],
  az: ['Latn', 'Cyrl'],
  uz: ['Latn', 'Cyrl'],
  tg: ['Cyrl', 'Arab'],
  ku: ['Latn', 'Arab'],
  ms: ['Latn', 'Arab'],
  mn: ['Cyrl', 'Mong']
};
