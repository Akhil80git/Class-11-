import { BookInfo, Chapter } from './types';
import { arohChapters } from './arohData';
import { vitanChapters } from './vitanData';
import { antaraChapters } from './antaraData';
import { antaralChapters } from './antaralData';

export const allBooks: BookInfo[] = [
  {
    id: 'aroh',
    name: 'आरोह भाग–1',
    hindiTitle: 'आरोह भाग–1 (हिंदी कोर)',
    curriculum: 'core',
    curriculumLabel: 'हिंदी कोर (Core)',
    description: 'गद्य खंड (8 अध्याय) एवं काव्य खंड (8 अध्याय) - मुंशी प्रेमचंद, कबीर, मीराबाई आदि की कालजयी कृतियाँ।',
    totalChapters: arohChapters.length,
    accentColor: '#B45309', // amber-700
    badgeBg: 'bg-amber-50 text-amber-900 border-amber-200'
  },
  {
    id: 'vitan',
    name: 'वितान भाग–1',
    hindiTitle: 'वितान भाग–1 (हिंदी कोर)',
    curriculum: 'core',
    curriculumLabel: 'हिंदी कोर (Core)',
    description: 'पूरक पाठ्यपुस्तक (4 अध्याय) - लता मंगेशकर, राजस्थान की रजत बूँदें, आलो-आँधारि, भारतीय कलाएँ।',
    totalChapters: vitanChapters.length,
    accentColor: '#047857', // emerald-700
    badgeBg: 'bg-emerald-50 text-emerald-900 border-emerald-200'
  },
  {
    id: 'antara',
    name: 'अंतरा भाग–1',
    hindiTitle: 'अंतरा भाग–1 (हिंदी ऐच्छिक)',
    curriculum: 'elective',
    curriculumLabel: 'हिंदी ऐच्छिक (Elective)',
    description: 'गद्य खंड (8 अध्याय) एवं काव्य खंड (8 अध्याय) - ईदगाह, दोपहर का भोजन, सूरदास, महादेवी वर्मा, नागार्जुन आदि।',
    totalChapters: antaraChapters.length,
    accentColor: '#1D4ED8', // blue-700
    badgeBg: 'bg-blue-50 text-blue-900 border-blue-200'
  },
  {
    id: 'antaral',
    name: 'अंतराल भाग–1',
    hindiTitle: 'अंतराल भाग–1 (हिंदी ऐच्छिक)',
    curriculum: 'elective',
    curriculumLabel: 'हिंदी ऐच्छिक (Elective)',
    description: 'पूरक पाठ्यपुस्तक (2 अध्याय) - हुसैन की कहानी अपनी ज़बानी, आवारा मसीहा (शरतचंद्र जीवनी)।',
    totalChapters: antaralChapters.length,
    accentColor: '#9333EA', // purple-600
    badgeBg: 'bg-purple-50 text-purple-900 border-purple-200'
  }
];

export const allChapters: Chapter[] = [
  ...arohChapters,
  ...vitanChapters,
  ...antaraChapters,
  ...antaralChapters
];

export function getChapterById(id: string): Chapter | undefined {
  return allChapters.find((ch) => ch.id === id);
}

export function getChaptersByBook(bookId: string): Chapter[] {
  return allChapters.filter((ch) => ch.bookId === bookId);
}
