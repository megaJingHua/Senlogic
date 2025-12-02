import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GamesSection } from './components/GamesSection';
import { ParentingSection } from './components/ParentingSection';
import { TechSection } from './components/TechSection';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-green-50">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {activeSection === 'home' && <Hero setActiveSection={setActiveSection} />}
      {activeSection === 'games' && <GamesSection />}
      {activeSection === 'parenting' && <ParentingSection />}
      {activeSection === 'tech' && <TechSection />}
    </div>
  );
}
