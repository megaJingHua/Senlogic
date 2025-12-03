import { motion } from "motion/react";
import { Home, Gamepad2, Heart, Code } from "lucide-react";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Header({
  activeSection,
  setActiveSection,
}: HeaderProps) {
  const navItems = [
    { id: "home", label: "首頁", icon: Home },
    { id: "games", label: "好玩遊戲區", icon: Gamepad2 },
    { id: "parenting", label: "教養文章", icon: Heart },
    { id: "tech", label: "技術文章", icon: Code },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md"
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setActiveSection("home")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white">🐰</span>
            </div>
            <span className="text-amber-900">森森邏輯</span>
          </motion.div>

          <div className="flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </nav>
    </motion.header>
  );
}