import { assistantMeta, type KnowledgeChunk } from '../content/assistant';

const MIN_SCORE = 2;

const STOP_WORDS = new Set([
  'a',
  'an',
  'the',
  'is',
  'are',
  'do',
  'does',
  'can',
  'i',
  'my',
  'we',
  'you',
  'your',
  'what',
  'how',
  'when',
  'where',
  'who',
  'about',
  'for',
  'and',
  'or',
  'to',
  'of',
  'in',
  'on',
  'it',
  'me',
  'with',
]);

export type SearchResult = {
  answer: string;
  confidence: 'high' | 'low';
  matchedTitle?: string;
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(text: string): string[] {
  return normalize(text)
    .split(' ')
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

function scoreChunk(query: string, queryTokens: string[], chunk: KnowledgeChunk): number {
  const titleNorm = normalize(chunk.title);
  const qNorm = normalize(query);
  let score = 0;

  if (titleNorm.includes(qNorm) && qNorm.length > 3) {
    score += 6;
  }

  for (const token of queryTokens) {
    if (titleNorm.includes(token)) score += 3;
    if (normalize(chunk.keywords).includes(token)) score += 1;
    if (normalize(chunk.body).includes(token)) score += 0.5;
  }

  return score;
}

export function searchKnowledge(
  query: string,
  chunks: KnowledgeChunk[],
): SearchResult {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      answer: assistantMeta.fallback,
      confidence: 'low',
    };
  }

  const queryTokens = tokenize(trimmed);
  if (queryTokens.length === 0) {
    return {
      answer: assistantMeta.fallback,
      confidence: 'low',
    };
  }

  let best: { chunk: KnowledgeChunk; score: number } | null = null;

  for (const chunk of chunks) {
    const score = scoreChunk(trimmed, queryTokens, chunk);
    if (!best || score > best.score) {
      best = { chunk, score };
    }
  }

  if (!best || best.score < MIN_SCORE) {
    return {
      answer: assistantMeta.fallback,
      confidence: 'low',
    };
  }

  return {
    answer: best.chunk.body,
    confidence: 'high',
    matchedTitle: best.chunk.title,
  };
}