import React from 'react';
import { Search, FileText, Download, Sparkles, BookCheck } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenMegaPdf: () => void;
  totalChapters: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onOpenMegaPdf,
  totalChapters
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-white to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & Search */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean unboxed metadata with middle dot separator */}
            <div className="flex items-center gap-2 text-xs font-medium text-amber-900 tracking-wide">
              <span>NCERT हिंदी पाठ्यक्रम</span>
              <span aria-hidden="true">·</span>
              <span>कक्षा 11 कोर व ऐच्छिक</span>
              <span aria-hidden="true">·</span>
              <span>सत्र 2026–27</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 font-display leading-tight text-balance">
                कक्षा 11 हिंदी — संपूर्ण कथा-सार, भावार्थ एवं NCERT प्रश्नोत्तर
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                आरोह, वितान, अंतरा और अंतराल के सभी ३८ अध्यायों की संपूर्ण कहानियाँ, विस्तृत सारांश,
                पाठ के साथ एवं पाठ के आस-पास के सभी NCERT अभ्यास प्रश्न-उत्तर।
              </p>
            </div>

            {/* Live Search Bar */}
            <div className="max-w-xl">
              <div className="relative flex items-center">
                <Search className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="पाठ का नाम, लेखक/कवि या प्रश्न खोजें (उदा: नमक का दारोगा, कबीर, लता मंगेशकर)..."
                  className="w-full pl-11 pr-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 text-sm border border-slate-300 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-700/30 focus:border-amber-700 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 text-xs text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded cursor-pointer"
                  >
                    हटाएँ
                  </button>
                )}
              </div>
            </div>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#chapter-grid"
                className="flex items-center gap-2 px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors"
              >
                <BookCheck className="w-4 h-4" />
                <span>अध्याय सूची एवं प्रश्न-उत्तर पढ़ें</span>
              </a>
              <a
                href="#books-section"
                className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium border border-slate-300 rounded-lg shadow-xs transition-colors"
              >
                <FileText className="w-4 h-4 text-amber-700" />
                <span>चारों पुस्तकें देखें</span>
              </a>
            </div>

            {/* Subtle Proof stats */}
            <div className="pt-2 flex items-center gap-6 text-xs text-slate-600 border-t border-slate-200/80">
              <div className="flex items-center gap-1.5">
                <BookCheck className="w-4 h-4 text-amber-700" />
                <span>{totalChapters} संपूर्ण अध्याय</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>१००% NCERT समाधान</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-700" />
                <span>कथा-सार व ऑडियो</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Artwork */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-amber-200/60 shadow-lg bg-amber-900/5 group">
              <img
                src="/src/assets/images/hindi_literature_banner_1792730159597.jpg"
                alt="कक्षा 11 हिंदी साहित्य NCERT अध्ययन"
                className="w-full h-72 sm:h-80 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent flex items-end p-5">
                <div className="text-white space-y-1">
                  <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                    आरोह · वितान · अंतरा · अंतराल
                  </div>
                  <div className="text-sm font-medium text-slate-100">
                    गद्य एवं काव्य का संपूर्ण विश्लेषणात्मक अध्ययन
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
