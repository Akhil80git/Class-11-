import React from 'react';
import { Chapter } from '../data/types';
import { BookOpen, ArrowLeft, Volume2, VolumeX, Pause, Search, CheckCircle } from 'lucide-react';
import { hindiSpeech } from '../utils/speechUtils';

interface TopNavProps {
  activeChapter: Chapter | null;
  onBackToHome: () => void;
  onOpenSearch: () => void;
  fontSize: 'normal' | 'large' | 'xl';
  onChangeFontSize: (size: 'normal' | 'large' | 'xl') => void;
  isRead: boolean;
  onToggleRead: () => void;
  isAudioPlaying: boolean;
  isAudioPaused: boolean;
  onToggleAudio: () => void;
  onStopAudio: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeChapter,
  onBackToHome,
  onOpenSearch,
  fontSize,
  onChangeFontSize,
  isRead,
  onToggleRead,
  isAudioPlaying,
  isAudioPaused,
  onToggleAudio,
  onStopAudio
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
        {/* Left Slot: Back or Brand */}
        <div className="flex items-center gap-2.5 min-w-0">
          {activeChapter ? (
            <button
              onClick={onBackToHome}
              className="min-h-[44px] min-w-[44px] flex items-center gap-2 text-slate-800 hover:text-amber-800 transition-colors cursor-pointer truncate"
              title="अध्याय सूची पर लौटें"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <div className="truncate text-left hidden sm:block">
                <div className="text-xs text-slate-500 font-medium truncate">
                  {activeChapter.bookName} · अध्याय {activeChapter.chapterNumber}
                </div>
                <div className="text-sm font-bold text-slate-900 truncate font-display">
                  {activeChapter.title}
                </div>
              </div>
              <span className="sm:hidden text-xs font-semibold text-slate-700">सूची</span>
            </button>
          ) : (
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-700 text-white flex items-center justify-center shadow-xs shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="truncate">
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-amber-800 transition-colors font-display">
                  कक्षा 11 हिंदी NCERT
                </span>
                <span className="hidden sm:inline-block text-[11px] text-slate-500 ml-2 font-medium">
                  संपूर्ण अध्ययन व प्रश्नोत्तर
                </span>
              </div>
            </button>
          )}
        </div>

        {/* Right Slot: Contextual Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Audio narration button if chapter is active */}
          {activeChapter && (
            <div className="flex items-center gap-1">
              <button
                onClick={onToggleAudio}
                className={`min-h-[40px] px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isAudioPlaying && !isAudioPaused
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
                }`}
                title="कहानी सुनें"
              >
                {isAudioPlaying && !isAudioPaused ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">रोकें</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                    <span>{isAudioPaused ? 'पुनः सुनें' : 'सुनें'}</span>
                  </>
                )}
              </button>

              {isAudioPlaying && (
                <button
                  onClick={onStopAudio}
                  className="min-h-[40px] px-2 py-1.5 text-xs text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
                  title="ऑडियो बंद करें"
                >
                  <VolumeX className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Font Resizer */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => onChangeFontSize('normal')}
              className={`min-h-[36px] min-w-[28px] sm:min-w-[32px] px-1.5 py-1 rounded cursor-pointer ${
                fontSize === 'normal' ? 'bg-white shadow-xs font-bold text-slate-900' : 'text-slate-600'
              }`}
              title="सामान्य फॉन्ट"
            >
              अ
            </button>
            <button
              onClick={() => onChangeFontSize('large')}
              className={`min-h-[36px] min-w-[28px] sm:min-w-[32px] px-1.5 py-1 rounded cursor-pointer ${
                fontSize === 'large' ? 'bg-white shadow-xs font-bold text-slate-900' : 'text-slate-600'
              }`}
              title="बड़ा फॉन्ट"
            >
              अ+
            </button>
            <button
              onClick={() => onChangeFontSize('xl')}
              className={`min-h-[36px] min-w-[28px] sm:min-w-[32px] px-1.5 py-1 rounded cursor-pointer ${
                fontSize === 'xl' ? 'bg-white shadow-xs font-bold text-slate-900' : 'text-slate-600'
              }`}
              title="विशाल फॉन्ट"
            >
              अ++
            </button>
          </div>

          {/* Mark as Completed */}
          {activeChapter && (
            <button
              onClick={onToggleRead}
              className={`min-h-[40px] px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors ${
                isRead
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title={isRead ? 'पढ़ा हुआ' : 'पढ़ा हुआ मार्क करें'}
            >
              <CheckCircle className={`w-3.5 h-3.5 ${isRead ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span className="hidden md:inline">{isRead ? 'पूर्ण' : 'मार्क करें'}</span>
            </button>
          )}

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="min-h-[40px] min-w-[40px] p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer flex items-center justify-center"
            title="अध्याय या विषय खोजें"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
