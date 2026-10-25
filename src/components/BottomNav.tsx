import React from 'react';
import { BookOpen, ListFilter, BookText, HelpCircle, CheckSquare } from 'lucide-react';

export type ActiveNavTab = 'books' | 'chapters' | 'story' | 'qa' | 'quiz';

interface BottomNavProps {
  activeTab: ActiveNavTab;
  onSelectTab: (tab: ActiveNavTab) => void;
  hasSelectedChapter: boolean;
  selectedChapterTitle?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  hasSelectedChapter,
  selectedChapterTitle
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg">
      <div className="max-w-xl mx-auto grid grid-cols-5 h-16 items-center px-1">
        {/* Tab 1: पुस्तकें (Books) */}
        <button
          onClick={() => onSelectTab('books')}
          className={`min-h-[48px] min-w-[44px] flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
            activeTab === 'books'
              ? 'text-amber-800 font-bold'
              : 'text-slate-600 hover:text-slate-900 font-medium'
          }`}
        >
          <BookOpen className={`w-5 h-5 ${activeTab === 'books' ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] tracking-tight mt-1">पुस्तकें</span>
          {activeTab === 'books' && (
            <span className="w-1.5 h-1.5 bg-amber-800 rounded-full mt-0.5" />
          )}
        </button>

        {/* Tab 2: अध्याय सूची (Chapters) */}
        <button
          onClick={() => onSelectTab('chapters')}
          className={`min-h-[48px] min-w-[44px] flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
            activeTab === 'chapters'
              ? 'text-amber-800 font-bold'
              : 'text-slate-600 hover:text-slate-900 font-medium'
          }`}
        >
          <ListFilter className={`w-5 h-5 ${activeTab === 'chapters' ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] tracking-tight mt-1">अध्याय</span>
          {activeTab === 'chapters' && (
            <span className="w-1.5 h-1.5 bg-amber-800 rounded-full mt-0.5" />
          )}
        </button>

        {/* Tab 3: कथा-सार (Story / Summary) */}
        <button
          onClick={() => onSelectTab('story')}
          className={`min-h-[48px] min-w-[44px] flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
            activeTab === 'story'
              ? 'text-amber-800 font-bold'
              : 'text-slate-600 hover:text-slate-900 font-medium'
          }`}
        >
          <BookText className={`w-5 h-5 ${activeTab === 'story' ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] tracking-tight mt-1">कथा-सार</span>
          {activeTab === 'story' && (
            <span className="w-1.5 h-1.5 bg-amber-800 rounded-full mt-0.5" />
          )}
        </button>

        {/* Tab 4: प्रश्न-उत्तर (NCERT Q&A) */}
        <button
          onClick={() => onSelectTab('qa')}
          className={`min-h-[48px] min-w-[44px] flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
            activeTab === 'qa'
              ? 'text-amber-800 font-bold'
              : 'text-slate-600 hover:text-slate-900 font-medium'
          }`}
        >
          <HelpCircle className={`w-5 h-5 ${activeTab === 'qa' ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] tracking-tight mt-1">प्रश्न-उत्तर</span>
          {activeTab === 'qa' && (
            <span className="w-1.5 h-1.5 bg-amber-800 rounded-full mt-0.5" />
          )}
        </button>

        {/* Tab 5: प्रश्नोत्तरी (Quiz / MCQs) */}
        <button
          onClick={() => onSelectTab('quiz')}
          className={`min-h-[48px] min-w-[44px] flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
            activeTab === 'quiz'
              ? 'text-amber-800 font-bold'
              : 'text-slate-600 hover:text-slate-900 font-medium'
          }`}
        >
          <CheckSquare className={`w-5 h-5 ${activeTab === 'quiz' ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] tracking-tight mt-1">प्रश्नोत्तरी</span>
          {activeTab === 'quiz' && (
            <span className="w-1.5 h-1.5 bg-amber-800 rounded-full mt-0.5" />
          )}
        </button>
      </div>
    </nav>
  );
};
