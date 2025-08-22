/**
 * Locale Matcher 数据定义文件
 * Locale Matcher data definition file
 * 
 * 包含语言匹配所需的基础数据，如脚本变体、默认地区和默认脚本优先级等
 * Contains basic data needed for locale matching, such as script variants, default regions and default script priorities
 */

// 脚本变体定义 - Script Variants Definition
// 定义特定语言在不同地区使用的脚本类型
// Defines the script types used by specific languages in different regions
export const scriptVariants: Record<string, { script: string; regions: string[] }[]> = {
    zh: [
        { script: 'Hans', regions: ['CN', 'SG'] },
        // Chinese Simplified script used in Mainland China and Singapore
        { script: 'Hant', regions: ['TW', 'HK', 'MO'] }
        // Chinese Traditional script used in Taiwan, Hong Kong and Macau
    ],
    sr: [
        { script: 'Cyrl', regions: ['RS', 'ME'] },
        { script: 'Latn', regions: ['ME', 'XK'] }
    ],
    az: [
        { script: 'Latn', regions: ['AZ'] },
        { script: 'Cyrl', regions: ['AZ'] }
    ]
};

// 默认地区优先级（第一个为最高优先级）
// Default Region Priority (first is highest priority)
// 定义当语言相同时，各地区的默认优先级顺序
// Defines the default priority order of regions when the language is the same
export const defaultRegions: Record<string, string[]> = {
    zh: ['CN', 'TW', 'HK', 'MO', 'SG'],
    // Chinese region priority: Mainland China > Taiwan > Hong Kong > Macau > Singapore
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
    ur: ['PK', 'IN']
};

// 默认脚本优先级（第一个为最高优先级）
// Default Script Priority (first is highest priority)
// 定义当语言相同时，各脚本的默认优先级顺序
// Defines the default priority order of scripts when the language is the same
export const defaultScripts: Record<string, string[]> = {
    zh: ['Hans', 'Hant'],
    // Chinese script priority: Simplified > Traditional
    sr: ['Latn', 'Cyrl'],
    az: ['Latn', 'Cyrl'],
    uz: ['Latn', 'Cyrl']
};