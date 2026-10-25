import React from 'react';
import { Chapter } from '../data/types';
import { BookOpen, HelpCircle, ArrowRight, CheckCircle2, BookText } from 'lucide-react';

interface ChapterCardProps {
  chapter: Chapter;
  onOpenReader: (chapter: Chapter, initialTab?: 'summary' | 'qa') => void;
  isRead?: boolean;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  onOpenReader,
  isRead = false
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden">
      <div className="p-5 space-y-3">
        {/* Unboxed clean metadata line with separators */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-amber-800 font-semibold">{chapter.bookName}</span>
            <span aria-hidden="true">·</span>
            <span>{chapter.sectionName}</span>
            <span aria-hidden="true">·</span>
            <span>अध्याय {chapter.chapterNumber}</span>
          </div>
          {isRead && (
            <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>पढ़ा गया</span>
            </span>
          )}
        </div>

        {/* Title and Author */}
        <div>
          <h3
            onClick={() => onOpenReader(chapter, 'summary')}
            className="text-lg font-bold text-slate-900 font-display hover:text-amber-800 transition-colors cursor-pointer leading-snug"
          >
            {chapter.title}
          </h3>
          <p className="text-xs font-medium text-slate-600 mt-1">
            रचनाकार: <span className="text-slate-900 font-semibold">{chapter.author}</span>
            <span className="text-slate-400 mx-1.5">|</span>
            <span className="text-slate-500">{chapter.genre}</span>
          </p>
        </div>

        {/* Pratipadya / Summary Excerpt */}
        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
          <span className="font-semibold text-slate-700">प्रतिपाद्य: </span>
          {chapter.pratipadya}
        </p>

        {/* Counts summary (Questions, Word Meanings, MCQs) */}
        <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
          <div className="flex items-center gap-1 text-slate-600">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>{chapter.questions.length} NCERT प्रश्नोत्तर</span>
          </div>
          <div className="flex items-center gap-1 text-slate-600">
            <BookOpen className="w-3.5 h-3.5 text-blue-700" />
            <span>{chapter.wordMeanings.length} शब्दार्थ</span>
          </div>
          <div className="flex items-center gap-1 text-slate-600">
            <span className="font-semibold text-emerald-700">{chapter.mcqs.length}</span>
            <span>MCQs</span>
          </div>
        </div>
      </div>

      {/* Action Footer with Touch Ergonomics */}
      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onOpenReader(chapter, 'summary')}
          className="min-h-[44px] flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-900 hover:text-amber-800 transition-colors cursor-pointer"
        >
          <BookText className="w-4 h-4 text-amber-700" />
          <span>कथा-सार</span>
        </button>

        <button
          onClick={() => onOpenReader(chapter, 'qa')}
          className="min-h-[44px] flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-900 bg-amber-100/90 hover:bg-amber-200 rounded-lg transition-colors cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 text-amber-800" />
          <span>प्रश्न-उत्तर देखें ({chapter.questions.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
