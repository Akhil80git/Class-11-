import React from 'react';
import { BookInfo, Chapter } from '../data/types';
import { BookOpen, Sparkles, CheckCircle2, ChevronRight, Layers, FileText } from 'lucide-react';

interface BooksScreenProps {
  books: BookInfo[];
  readChapterIds: Set<string>;
  allChapters: Chapter[];
  onSelectBookChapters: (bookId: string) => void;
  onOpenDirectChapter: (chapter: Chapter) => void;
}

export const BooksScreen: React.FC<BooksScreenProps> = ({
  books,
  readChapterIds,
  allChapters,
  onSelectBookChapters,
  onOpenDirectChapter
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-in fade-in duration-200">
      {/* Screen Header */}
      <div className="bg-linear-to-br from-amber-900 via-amber-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-700/60 text-amber-200 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NCERT कक्षा 11 हिंदी • सत्र 2026–27</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight">
            चारों आधिकारिक पाठ्यपुस्तकें
          </h1>
          <p className="text-amber-100/90 text-sm leading-relaxed">
            कक्षा 11 हिंदी कोर एवं ऐच्छिक (Core & Elective) की चारों पुस्तकों के संपूर्ण ३८ अध्यायों की विस्तृत कहानियाँ, पाठ्यपुस्तक प्रश्नोत्तर एवं अभ्यास यहाँ उपलब्ध हैं।
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-amber-200">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> कुल ३८ अध्याय
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <FileText className="w-4 h-4 text-amber-300" /> १००+ NCERT प्रश्नोत्तर
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Layers className="w-4 h-4 text-amber-300" /> कोर + ऐच्छिक दोनों
            </span>
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-600/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Books Cards Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-800" />
          <span>अपनी पुस्तक चुनें</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {books.map((book) => {
            const bookChapters = allChapters.filter((c) => c.bookId === book.id);
            const readCount = bookChapters.filter((c) => readChapterIds.has(c.id)).length;
            const progressPct = bookChapters.length > 0 ? Math.round((readCount / bookChapters.length) * 100) : 0;
            const firstChapter = bookChapters[0];

            return (
              <div
                key={book.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                        book.curriculum === 'core'
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                      }`}
                    >
                      {book.curriculum === 'core' ? 'Hindi Core (कोर)' : 'Hindi Elective (ऐच्छिक)'}
                    </span>

                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {book.totalChapters} अध्याय
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 font-display group-hover:text-amber-800 transition-colors">
                      {book.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">{book.hindiTitle}</p>
                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-2">
                      {book.description}
                    </p>
                  </div>

                  {/* Progress Indicator */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                      <span>पढ़े गए अध्याय</span>
                      <span>
                        {readCount}/{bookChapters.length} ({progressPct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-700 rounded-full transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2.5">
                  <button
                    onClick={() => onSelectBookChapters(book.id)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>सभी {book.totalChapters} अध्याय देखें</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {firstChapter && (
                    <button
                      onClick={() => onOpenDirectChapter(firstChapter)}
                      className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer shrink-0"
                      title="पहला अध्याय पढ़ें"
                    >
                      पढ़ें
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Curriculum Note */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="font-bold">सत्र 2026–27 निर्देश:</strong> कक्षा 11 के विद्यार्थी अपने विद्यालय के पाठ्यक्रम (कोर या ऐच्छिक) के अनुसार पुस्तकें चुन सकते हैं। प्रत्येक अध्याय में कथा का भावार्थ, पात्र-परिचय, कठिन शब्दार्थ और NCERT के प्रामाणिक प्रश्नोत्तर सम्मिलित हैं।
        </p>
      </div>
    </div>
  );
};
