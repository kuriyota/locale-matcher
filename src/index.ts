import { defaultScripts, defaultRegions, scriptVariants } from './data';

/**
 *
 * @param tag Language tag
 */
function parseLanguageTag(tag: string) {
  const parts = tag.split(/[-_]/);
  const result = {
    language: parts[0].toLowerCase(),
    script: parts.length > 1 && parts[1].length === 4 ? parts[1] : undefined,
    region:
      parts.length > (parts[1]?.length === 4 ? 2 : 1)
        ? parts[parts[1]?.length === 4 ? 2 : 1].toUpperCase()
        : undefined,
    fullTag: tag
  };
  return result;
}

// 获取关联地区
function getAssociatedRegions(language: string, region?: string) {
  if (!region) return [];
  const variants = scriptVariants[language];
  if (!variants) return [region];

  for (const variant of variants) {
    if (variant.regions.includes(region)) {
      return variant.regions;
    }
  }
  return [region];
}

/**
 * 匹配语言 | Match languages
 * @param targetLang - 目标语言 | Target language
 * @param candidateLangs - 候选语言 | Candidate languages
 * @returns 匹配结果数组 | Array of matched languages (sorted)
 */
export function matchLanguages(targetLang: string, candidateLangs: string[]) {
  if (!targetLang || !candidateLangs?.length) return [];

  const target = parseLanguageTag(targetLang);
  const candidates = candidateLangs
    .map(parseLanguageTag)
    .filter((c) => c.language === target.language);

  if (!candidates.length) return [];

  // 推断目标脚本（如果未明确指定）
  if (!target.script && target.region) {
    for (const variant of scriptVariants[target.language] || []) {
      if (variant.regions.includes(target.region)) {
        target.script = variant.script;
        break;
      }
    }
  }

  // 计算匹配得分
  const scoredCandidates = candidates.map((candidate) => {
    let score = 0;

    // 1. 脚本匹配（最高优先级）
    if (target.script && candidate.script) {
      if (target.script === candidate.script) {
        score += 1000; // 完全脚本匹配
      } else {
        // 脚本不匹配但语言相同
        score += 100;
      }
    } else if (!candidate.script) {
      // 无脚本加分
      score += 500;
    }

    // 2. 地区匹配
    if (target.region && candidate.region) {
      // 完全匹配
      if (target.region === candidate.region) {
        score += 500;
      }
      // 关联地区匹配
      else if (
        getAssociatedRegions(target.language, target.region).includes(
          candidate.region
        )
      ) {
        score += 300;
      }
    }

    return { ...candidate, score };
  });

  // 排序规则
  scoredCandidates.sort((a, b) => {
    // 1. 按总分降序
    if (a.score !== b.score) return b.score - a.score;

    // 2. 脚本优先级排序
    const scripts = defaultScripts[target.language];
    if (scripts && a.script && b.script) {
      const aIndex = scripts.indexOf(a.script);
      const bIndex = scripts.indexOf(b.script);
      if (aIndex !== -1 && bIndex !== -1 && aIndex !== bIndex) {
        return aIndex - bIndex; // 优先脚本优先级高的
      }
    }

    // 3. 无地区优先
    if (!a.region && b.region) return -1;
    if (a.region && !b.region) return 1;

    // 4. 按地区优先级排序
    const regions = defaultRegions[target.language];
    if (regions && a.region && b.region) {
      const aIndex = regions.indexOf(a.region);
      const bIndex = regions.indexOf(b.region);

      // 两个地区都在优先级列表中
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex; // 优先索引小的
      }

      // 只有a在优先级列表中
      if (aIndex !== -1) return -1;

      // 只有b在优先级列表中
      if (bIndex !== -1) return 1;
    }

    // 5. 按完整标签字母顺序
    return a.fullTag.localeCompare(b.fullTag);
  });

  return scoredCandidates.map((c) => c.fullTag);
}
