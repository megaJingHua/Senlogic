import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { GamesSection } from "./components/GamesSection";
import { ParentingSection } from "./components/ParentingSection";
import { TechSection } from "./components/TechSection";
import { ArticleDetail } from "./components/ArticleDetail";


export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-green-50">
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/games" element={<GamesSection />} />
          <Route
            path="/parenting"
            element={<ParentingSection />}
          />
          <Route
            path="/parenting/:articleId"
            element={<ArticleDetail />}
          />
          <Route path="/tech" element={<TechSection />} />
          <Route
            path="/tech/:techId"
            element={<TechSection />}
          />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}