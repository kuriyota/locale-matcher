import { defaultScripts, defaultRegions, scriptVariants } from './data';

export function parseLanguageTag(tag: string) {
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

  if (!target.script && target.region) {
    for (const variant of scriptVariants[target.language] || []) {
      if (variant.regions.includes(target.region)) {
        target.script = variant.script;
        break;
      }
    }
  }

  const scoredCandidates = candidates.map((candidate) => {
    let score = 0;

    if (target.script && candidate.script) {
      if (target.script === candidate.script) {
        score += 1000;
      } else {
        score += 100;
      }
    } else if (!candidate.script) {
      score += 500;
    }

    if (target.region && candidate.region) {
      if (target.region === candidate.region) {
        score += 500;
      } else if (
        getAssociatedRegions(target.language, target.region).includes(
          candidate.region
        )
      ) {
        score += 300;
      }
    }

    return { ...candidate, score };
  });

  scoredCandidates.sort((a, b) => {
    if (a.fullTag == target.fullTag) {
      return -1;
    }
    if (b.fullTag == target.fullTag) {
      return 1;
    }
    if (a.score !== b.score) return b.score - a.score;
    const scripts = defaultScripts[target.language];
    if (scripts && a.script && b.script) {
      const aIndex = scripts.indexOf(a.script);
      const bIndex = scripts.indexOf(b.script);
      if (aIndex !== -1 && bIndex !== -1 && aIndex !== bIndex) {
        return aIndex - bIndex;
      }
    }

    if (!a.region && b.region) return -1;
    if (a.region && !b.region) return 1;

    const regions = defaultRegions[target.language];
    if (regions && a.region && b.region) {
      const aIndex = regions.indexOf(a.region);
      const bIndex = regions.indexOf(b.region);
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
    }
    return a.fullTag.localeCompare(b.fullTag);
  });

  return scoredCandidates.map((c) => c.fullTag);
}
