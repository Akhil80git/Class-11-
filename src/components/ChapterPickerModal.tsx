import React, { useState } from 'react';
import { Chapter } from '../data/types';
import { allChapters } from '../data/allChapters';
import { X, Search, Check, BookOpen } from 'lucide-react';

interface ChapterPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeChapterId: string;
  onSelectChapter: (chapter: Chapter) => void;
}

export const ChapterPickerModal: React.FC<ChapterPickerModalProps> = ({
  isOpen,
  onClose,
  activeChapterId,
  onSelectChapter
}) => {
  const [search, setSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState<string>('all');

  if (!isOpen) return null;

  const filtered = allChapters.filter((ch) => {
    if (selectedBook !== 'all' && ch.bookId !== selectedBook) return false;
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      return (
        ch.title.toLowerCase().includes(q) ||
        ch.author.toLowerCase().includes(q) ||
        ch.bookName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-xl max-h-[85vh] rounded-t-3xl sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom duration-200">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display">अध्याय चुनें</h2>
              <p className="text-xs text-slate-500">कुल ३८ अध्यायों में से सीधे किसी भी अध्याय पर जाएँ</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-200/70 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="अध्याय का नाम या लेखक खोजें..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800 transition-all"
            />
          </div>

          {/* Book Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'all', label: 'सभी (38)' },
              { id: 'aroh', label: 'आरोह (16)' },
              { id: 'vitan', label: 'वितान (4)' },
              { id: 'antara', label: 'अंतरा (16)' },
              { id: 'antaral', label: 'अंतराल (2)' }
            ].map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBook(b.id)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedBook === b.id
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chapters List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 divide-y divide-slate-50">
          {filtered.length > 0 ? (
            filtered.map((ch) => {
              const isActive = ch.id === activeChapterId;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    onSelectChapter(ch);
                    onClose();
                  }}
                  className={`w-full text-left p-3 rounded-2xl flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-amber-50/80 border border-amber-300 text-amber-950'
                      : 'hover:bg-slate-50 border border-transparent text-slate-800'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {ch.bookName} • {ch.sectionName}
                      </span>
                      <span className="text-[10px] text-slate-400">अध्याय {ch.chapterNumber}</span>
                    </div>
                    <div className="text-sm font-bold truncate font-display">{ch.title}</div>
                    <div className="text-xs text-slate-500 truncate">{ch.author}</div>
                  </div>
                  {isActive ? (
                    <div className="w-7 h-7 rounded-full bg-amber-800 text-white flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                  ) : (
                    <span className="text-xs text-amber-800 font-semibold shrink-0">खोलें →</span>
                  )}
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">कोई अध्याय नहीं मिला</div>
          )}
        </div>
      </div>
    </div>
  );
};
