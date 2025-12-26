import { motion } from "motion/react";
import { Home, Gamepad2, Heart, Code, Users } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import bunnyIcon from "figma:asset/590019623cd421e334ef14f2b64fb07cc0267a3f.png";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "home", label: "首頁", icon: Home, path: "/" },
    {
      id: "games",
      label: "好玩遊戲區",
      icon: Gamepad2,
      path: "/games",
    },
    {
      id: "parenting",
      label: "親子文章",
      icon: Heart,
      path: "/parenting",
    },
    {
      id: "tech",
      label: "技術文章",
      icon: Code,
      path: "/tech",
    },
    {
      id: "parent",
      label: "家長專區",
      icon: Users,
      path: "/parent",
    },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

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
            onClick={() => navigate("/")}
          >
            <span className="text-amber-900">森森邏輯</span>
          </motion.div>

          <div className="flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    active
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