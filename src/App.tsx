import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GamesSection } from './components/GamesSection';
import { ParentingSection } from './components/ParentingSection';
import { TechSection } from './components/TechSection';
import { ArticleDetail } from './components/ArticleDetail';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);

  const handleArticleClick = (articleId: number) => {
    setSelectedArticleId(articleId);
    setActiveSection('article-detail');
  };

  const handleBackToParenting = () => {
    setSelectedArticleId(null);
    setActiveSection('parenting');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-green-50">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {activeSection === 'home' && <Hero setActiveSection={setActiveSection} />}
      {activeSection === 'games' && <GamesSection />}
      {activeSection === 'parenting' && <ParentingSection onArticleClick={handleArticleClick} />}
      {activeSection === 'tech' && <TechSection />}
      {activeSection === 'article-detail' && selectedArticleId && (
        <ArticleDetail articleId={selectedArticleId} onBack={handleBackToParenting} />
      )}
    </div>
  );
}