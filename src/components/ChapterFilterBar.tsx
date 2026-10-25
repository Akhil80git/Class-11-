import React from 'react';
import { SectionType } from '../data/types';

interface ChapterFilterBarProps {
  selectedBook: string;
  onSelectBook: (book: string) => void;
  selectedSection: string;
  onSelectSection: (section: string) => void;
  selectedCurriculum: string;
  onSelectCurriculum: (curriculum: string) => void;
  counts: {
    total: number;
    aroh: number;
    vitan: number;
    antara: number;
    antaral: number;
    gadya: number;
    kavya: number;
    purak: number;
  };
}

export const ChapterFilterBar: React.FC<ChapterFilterBarProps> = ({
  selectedBook,
  onSelectBook,
  selectedSection,
  onSelectSection,
  selectedCurriculum,
  onSelectCurriculum,
  counts
}) => {
  return (
    <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-6">
      {/* Book Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          पुस्तक चुनें:
        </span>
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => onSelectBook('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              selectedBook === 'all'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            सभी पुस्तकें ({counts.total})
          </button>
          <button
            onClick={() => onSelectBook('aroh')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              selectedBook === 'aroh'
                ? 'bg-amber-800 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            आरोह भाग-1 ({counts.aroh})
          </button>
          <button
            onClick={() => onSelectBook('vitan')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              selectedBook === 'vitan'
                ? 'bg-emerald-800 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            वितान भाग-1 ({counts.vitan})
          </button>
          <button
            onClick={() => onSelectBook('antara')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              selectedBook === 'antara'
                ? 'bg-blue-800 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            अंतरा भाग-1 ({counts.antara})
          </button>
          <button
            onClick={() => onSelectBook('antaral')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              selectedBook === 'antaral'
                ? 'bg-purple-800 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            अंतराल भाग-1 ({counts.antaral})
          </button>
        </div>
      </div>

      {/* Section & Curriculum Sub-filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">खंड:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onSelectSection('all')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                selectedSection === 'all'
                  ? 'bg-slate-900 text-white font-medium'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              सभी खंड
            </button>
            <button
              onClick={() => onSelectSection('gadya')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                selectedSection === 'gadya'
                  ? 'bg-slate-900 text-white font-medium'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              गद्य खंड ({counts.gadya})
            </button>
            <button
              onClick={() => onSelectSection('kavya')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                selectedSection === 'kavya'
                  ? 'bg-slate-900 text-white font-medium'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              काव्य खंड ({counts.kavya})
            </button>
            <button
              onClick={() => onSelectSection('purak')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                selectedSection === 'purak'
                  ? 'bg-slate-900 text-white font-medium'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              पूरक पुस्तकें ({counts.purak})
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">पाठ्यक्रम:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onSelectCurriculum('all')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                selectedCurriculum === 'all'
                  ? 'bg-amber-100 text-amber-900 font-medium'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              सभी
            </button>
            <button
              onClick={() => onSelectCurriculum('core')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                selectedCurriculum === 'core'
                  ? 'bg-amber-100 text-amber-900 font-medium'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              कोर (Core)
            </button>
            <button
              onClick={() => onSelectCurriculum('elective')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                selectedCurriculum === 'elective'
                  ? 'bg-amber-100 text-amber-900 font-medium'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              ऐच्छिक (Elective)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
