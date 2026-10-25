import React, { useState, useEffect } from 'react';
import { Chapter } from '../data/types';
import { hindiSpeech } from '../utils/speechUtils';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Pause,
  HelpCircle,
  BookOpen,
  CheckSquare,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  BookText,
  Copy,
  Check
} from 'lucide-react';

interface ChapterReaderProps {
  chapter: Chapter;
  onBack: () => void;
  onNextChapter?: () => void;
  onPrevChapter?: () => void;
  onOpenChapterPicker?: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  fontSize: 'normal' | 'large' | 'xl';
  initialTab?: 'summary' | 'qa' | 'words' | 'quiz';
  onTabChange?: (tab: 'summary' | 'qa' | 'words' | 'quiz') => void;
}

export const ChapterReader: React.FC<ChapterReaderProps> = ({
  chapter,
  onBack,
  onNextChapter,
  onPrevChapter,
  onOpenChapterPicker,
  hasNext,
  hasPrev,
  fontSize,
  initialTab = 'summary',
  onTabChange
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'qa' | 'words' | 'quiz'>(initialTab);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Sync initialTab if changed from parent bottom nav
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabClick = (tab: 'summary' | 'qa' | 'words' | 'quiz') => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [showExplanations, setShowExplanations] = useState<{ [qId: string]: boolean }>({});

  // Question filter state
  const [qaFilter, setQaFilter] = useState<'all' | 'पाठ के साथ' | 'पाठ के आस-पास' | 'भाषा की बात' | 'परीक्षा प्रश्न'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Speech subscription
  useEffect(() => {
    hindiSpeech.subscribe((speaking, paused) => {
      setIsSpeaking(speaking);
      setIsPaused(paused);
    });

    return () => {
      hindiSpeech.stop();
    };
  }, [chapter.id]);

  const toggleAudio = () => {
    if (isSpeaking) {
      if (isPaused) {
        hindiSpeech.resume();
      } else {
        hindiSpeech.pause();
      }
    } else {
      const fullTextToRead = `${chapter.title}। लेखक हैं ${chapter.author}। ${chapter.pratipadya}। ${chapter.summary.join(' ')}`;
      hindiSpeech.speak(fullTextToRead);
    }
  };

  const handleStopAudio = () => {
    hindiSpeech.stop();
  };

  const handleCopyAnswer = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const fontClass = {
    normal: 'text-sm sm:text-base leading-relaxed',
    large: 'text-base sm:text-lg leading-relaxed',
    xl: 'text-lg sm:text-xl leading-loose'
  }[fontSize];

  // Distribute questions into textbook categories if not already explicitly set
  const categorizedQuestions = chapter.questions.map((q, idx) => {
    let cat = q.category;
    if (!cat) {
      if (idx === 0 || idx === 1) cat = 'पाठ के साथ';
      else if (idx === 2) cat = 'पाठ के आस-पास';
      else if (idx === 3) cat = 'भाषा की बात';
      else cat = 'परीक्षा प्रश्न';
    }
    return { ...q, category: cat };
  });

  const filteredQuestions = categorizedQuestions.filter((q) => {
    if (qaFilter === 'all') return true;
    return q.category === qaFilter;
  });

  const handleSelectOption = (qId: string, optIndex: number) => {
    if (selectedAnswers[qId] !== undefined) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIndex }));
    setShowExplanations((prev) => ({ ...prev, [qId]: true }));
  };

  return (
    <div className="max-w-4xl mx-auto px-3.5 sm:px-6 py-4 sm:py-6 space-y-5 pb-24">
      {/* Mobile Breadcrumb / Back button */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={onBack}
          className="min-h-[44px] flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>अध्याय सूची</span>
        </button>

        <div className="flex items-center gap-2">
          {onOpenChapterPicker && (
            <button
              onClick={onOpenChapterPicker}
              className="min-h-[38px] px-3 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>अध्याय बदलें</span>
            </button>
          )}
          <span className="text-xs font-semibold text-amber-900 bg-amber-100/80 px-2.5 py-1.5 rounded-lg border border-amber-200">
            {chapter.bookName} · अध्याय {chapter.chapterNumber}
          </span>
        </div>
      </div>

      {/* Chapter Title Card */}
      <div className="bg-gradient-to-r from-amber-50/90 via-orange-50/70 to-amber-50/50 p-5 sm:p-7 rounded-2xl border border-amber-200 shadow-xs space-y-3.5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-amber-900">
          <span>{chapter.bookName}</span>
          <span aria-hidden="true">·</span>
          <span>{chapter.sectionName}</span>
          <span aria-hidden="true">·</span>
          <span>विधा: {chapter.genre}</span>
        </div>

        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 font-display leading-tight">
            {chapter.title}
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-700">
            रचनाकार: <span className="font-bold text-amber-950">{chapter.author}</span>
          </p>
        </div>

        {/* Pratipadya Highlight Box */}
        <div className="bg-white/90 p-3.5 rounded-xl border border-amber-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed font-hindi-body">
          <span className="font-bold text-amber-900">पाठ का केंद्रीय भाव (प्रतिपाद्य): </span>
          {chapter.pratipadya}
        </div>

        {/* Audio narration toolbar */}
        <div className="pt-1 flex flex-wrap items-center gap-2.5">
          <button
            onClick={toggleAudio}
            className={`min-h-[44px] flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isSpeaking && !isPaused
                ? 'bg-amber-700 text-white shadow-xs'
                : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            {isSpeaking && !isPaused ? (
              <>
                <Pause className="w-4 h-4" />
                <span>कहानी रोकें (Pause)</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-amber-700" />
                <span>{isPaused ? 'कहानी पुनः सुनें' : 'पूरी कहानी सुनें (Audio)'}</span>
              </>
            )}
          </button>

          {isSpeaking && (
            <button
              onClick={handleStopAudio}
              className="min-h-[44px] flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 cursor-pointer"
            >
              <VolumeX className="w-4 h-4" />
              <span>बंद करें</span>
            </button>
          )}

          {chapter.authorBio && (
            <span className="text-xs text-slate-500 italic hidden md:inline-block">
              {chapter.authorBio}
            </span>
          )}
        </div>
      </div>

      {/* Main Tab Controls (4 Sections) */}
      <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-xl border border-slate-200 text-xs sm:text-sm overflow-x-auto">
        <button
          onClick={() => handleTabClick('summary')}
          className={`min-h-[44px] flex-1 min-w-[90px] flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'summary'
              ? 'bg-white text-slate-900 font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookText className="w-4 h-4 text-amber-700" />
          <span>कथा-सार</span>
        </button>

        <button
          onClick={() => handleTabClick('qa')}
          className={`min-h-[44px] flex-1 min-w-[90px] flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'qa'
              ? 'bg-white text-slate-900 font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-blue-700" />
          <span>प्रश्न-उत्तर ({chapter.questions.length})</span>
        </button>

        <button
          onClick={() => handleTabClick('words')}
          className={`min-h-[44px] flex-1 min-w-[90px] flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'words'
              ? 'bg-white text-slate-900 font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>शब्दार्थ ({chapter.wordMeanings.length})</span>
        </button>

        <button
          onClick={() => handleTabClick('quiz')}
          className={`min-h-[44px] flex-1 min-w-[90px] flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'quiz'
              ? 'bg-white text-slate-900 font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CheckSquare className="w-4 h-4 text-purple-700" />
          <span>प्रश्नोत्तरी ({chapter.mcqs.length})</span>
        </button>
      </div>

      {/* TAB 1: SUMMARY / STORY */}
      {activeTab === 'summary' && (
        <div className="space-y-5">
          {/* Main Story Narrative */}
          <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display border-b border-slate-100 pb-2.5 flex items-center gap-2">
              <span className="w-2 h-5 bg-amber-700 rounded-xs inline-block" />
              <span>विस्तृत पाठ सारांश / संपूर्ण कथा</span>
            </h2>

            <div className={`space-y-3.5 text-slate-700 font-hindi-body ${fontClass}`}>
              {chapter.summary.map((paragraph, idx) => (
                <p key={idx} className="indent-6 sm:indent-8 text-justify leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Characters Section (if any) */}
          {chapter.characters && chapter.characters.length > 0 && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
              <h3 className="text-base font-bold text-slate-900 font-display">
                प्रमुख पात्र एवं चरित्र-चित्रण
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {chapter.characters.map((char, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                    <div className="font-bold text-xs sm:text-sm text-slate-900">{char.name}</div>
                    <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">{char.role}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Takeaways */}
          <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-200/70 space-y-2.5">
            <h3 className="text-sm sm:text-base font-bold text-amber-950 font-display flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>मुख्य संदेश एवं परीक्षा-बिंदु</span>
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
              {chapter.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-800 font-bold">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* TAB 2: QUESTIONS & ANSWERS (REAL NCERT TEXTBOOK EXERCISES) */}
      {activeTab === 'qa' && (
        <div className="space-y-4">
          {/* Sub-filter tabs for Q&A */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white p-3 rounded-2xl border border-slate-200">
            <span className="text-xs font-semibold text-slate-600">प्रश्नों का वर्ग:</span>
            <div className="flex flex-wrap items-center gap-1 text-xs">
              {(['all', 'पाठ के साथ', 'पाठ के आस-पास', 'भाषा की बात', 'परीक्षा प्रश्न'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setQaFilter(filter)}
                  className={`min-h-[36px] px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    qaFilter === filter
                      ? 'bg-slate-900 text-white font-medium shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {filter === 'all' ? `सभी प्रश्न (${chapter.questions.length})` : filter}
                </button>
              ))}
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {filteredQuestions.map((qa, idx) => (
              <div
                key={qa.id}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                    {qa.category || qa.typeLabel} · प्रश्न {idx + 1}
                  </span>
                  <button
                    onClick={() => handleCopyAnswer(qa.id, `${qa.question}\n\nउत्तर: ${qa.answer}`)}
                    className="flex items-center gap-1 text-slate-400 hover:text-slate-700 cursor-pointer min-h-[32px] px-2 rounded hover:bg-slate-100"
                    title="उत्तर कॉपी करें"
                  >
                    {copiedId === qa.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-medium">कॉपी हुआ</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>कॉपी</span>
                      </>
                    )}
                  </button>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display leading-snug">
                  {qa.question}
                </h3>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    NCERT आदर्श उत्तर:
                  </div>
                  <div className={`text-slate-700 whitespace-pre-line leading-relaxed font-hindi-body ${fontClass}`}>
                    {qa.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: WORD MEANINGS */}
      {activeTab === 'words' && (
        <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display border-b border-slate-100 pb-2.5">
            कठिन शब्दार्थ एवं शब्द-संपदा
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {chapter.wordMeanings.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex flex-col justify-between"
              >
                <span className="text-sm sm:text-base font-bold text-amber-900 font-display">
                  {item.word}
                </span>
                <span className="text-xs sm:text-sm text-slate-700 mt-1">
                  {item.meaning}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: QUIZ / MCQs */}
      {activeTab === 'quiz' && (
        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-xs sm:text-sm text-purple-900 flex items-center justify-between">
            <span>
              स्व-मूल्यांकन हेतु सही विकल्प चुनें। उत्तर चुनने के तुरंत बाद सही उत्तर व व्याख्या प्रदर्शित होगी।
            </span>
            <span className="font-bold">
              {Object.keys(selectedAnswers).length} / {chapter.mcqs.length} पूर्ण
            </span>
          </div>

          {chapter.mcqs.map((mcq, mIdx) => {
            const hasAnswered = selectedAnswers[mcq.id] !== undefined;
            const userAnswer = selectedAnswers[mcq.id];
            const isCorrect = userAnswer === mcq.correctIndex;

            return (
              <div
                key={mcq.id}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-3.5"
              >
                <div className="text-xs font-semibold text-slate-500">
                  बहुविकल्पीय प्रश्न {mIdx + 1}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                  {mcq.question}
                </h3>

                <div className="space-y-2">
                  {mcq.options.map((option, optIdx) => {
                    let optionStyle = 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700';

                    if (hasAnswered) {
                      if (optIdx === mcq.correctIndex) {
                        optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                      } else if (optIdx === userAnswer && !isCorrect) {
                        optionStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                      } else {
                        optionStyle = 'bg-slate-50 border-slate-200 opacity-60 text-slate-500';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={hasAnswered}
                        onClick={() => handleSelectOption(mcq.id, optIdx)}
                        className={`min-h-[44px] w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                      >
                        <span>{option}</span>
                        {hasAnswered && optIdx === mcq.correctIndex && (
                          <span className="text-emerald-700 font-bold text-xs shrink-0 ml-2">✓ सही उत्तर</span>
                        )}
                        {hasAnswered && optIdx === userAnswer && !isCorrect && (
                          <span className="text-rose-700 font-bold text-xs shrink-0 ml-2">✗ आपका उत्तर</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {showExplanations[mcq.id] && (
                  <div className={`p-3 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                    isCorrect ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    <span className="font-bold">व्याख्या: </span>
                    {mcq.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Chapter Bottom Navigation (Prev / Next) with 48px Touch Targets */}
      <div className="pt-5 border-t border-slate-200 flex items-center justify-between gap-3">
        {hasPrev ? (
          <button
            onClick={onPrevChapter}
            className="min-h-[48px] flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>पिछला अध्याय</span>
          </button>
        ) : (
          <div />
        )}

        {hasNext ? (
          <button
            onClick={onNextChapter}
            className="min-h-[48px] flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            <span>अगला अध्याय</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
