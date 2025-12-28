import { defaultScripts, defaultRegions, scriptVariants } from './data';

export interface LocaleInfo {
  language: string;
  script?: string;
  region?: string;
  fullTag: string;
}

export interface MatchDetail extends LocaleInfo {
  score: number;
  matchReason: {
    scriptMatched: boolean;
    regionMatched: boolean;
    isAffinitiveRegion: boolean;
  };
}

export function parseLocale(tag: string): LocaleInfo {
  try {
    const loc = new Intl.Locale(tag);
    return {
      language: loc.language.toLowerCase(),
      script: loc.script,
      region: loc.region,
      fullTag: tag
    };
  } catch {
    const parts = tag.split(/[-_]/);
    const language = parts[0].toLowerCase();
    let script: string | undefined;
    let region: string | undefined;

    if (parts.length > 1) {
      if (parts[1].length === 4) {
        script =
          parts[1].charAt(0).toUpperCase() + parts[1].slice(1).toLowerCase();
        region = parts[2]?.toUpperCase();
      } else {
        region = parts[1].toUpperCase();
      }
    }

    return { language, script, region, fullTag: tag };
  }
}

function getAffinitiveRegions(lang: string, region?: string): string[] {
  if (!region) return [];
  const variants = scriptVariants[lang] || [];
  const match = variants.find((v) => v.regions.includes(region));
  return match ? match.regions : [region];
}

function calculateMatchScore(
  target: LocaleInfo,
  candidate: LocaleInfo
): MatchDetail {
  let score = 0;
  const reason = {
    scriptMatched: false,
    regionMatched: false,
    isAffinitiveRegion: false
  };

  if (target.script && candidate.script) {
    if (target.script === candidate.script) {
      score += 1000;
      reason.scriptMatched = true;
    } else {
      score += 100;
    }
  } else if (!candidate.script) {
    score += 500;
  }

  if (target.region && candidate.region) {
    if (target.region === candidate.region) {
      score += 500;
      reason.regionMatched = true;
    } else if (
      getAffinitiveRegions(target.language, target.region).includes(
        candidate.region
      )
    ) {
      score += 300;
      reason.isAffinitiveRegion = true;
    }
  }

  return { ...candidate, score, matchReason: reason };
}

export function rank(
  targetTag: string,
  candidateTags: string[]
): MatchDetail[] {
  if (!targetTag || !candidateTags.length) return [];

  const target = parseLocale(targetTag);

  if (!target.script && target.region) {
    const variants = scriptVariants[target.language] || [];
    target.script = variants.find((v) =>
      v.regions.includes(target.region!)
    )?.script;
  }

  const results = candidateTags
    .map(parseLocale)
    .filter((c) => c.language === target.language)
    .map((c) => calculateMatchScore(target, c));

  return results.sort((a, b) => {
    if (a.fullTag === target.fullTag) return -1;
    if (b.fullTag === target.fullTag) return 1;

    if (a.score !== b.score) return b.score - a.score;

    const scriptOrder = defaultScripts[target.language];
    if (scriptOrder && a.script && b.script) {
      const aIdx = scriptOrder.indexOf(a.script);
      const bIdx = scriptOrder.indexOf(b.script);
      if (aIdx !== bIdx)
        return (aIdx === -1 ? 1 : aIdx) - (bIdx === -1 ? 1 : bIdx);
    }

    if (!a.region && b.region) return -1;
    if (a.region && !b.region) return 1;

    const regionOrder = defaultRegions[target.language];
    if (regionOrder && a.region && b.region) {
      const aIdx = regionOrder.indexOf(a.region);
      const bIdx = regionOrder.indexOf(b.region);
      if (aIdx !== bIdx)
        return (aIdx === -1 ? 1 : aIdx) - (bIdx === -1 ? 1 : bIdx);
    }

    return a.fullTag.localeCompare(b.fullTag);
  });
}

export function match(targetTag: string, candidateTags: string[]): string[] {
  return rank(targetTag, candidateTags).map((r) => r.fullTag);
}
