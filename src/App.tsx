import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { GamesSection } from "./components/GamesSection";
import { ParentingSection } from "./components/ParentingSection";
import { TechSection } from "./components/TechSection";
import { ArticleDetail } from "./components/ArticleDetail";
import { ParentZone } from "./components/ParentZone";


export default function App() {
  useEffect(() => {
    const metaName = "google-adsense-account";
    if (!document.querySelector(`meta[name="${metaName}"]`)) {
      const meta = document.createElement("meta");
      meta.name = metaName;
      meta.content = "ca-pub-2478415673828631";
      document.head.appendChild(meta);
    }
  }, []);

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
          <Route path="/parent" element={<ParentZone />} />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}