# React Router 設置說明 - GitHub Pages 部署

## ✅ 已完成的配置

### 1. **安裝 React Router**
確保在項目中安裝了 `react-router-dom`：
```bash
npm install react-router-dom
```

### 2. **路由結構**
已設置以下路由：
- `/` - 首頁 (Hero)
- `/games` - 好玩遊戲區
- `/parenting` - 教養文章列表
- `/parenting/:articleId` - 教養文章詳情頁
- `/tech` - 技術文章
- `*` - 404 重定向到首頁

### 3. **HashRouter vs BrowserRouter**
✅ **使用 HashRouter（推薦用於 GitHub Pages）**
- 路徑格式：`https://yourusername.github.io/your-repo/#/games`
- **優點**：無需服務器配置，完美支持 GitHub Pages
- **缺點**：URL 中包含 `#`

如果您有自定義域名並希望使用乾淨的 URL，可以切換到 BrowserRouter：
```tsx
// 在 App.tsx 中修改
import { BrowserRouter as Router } from 'react-router-dom';
```
但需要額外配置（見下方）。

---

## 📦 GitHub Pages 部署步驟

### 方法 1：使用 GitHub Actions（推薦）

1. **創建部署配置文件**
在項目根目錄創建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]  # 或 master
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist
  
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

2. **在 GitHub 設置中啟用 GitHub Pages**
   - 前往倉庫的 Settings → Pages
   - Source 選擇 "GitHub Actions"
   - 保存設置

3. **推送代碼**
```bash
git add .
git commit -m "Add React Router and GitHub Pages deployment"
git push origin main
```

---

### 方法 2：使用 gh-pages 包

1. **安裝 gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **修改 package.json**
添加以下配置：
```json
{
  "homepage": "https://yourusername.github.io/your-repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **部署**
```bash
npm run deploy
```

---

## 🔧 BrowserRouter 配置（如果使用乾淨 URL）

如果您選擇使用 BrowserRouter 而不是 HashRouter，需要額外配置：

### 1. **創建 404.html**
在 `public` 目錄創建 `404.html`：
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>森森邏輯</title>
    <script>
      // GitHub Pages 的 SPA 重定向方案
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>
```

### 2. **修改 index.html**
在 `<head>` 中添加：
```html
<script>
  (function(l) {
    if (l.search[1] === '/' ) {
      var decoded = l.search.slice(1).split('&').map(function(s) { 
        return s.replace(/~and~/g, '&')
      }).join('?');
      window.history.replaceState(null, null,
        l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  }(window.location))
</script>
```

### 3. **修改 vite.config.ts**
```ts
export default defineConfig({
  base: '/your-repo-name/',  // 替換為您的倉庫名稱
  plugins: [react()],
})
```

---

## 🎯 路由使用示例

### 在組件中使用導航
```tsx
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();
  
  return (
    <button onClick={() => navigate('/games')}>
      前往遊戲區
    </button>
  );
}
```

### 獲取 URL 參數
```tsx
import { useParams } from 'react-router-dom';

function ArticleDetail() {
  const { articleId } = useParams();
  // articleId 會是 URL 中的值
}
```

### 檢查當前路徑
```tsx
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const isActive = location.pathname === '/games';
}
```

---

## 🐛 常見問題

### 1. **刷新頁面 404 錯誤**
✅ **解決方案**：使用 HashRouter（已配置）

### 2. **GitHub Pages 顯示空白**
檢查 `vite.config.ts` 中的 `base` 路徑是否正確：
```ts
base: '/your-repo-name/',  // 必須以 / 開頭和結尾
```

### 3. **CSS/JS 文件加載失敗**
確保在 `vite.config.ts` 中設置了正確的 base URL

---

## 📝 檢查清單

部署前請確認：
- [ ] 已安裝 `react-router-dom`
- [ ] 已選擇 HashRouter 或 BrowserRouter
- [ ] 已設置 GitHub Pages（Settings → Pages）
- [ ] 已配置 GitHub Actions 或 gh-pages
- [ ] 已測試所有路由在本地正常工作
- [ ] 已設置正確的 base URL（如果使用 BrowserRouter）

---

## 🚀 測試部署

本地測試：
```bash
npm run dev
```

構建測試：
```bash
npm run build
npm run preview
```

---

## 📚 參考資料

- [React Router 官方文檔](https://reactrouter.com/)
- [GitHub Pages 官方指南](https://docs.github.com/en/pages)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)

---

**需要幫助？** 如果遇到問題，請檢查瀏覽器控制台的錯誤訊息，或參考上述文檔。
