import React from 'react';
import { BookInfo } from '../data/types';
import { BookOpen, FileDown, ArrowRight } from 'lucide-react';

interface BookCardGridProps {
  books: BookInfo[];
  selectedBookId: string;
  onSelectBook: (id: string) => void;
}

export const BookCardGrid: React.FC<BookCardGridProps> = ({
  books,
  selectedBookId,
  onSelectBook
}) => {
  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">
            NCERT पुस्तकें (चारों पुस्तकें उपलब्ध)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            अपनी निर्धारित पुस्तक चुनें और अध्याय-वार अध्ययन या संपूर्ण पुस्तक PDF प्राप्त करें
          </p>
        </div>
        {selectedBookId !== 'all' && (
          <button
            onClick={() => onSelectBook('all')}
            className="text-xs font-semibold text-amber-800 hover:underline cursor-pointer"
          >
            सभी पुस्तकें दिखाएँ
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {books.map((book) => {
          const isSelected = selectedBookId === book.id;
          return (
            <div
              key={book.id}
              onClick={() => onSelectBook(book.id)}
              className={`group relative p-5 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-50/60 border-amber-600 shadow-sm ring-1 ring-amber-600'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${book.accentColor}18`, color: book.accentColor }}
                >
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-medium text-slate-500">
                  {book.curriculumLabel}
                </span>
              </div>

              <div className="mt-4 space-y-1.5">
                <h3 className="text-base font-bold text-slate-900 font-display group-hover:text-amber-800 transition-colors">
                  {book.name}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {book.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">
                  {book.totalChapters} अध्याय
                </span>
                <span className="flex items-center gap-1 text-amber-800 font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>अध्याय देखें</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
