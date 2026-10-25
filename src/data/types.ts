export type BookId = 'aroh' | 'vitan' | 'antara' | 'antaral';

export type SectionType = 'gadya' | 'kavya' | 'purak';

export type CurriculumType = 'all' | 'core' | 'elective';

export interface WordMeaning {
  word: string;
  meaning: string;
}

export interface QuestionAnswer {
  id: string;
  type: 'ncert' | 'important' | 'short' | 'long' | 'vyakhya';
  category?: 'पाठ के साथ' | 'पाठ के आस-पास' | 'भाषा की बात' | 'काव्य-सौंदर्य एवं भावार्थ' | 'काव्य-सौंदर्य' | 'भाषा की बात / विचार' | 'परीक्षा प्रश्न' | string;
  typeLabel: string;
  question: string;
  answer: string;
  examTip?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CharacterItem {
  name: string;
  role: string;
}

export interface Chapter {
  id: string;
  bookId: BookId;
  bookName: string;
  curriculum: 'core' | 'elective';
  section: SectionType;
  sectionName: string;
  chapterNumber: number;
  title: string;
  author: string;
  genre: string;
  authorBio?: string;
  pratipadya: string; // प्रतिपाद्य / केंद्रीय भाव
  summary: string[]; // विस्तृत पाठ सारांश (पैराग्राफ्स में)
  keyTakeaways: string[]; // मुख्य बिंदु
  characters?: CharacterItem[];
  wordMeanings: WordMeaning[];
  questions: QuestionAnswer[];
  mcqs: QuizQuestion[];
}

export interface BookInfo {
  id: BookId;
  name: string;
  hindiTitle: string;
  curriculum: 'core' | 'elective';
  curriculumLabel: string;
  description: string;
  totalChapters: number;
  accentColor: string;
  badgeBg: string;
}

