import React, { useState, useMemo, useEffect, useRef } from 'react';
import { allBooks, allChapters } from './data/allChapters';
import { Chapter } from './data/types';
import { TopNav } from './components/TopNav';
import { BottomNav, ActiveNavTab } from './components/BottomNav';
import { BooksScreen } from './components/BooksScreen';
import { ChapterFilterBar } from './components/ChapterFilterBar';
import { ChapterCard } from './components/ChapterCard';
import { ChapterReader } from './components/ChapterReader';
import { ChapterPickerModal } from './components/ChapterPickerModal';
import { Search, CheckCircle2, Sparkles, BookOpen, Layers } from 'lucide-react';
import { hindiSpeech } from './utils/speechUtils';

export default function App() {
  // Navigation / Screen state: 'books' | 'chapters' | 'story' | 'qa' | 'quiz'
  const [activeBottomTab, setActiveBottomTab] = useState<ActiveNavTab>('chapters');
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [readerTab, setReaderTab] = useState<'summary' | 'qa' | 'words' | 'quiz'>('summary');
  const [isChapterPickerOpen, setIsChapterPickerOpen] = useState(false);

  // Font resizer state
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal');

  // Audio speech status
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isAudioPaused, setIsAudioPaused] = useState(false);

  // Filters for chapters view
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<string>('all');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>('all');

  // Local storage for read progress
  const [readChapters, setReadChapters] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('hindi_class11_read');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Subscribe to speech updates
  useEffect(() => {
    hindiSpeech.subscribe((speaking, paused) => {
      setIsAudioPlaying(speaking);
      setIsAudioPaused(paused);
    });
  }, []);

  const handleToggleAudio = () => {
    const current = activeChapter || allChapters[0];
    if (isAudioPlaying) {
      if (isAudioPaused) {
        hindiSpeech.resume();
      } else {
        hindiSpeech.pause();
      }
    } else {
      const fullTextToRead = `${current.title}। लेखक हैं ${current.author}। ${current.pratipadya}। ${current.summary.join(' ')}`;
      hindiSpeech.speak(fullTextToRead);
    }
  };

  const handleStopAudio = () => {
    hindiSpeech.stop();
  };

  const handleToggleRead = (id: string) => {
    setReadChapters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem('hindi_class11_read', JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  // Filtered chapters calculation
  const filteredChapters = useMemo(() => {
    return allChapters.filter((chapter) => {
      if (selectedBook !== 'all' && chapter.bookId !== selectedBook) return false;
      if (selectedSection !== 'all' && chapter.section !== selectedSection) return false;
      if (selectedCurriculum !== 'all' && chapter.curriculum !== selectedCurriculum) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = chapter.title.toLowerCase().includes(q);
        const inAuthor = chapter.author.toLowerCase().includes(q);
        const inPratipadya = chapter.pratipadya.toLowerCase().includes(q);
        const inGenre = chapter.genre.toLowerCase().includes(q);
        const inBook = chapter.bookName.toLowerCase().includes(q);
        const inQuestions = chapter.questions.some((qa) =>
          qa.question.toLowerCase().includes(q) || qa.answer.toLowerCase().includes(q)
        );
        return inTitle || inAuthor || inPratipadya || inGenre || inBook || inQuestions;
      }
      return true;
    });
  }, [searchQuery, selectedBook, selectedSection, selectedCurriculum]);

  // Counts for filters
  const counts = useMemo(() => {
    return {
      total: allChapters.length,
      aroh: allChapters.filter((c) => c.bookId === 'aroh').length,
      vitan: allChapters.filter((c) => c.bookId === 'vitan').length,
      antara: allChapters.filter((c) => c.bookId === 'antara').length,
      antaral: allChapters.filter((c) => c.bookId === 'antaral').length,
      gadya: allChapters.filter((c) => c.section === 'gadya').length,
      kavya: allChapters.filter((c) => c.section === 'kavya').length,
      purak: allChapters.filter((c) => c.section === 'purak').length
    };
  }, []);

  // Chapter Navigation in Reader
  const currentChapter = activeChapter || allChapters[0];
  const currentChapterIndex = useMemo(() => {
    return allChapters.findIndex((c) => c.id === currentChapter.id);
  }, [currentChapter]);

  const handleNextChapter = () => {
    if (currentChapterIndex >= 0 && currentChapterIndex < allChapters.length - 1) {
      setActiveChapter(allChapters[currentChapterIndex + 1]);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      setActiveChapter(allChapters[currentChapterIndex - 1]);
      window.scrollTo(0, 0);
    }
  };

  // Direct chapter select from cards
  const handleOpenChapter = (chapter: Chapter, initialTab: 'summary' | 'qa' | 'quiz' = 'summary') => {
    setActiveChapter(chapter);
    setReaderTab(initialTab);
    setActiveBottomTab(initialTab === 'summary' ? 'story' : initialTab === 'qa' ? 'qa' : 'quiz');
    window.scrollTo(0, 0);
  };

  // Bottom Nav click handler - SWITCHES SCREEN IMMEDIATELY WITHOUT SCROLLING!
  const handleBottomTabSelect = (tab: ActiveNavTab) => {
    setActiveBottomTab(tab);
    window.scrollTo(0, 0);

    if (tab === 'story') {
      if (!activeChapter) {
        setActiveChapter(allChapters[0]);
      }
      setReaderTab('summary');
    } else if (tab === 'qa') {
      if (!activeChapter) {
        setActiveChapter(allChapters[0]);
      }
      setReaderTab('qa');
    } else if (tab === 'quiz') {
      if (!activeChapter) {
        setActiveChapter(allChapters[0]);
      }
      setReaderTab('quiz');
    }
  };

  const handleOpenSearch = () => {
    setActiveBottomTab('chapters');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 pb-20">
      {/* Top App Navigation */}
      <TopNav
        activeChapter={activeBottomTab === 'story' || activeBottomTab === 'qa' || activeBottomTab === 'quiz' ? currentChapter : null}
        onBackToHome={() => {
          setActiveBottomTab('chapters');
          window.scrollTo(0, 0);
        }}
        onOpenSearch={handleOpenSearch}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        isRead={readChapters.has(currentChapter.id)}
        onToggleRead={() => handleToggleRead(currentChapter.id)}
        isAudioPlaying={isAudioPlaying}
        isAudioPaused={isAudioPaused}
        onToggleAudio={handleToggleAudio}
        onStopAudio={handleStopAudio}
      />

      {/* Main View Area - DISTINCT SCREEN BASED ON activeBottomTab */}
      <main className="flex-1">
        {/* SCREEN 1: BOOKS VIEW */}
        {activeBottomTab === 'books' && (
          <BooksScreen
            books={allBooks}
            readChapterIds={readChapters}
            allChapters={allChapters}
            onSelectBookChapters={(bookId) => {
              setSelectedBook(bookId);
              setActiveBottomTab('chapters');
              window.scrollTo(0, 0);
            }}
            onOpenDirectChapter={(chapter) => {
              handleOpenChapter(chapter, 'summary');
            }}
          />
        )}

        {/* SCREEN 2: CHAPTERS CATALOG VIEW */}
        {activeBottomTab === 'chapters' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6 space-y-5 animate-in fade-in duration-150">
            {/* Search and Top App Header */}
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-800" />
                    <span>कक्षा 11 हिंदी NCERT अध्याय सूची</span>
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    चारों पुस्तकें: आरोह, वितान, अंतरा, अंतराल • कुल ३८ अध्याय
                  </p>
                </div>

                {/* Progress Mini Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold self-start sm:self-auto">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>प्रगति: {readChapters.size}/38 पूर्ण ({Math.round((readChapters.size / 38) * 100)}%)</span>
                </div>
              </div>

              {/* Real-time search box */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="अध्याय, लेखक, विधा या प्रश्न खोजें (उदा. प्रेमचंद, सूरदास, नमक का दारोगा)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800 transition-all placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold px-1.5 py-0.5 cursor-pointer"
                  >
                    हटाएँ
                  </button>
                )}
              </div>
            </div>

            {/* Filter Bar */}
            <ChapterFilterBar
              selectedBook={selectedBook}
              onSelectBook={setSelectedBook}
              selectedSection={selectedSection}
              onSelectSection={setSelectedSection}
              selectedCurriculum={selectedCurriculum}
              onSelectCurriculum={setSelectedCurriculum}
              counts={counts}
            />

            {/* Results Counter and Reset */}
            <div className="flex items-center justify-between text-xs px-1">
              <div className="font-semibold text-slate-700">
                <span>कुल अध्याय: </span>
                <span className="text-amber-800 font-bold text-sm">{filteredChapters.length}</span>
                {searchQuery && (
                  <span className="text-slate-500 font-normal"> (‘{searchQuery}’ के लिए परिणाम)</span>
                )}
              </div>

              {(selectedBook !== 'all' || selectedSection !== 'all' || selectedCurriculum !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedBook('all');
                    setSelectedSection('all');
                    setSelectedCurriculum('all');
                    setSearchQuery('');
                  }}
                  className="text-amber-800 hover:underline font-bold cursor-pointer"
                >
                  सभी फिल्टर रीसेट करें
                </button>
              )}
            </div>

            {/* Chapters Grid */}
            {filteredChapters.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filteredChapters.map((chapter) => (
                  <ChapterCard
                    key={chapter.id}
                    chapter={chapter}
                    onOpenReader={(ch, initialTab) => handleOpenChapter(ch, initialTab || 'summary')}
                    isRead={readChapters.has(chapter.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="p-10 text-center bg-white rounded-3xl border border-dashed border-slate-300 space-y-3">
                <Search className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-800 font-display">
                  कोई अध्याय नहीं मिला
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  आपके खोजे गए शब्द या फिल्टर के अनुसार कोई परिणाम नहीं मिला। कृपया भिन्न शब्द खोजें।
                </p>
                <button
                  onClick={() => {
                    setSelectedBook('all');
                    setSelectedSection('all');
                    setSelectedCurriculum('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  सभी ३८ अध्याय दिखाएँ
                </button>
              </div>
            )}
          </div>
        )}

        {/* SCREEN 3: STORY / SUMMARY VIEW */}
        {activeBottomTab === 'story' && (
          <ChapterReader
            chapter={currentChapter}
            onBack={() => {
              setActiveBottomTab('chapters');
              window.scrollTo(0, 0);
            }}
            onNextChapter={handleNextChapter}
            onPrevChapter={handlePrevChapter}
            onOpenChapterPicker={() => setIsChapterPickerOpen(true)}
            hasNext={currentChapterIndex < allChapters.length - 1}
            hasPrev={currentChapterIndex > 0}
            fontSize={fontSize}
            initialTab="summary"
            onTabChange={(tab) => {
              setReaderTab(tab);
              if (tab === 'summary') setActiveBottomTab('story');
              else if (tab === 'qa') setActiveBottomTab('qa');
              else if (tab === 'quiz') setActiveBottomTab('quiz');
            }}
          />
        )}

        {/* SCREEN 4: QUESTIONS & ANSWERS VIEW */}
        {activeBottomTab === 'qa' && (
          <ChapterReader
            chapter={currentChapter}
            onBack={() => {
              setActiveBottomTab('chapters');
              window.scrollTo(0, 0);
            }}
            onNextChapter={handleNextChapter}
            onPrevChapter={handlePrevChapter}
            onOpenChapterPicker={() => setIsChapterPickerOpen(true)}
            hasNext={currentChapterIndex < allChapters.length - 1}
            hasPrev={currentChapterIndex > 0}
            fontSize={fontSize}
            initialTab="qa"
            onTabChange={(tab) => {
              setReaderTab(tab);
              if (tab === 'summary') setActiveBottomTab('story');
              else if (tab === 'qa') setActiveBottomTab('qa');
              else if (tab === 'quiz') setActiveBottomTab('quiz');
            }}
          />
        )}

        {/* SCREEN 5: QUIZ PRACTICE VIEW */}
        {activeBottomTab === 'quiz' && (
          <ChapterReader
            chapter={currentChapter}
            onBack={() => {
              setActiveBottomTab('chapters');
              window.scrollTo(0, 0);
            }}
            onNextChapter={handleNextChapter}
            onPrevChapter={handlePrevChapter}
            onOpenChapterPicker={() => setIsChapterPickerOpen(true)}
            hasNext={currentChapterIndex < allChapters.length - 1}
            hasPrev={currentChapterIndex > 0}
            fontSize={fontSize}
            initialTab="quiz"
            onTabChange={(tab) => {
              setReaderTab(tab);
              if (tab === 'summary') setActiveBottomTab('story');
              else if (tab === 'qa') setActiveBottomTab('qa');
              else if (tab === 'quiz') setActiveBottomTab('quiz');
            }}
          />
        )}
      </main>

      {/* Quick Chapter Switcher Modal */}
      <ChapterPickerModal
        isOpen={isChapterPickerOpen}
        onClose={() => setIsChapterPickerOpen(false)}
        activeChapterId={currentChapter.id}
        onSelectChapter={(ch) => {
          setActiveChapter(ch);
          window.scrollTo(0, 0);
        }}
      />

      {/* Persistent Mobile Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeBottomTab}
        onSelectTab={handleBottomTabSelect}
        hasSelectedChapter={Boolean(activeChapter)}
        selectedChapterTitle={currentChapter.title}
      />
    </div>
  );
}
