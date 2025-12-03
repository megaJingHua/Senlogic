import { motion } from 'motion/react';
import { Code, Terminal, Cpu, Rocket, GitBranch, Zap, Eye, Calendar, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect, useRef } from 'react';
import { Typewriter } from './Typewriter';
import { ScrollToTop } from './ScrollToTop';
import { RichText } from './RichText';
import piniaImage from 'figma:asset/bb39f016a3dd8893163ade79d95a27bddfd0cbdf.png';

export function TechSection() {
  const [showVue30Days, setShowVue30Days] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [showUiPathOrchestrator, setShowUiPathOrchestrator] = useState(false);
  const [showEngineerDaily, setShowEngineerDaily] = useState(false);
  const [selectedChat, setSelectedChat] = useState<number>(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to top when entering article detail pages
  useEffect(() => {
    if (selectedDay !== null || showUiPathOrchestrator || showEngineerDaily) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedDay, showUiPathOrchestrator, showEngineerDaily]);

  const vue30Days = [
    { 
      day: 1, 
      date: '2025-11-01',
      title: 'Vue3 是什麼？', 
      intro: 'Vue3 是一個幫助我們快速做互動網站的框架，就像積木工具箱。',
      content: {
        sections: [
          {
            type: 'intro',
            text: '你現在看到的網頁畫面，大多是用「前端框架」做出來的。Vue 3 就是其中一個超人氣框架，它就像「做互動網頁的積木工具箱」，讓工程師能快速拼出會動的網頁畫面。'
          },
          {
            type: 'highlight',
            title: '🌱 Vue3 最厲害的地方是？',
            items: [
              {
                icon: '💡',
                title: '資料變了，畫面就會自動改！',
                text: '不用自己重畫整個畫面，像是魔法一樣幫你更新。'
              },
              {
                icon: '🧩',
                title: '可以把畫面拆成一塊塊組件重複用',
                text: '就像做樂高積木一樣，把按鈕、卡片、清單拆成小單位來組合整頁。'
              },
              {
                icon: '🧠',
                title: '有清楚的寫法，資料、邏輯、畫面都可以集中管理',
                text: '工程師看得懂、改得快。'
              }
            ]
          },
          {
            type: 'demo',
            title: '📦 今天的實作是什麼?',
            description: '我們會做一個超級簡單的小畫面：',
            tasks: [
              '顯示 "Hello Vue3!" 一句話',
              '一個按鈕，按一下數字就會加 1！'
            ],
            code: `<!-- HTML 區塊 (畫面呈現的內容)-->
<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="count++">點我：{{ count }}</button>
  </div>
</template>

<!-- JavaScript 區塊 (內容中的動作設定)-->
<script setup>
import { ref } from 'vue'

const message = ref('Hello Vue 3!')
const count = ref(0)
</script>

<!-- CSS 區塊 (內容顯示的樣式)-->
<style scoped>
h1 {
  color: #42b983;
}
</style>`
          },
          {
            type: 'knowledge',
            title: '🌱 術業有專攻',
            items: [
              {
                title: 'Vue 3 是一個漸進式框架（Progressive Framework）',
                text: '可以只用來寫前端 UI，也能搭配 Vue Router、Pinia 做完整 SPA，簡單來說可以從小用起（小功能 / 小區塊），需要時再逐步引入更多功能與架構，而非一開始就需要學會整個龐大架構才能使用。'
              },
              {
                title: '核心特性',
                subItems: [
                  '響應式系統（reactivity）：當資料改變時，畫面會自動更新，不需手動更新 DOM。',
                  '組件化（component-based）：把畫面拆成可重複使用的小積木，每個積木（組件）管理自己的資料和樣式。',
                  'Composition API（setup、ref、reactive、computed）：Vue 3 新的寫法，讓資料、方法、監聽等能清楚集中管理並更靈活重用。',
                  '單文件組件（.vue 檔案）：一個檔案包含：template (HTML 區塊)、script (JavaScript 區塊)、style (CSS 區塊)，在同一個檔案就能看到該組件的畫面、邏輯和樣式。'
                ]
              }
            ]
          }
        ]
      }
    },
    { 
      day: 2, 
      date: '2025-11-02',
      title: '組件是什麼？為什麼要拆？', 
      intro: '組件就像樂高積木，把大頁面拆成小積木，方便重複使用。',
      content: {
        sections: [
          {
            type: 'intro',
            text: '你可以把網頁想像成一個樂高積木城堡。每個「積木」就是一個組件（component）。比如：按鈕是一塊積木、輸入框是一塊積木、待辦清單的每一項也是一塊積木。今天帶你用最簡單的例子 ——「Todo List」來學會：✅組件拆分 ✅父子傳值 ✅用 props 傳資料，用 emit 回報訊息！'
          },
          {
            type: 'highlight',
            title: '🧸 為什麼要把一整頁拆成小組件？',
            items: [
              {
                icon: '👉',
                title: '好整理、好維修、好重複使用！',
                text: '就像做便當，如果每一格都做好切分，放肉放菜放飯都井井有條～出錯也只要檢查那一格！'
              }
            ]
          },
          {
            type: 'communication',
            title: '📮 組件之間怎麼講話？（資料怎麼互傳？）',
            description: '用一個「爸爸和小孩」的故事來比喻：',
            table: [
              { action: '爸爸傳玩具給小孩', vue: 'props', metaphor: '爸爸說：「來，這是你的玩具」' },
              { action: '小孩舉手說想喝水', vue: 'emit', metaphor: '小孩：「媽媽，我口渴啦～」' }
            ],
            note: '所以：父 → 子 用 props，子 → 父 用 emit。這是組件化拆分時，最常用到的資料流動方式。'
          },
          {
            type: 'trivia',
            title: '工程師都不知道的冷知識',
            subtitle: '🧠 為什麼叫「父子組件（parent-child）」而不是「母子」？',
            content: '這其實是程式世界的習慣用語（convention），源自於：',
            items: [
              '早期的電腦科學（Computer Science）用詞大多是男性主導的領域，語言架構也偏陽性化，像「master/slave」、「father/son」、「man-in-the-middle」這類比喻普遍存在。',
              '在程式語言中，「Parent-Child」結構常常代表：Parent（父組件）：擁有整體架構與控制權，負責傳值、管理邏輯。Child（子組件）：接收資料、執行功能、向上回報。',
              '英文的 "parent" 其實是「雙親」的意思，但在中文語境中習慣直譯為「父」，所以久而久之就叫成「父子關係」。'
            ]
          },
          {
            type: 'demo',
            title: '2️⃣ 實作範例：Todo List 入門',
            description: '實作「Todo List」：',
            tasks: [
              '可輸入待辦事項',
              '按下按鈕新增到列表',
              '使用子組件顯示每一個 Todo 項目',
              '點擊項目可刪除'
            ],
            codeSections: [
              {
                title: '✅ 1. TodoItem.vue (子組件)',
                description: '顯示待辦項目，點擊可刪除。',
                filename: 'TodoItem.vue',
                code: `<template>
  <li @click="handleDelete">{{ item }}</li>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
// 定義從父組件接收到的參數
//'item'為代辦事項; 'index'為第 {{index}} 個代辦事項
const props = defineProps({
  item: String,
  index: Number,
})

// 將傳出的事件定義名稱為'delete'
const emit = defineEmits(['delete'])
// 並將參數 'index' 傳給父組件
function handleDelete() {
  emit('delete', props.index)
}
</script>

<style scoped>
li {
  cursor: pointer;
  margin: 4px 0;
}
li:hover {
  text-decoration: line-through;
  color: gray;
}
</style>`
              },
              {
                title: '✅ 2. Todo.vue (父組件)',
                description: '',
                filename: 'Todo.vue',
                code: `<template>
  <div class="todo">
    <h2>30 Days 學習 Vue3 : 組件拆分與父子傳值 (實作: Todo List)</h2>
    <p>
      ✅ 可輸入待辦事項<br />
      ✅ 按下按鈕新增到列表<br />
      ✅ 使用子組件顯示每一個 Todo 項目<br />
      ✅ 點擊項目可刪除
    </p>
    <input
      v-model="newTodo"
      placeholder="輸入待辦事項"
      @keyup.enter="addTodo"
    />
    <button @click="addTodo">新增</button>

    <ul>
      <TodoItem
        v-for="(todo, index) in todos"
        :key="index"
        :item="todo"
        :index="index"
        @delete="deleteTodo"
      />
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TodoItem from "@/components/learnVue3/day2/TodoItem.vue";
// 定義'newTodo' 為新增的項目
// 定義 'todos' 為所有項目列表
const newTodo = ref("");
const todos = ref([]);

function addTodo() {
  if (newTodo.value.trim() !== "") {
    todos.value.push(newTodo.value.trim());
    newTodo.value = "";
  }
}

// 由子組件 emit 觸發 @delete 事件
// 再由 @delete 觸發 deleteTodo 事件並將 emit @delete 事件中的參數 index 帶入
function deleteTodo(index) {
  todos.value.splice(index, 1);
}
</script>

<style scoped>
.todo {
  max-width: 400px;
  margin: auto;
  padding: 16px;
}
input {
  padding: 8px;
  width: 70%;
  margin-right: 8px;
}
button {
  padding: 8px 12px;
}
ul {
  list-style-type: none;
  padding: 0;
}
h2 {
  color: #42b983;
}
</style>`
              }
            ]
          }
        ]
      }
    },
    { 
      day: 3, 
      date: '2025-11-03',
      title: 'computed 和 watch 幫你「看家」', 
      intro: 'computed 幫你算結果，watch 幫你盯資料，一變就提醒。',
      content: {
        sections: [
          {
            type: 'intro',
            text: '媽媽每天最怕什麼？就是「重複問問題、重複做事情」。電鍋要煮飯 → 看燈變沒？小孩洗完澡 → 地上濕沒？這些「重複檢查」、「自動反應」的事，Vue 也有喔！今天要認識兩個 Vue 的小幫手：computed 和 watch'
          },
          {
            type: 'comparison',
            title: '🧠 computed vs watch 怎麼選？',
            items: [
              {
                name: 'computed',
                features: [
                  '幫你自動算好東西，像幫你統計今天幾件事完成',
                  '適合用來"顯示給使用者看的值"',
                  '✅ 有快取：依賴的資料沒變就不重算'
                ]
              },
              {
                name: 'watch',
                features: [
                  '幫你偷偷盯著資料，一變就提醒你',
                  '像你看到天黑了會記得收衣服',
                  '常用在"執行動作、更新資料、debug"',
                  '❌沒有快取，每次變都執行'
                ]
              }
            ]
          },
          {
            type: 'demo',
            title: '📦 今天的實作是什麼?',
            description: '再來一次 Todo List，新增功能讓每件代辦事項都可以打勾✔️，完成後畫線～',
            tasks: [
              '每個待辦事項可以打勾',
              '完成的事項會顯示刪除線',
              '使用 watch 監聽變化',
              '使用 computed 過濾未完成項目'
            ],
            codeSections: [
              {
                title: '✅ 1. TodoItem.vue (子組件)',
                description: '',
                filename: 'TodoItem.vue',
                code: `<template>
  <li>
    <input type="checkbox" v-model="localDone" @change="toggleDone" />
    <span :style="{ textDecoration: localDone ? 'line-through' : 'none' }">
      {{ item.text }}
    </span>
    <button @click="$emit('remove', props.index)">❌</button>
  </li>
</template>

<script setup>
import { ref, watch } from "vue";
// 接收父母交代的 props 與 emit
const props = defineProps(["item", "index"]);
const emit = defineEmits(["update", "remove"]);

const localDone = ref(props.item.done);

// 看著 props 的 done，有變就同步更新 localDone
watch(
  () => props.item.done,
  (newVal) => {
    localDone.value = newVal;
  }
);

// 使用者打勾時，告訴父母「我變好了」
function toggleDone() {
  emit("update", { ...props.item, done: localDone.value });
}
</script>`
              },
              {
                title: '✅ 2. Todo.vue (父組件)',
                description: '處理「更新」與「過濾」功能',
                filename: 'Todo.vue',
                code: `<template>
  <div class="todo">
    <input
      v-model="newTodo"
      placeholder="輸入待辦事項"
      @keyup.enter="addTodo"
    />
    <button @click="addTodo">新增</button>

    <ul>
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.text"
        :item="todo"
        :index="getTodoIndex(todo)"
        @update="updateTodo"
        @remove="removeTodo"
      />
    </ul>
  </div>
</template>

<script setup>
// 新增任務的輸入框
const newTodo = ref("");

// 代辦事項清單
const todos = ref([
  { text: "買牛奶", done: false },
  { text: "寫 Vue 3 筆記", done: true },
]);

// 加入新任務
function addTodo() {
  if (newTodo.value.trim() !== "") {
    todos.value.push({ text: newTodo.value.trim(), done: false });
    newTodo.value = "";
  }
}

// 更新完成狀態
function updateTodo(newTodo) {
  if (!todos.value || !newTodo) return;
  const index = todos.value.findIndex((todo) => todo.text === newTodo.text);
  if (index !== -1) {
    todos.value[index] = newTodo;
  }
}

// 移除任務
function removeTodo(index) {
  if (!todos.value || index === -1 || index >= todos.value.length) return;
  todos.value.splice(index, 1);
}

// ✅ 只顯示未完成的功能
const showOnlyUnfinished = ref(false);
const filteredTodos = computed(() => {
  return showOnlyUnfinished.value
    ? todos.value.filter((t) => !t.done)
    : todos.value;
});

// 安全地獲取 todo 的索引
function getTodoIndex(todo) {
  if (!todos.value) return -1;
  return todos.value.findIndex((t) => t.text === todo.text);
}
</script>`
              }
            ]
          }
        ]
      }
    },
    { 
      day: 4, 
      date: '2025-11-04',
      title: '從單一房間到多房間 —— Vue Router', 
      intro: 'Router 就像走廊，帶你從大門走到不同房間。',
      content: {
        sections: [
          {
            type: 'intro',
            text: '你可以把「網站」想成一間房子，房子的大門就是你的首頁 (Home)，房間就像每個不同的功能頁面，而走廊就是 Router（路由），它負責帶你從大門走到不同的房間。'
          },
          {
            type: 'concept',
            title: '🚪 Vue Router 是什麼？',
            description: '就像家裡有走廊和門牌號碼，讓你可以走到不同的房間。在網站裡，這個「房間」就是不同的頁面。',
            examples: [
              { path: '/', description: '首��' },
              { path: '/about', description: '關於我們' },
              { path: '/game', description: '遊戲區' }
            ]
          },
          {
            type: 'steps',
            title: '📦 今天的實作是什麼?',
            description: '點擊「首頁」出現首頁內容，點擊「關於」出現介紹內容。就像家裡不用蓋兩間房子，同一個大門進去，走不同走廊就能到�����同房間。',
            steps: [
              {
                number: 1,
                title: '先裝 Router（走廊建材）',
                description: '就像先買一條長廊，讓房間可以連起來。',
                code: 'npm install vue-router',
                language: 'bash'
              },
              {
                number: 2,
                title: '畫設計圖（router.js）',
                description: '告訴 Vue：「有幾個房間？門牌是多少？」',
                code: `const routes = [
  { path: '/', component: Home },   // 大門 → 首頁
  { path: '/about', component: About } // 另一個房間 → 關於我們
]`,
                language: 'javascript'
              },
              {
                number: 3,
                title: '把走廊裝到房子裡（main.js）',
                description: '就是讓房子知道要用這個走廊來切換房間。',
                code: `import router from './router'`,
                language: 'javascript'
              },
              {
                number: 4,
                title: '放一個「導航菜單」(App.vue)',
                description: '就像家裡玄關放了兩個牌子：「去客廳」、「去廚房」。當你點導航的時候，網站會把「顯示的頁面」換掉，就像你走到另一間房。',
                code: `<router-link to="/">首頁</router-link>
<router-link to="/about">關於我們</router-link>`,
                language: 'html'
              }
            ]
          }
        ]
      }
    },
    { 
      day: 5, 
      date: '2025-11-05',
      title: '網站的公共冰箱 —— Pinia 狀態管理', 
      intro: 'Pinia 是共用冰箱，讓不同頁面隨時能取用相同資料。',
      content: {
        sections: [
          {
            type: 'intro',
            text: '在 Vue 專案中，如果不同頁面或元件都需要同一份資料（像「登入使用者」、「購物車」、「計數器」），光靠 props 與 emit 傳來傳去會變得很複雜。👉 這時候就需要「狀態管理工具」來集中管理。Pinia 是 Vue3 官方推薦的狀態管理工具，功能就像一台「網站的公共冰箱」：任何頁面都可以隨時存取或更新資料。就算換頁、切換元件，資料還是保留。'
          },
          {
            type: 'perspective',
            title: '👩‍🍼 寶媽角度',
            content: '家裡有很多房間：客廳：寶寶要喝牛奶、廚房：媽媽煮飯要牛奶、書房：爸爸泡咖啡也要牛奶。如果每個房間都放一瓶牛奶，不但容易忘記數量，還會浪費空間。',
            highlight: '解決辦法：大家共用一台冰箱，牛奶集中放好，誰要喝就直接去拿。',
            conclusion: 'Pinia 就是這台「網站的冰箱」，專門用來集中保存重要的資料。',
            image: 'figma:asset/bb39f016a3dd8893163ade79d95a27bddfd0cbdf.png'
          },
          {
            type: 'perspective',
            title: '💻 工程師角度',
            content: 'Pinia：Vue3 官方推薦的狀態管理工具（取代 Vuex）。',
            concepts: [
              {
                term: 'state',
                description: '資料（牛奶、雞蛋）'
              },
              {
                term: 'actions',
                description: '方法（煮飯、喝牛奶）'
              },
              {
                term: 'getters',
                description: '計算值（剩幾瓶牛奶）'
              }
            ],
            advantages: [
              'API 簡單、易學',
              '支援 TypeScript',
              '不需 props/emit，元件間共用資料更乾淨'
            ]
          },
          {
            type: 'steps',
            title: '📦 今天的實作',
            description: '需求：1. 在首頁按「+1」按鈕。2. 切換到關於頁，數字還是一樣（不會重置）。',
            steps: [
              {
                number: 1,
                title: '安裝 Pinia',
                description: '',
                code: 'npm install pinia',
                language: 'bash'
              },
              {
                number: 2,
                title: '在 main.js 掛載',
                description: '',
                code: `import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')`,
                language: 'javascript'
              },
              {
                number: 3,
                title: '建立 store（stores/counter.js）',
                description: '',
                code: `import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++
    }
  }
})`,
                language: 'javascript'
              },
              {
                number: 4,
                title: '在 Home.vue 使用',
                description: '',
                code: `<template>
  <div>
    <h2>首頁</h2>
    <p>數字：{{ counter.count }}</p>
    <button @click="counter.increment">+1</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '../stores/counter'
const counter = useCounterStore()
</script>`,
                language: 'vue'
              },
              {
                number: 5,
                title: '在 About.vue 使用',
                description: '',
                code: `<template>
  <div>
    <h2>關於頁</h2>
    <p>數字：{{ counter.count }}</p>
  </div>
</template>

<script setup>
import { useCounterStore } from '../stores/counter'
const counter = useCounterStore()
</script>`,
                language: 'vue'
              }
            ]
          },
          {
            type: 'summary',
            title: '✅ 學完重點',
            points: [
              {
                title: '寶媽角度',
                description: '全家共用一台冰箱，誰需要牛奶都能隨時拿，資料不會亂。'
              },
              {
                title: '工程師角度',
                description: 'Pinia 幫你集中管理狀態，不用再 props/emit 傳來傳去。'
              }
            ]
          }
        ]
      }
    },
    { 
      day: 6, 
      date: '2025-11-06',
      title: '表單驗證 —— v-model 與必填檢查', 
      intro: 'v-model 綁定表單，並可加必填/格式檢查，避免錯誤。',
      content: {
        sections: [
          {
            type: 'intro',
            text: '表單是網站和使用者互動最常見的方式（登入、註冊、購物下單）。在 Vue3 裡，我們可以用 v-model 來綁定輸入框，讓資料與畫面保持同步，再加上驗證條件，避免使用者輸入錯誤或漏填。👉 就像你去餐廳點餐，如果沒有勾選主餐或飲料，服務生會提醒你「這個還沒填哦！」'
          },
          {
            type: 'perspective',
            title: '👩‍🍼 寶媽角度',
            content: '寫購物清單時：如果漏寫「牛奶」，去超市就會買不到。如果數字寫錯，可能買太多或不夠。',
            highlight: '所以需要一個小幫手，在出門前提醒你「清單沒寫完整」。',
            conclusion: 'Vue 的表單驗證就是這個小幫手，確保資料正確無誤。'
          },
          {
            type: 'perspective',
            title: '💻 工程師角度',
            content: 'v-model：雙向綁定，輸入框內容會即時反映到變數，反之亦然。',
            listItems: [
              {
                title: '驗證方式',
                items: [
                  '手動檢查：用 if 判斷是否符合條件',
                  'computed：建立條件判斷，動態檢查',
                  '第三方套件：如 VeeValidate / Yup，適合大型專案'
                ]
              },
              {
                title: '常見驗證',
                items: [
                  '必填',
                  '字數限制',
                  '格式檢查（如 Email）'
                ]
              }
            ]
          },
          {
            type: 'demo',
            title: '📦 今天的實作',
            description: '需求：1. 建立登入表單。2. Email 必填，必須包含 @。3. 密碼必填，至少 6 碼。',
            tasks: [],
            code: `<template>
  <div>
    <h2>登入表單</h2>
    <form @submit.prevent="handleSubmit">
      <label>Email:
        <input v-model="email" />
      </label>
      <p v-if="tried && !isEmailValid">⚠️ Email 格式錯誤</p>

      <label>密碼:
        <input type="password" v-model="password" />
      </label>
      <p v-if="tried && password.length < 6">⚠️ 密碼至少 6 碼</p>

      <button type="submit">登入</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const email = ref('')
const password = ref('')
const tried = ref(false)

const isEmailValid = computed(() => email.value.includes('@'))

function handleSubmit() {
  tried.value = true
  if (isEmailValid.value && password.value.length >= 6) {
    alert('✅ 登入成功！')
  }
}
</script>`,
            filename: 'Login.vue'
          },
          {
            type: 'summary',
            title: '✅ 學完重點',
            points: [
              {
                title: '寶媽角度',
                description: '像寫購物清單，少一項東西就會出錯，驗證幫你提醒「還沒寫」。'
              },
              {
                title: '工程師角度',
                description: '學會用 v-model 綁定輸入，並透過條件檢查完成基礎表單驗證。'
              }
            ]
          }
        ]
      }
    },
    { 
      day: 7, 
      date: '2025-11-07',
      title: '生命週期鉤子 —— 元件的開店流程', 
      intro: 'Vue 元件有從建立到銷毀的流程，就像早餐店開店到打烊。',
      content: {
        sections: [
          {
            type: 'intro',
            text: '在 Vue3 中，每個元件都有「生命週期」，也就是它從出生 → 使用 → 消失的過程。👉 就像一間早餐店，會經歷 **備料、開店、更新菜單、打烊** 的流程。透過 **生命週期鉤子（Lifecycle Hooks）**，我們可以在這些階段插入程式邏輯，做像是：初始化資料、呼叫 API、清除計時器或監聽器。'
          },
          {
            type: 'perspective',
            title: '👩‍🍼 寶媽角度',
            content: '經營早餐店：備料（準備食材） → created、開店（迎客） → mounted、更新菜單（有新餐點） → updated、打烊（收攤） → unmounted。',
            highlight: '每個階段都有不同工作，少做一步會出問題。',
            conclusion: '早餐店要順利營運，每個階段都要做對應的事情。'
          },
          {
            type: 'perspective',
            title: '💻 工程師角度',
            content: 'Vue3 常用的生命週期鉤子：',
            listItems: [
              {
                title: '常用生命週期',
                items: [
                  'onMounted：元件載入後執行，適合打 API',
                  'onUpdated：元件資料或 DOM 更新後觸發',
                  'onUnmounted：元件被移除時觸發，常用於清除副作用（事件監聽、計時器）'
                ]
              },
              {
                title: '提醒',
                items: [
                  '舊版 Vue2 的 created、mounted 等對應到 Vue3 Composition API 的 hook function'
                ]
              }
            ]
          },
          {
            type: 'demo',
            title: '📦 今天的實作',
            description: '需求：1. 建立一個子元件，顯示數字。2. 在不同生命週期 console.log 對應訊息。3. 當父元件切換數字或銷毀子元件時，觀察生命週期變化。',
            tasks: [
              '建立父元件 App.vue 控制數字和子元件的顯示',
              '建立子元件 Child.vue 監聽生命週期鉤子',
              '測試點擊 +1 按鈕觀察 updated 事件',
              '測試點擊銷毀按鈕觀察 unmounted 事件'
            ],
            codeSections: [
              {
                title: '1. App.vue',
                description: '父元件控制數字和子元件的顯示',
                code: `<template>
  <div>
    <h2>生命週期示範</h2>
    <button @click="count++">+1</button>
    <button @click="show = false">銷毀子元件</button>
    <Child v-if="show" :count="count" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const count = ref(0)
const show = ref(true)
</script>`,
                filename: 'App.vue'
              },
              {
                title: '2. Child.vue',
                description: '子元件監聽生命週期',
                code: `<template>
  <p>現在數字：{{ count }}</p>
</template>

<script setup>
import { onMounted, onUpdated, onUnmounted } from 'vue'

const props = defineProps(['count'])

onMounted(() => console.log('🏪 元件掛載完成 → 餐館開張'))
onUpdated(() => console.log('📋 元件更新 → 菜單更新'))
onUnmounted(() => console.log('🌙 元件卸載 → 餐館打烊'))
</script>`,
                filename: 'Child.vue'
              }
            ]
          },
          {
            type: 'summary',
            title: '✅ 學完重點',
            points: [
              {
                title: '寶媽角度',
                description: '早餐店有完整的開店流程：準備 → 開門 → 更新 → 打烊。'
              },
              {
                title: '工程師角度',
                description: '熟悉 onMounted、onUpdated、onUnmounted 等 hook，能在正確階段掛上邏輯。'
              }
            ]
          }
        ]
      }
    },
    { 
      day: 8, 
      date: '2025-11-08', 
      title: 'provide/inject —— 跨層的紅包傳遞', 
      intro: '爺爺直接把紅包給孫子，不用父母轉交。',
      content: {
        sections: [
          {
            type: 'intro',
            text: '在 Vue 專案裡，元件之間最常見的傳值方式是 **props**（父傳子）。但如果資料要從「爺爺 → 孫子」跨過好幾層，props 就會變得冗長。👉 Vue 提供 **provide / inject**，讓「祖先元件」直接把資料提供給「後代元件」，中間的父母不用再幫忙轉交。'
          },
          {
            type: 'perspective',
            title: '👩‍🍼 寶媽角度',
            content: '過年發紅包：爺爺要給孫子紅包，不需要先交給爸爸再轉交。爺爺直接塞給孫子，最快最省事。',
            highlight: '這樣就算中間有很多人，也不會搞混。',
            conclusion: '直接傳遞最有效率。'
          },
          {
            type: 'perspective',
            title: '💻 工程師角度',
            content: 'provide/inject 是 Vue3 提供的跨層級傳值機制。',
            listItems: [
              {
                title: '基本用法',
                items: [
                  'provide(key, value)：祖先元件提供資料',
                  'inject(key)：後代元件取得資料'
                ]
              },
              {
                title: '適用場景',
                items: [
                  '全域設定（主題顏色、語言切換）',
                  '不常更新、但多層元件都需要用的資料'
                ]
              },
              {
                title: '對比',
                items: [
                  'props/emit：適合父子層級的資料傳遞',
                  'provide/inject：適合跨多層級的資料傳遞'
                ]
              }
            ]
          },
          {
            type: 'demo',
            title: '📦 今天的實作',
            description: '需求：',
            tasks: [
              '爺爺提供一個 theme 主題字串。',
              '爸爸只是中間人，不處理資料。',
              '孫子直接透過 inject 取到 theme。'
            ],
            codeSections: [
              {
                number: 1,
                title: '1. App.vue',
                description: '',
                code: `<template>
  <Grandpa />
</template>

<script setup>
import Grandpa from './Grandpa.vue'
</script>`,
                language: 'vue'
              },
              {
                number: 2,
                title: '2. Grandpa.vue',
                description: '爺爺提供主題資料',
                code: `<template>
  <div>
    <h2>我是爺爺</h2>
    <Parent />
  </div>
</template>

<script setup>
import { provide, ref } from 'vue'
import Parent from './Parent.vue'

const theme = ref('🌞 Light Mode')
provide('theme', theme)
</script>`,
                language: 'vue'
              },
              {
                number: 3,
                title: '3. Parent.vue',
                description: '爸爸不處理資料，只負責渲染子元件',
                code: `<template>
  <div>
    <h3>我是爸爸</h3>
    <Child />
  </div>
</template>

<script setup>
import Child from './Child.vue'
</script>`,
                language: 'vue'
              },
              {
                number: 4,
                title: '4. Child.vue',
                description: '孫子直接取得爺爺提供的主題',
                code: `<template>
  <div>
    <h4>我是孫子，拿到主題：{{ theme }}</h4>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const theme = inject('theme')
</script>`,
                language: 'vue'
              }
            ]
          },
          {
            type: 'summary',
            title: '✅ 學完重點',
            points: [
              {
                title: '寶媽角度',
                description: '爺爺直接把紅包交給孫子，中間的人不用管。'
              },
              {
                title: '工程師角度',
                description: 'provide/inject 適合跨層級傳值，避免 props 層層傳遞的麻煩。'
              }
            ]
          }
        ]
      }
    },
    { 
      day: 9, 
      date: '2025-11-09',
      title: 'slot 插槽 —— 元件的萬用櫥櫃', 
      intro: 'slot 是留白空格，父元件決定放什麼。',
      content: {
        sections: [
          {
            type: 'intro',
            text: '在 Vue 中，slot 插槽允許父元件把「內容」塞進子元件的指定位置。👉 這讓元件可以更彈性、更多樣化，不只是固定樣式。例如：一個「卡片元件」可能有標題區、內容區，父元件可以自由決定要放什麼內容。'
          },
          {
            type: 'mom',
            title: '👩‍🍼 寶媽角度',
            content: '就像買了一個萬用櫥櫃：櫥櫃本身有框架，但裡面留空格。你可以放花瓶、放玩具、放書本。👉 slot 就是這個「留白空格」，讓你隨意擺放需要的東西。'
          },
          {
            type: 'engineer',
            title: '💻 工程師角度',
            points: [
              'slot：允許父元件插入內容到子元件。',
              '具名 slot：可以定義不同區域（例如：標題 slot、內容 slot）。',
              'default slot：如果父元件沒有提供內容，子元件顯示預設值。',
              '適用場景：卡片、彈窗、Layout、可複用 UI 元件。'
            ]
          },
          {
            type: 'demo',
            title: '📦 今天的實作',
            description: '需求：',
            tasks: [
              '建立一個 Card 元件，裡面有「標題 slot」和「內容 slot」。',
              '父元件 App.vue 可以決定標題與內容顯示什麼。'
            ],
            steps: [
              {
                title: '1. Card.vue',
                code: `<template>
  <div class="card">
    <header>
      <slot name="title">預設標題</slot>
    </header>
    <main>
      <slot>這裡是預設內容</slot>
    </main>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 12px;
  margin: 8px;
  border-radius: 6px;
}
</style>`
              },
              {
                title: '2. App.vue',
                code: `<template>
  <div>
    <Card>
      <template #title>
        <h2>兔寶的日記</h2>
      </template>
      <p>今天吃了胡蘿蔔 🥕，還跟媽媽玩遊戲！</p>
    </Card>

    <Card>
      <template #title>
        <h2>待辦清單</h2>
      </template>
      <ul>
        <li>洗衣服</li>
        <li>拖地板</li>
        <li>做晚餐</li>
      </ul>
    </Card>
  </div>
</template>

<script setup>
import Card from './Card.vue'
</script>`
              }
            ]
          },
          {
            type: 'summary',
            title: '✅ 學完重點',
            points: [
              { icon: '👩‍🍼', text: '寶媽角度：櫥櫃裡留空格，你決定要放什麼。' },
              { icon: '💻', text: '工程師角度：slot 讓子元件保持彈性，父元件可以插入自訂內容，增加元件可重用性。' }
            ]
          }
        ]
      }
    },
    { 
      day: 10, 
      date: '2025-11-10', 
      title: 'Teleport —— 元件的瞬間移動', 
      intro: 'Teleport 讓元素渲染到別處，適合 Modal/Toast。',
      content: {
        sections: [
          {
            type: 'intro',
            text: '在 Vue 中，元件通常會渲染在它被呼叫的地方。但有些情境下，我們希望「元素出現在另一個地方」，例如 Modal 彈窗、Toast 提示。👉 Teleport 可以把元件的內容「瞬間移動」到指定的 DOM 節點（通常是 body）。'
          },
          {
            type: 'mom',
            title: '👩‍🍼 寶媽角度',
            content: '在客廳按下電燈開關，結果亮的卻是陽台的燈。👉 這就是「瞬間移動」的效果：按鈕和燈泡不在同一個房間，但可以互相控制。'
          },
          {
            type: 'engineer',
            title: '💻 工程師角度',
            content: 'Teleport 語法：',
            code: `<teleport to="body">
  <div>這裡的內容會渲染到 body</div>
</teleport>`,
            points: [
              '常見應用：Modal 彈窗、Toast 訊息、Tooltip 提示',
              '好處：避免 CSS 層級 (z-index) 被其他元件影響，確保 UI 能正確顯示在最上層。'
            ]
          },
          {
            type: 'demo',
            title: '📦 今天的實作',
            description: '需求：',
            tasks: [
              '建立一個 Modal 彈窗元件。',
              '點擊按鈕可以開啟/關閉 Modal。',
              'Modal 的內容實際上被渲染在 body。'
            ],
            steps: [
              {
                title: '1. Modal.vue',
                code: `<template>
  <teleport to="body">
    <div class="overlay">
      <div class="modal">
        <slot />
        <button @click="$emit('close')">關閉</button>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}
.modal {
  background: white;
  padding: 20px;
  margin: 100px auto;
  width: 250px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}
</style>`
              },
              {
                title: '2. App.vue',
                code: `<template>
  <button @click="show = true">打開彈窗</button>

  <Modal v-if="show" @close="show = false">
    <h2>這是彈跳視窗</h2>
    <p>雖然我寫在 App.vue，但實際上渲染在 body！</p>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import Modal from './Modal.vue'

const show = ref(false)
</script>`
              }
            ]
          },
          {
            type: 'summary',
            title: '✅ 學完重點',
            points: [
              { icon: '👩‍🍼', text: '寶媽角度：客廳的開關可以控制陽台的燈，元件能「瞬間移動」到別處。' },
              { icon: '💻', text: '工程師角度：Teleport 把元素渲染到指定節點，適合做 Modal、Toast 等全局提示元件。' }
            ]
          }
        ]
      }
    },
    { 
      day: 11, 
      date: '2025-11-11', 
      title: 'Transition —— 元件的華麗走秀', 
      intro: 'Transition 幫元素加進出場動畫。',
      content: {
        sections: [
          {
            type: 'intro',
            title: '## 簡介',
            text: '在 Vue 中，當元素進入或離開畫面時，可以加上**過場動畫**。\n\n👉 這讓使用者感覺畫面更流暢、自然。'
          },
          {
            type: '寶媽角度',
            title: '## 👩‍🍼 寶媽角度',
            text: '兔寶換衣服走出房間：\n\n- 換衣服（進入動畫）\n- 揮手再見（離開動畫）\n\n一個小小的動作，加上過場效果，看起來就很優雅。'
          },
          {
            type: '工程師角度',
            title: '## 💻 工程師角度',
            text: '- 使用 `<transition>` 包裹元素。\n- Vue 會在元素顯示/消失時，自動套上 class：\n  - `v-enter-from`、`v-enter-active`、`v-enter-to`\n  - `v-leave-from`、`v-leave-active`、`v-leave-to`\n- 可以透過 CSS 控制動畫效果。'
          },
          {
            type: '今天的實作',
            title: '## 📦 今天的實作',
            description: '建立一個按鈕，點擊後顯示/隱藏文字，並附上淡入淡出效果。',
            steps: [
              {
                title: '1. App.vue',
                code: `<template>
  <button @click="show = !show">切換文字</button>
  <transition name="fade">
    <p v-if="show">Hello Vue Transition!</p>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>`
              }
            ]
          },
          {
            type: 'summary',
            title: '✅ 學完重點',
            points: [
              { icon: '👩‍🍼', text: '寶媽角度：加上走秀效果，動作更優雅。' },
              { icon: '💻', text: '工程師角度：透過 `<transition>` 與 CSS class，實現元素的進出場動畫。' }
            ]
          }
        ]
      }
    },
    { 
      day: 12, 
      date: '2025-11-12', 
      title: 'Composition API 重構 —— 收納箱整理', 
      intro: 'Composition API 幫程式收納整理，方便重用。',
      content: {
        sections: [
          {
            type: 'intro',
            title: '## 簡介',
            text: 'Vue3 提供 **Composition API**，讓我們能把資料、方法、監聽集中在一起，方便拆分與重用。'
          },
          {
            type: '寶媽角度',
            title: '## 👩‍🍼 寶媽角度',
            text: '整理衣櫃：\n\n- 把襪子放一籃\n- 衣服放一籃\n- 帽子放一籃\n\n👉 分門別類，找東西更快。'
          },
          {
            type: '工程師角度',
            title: '## 💻 工程師角度',
            text: '- 使用 `setup()` 統一管理 state 與 methods。\n- 可將邏輯抽出成「自訂 hook」（函式）。\n- 適合多人協作與大專案結構化管理。'
          },
          {
            type: '今天的實作',
            title: '## 📦 今天的實作',
            description: '將計數器邏輯抽離成 `useCounter.js`。',
            steps: [
              {
                title: '1. useCounter.js',
                code: `import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  function increment() {
    count.value++
  }
  return { count, increment }
}`
              },
              {
                title: '2. App.vue',
                code: `<template>
  <p>數字：{{ count }}</p>
  <button @click="increment">+1</button>
</template>

<script setup>
import { useCounter } from './useCounter'
const { count, increment } = useCounter()
</script>`
              }
            ]
          },
          {
            type: 'summary',
            title: '✅ 學完重點',
            points: [
              { icon: '👩‍🍼', text: '寶媽角度：收納箱整理，生活更整齊。' },
              { icon: '💻', text: '工程師角度：Composition API 提供更清晰的程式結構，便於重用。' }
            ]
          }
        ]
      }
    },
    { 
      day: 13, 
      date: '2025-11-13', 
      title: '自訂 Hook —— 媽媽的獨門秘方', 
      intro: '把重複邏輯抽成 Hook，隨時重用。',
      content: {
        sections: [
          {
            type: 'intro',
            text: '有些功能經常會重複使用，可以抽成「自訂 Hook 函式」，就像家傳食譜，隨時套用。'
          },
          {
            type: 'perspective',
            title: '👩‍🍼 寶媽角度',
            content: '兔媽有一瓶「獨家滷肉秘方」，每次煮飯加一點，味道就到位。',
            highlight: '不用每次重新調配，直接使用現成的秘方。',
            conclusion: '獨門秘方讓煮飯更輕鬆。'
          },
          {
            type: 'perspective',
            title: '💻 工程師角度',
            content: '自訂 Hook 是將常用邏輯抽成可重用的函式。',
            listItems: [
              {
                title: '命名規範',
                items: [
                  '以 useXxx 命名',
                  '例如：useNow、useCounter、useLocalStorage'
                ]
              },
              {
                title: '使用方式',
                items: [
                  '任何元件都能直接 import 使用',
                  '返回響應式資料和方法'
                ]
              },
              {
                title: '常見應用',
                items: [
                  '倒數計時器',
                  '表單驗證',
                  'localStorage 存取'
                ]
              }
            ]
          },
          {
            type: 'demo',
            title: '📦 今天的實作',
            description: '製作一個「現在時間 Hook」。',
            tasks: [],
            codeSections: [
              {
                number: 1,
                title: '1. useNow.js',
                description: '自訂 Hook 函式',
                code: `import { ref, onMounted, onUnmounted } from 'vue'

export function useNow() {
  const now = ref(new Date().toLocaleTimeString())
  let timer = null

  onMounted(() => {
    timer = setInterval(() => {
      now.value = new Date().toLocaleTimeString()
    }, 1000)
  })

  onUnmounted(() => clearInterval(timer))

  return { now }
}`,
                language: 'javascript'
              },
              {
                number: 2,
                title: '2. App.vue',
                description: '在元件中使用自訂 Hook',
                code: `<template>
  <p>現在時間：{{ now }}</p>
</template>

<script setup>
import { useNow } from './useNow'
const { now } = useNow()
</script>`,
                language: 'vue'
              }
            ]
          },
          {
            type: 'summary',
            title: '✅ 學完重點',
            points: [
              {
                title: '寶媽角度',
                description: '獨門秘方，隨時能重複使用。'
              },
              {
                title: '工程師角度',
                description: '自訂 Hook 提升程式可重用性，讓專案更乾淨。'
              }
            ]
          }
        ]
      }
    },
    { 
      day: 14, 
      date: '2025-11-14', 
      title: 'Ref vs Reactive —— 存錢筒與全家帳本', 
      intro: 'ref 管單一值，reactive 管整個物件。',
      content: {
        sections: [
          {
            type: 'intro',
            text: 'Vue3 有兩種響應式 API：**ref** 與 **reactive**。👉 它們都能讓資料變動時，自動更新畫面。'
          },
          {
            type: 'perspective',
            title: '👩‍🍼 寶媽角度',
            content: '兩種資料管理方式的比喻：',
            listItems: [
              {
                title: '比喻說明',
                items: [
                  'ref：像一個小存錢筒，專門放單一金額',
                  'reactive：像全家的帳簿，裡面記錄多種支出收入'
                ]
              }
            ]
          },
          {
            type: 'perspective',
            title: '💻 工程師角度',
            content: 'ref 和 reactive 的差異與使用場景：',
            listItems: [
              {
                title: 'ref',
                items: [
                  '建立基本型別（字串、數字、布林）的響應式資料',
                  '需要透過 .value 來存取和修改',
                  '適合單一值的管理'
                ]
              },
              {
                title: 'reactive',
                items: [
                  '建立物件/陣列的響應式資料',
                  '直接存取屬性，不需要 .value',
                  '適合複雜資料結構'
                ]
              },
              {
                title: '其他工具',
                items: [
                  'toRefs：把 reactive 的所有屬性拆分成 ref',
                  'toRef：把 reactive 的單一屬性拆分成 ref'
                ]
              }
            ]
          },
          {
            type: 'demo',
            title: '📦 今天的實作',
            description: '',
            tasks: [],
            code: `<template>
  <p>ref 數字：{{ count }}</p>
  <button @click="count++">+1</button>

  <p>reactive 帳本：{{ book.income }} 收入 / {{ book.expense }} 支出</p>
  <button @click="book.expense += 100">花錢</button>
</template>

<script setup>
import { ref, reactive } from 'vue'

const count = ref(0)
const book = reactive({ income: 5000, expense: 2000 })
</script>`,
            filename: 'App.vue'
          },
          {
            type: 'summary',
            title: '✅ 學完重點',
            points: [
              {
                title: '寶媽角度',
                description: '存錢筒 vs 全家帳本，應用情境不同。'
              },
              {
                title: '工程師角度',
                description: 'ref 適合單一值，reactive 適合物件/陣列。'
              }
            ]
          }
        ]
      }
    },
    { 
      day: 15, 
      date: '2025-11-15', 
      title: '事件修飾符 — 規則小貼紙', 
      intro: '修飾符幫事件加規則，避免亂跑。',
      content: {
        sections: [
          {
            type: 'intro',
            text: '事件修飾符幫我們「控制事件的行為」，就像在門口貼規則標語。'
          },
          {
            type: 'perspective',
            title: '👩‍🍼 寶媽角度',
            content: '門口貼「禁止外送進入」的貼紙，外送員就會停在門口，不會亂跑進來。',
            highlight: '規則貼紙可以控制行為，讓事情按照你的意思走。',
            conclusion: '貼紙規則讓環境更有秩序。'
          },
          {
            type: 'perspective',
            title: '💻 工程師角度',
            content: '常見的事件修飾符：',
            listItems: [
              {
                title: '常見修飾符',
                items: [
                  '.stop：阻止事件冒泡',
                  '.prevent：阻止預設行為',
                  '.once：事件只觸發一次',
                  '.self：只有自己觸發才執行'
                ]
              }
            ]
          },
          {
            type: 'demo',
            title: '📦 今天的實作',
            description: '一個表單，點提交按鈕時阻止刷新。',
            tasks: [],
            code: `<template>
  <form @submit.prevent="submitForm">
    <input v-model="name" placeholder="輸入名字" />
    <button type="submit">送出</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('')
function submitForm() {
  alert(\`Hello, \${name.value}\`)
}
</script>`,
            filename: 'App.vue'
          },
          {
            type: 'summary',
            title: '✅ 學完重點',
            points: [
              {
                title: '寶媽角度',
                description: '規則貼紙，控制行為。'
              },
              {
                title: '工程師角度',
                description: '事件修飾符讓事件更好掌控，避免不必要的行為。'
              }
            ]
          }
        ]
      }
    },
    { 
      day: 16, 
      date: '2025-11-16', 
      title: 'v-if / v-show —— 燈泡 vs 窗簾', 
      intro: 'v-if 是有或沒有，v-show 是隱藏。',
      content: {
        sections: [
          {
            type: 'intro',
            text: 'Vue 中常見的條件渲染方式：**v-if** 與 **v-show**。👉 雖然都能顯示/隱藏元素，但背後運作不同。'
          },
          {
            type: 'perspective',
            title: '👩‍🍼 寶媽角度',
            content: '兩種顯示/隱藏的比喻：',
            listItems: [
              {
                title: '比喻說明',
                items: [
                  'v-if：像決定「要不要裝燈泡」。沒有就真的不存在',
                  'v-show：像「拉窗簾」。東西還在，但被遮住'
                ]
              }
            ]
          },
          {
            type: 'perspective',
            title: '💻 工程師角度',
            content: 'v-if 和 v-show 的差異：',
            listItems: [
              {
                title: 'v-if',
                items: [
                  '真正新增或移除 DOM',
                  '適合不常切換的情況',
                  '初始為 false 時不會渲染'
                ]
              },
              {
                title: 'v-show',
                items: [
                  '改變 CSS display 屬性',
                  '適合頻繁切換的情況',
                  '初始就會渲染，只是隱藏'
                ]
              }
            ]
          },
          {
            type: 'demo',
            title: '📦 今天的實作',
            description: '顯示/隱藏訊息。',
            tasks: [],
            code: `<template>
  <button @click="show = !show">切換顯示</button>

  <p v-if="show">這是 v-if 顯示的文字</p>
  <p v-show="show">這是 v-show 顯示的文字</p>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>`,
            filename: 'App.vue'
          },
          {
            type: 'summary',
            title: '✅ 學完重點',
            points: [
              {
                title: '寶媽角度',
                description: '燈泡（if） vs 窗簾（show）。'
              },
              {
                title: '工程師角度',
                description: 'v-if 適合不常切換，v-show 適合頻繁切換。'
              }
            ]
          }
        ]
      }
    },
    { 
      day: 17, 
      date: '2025-11-17', 
      title: 'v-for —— 批量烤餅乾', 
      intro: 'v-for 批次渲染，就像一次烤一盤餅乾。',
      content: {
        sections: [
          {
            type: 'intro',
            text: '**v-for** 可以用來批次渲染列表，不用重複寫相同元素。'
          },
          {
            type: 'perspective',
            title: '👩‍🍼 寶媽角度',
            content: '烤餅乾：只要準備一份麵糰，就能一次烤出 12 塊餅乾。',
            highlight: '不用一個一個慢慢做，用模板批量生產。',
            conclusion: '效率提升，省時省力。'
          },
          {
            type: 'perspective',
            title: '💻 工程師角度',
            content: 'v-for 的使用方式：',
            listItems: [
              {
                title: '語法',
                items: [
                  '基本語法：v-for="(item, index) in items"',
                  'item 是當前元素，index 是索引（可選）',
                  '可以遍歷陣列、物件、數字範圍'
                ]
              },
              {
                title: 'key 的重要性',
                items: [
                  '需要加上 :key 屬性',
                  '幫助 Vue 高效追蹤每個元素',
                  '確保元素的正確性與效能'
                ]
              }
            ]
          },
          {
            type: 'demo',
            title: '📦 今天的實作',
            description: '渲染待辦清單。',
            tasks: [],
            code: `<template>
  <ul>
    <li v-for="(todo, i) in todos" :key="i">{{ todo }}</li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'
const todos = ref(['買菜', '洗衣服', '拖地'])
</script>`,
            filename: 'App.vue'
          },
          {
            type: 'summary',
            title: '✅ 學完重點',
            points: [
              {
                title: '寶媽角度',
                description: '一次烤一盤餅乾，省時省力。'
              },
              {
                title: '工程師角度',
                description: '記得加 :key，確保效能與正確性。'
              }
            ]
          }
        ]
      }
    },
    { 
      day: 18, 
      date: '2025-11-18', 
      title: '表單修飾符 —— 自動修正小幫手', 
      intro: '修飾符幫表單資料更乾淨。',
      content: {
        sections: [
          {
            type: 'intro',
            text: 'Vue 的表單支援 **修飾符**，幫助處理輸入行為。'
          },
          {
            type: 'perspective',
            title: '👩‍🍼 寶媽角度',
            content: '兔寶寫字，鉛筆自動幫忙修正錯字。',
            highlight: '就像有個小幫手在旁邊，自動修正常見的錯誤。',
            conclusion: '讓輸入更準確，減少後續處理的麻煩。'
          },
          {
            type: 'perspective',
            title: '💻 工程師角度',
            content: '常用的表單修飾符：',
            listItems: [
              {
                title: '常用修飾符',
                items: [
                  '.trim：自動去掉前後空格',
                  '.number：輸入轉成數字',
                  '.lazy：只有失焦時才更新資料'
                ]
              }
            ]
          },
          {
            type: 'demo',
            title: '📦 今天的實作',
            description: '',
            tasks: [],
            code: `<template>
  <input v-model.trim="name" placeholder="名字（自動去空格）" />
  <input v-model.number="age" placeholder="年齡（自動轉數字）" />
  <p>姓名：{{ name }}，年齡：{{ age }}</p>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('')
const age = ref(null)
</script>`,
            filename: 'App.vue'
          },
          {
            type: 'summary',
            title: '✅ 學完重點',
            points: [
              {
                title: '寶媽角度',
                description: '小幫手幫你修正錯誤。'
              },
              {
                title: '工程師角度',
                description: '表單修飾符讓資料更乾淨可靠。'
              }
            ]
          }
        ]
      }
    },
    { 
      day: 19, 
      date: '2025-11-19', 
      title: 'Pinia 資料持久化 —— 冰箱的備用電池', 
      intro: 'Pinia 配合 localStorage，重新整理頁面資料仍然存在。',
      content: {
        sections: [
          {
            type: 'intro',
            text: 'Pinia 預設的資料存在記憶體中，重新整理頁面就會消失。\n\n👉 為了讓資料「記得住」，我們可以把它存在 **localStorage / sessionStorage**，這就是資料持久化。'
          },
          {
            type: 'perspective',
            title: '👩‍🍼 寶媽角度',
            content: '冰箱突然停電，裡面的食材會壞掉。',
            highlight: '如果加上「備用電池」，斷電時還能繼續保存。',
            conclusion: '👉 Pinia 加上持久化，就算關掉網頁，資料還在。'
          },
          {
            type: 'perspective',
            title: '💻 工程師角度',
            content: '資料持久化的方式：',
            listItems: [
              {
                title: '儲存方式',
                items: [
                  'localStorage：關掉瀏覽器後資料仍存在',
                  'sessionStorage：關閉分頁後資料消失'
                ]
              },
              {
                title: '常見做法',
                items: [
                  '使用 Pinia 插件自動同步 state 到 localStorage',
                  '或者在 actions 裡手動存取'
                ]
              }
            ]
          },
          {
            type: 'demo',
            title: '📦 今天的實作',
            description: '',
            tasks: [
              {
                step: 1,
                title: 'plugins/persist.js',
                code: `export function persistPlugin({ store }) {
  const saved = localStorage.getItem(store.$id)
  if (saved) store.$state = JSON.parse(saved)

  store.$subscribe((_, state) => {
    localStorage.setItem(store.$id, JSON.stringify(state))
  })
}`
              },
              {
                step: 2,
                title: 'main.js',
                code: `import { createPinia } from 'pinia'
import { persistPlugin } from './plugins/persist'

const pinia = createPinia()
pinia.use(persistPlugin)

app.use(pinia)`
              },
              {
                step: 3,
                title: 'stores/counter.js',
                code: `import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() { this.count++ }
  }
})`
              }
            ],
            additionalNote: '重新整理頁面後，count 仍然保留。'
          },
          {
            type: 'summary',
            title: '✅ 學完重點',
            points: [
              {
                title: '寶媽角度',
                description: '冰箱有備用電池，斷電也能保存食材。'
              },
              {
                title: '工程師角度',
                description: 'Pinia 可結合 localStorage 做持久化，避免刷新丟失資料。'
              }
            ]
          }
        ]
      }
    },
    { 
      day: 20, 
      date: '2025-11-20', 
      title: 'Router 巢狀路由 —— 房子裡的房間', 
      intro: '巢狀路由讓頁面能有子頁面，例如 /user/1/profile。',
      content: {
        sections: [
          {
            type: 'intro',
            text: '除了基本路由，Vue Router 還支援 **巢狀路由**，讓一個頁面裡可以再切換不同子頁面。\n\n👉 常見應用：使用者中心（/user → 個人資料 / 訂單 / 收藏）。'
          },
          {
            type: 'perspective',
            title: '👩‍🍼 寶媽角度',
            content: '透天厝：',
            highlight: '一樓是客廳\n二樓有兩間臥室\n三樓是書房',
            conclusion: '👉 一個門牌號碼（user/1），裡面還有不同房間（profile、orders）。'
          },
          {
            type: 'perspective',
            title: '💻 工程師角度',
            content: '巢狀路由設定：',
            listItems: [
              {
                title: '路由結構',
                items: [
                  '使用 children 屬性定義子路由',
                  '<router-view> 會決定子路由的顯示位置',
                  '子路由路徑會自動拼接父路由路徑'
                ]
              }
            ],
            codeExample: {
              code: `{
  path: '/user/:id',
  component: User,
  children: [
    { path: 'profile', component: Profile },
    { path: 'orders', component: Orders }
  ]
}`,
              language: 'javascript'
            }
          },
          {
            type: 'demo',
            title: '📦 今天的實作',
            description: '',
            tasks: [
              {
                step: 1,
                title: 'router/index.js',
                code: `import { createRouter, createWebHistory } from 'vue-router'
import User from '../views/User.vue'
import Profile from '../views/Profile.vue'
import Orders from '../views/Orders.vue'

const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      { path: 'profile', component: Profile },
      { path: 'orders', component: Orders }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router`
              },
              {
                step: 2,
                title: 'User.vue',
                code: `<template>
  <div>
    <h2>使用者 ID：{{ route.params.id }}</h2>
    <router-link :to="\`/user/\${route.params.id}/profile\`">個人資料</router-link>
    <router-link :to="\`/user/\${route.params.id}/orders\`">訂單</router-link>
    <router-view />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>`
              }
            ]
          },
          {
            type: 'summary',
            title: '✅ 學完重點',
            points: [
              {
                title: '寶媽角度',
                description: '房子裡還有不同房間，住在同一戶但功能不同。'
              },
              {
                title: '工程師角度',
                description: '巢狀路由讓頁面能分層顯示，適合使用者中心或多層級內容。'
              }
            ]
          }
        ]
      }
    },
    { 
      day: 21, 
      date: '2025-11-21', 
      title: 'Router 守衛 —— 門口的保全', 
      intro: 'beforeEach 檢查登入或權限，決定能否進頁面。',
      content: {
        sections: [
          {
            type: 'intro',
            text: '有些頁面不是人人都能進入，例如「會員專區」需要先登入。\n\n👉 Vue Router 提供 **導航守衛（Navigation Guards）**，讓我們能在進入頁面前做檢查。'
          },
          {
            type: 'perspective',
            title: '👩‍🍼 寶媽角度',
            content: '社區遊戲室：',
            highlight: '保全會檢查你有沒有帶住戶證，沒有就不能進去。',
            conclusion: '確保只有符合條件的人才能進入特定區域。'
          },
          {
            type: 'perspective',
            title: '💻 工程師角度',
            content: '導航守衛的類型：',
            listItems: [
              {
                title: '守衛類型',
                items: [
                  'beforeEach：進入路由前檢查',
                  'afterEach：切換後執行'
                ]
              },
              {
                title: '常見應用',
                items: [
                  '登入驗證',
                  '權限檢查',
                  '紀錄訪問日誌'
                ]
              }
            ]
          },
          {
            type: 'demo',
            title: '📦 今天的實作',
            description: '',
            tasks: [],
            code: `import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Secret from '../views/Secret.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/secret', component: Secret }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 模擬登入檢查
let isLogin = false

router.beforeEach((to, from, next) => {
  if (to.path === '/secret' && !isLogin) {
    alert('❌ 請先登入！')
    next('/')
  } else {
    next()
  }
})

export default router`,
            filename: 'router/index.js'
          },
          {
            type: 'summary',
            title: '✅ 學完重點',
            points: [
              {
                title: '寶媽角度',
                description: '保全檢查證件，沒證件不能進。'
              },
              {
                title: '工程師角度',
                description: 'Router 守衛讓你在切換頁面前做檢查，控制權限。'
              }
            ]
          }
        ]
      }
    },
    { day: 22, date: '2025-11-22', title: '非同步資料 fetch —— 叫外送', intro: '用 fetch/axios 請求資料，更新畫面。' },
    { day: 23, date: '2025-11-23', title: 'Loading 狀態 —— 廚房準備中', intro: '加上 loading 狀態提示資料載入中。' },
    { day: 24, date: '2025-11-24', title: '錯誤處理 —— 缺貨的餐點', intro: '請求可能失敗，需要錯誤提示。' },
    { day: 25, date: '2025-11-25', title: '環境變數 —— 家裡的小抄', intro: '不同環境用不同設定，Vue 用 .env 管理。' },
    { day: 26, date: '2025-11-26', title: '專案架構整理 —— 大掃除', intro: '專案需要整理檔案結構，分門別類。' },
    { day: 27, date: '2025-11-27', title: 'Pinia 插件 —— 智慧冰箱', intro: '插件擴展 Pinia，例如資料存 localStorage。' },
    { day: 28, date: '2025-11-28', title: '測試（unit test）—— 模擬考', intro: '單元測試像模擬考，確保功能正確。' },
    { day: 29, date: '2025-11-29', title: '部署網站 —— 喬遷新居', intro: '部署讓專案能被公開訪問。' },
    { day: 30, date: '2025-11-30', title: '專案總結 & 展示 —— 成果發表會', intro: '把 30 天成果整合，做一個完整專案展示。' }
  ];

  const articles = [
    {
      id: 1,
      title: 'Vue3 30日學習日記',
      excerpt: '從零開始學習 Vue3，每天一個主題，用生活化的比喻理解複雜概念。30 天後，你也能建立完整的 Vue3 專案！',
      category: 'Vue3',
      date: '2024-11-28',
      views: 1243,
      tags: ['Vue3', 'Frontend', 'JavaScript'],
      icon: '💚',
      color: 'from-emerald-400 to-green-500'
    },
    {
      id: 2,
      title: 'UiPath Orchestrator 完整指南',
      excerpt: '深入學習 UiPath Orchestrator 中央控制平台，掌握機器人管理、排程部署、監控追蹤等企業級 RPA 自動化核心技術！',
      category: 'UiPath',
      date: '2025-12-03',
      views: 2450,
      tags: ['UiPath', 'RPA', 'Automation', 'Orchestrator'],
      icon: '🤖',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const engineerChats = [
    {
      id: 0,
      title: '與同事的日常',
      participants: ['我', '小明 (前端)', '阿華 (後端)'],
      avatar: '👨‍💻',
      messages: [
        { sender: '小明 (前端)', avatar: '👨', time: '09:15', content: '早安！昨天那個 API 串接好了嗎？', isMe: false },
        { sender: '我', avatar: '👤', time: '09:17', content: '早！搞定了，但發現一個問題...response 的日期格式跟文件不一樣 😅', isMe: true },
        { sender: '阿華 (後端)', avatar: '👨‍💼', time: '09:18', content: '什麼！讓我看看', isMe: false },
        { sender: '我', avatar: '👤', time: '09:19', content: '文件寫 "YYYY-MM-DD"，但實際回傳是 timestamp', isMe: true },
        { sender: '阿華 (後端)', avatar: '👨‍💼', time: '09:21', content: '啊...那個是我上週改的，忘記更新文件了 🤦‍♂️', isMe: false },
        { sender: '小明 (前端)', avatar: '👨', time: '09:22', content: '經典劇情 XD 文件永遠是最後更新的', isMe: false },
        { sender: '我', avatar: '👤', time: '09:23', content: '沒關係啦，我加個轉換函數就好。阿華記得補文件喔～', isMe: true },
        { sender: '阿華 (後端)', avatar: '👨‍💼', time: '09:25', content: '收到！我現在就去改 📝', isMe: false },
      ]
    },
    {
      id: 1,
      title: '主管的需求變更',
      participants: ['我', 'Tony 主管'],
      avatar: '👔',
      messages: [
        { sender: 'Tony 主管', avatar: '👔', time: '14:30', content: '嗨，那個新功能做得怎麼樣了？', isMe: false },
        { sender: '我', avatar: '👤', time: '14:32', content: '主管好！進度順利，預計明天可以上測試環境', isMe: true },
        { sender: 'Tony 主管', avatar: '👔', time: '14:33', content: '太好了！對了，老闆剛剛看了 demo，希望能加個匯出 Excel 的功能', isMe: false },
        { sender: '我', avatar: '👤', time: '14:35', content: '(內心：又來了...) 了解，這個需求...大概需要多少時間？', isMe: true },
        { sender: 'Tony 主管', avatar: '👔', time: '14:36', content: '應該不難吧？就加個按鈕下載 Excel 而已', isMe: false },
        { sender: '我', avatar: '👤', time: '14:38', content: '嗯...要處理資料格式、欄位對應、樣式設定，還要考慮大量資料的效能，預估需要 2-3 天', isMe: true },
        { sender: 'Tony 主管', avatar: '👔', time: '14:40', content: '這麼久？😮', isMe: false },
        { sender: '我', avatar: '👤', time: '14:42', content: '如果只要基本的匯出，1天可以搞定。但如果要美觀的格式和自訂欄位，就需要 2-3 天', isMe: true },
        { sender: 'Tony 主管', avatar: '👔', time: '14:45', content: '好吧，先做基本版，之後有需要再優化。辛苦了！', isMe: false },
        { sender: '我', avatar: '👤', time: '14:46', content: '收到！我會盡快完成 💪', isMe: true },
      ]
    },
    {
      id: 2,
      title: '使用者回饋',
      participants: ['我', '王小姐 (使用者)', 'Sarah (客服)'],
      avatar: '👥',
      messages: [
        { sender: 'Sarah (客服)', avatar: '👩‍💼', time: '10:05', content: '@工程師 有使用者反應系統有問題', isMe: false },
        { sender: '我', avatar: '👤', time: '10:07', content: '什麼問題？我看一下', isMe: true },
        { sender: 'Sarah (客服)', avatar: '👩‍💼', time: '10:08', content: '王小姐說她按了送出鈕後，畫面就一直轉圈圈', isMe: false },
        { sender: '王小姐 (使用者)', avatar: '👩', time: '10:10', content: '對啊！我等了 5 分鐘都沒反應，是不是壞掉了？', isMe: false },
        { sender: '我', avatar: '👤', time: '10:12', content: '王小姐您好，請問您是在哪個頁面遇到這個問題？可以截圖給我看嗎？', isMe: true },
        { sender: '王小姐 (使用者)', avatar: '👩', time: '10:15', content: '[圖片] 就是這個「批次上傳」的頁面', isMe: false },
        { sender: '我', avatar: '👤', time: '10:18', content: '了解！請問您上傳的檔案大概多大？', isMe: true },
        { sender: '王小姐 (使用者)', avatar: '👩', time: '10:20', content: '大概 50MB 左右，有 5000 筆資料', isMe: false },
        { sender: '我', avatar: '👤', time: '10:22', content: '找到原因了！目前系統對大檔案的處理時間較長，建議您分批上傳，每次 1000 筆左右會比較穩定', isMe: true },
        { sender: '王小姐 (使用者)', avatar: '👩', time: '10:25', content: '原來如此！那我重新分批試試看，謝謝！', isMe: false },
        { sender: '我', avatar: '👤', time: '10:27', content: '不客氣！我也會優化大檔案的處理流程，預計下週更新後就不會有這個問題了 👍', isMe: true },
        { sender: 'Sarah (客服)', avatar: '👩‍💼', time: '10:30', content: '感謝工程師！', isMe: false },
      ]
    },
    {
      id: 3,
      title: 'Code Review 時間',
      participants: ['我', 'David (資深工程師)'],
      avatar: '🔍',
      messages: [
        { sender: 'David (資深工程師)', avatar: '🧑‍🏫', time: '16:00', content: '看了你的 PR，整體寫得不錯！', isMe: false },
        { sender: '我', avatar: '👤', time: '16:02', content: '謝謝 David！有什麼需要改進的地方嗎？', isMe: true },
        { sender: 'David (資深工程師)', avatar: '🧑‍🏫', time: '16:03', content: '有幾個小建議：第 45 行的 forEach 可以改用 map 會更簡潔', isMe: false },
        { sender: '我', avatar: '👤', time: '16:05', content: '喔對！我怎麼沒想到，馬上改', isMe: true },
        { sender: 'David (資深工程師)', avatar: '🧑‍🏫', time: '16:07', content: '還有這個 API 呼叫建議加上 try-catch，避免錯誤沒被捕捉到', isMe: false },
        { sender: '我', avatar: '👤', time: '16:10', content: '好的！我補上錯誤處理', isMe: true },
        { sender: 'David (資深工程師)', avatar: '🧑‍🏫', time: '16:15', content: '另外，變數命名可以更語意化一點，"data" 改成 "userList" 會更清楚', isMe: false },
        { sender: '我', avatar: '👤', time: '16:18', content: '了解！我全部改完再請您 review', isMe: true },
        { sender: 'David (資深工程師)', avatar: '🧑‍🏫', time: '16:20', content: '👍 加油！寫程式要時刻想著「3個月後的自己看得懂嗎」', isMe: false },
        { sender: '我', avatar: '👤', time: '16:22', content: '受教了！這個觀念很重要 🙏', isMe: true },
      ]
    },
    {
      id: 4,
      title: '週五下午的緊急 Bug',
      participants: ['我', '小美 (QA)', '阿傑 (前端)'],
      avatar: '🐛',
      messages: [
        { sender: '小美 (QA)', avatar: '👩‍💻', time: '16:30', content: '糟糕！production 環境發現嚴重 bug！', isMe: false },
        { sender: '我', avatar: '👤', time: '16:31', content: '什麼！週五下午發現 bug 是最可怕的... 😱', isMe: true },
        { sender: '阿傑 (前端)', avatar: '👨‍💻', time: '16:32', content: '是哪裡出問題？', isMe: false },
        { sender: '小美 (QA)', avatar: '👩‍💻', time: '16:33', content: '結帳頁面點擊「確認付款」後沒反應，而且沒有錯誤訊息', isMe: false },
        { sender: '我', avatar: '👤', time: '16:35', content: '讓我看看 console... 喔不，是今天早上的部署改壞的', isMe: true },
        { sender: '阿傑 (前端)', avatar: '👨‍💻', time: '16:36', content: '能先 rollback 嗎？', isMe: false },
        { sender: '我', avatar: '👤', time: '16:37', content: '我先檢查一下影響範圍... 找到了！是 API 路徑打錯了', isMe: true },
        { sender: '小美 (QA)', avatar: '👩‍💻', time: '16:40', content: '可以快速修復嗎？還是要 rollback？', isMe: false },
        { sender: '我', avatar: '👤', time: '16:42', content: '改一個字而已，我立刻部署修正版', isMe: true },
        { sender: '阿傑 (前端)', avatar: '👨‍💻', time: '16:50', content: '測試過了，已經正常！', isMe: false },
        { sender: '小美 (QA)', avatar: '👩‍💻', time: '16:52', content: '確認修復！大家辛苦了 🎉', isMe: false },
        { sender: '我', avatar: '👤', time: '16:55', content: '好險趕在下班前搞定... 差點要加班了 😅', isMe: true },
      ]
    },
    {
      id: 5,
      title: '上班按摩記',
      participants: ['Mega', '主管', '小組長'],
      avatar: '💆',
      messages: [
        { sender: '主管', avatar: '👔', time: '14:15', content: '@mega 你先申請安裝 UiPath Studio, 以後開發交給你了', isMe: false },
        { sender: 'Mega', avatar: '👤', time: '14:17', content: '但等一下我要去按摩，可以晚一點申請嗎?', isMe: true },
        { sender: '主管', avatar: '👔', time: '14:18', content: '誰說你上班可以按摩', isMe: false },
        { sender: '小組長', avatar: '👨‍💼', time: '14:19', content: '人資', isMe: false },
        { sender: '主管', avatar: '👔', time: '14:20', content: '我是壞主管~', isMe: false },
        { sender: 'Mega', avatar: '👤', time: '14:21', content: '打咩! 我錯過兩次了~', isMe: true },
        { sender: '主管', avatar: '👔', time: '14:22', content: '沒事去吧 886', isMe: false },
        { sender: 'Mega', avatar: '👤', time: '14:23', content: '88!晚點回來，然後就下班(擊掌', isMe: true },
      ]
    }
  ];

  const techStack = [
    { icon: Code, label: 'Vue3', color: 'bg-emerald-500' },
    { icon: GitBranch, label: 'Git', color: 'bg-orange-500' },
    { icon: Terminal, label: '.NET', color: 'bg-purple-600' },
    { icon: Code, label: 'C#', color: 'bg-violet-600' },
    { icon: Cpu, label: 'SQL', color: 'bg-blue-600' },
    { icon: Rocket, label: 'UiPath', color: 'bg-orange-600' }
  ];

  // Live chat messages state for homepage
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [currentChatIndex, setCurrentChatIndex] = useState(0);
  
  // Auto-play chat messages on homepage
  useEffect(() => {
    if (!showEngineerDaily && !selectedDay && !showUiPathOrchestrator) {
      const chat = engineerChats[currentChatIndex];
      if (visibleMessages < chat.messages.length) {
        const timer = setTimeout(() => {
          setVisibleMessages(prev => prev + 1);
        }, 2000); // Show new message every 2 seconds
        return () => clearTimeout(timer);
      } else {
        // Wait 5 seconds before switching to next chat
        const switchTimer = setTimeout(() => {
          setCurrentChatIndex(prev => (prev + 1) % engineerChats.length);
          setVisibleMessages(0);
        }, 5000);
        return () => clearTimeout(switchTimer);
      }
    }
  }, [visibleMessages, currentChatIndex, showEngineerDaily, selectedDay, showUiPathOrchestrator]);

  // Auto-scroll to bottom when new message appears
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [visibleMessages]);

  return (
    <section className="container mx-auto px-4 py-12">
      {showEngineerDaily ? (
        /* Engineer Daily 543 View - Teams Style UI */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-8">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowEngineerDaily(false);
                setSelectedChat(0);
              }}
              className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 mb-4"
            >
              <span className="text-2xl">←</span>
              <span>返回技術文章</span>
            </motion.button>
          </div>

          {/* Teams Style Chat Interface */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden" style={{ height: '80vh' }}>
            <div className="grid grid-cols-12 h-full">
              {/* Left Sidebar - Chat List */}
              <div className="col-span-12 md:col-span-4 bg-gray-50 border-r border-gray-200 flex flex-col">
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 text-white">
                  <h2 className="text-white mb-2">工程師's 543</h2>
                  <p className="text-white/90 text-sm">真實職場對話紀錄 💬</p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {engineerChats.map((chat) => (
                    <motion.div
                      key={chat.id}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedChat(chat.id)}
                      className={`p-4 rounded-xl cursor-pointer transition-all ${
                        selectedChat === chat.id
                          ? 'bg-pink-100 border-2 border-pink-400'
                          : 'bg-white border border-gray-200 hover:border-pink-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-2xl">{chat.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`truncate ${selectedChat === chat.id ? 'text-pink-700' : 'text-gray-900'}`}>
                            {chat.title}
                          </h3>
                          <p className="text-xs text-gray-500 truncate">
                            {chat.participants.join(', ')}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {chat.messages.length} 則訊息
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Side - Chat Messages */}
              <div className="col-span-12 md:col-span-8 flex flex-col bg-white">
                {/* Chat Header */}
                <div className="border-b border-gray-200 p-6 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{engineerChats[selectedChat].avatar}</div>
                    <div>
                      <h3 className="text-gray-900">{engineerChats[selectedChat].title}</h3>
                      <p className="text-sm text-gray-500">
                        {engineerChats[selectedChat].participants.join(' • ')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {engineerChats[selectedChat].messages.map((message, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`flex gap-3 ${message.isMe ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-xl">
                          {message.avatar}
                        </div>
                      </div>

                      {/* Message Content */}
                      <div className={`flex-1 max-w-md ${message.isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs ${message.isMe ? 'text-gray-500 order-2' : 'text-gray-700'}`}>
                            {message.sender}
                          </span>
                          <span className={`text-xs text-gray-400 ${message.isMe ? 'order-1' : 'order-2'}`}>
                            {message.time}
                          </span>
                        </div>
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            message.isMe
                              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Input Area (Disabled - Read Only) */}
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="bg-gray-200 rounded-full px-4 py-3 text-gray-500 text-sm text-center">
                    📖 這是歷史對話紀錄，僅供閱讀
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : selectedDay !== null ? (
        /* Day Detail View */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-8">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDay(null)}
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-4"
            >
              <span className="text-2xl">←</span>
              <span>返回章節列表</span>
            </motion.button>
            
            {vue30Days[selectedDay - 1]?.content && (
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-400 to-green-500 p-8 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3">
                      <span className="text-3xl">Day {vue30Days[selectedDay - 1].day}</span>
                    </div>
                  </div>
                  <h1 className="text-white mb-2">{vue30Days[selectedDay - 1].title}</h1>
                  <p className="text-white/90">{vue30Days[selectedDay - 1].intro}</p>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12">
                  {vue30Days[selectedDay - 1].content.sections.map((section: any, idx: number) => (
                    <div key={idx} className="mb-8 last:mb-0">
                      {/* Intro Section */}
                      {section.type === 'intro' && (
                        <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-2xl p-6">
                          <h2 className="text-gray-900 mb-3">簡介</h2>
                          <p className="text-gray-700 leading-relaxed">
                            <RichText text={section.text} />
                          </p>
                        </div>
                      )}

                      {/* Highlight Section */}
                      {section.type === 'highlight' && (
                        <div>
                          <h2 className="text-gray-900 mb-6">{section.title}</h2>
                          <div className="grid gap-4">
                            {section.items.map((item: any, i: number) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200"
                              >
                                <div className="flex items-start gap-4">
                                  <div className="text-4xl flex-shrink-0">{item.icon}</div>
                                  <div>
                                    <h3 className="text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-700">
                                      <RichText text={item.text} />
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Demo Section */}
                      {section.type === 'demo' && !section.codeSections && !section.steps && (
                        <div>
                          <h2 className="text-gray-900 mb-4">{section.title}</h2>
                          <p className="text-gray-700 mb-4">
                            <RichText text={section.description} />
                          </p>
                          {section.tasks && section.tasks.length > 0 && (
                            <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 mb-6">
                              {section.tasks.map((task: string, i: number) => (
                                <div key={i} className="flex items-center gap-3 mb-2 last:mb-0">
                                  <span className="text-emerald-500 text-xl">✅</span>
                                  <span className="text-gray-700">{task}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Code Block */}
                          <div className="bg-gray-900 rounded-2xl overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800">
                              <div className="w-3 h-3 rounded-full bg-red-500" />
                              <div className="w-3 h-3 rounded-full bg-yellow-500" />
                              <div className="w-3 h-3 rounded-full bg-green-500" />
                              <span className="ml-2 text-gray-400">{section.filename || 'App.vue'}</span>
                            </div>
                            <pre className="p-6 overflow-x-auto">
                              <code className="text-green-400 font-mono text-sm leading-relaxed whitespace-pre">
                                {section.code}
                              </code>
                            </pre>
                          </div>
                        </div>
                      )}

                      {/* Demo Section with Multiple Code Blocks */}
                      {section.type === 'demo' && section.codeSections && (
                        <div>
                          <h2 className="text-gray-900 mb-4">{section.title}</h2>
                          <p className="text-gray-700 mb-4">
                            <RichText text={section.description} />
                          </p>
                          <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 mb-6">
                            {section.tasks.map((task: string, i: number) => (
                              <div key={i} className="flex items-center gap-3 mb-2 last:mb-0">
                                <span className="text-emerald-500 text-xl">✅</span>
                                <span className="text-gray-700">{task}</span>
                              </div>
                            ))}
                          </div>
                          
                          {/* Multiple Code Blocks */}
                          {section.codeSections.map((codeSection: any, i: number) => (
                            <div key={i} className="mb-8">
                              <h3 className="text-gray-900 mb-2">{codeSection.title}</h3>
                              {codeSection.description && (
                                <p className="text-gray-700 mb-4">{codeSection.description}</p>
                              )}
                              <div className="bg-gray-900 rounded-2xl overflow-hidden">
                                <div className="flex items-center gap-2 px-4 py-3 bg-gray-800">
                                  <div className="w-3 h-3 rounded-full bg-red-500" />
                                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                  <div className="w-3 h-3 rounded-full bg-green-500" />
                                  <span className="ml-2 text-gray-400">{codeSection.filename}</span>
                                </div>
                                <pre className="p-6 overflow-x-auto">
                                  <code className="text-green-400 font-mono text-sm leading-relaxed whitespace-pre">
                                    {codeSection.code}
                                  </code>
                                </pre>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Knowledge Section */}
                      {section.type === 'knowledge' && (
                        <div>
                          <h2 className="text-gray-900 mb-6">{section.title}</h2>
                          <div className="space-y-6">
                            {section.items.map((item: any, i: number) => (
                              <div key={i} className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
                                <h3 className="text-emerald-800 mb-3">{item.title}</h3>
                                {item.text && <p className="text-gray-700 leading-relaxed mb-3">{item.text}</p>}
                                {item.subItems && (
                                  <ul className="space-y-2">
                                    {item.subItems.map((subItem: string, j: number) => (
                                      <li key={j} className="flex items-start gap-3">
                                        <span className="text-emerald-500 mt-1">•</span>
                                        <span className="text-gray-700 flex-1">{subItem}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Communication Section */}
                      {section.type === 'communication' && (
                        <div>
                          <h2 className="text-gray-900 mb-6">{section.title}</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">{section.description}</p>
                          <table className="w-full border-collapse border border-gray-300">
                            <thead>
                              <tr>
                                <th className="bg-gray-100 border border-gray-300 px-4 py-2 text-left">動作</th>
                                <th className="bg-gray-100 border border-gray-300 px-4 py-2 text-left">Vue</th>
                                <th className="bg-gray-100 border border-gray-300 px-4 py-2 text-left">比喻</th>
                              </tr>
                            </thead>
                            <tbody>
                              {section.table.map((row: any, i: number) => (
                                <tr key={i}>
                                  <td className="border border-gray-300 px-4 py-2">{row.action}</td>
                                  <td className="border border-gray-300 px-4 py-2">{row.vue}</td>
                                  <td className="border border-gray-300 px-4 py-2">{row.metaphor}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <p className="text-gray-700 leading-relaxed mt-4">{section.note}</p>
                        </div>
                      )}

                      {/* Trivia Section */}
                      {section.type === 'trivia' && (
                        <div>
                          <h2 className="text-gray-900 mb-6">{section.title}</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">{section.subtitle}</p>
                          <p className="text-gray-700 leading-relaxed mb-4">{section.content}</p>
                          <ul className="space-y-2">
                            {section.items.map((item: string, i: number) => (
                              <li key={i} className="flex items-start gap-3">
                                <span className="text-emerald-500 mt-1">•</span>
                                <span className="text-gray-700 flex-1">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Comparison Section */}
                      {section.type === 'comparison' && (
                        <div>
                          <h2 className="text-gray-900 mb-6">{section.title}</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">{section.description}</p>
                          <div className="grid grid-cols-2 gap-6">
                            {section.items.map((item: any, i: number) => (
                              <div key={i} className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
                                <h3 className="text-emerald-800 mb-3">{item.name}</h3>
                                <ul className="space-y-2">
                                  {item.features.map((feature: string, j: number) => (
                                    <li key={j} className="flex items-start gap-3">
                                      <span className="text-emerald-500 mt-1">•</span>
                                      <span className="text-gray-700 flex-1">{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Concept Section */}
                      {section.type === 'concept' && (
                        <div>
                          <h2 className="text-gray-900 mb-6">{section.title}</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                            <RichText text={section.description} />
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                            {section.examples.map((example: any, i: number) => (
                              <div key={i} className="bg-gray-100 rounded-2xl p-4">
                                <div className="text-gray-900 font-bold mb-2">路徑: {example.path}</div>
                                <p className="text-gray-700">{example.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Steps Section */}
                      {section.type === 'steps' && (
                        <div>
                          <h2 className="text-gray-900 mb-6">{section.title}</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                            <RichText text={section.description} />
                          </p>
                          <ol className="list-decimal pl-6 space-y-4">
                            {section.steps.map((step: any, i: number) => (
                              <li key={i} className="mb-4">
                                <div className="text-gray-900 font-bold mb-2">{step.title}</div>
                                {step.description && (
                                  <p className="text-gray-700 leading-relaxed mb-3">
                                    <RichText text={step.description} />
                                  </p>
                                )}
                                <div className="bg-gray-900 rounded-2xl overflow-hidden">
                                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-800">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="ml-2 text-gray-400">{step.language}</span>
                                  </div>
                                  <pre className="p-6 overflow-x-auto">
                                    <code className="text-green-400 font-mono text-sm leading-relaxed whitespace-pre">
                                      {step.code}
                                    </code>
                                  </pre>
                                </div>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {/* Perspective Section */}
                      {section.type === 'perspective' && (
                        <div>
                          <h2 className="text-gray-900 mb-6">{section.title}</h2>
                          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
                            <p className="text-gray-700 leading-relaxed mb-4">
                              <RichText text={section.content} />
                            </p>
                            {section.highlight && (
                              <div className="bg-white/50 rounded-xl p-4 mb-4 border-l-4 border-emerald-500">
                                <p className="text-emerald-800">
                                  👉 <RichText text={section.highlight} />
                                </p>
                              </div>
                            )}
                            {section.conclusion && (
                              <p className="text-gray-700 leading-relaxed mb-4">
                                <RichText text={section.conclusion} />
                              </p>
                            )}
                            {section.concepts && (
                              <div className="mt-4">
                                <h4 className="text-emerald-800 mb-3">核心概念：</h4>
                                <div className="grid gap-3">
                                  {section.concepts.map((concept: any, i: number) => (
                                    <div key={i} className="bg-white rounded-xl p-3 flex items-center gap-3">
                                      <span className="bg-emerald-500 text-white px-3 py-1 rounded-lg font-mono">
                                        {concept.term}
                                      </span>
                                      <span className="text-gray-700">{concept.description}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {section.advantages && (
                              <div className="mt-4">
                                <h4 className="text-emerald-800 mb-3">優點：</h4>
                                <ul className="space-y-2">
                                  {section.advantages.map((advantage: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3">
                                      <span className="text-emerald-500 mt-1">✓</span>
                                      <span className="text-gray-700 flex-1">{advantage}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {section.listItems && (
                              <div className="mt-4 space-y-4">
                                {section.listItems.map((listItem: any, i: number) => (
                                  <div key={i}>
                                    <h4 className="text-emerald-800 mb-2">{listItem.title}：</h4>
                                    <ul className="space-y-2">
                                      {listItem.items.map((item: string, j: number) => (
                                        <li key={j} className="flex items-start gap-3 ml-4">
                                          <span className="text-emerald-500 mt-1">•</span>
                                          <span className="text-gray-700 flex-1">{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            )}
                            {section.image && (
                              <div className="mt-6 flex justify-center">
                                <img 
                                  src={piniaImage} 
                                  alt="Pinia 公共冰箱示意圖" 
                                  className="max-w-md w-full rounded-2xl shadow-lg"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Mom Section */}
                      {section.type === 'mom' && (
                        <div className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 rounded-2xl p-6">
                          <h2 className="text-gray-900 mb-4">{section.title}</h2>
                          <p className="text-gray-700 leading-relaxed">{section.content}</p>
                        </div>
                      )}

                      {/* Engineer Section */}
                      {section.type === 'engineer' && (
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
                          <h2 className="text-gray-900 mb-4">{section.title}</h2>
                          {section.content && (
                            <p className="text-gray-700 mb-4">{section.content}</p>
                          )}
                          {section.code && (
                            <div className="bg-gray-900 rounded-2xl overflow-hidden mb-4">
                              <div className="flex items-center gap-2 px-4 py-3 bg-gray-800">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <span className="ml-2 text-gray-400">Code Example</span>
                              </div>
                              <pre className="p-6 overflow-x-auto">
                                <code className="text-green-400 font-mono text-sm leading-relaxed whitespace-pre">
                                  {section.code}
                                </code>
                              </pre>
                            </div>
                          )}
                          {section.points && section.points.length > 0 && (
                            <ul className="space-y-2">
                              {section.points.map((point: string, i: number) => (
                                <li key={i} className="flex items-start gap-3">
                                  <span className="text-blue-500 mt-1">•</span>
                                  <span className="text-gray-700 flex-1">{point}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}

                      {/* Demo Section with Steps */}
                      {section.type === 'demo' && section.steps && (
                        <div>
                          <h2 className="text-gray-900 mb-4">{section.title}</h2>
                          {section.description && (
                            <p className="text-gray-700 mb-4">{section.description}</p>
                          )}
                          {section.tasks && section.tasks.length > 0 && (
                            <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 mb-6">
                              {section.tasks.map((task: string, i: number) => (
                                <div key={i} className="flex items-center gap-3 mb-2 last:mb-0">
                                  <span className="text-emerald-500 text-xl">✅</span>
                                  <span className="text-gray-700">{task}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Multiple Code Blocks in Steps */}
                          {section.steps.map((step: any, i: number) => (
                            <div key={i} className="mb-8 last:mb-0">
                              <h3 className="text-gray-900 mb-3">{step.title}</h3>
                              <div className="bg-gray-900 rounded-2xl overflow-hidden">
                                <div className="flex items-center gap-2 px-4 py-3 bg-gray-800">
                                  <div className="w-3 h-3 rounded-full bg-red-500" />
                                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                  <div className="w-3 h-3 rounded-full bg-green-500" />
                                  <span className="ml-2 text-gray-400">{step.title}</span>
                                </div>
                                <pre className="p-6 overflow-x-auto">
                                  <code className="text-green-400 font-mono text-sm leading-relaxed whitespace-pre">
                                    {step.code}
                                  </code>
                                </pre>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 寶媽角度 Section */}
                      {section.type === '寶媽角度' && (
                        <div className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 rounded-2xl p-6">
                          <h2 className="text-gray-900 mb-4 flex items-center gap-2">
                            <span className="text-3xl">👩‍🍼</span>
                            寶媽角度
                          </h2>
                          <div className="text-gray-700 leading-relaxed whitespace-pre-line">{section.text}</div>
                        </div>
                      )}

                      {/* 工程師角度 Section */}
                      {section.type === '工程師角度' && (
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
                          <h2 className="text-gray-900 mb-4 flex items-center gap-2">
                            <span className="text-3xl">💻</span>
                            工程師角度
                          </h2>
                          <div className="text-gray-700 leading-relaxed whitespace-pre-line">{section.text}</div>
                        </div>
                      )}

                      {/* 今天的實作 Section */}
                      {section.type === '今天的實作' && (
                        <div>
                          <h2 className="text-gray-900 mb-4 flex items-center gap-2">
                            <span className="text-3xl">📦</span>
                            今天的實作
                          </h2>
                          {section.description && (
                            <p className="text-gray-700 mb-6">{section.description}</p>
                          )}
                          
                          {section.steps && section.steps.map((step: any, i: number) => (
                            <div key={i} className="mb-6 last:mb-0">
                              <h3 className="text-gray-900 mb-3">{step.title}</h3>
                              <div className="bg-gray-900 rounded-2xl overflow-hidden">
                                <div className="flex items-center gap-2 px-4 py-3 bg-gray-800">
                                  <div className="w-3 h-3 rounded-full bg-red-500" />
                                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                  <div className="w-3 h-3 rounded-full bg-green-500" />
                                  <span className="ml-2 text-gray-400">{step.title}</span>
                                </div>
                                <pre className="p-6 overflow-x-auto">
                                  <code className="text-green-400 font-mono text-sm leading-relaxed whitespace-pre">
                                    {step.code}
                                  </code>
                                </pre>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Summary Section */}
                      {section.type === 'summary' && (
                        <div>
                          <h2 className="text-gray-900 mb-6">{section.title}</h2>
                          <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-6">
                            <div className="space-y-4">
                              {section.points.map((point: any, i: number) => (
                                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                  {point.icon && (
                                    <div className="flex items-start gap-3">
                                      <span className="text-2xl">{point.icon}</span>
                                      <div className="flex-1">
                                        {point.title && <h4 className="text-white mb-2">{point.title}</h4>}
                                        <p className="text-white/90">
                                          <RichText text={point.text || point.description} />
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                  {!point.icon && (
                                    <>
                                      {point.title && <h4 className="text-white mb-2">{point.title}</h4>}
                                      <p className="text-white/90">
                                        <RichText text={point.description} />
                                      </p>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ) : selectedTech === 'Vue3' ? (
        /* Vue3 Single Card View */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-8">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTech(null)}
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-4"
            >
              <span className="text-2xl">←</span>
              <span>返回技術文章</span>
            </motion.button>
            
            {/* Vue3 30 Days Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => {
                setSelectedTech(null);
                setShowVue30Days(true);
              }}
              className="relative overflow-hidden rounded-3xl cursor-pointer"
            >
              <div className={`bg-gradient-to-r ${articles[0].color} p-8 md:p-12 flex items-center`}>
                <div className="grid md:grid-cols-2 gap-8 items-center w-full">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center gap-2 text-white/90 mb-4">
                      <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full">
                        {articles[0].category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {articles[0].date}
                      </span>
                    </div>

                    <h2 className="text-white mb-4">{articles[0].title}</h2>
                    <p className="text-white/90 mb-6">
                      {articles[0].excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {articles[0].tags.map((tag, i) => (
                        <span key={i} className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-emerald-600 px-6 py-3 rounded-full hover:shadow-xl transition-shadow"
                      >
                        閱讀章節 →
                      </motion.button>
                      <div className="flex items-center gap-2 text-white/80">
                        <Eye className="w-5 h-5" />
                        <span>{articles[0].views.toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="relative"
                  >
                    <div className="text-9xl text-center">
                      {articles[0].icon}
                    </div>
                    <motion.div
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -top-8 -right-8 text-6xl opacity-50"
                    >
                      💡
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, 20, 0] }}
                      transition={{ duration: 3, delay: 1, repeat: Infinity }}
                      className="absolute -bottom-8 -left-8 text-6xl opacity-50"
                    >
                      🚀
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : selectedTech === 'UiPath' ? (
        /* UiPath Article List View */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-8">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTech(null)}
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-4"
            >
              <span className="text-2xl">←</span>
              <span>返回技術文章</span>
            </motion.button>
            
            {/* UiPath Orchestrator Article Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => {
                setSelectedTech(null);
                setShowUiPathOrchestrator(true);
              }}
              className="relative overflow-hidden rounded-3xl cursor-pointer"
            >
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 md:p-12 flex items-center">
                <div className="grid md:grid-cols-2 gap-8 items-center w-full">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center gap-2 text-white/90 mb-4">
                      <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full">
                        RPA 技術
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        2025-12-03
                      </span>
                    </div>

                    <h2 className="text-white mb-4">UiPath Orchestrator 完整指南</h2>
                    <p className="text-white/90 mb-6">
                      深入理解 UiPath 機器人的中央控制平台，掌握 RPA 部署、排程、監控的核心概念與實務應用。
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {['Orchestrator', 'RPA', '自動化', '企業級'].map((tag, i) => (
                        <span key={i} className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-orange-600 px-6 py-3 rounded-full hover:shadow-xl transition-shadow"
                      >
                        閱讀文章 →
                      </motion.button>
                      <div className="flex items-center gap-2 text-white/80">
                        <Eye className="w-5 h-5" />
                        <span>2,450</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="relative"
                  >
                    <div className="text-9xl text-center">
                      🚀
                    </div>
                    <motion.div
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -top-8 -right-8 text-6xl opacity-50"
                    >
                      🤖
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, 20, 0] }}
                      transition={{ duration: 3, delay: 1, repeat: Infinity }}
                      className="absolute -bottom-8 -left-8 text-6xl opacity-50"
                    >
                      ⚙️
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : showUiPathOrchestrator ? (
        /* UiPath Orchestrator Detail View */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-8">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUiPathOrchestrator(false)}
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-4"
            >
              <span className="text-2xl">←</span>
              <span>返回技術文章</span>
            </motion.button>
            
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3">
                    <span className="text-3xl">🚀</span>
                  </div>
                </div>
                <h1 className="text-white mb-2">UiPath Orchestrator 完整指南</h1>
                <p className="text-white/90">RPA 機器人的中央控制平台</p>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 space-y-8">
                {/* 什麼是 Orchestrator */}
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h3 className="text-blue-900 mb-4">🟦 什麼是 UiPath Orchestrator？（一句話版本）</h3>
                  <p className="text-gray-700 mb-4">
                    Orchestrator 是 UiPath 機器人的「中央控制平台」。
                    它負責部署流程、排程、監控、管理資源，讓 RPA 在企業中可以穩定運作。
                  </p>
                  <p className="text-gray-700 mb-2">它就像：</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>GitLab / Jenkins 是程式的部署中心</li>
                    <li>Argo CD 是服務的部署中心</li>
                    <li><strong>Orchestrator 就是 RPA 的部署與控制中心</strong></li>
                  </ul>
                </div>

                {/* Orchestrator 的定位 */}
                <div className="bg-green-50 rounded-2xl p-6">
                  <h3 className="text-green-900 mb-4">🟩 Orchestrator 的定位（最重要概念）</h3>
                  <p className="text-gray-700 mb-4">
                    Orchestrator 不負責「撰寫 RPA 流程」，那是在 Studio 做的。
                    它的角色是：
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>✔ 1. 管理流程的版本</li>
                    <li>✔ 2. 把流程部署到機器人</li>
                    <li>✔ 3. 設定排程（讓流程自動執行）</li>
                    <li>✔ 4. 控制機器資源（哪台電腦跑）</li>
                    <li>✔ 5. 管理敏感資料（API Key、帳密）</li>
                    <li>✔ 6. 管理大量資料處理（Queues）</li>
                    <li>✔ 7. 收集機器人執行紀錄（Logs）</li>
                    <li>✔ 8. 提供 API 讓外部系統觸發流程（CI/CD、後端系統都能叫 Runnable）</li>
                  </ul>
                </div>

                {/* 五大核心區塊 */}
                <div className="bg-red-50 rounded-2xl p-6">
                  <h3 className="text-red-900 mb-4">🟥 Orchestrator 的五大核心區塊（最重要的教學）</h3>
                  <p className="text-gray-700 mb-6">
                    下面這五個你學會 → 你就真的懂 Orchestrator 的 90% 功能。
                  </p>

                  <div className="space-y-6">
                    {/* ① Machines */}
                    <div className="border-l-4 border-orange-500 pl-6">
                      <h4 className="text-gray-900 mb-3">① Machines（機器）——哪台電腦可以跑 RPA？</h4>
                      <p className="text-gray-700 mb-3">
                        機器人不是在雲端跑，而是在某台：
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mb-3">
                        <li>你的電腦</li>
                        <li>公司 VM</li>
                        <li>伺服器</li>
                        <li>VDI</li>
                      </ul>
                      <p className="text-gray-700 mb-2">Orchestrator 需先知道「哪台電腦要跑流程」。</p>
                      <p className="text-gray-700 mb-2">Machines 就是用來：</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                        <li>註冊一台���腦</li>
                        <li>指定它是 Attended 或 Unattended robot</li>
                        <li>綁定 License</li>
                        <li>控制它能不能執行流程</li>
                      </ul>
                    </div>

                    {/* ② Processes */}
                    <div className="border-l-4 border-blue-500 pl-6">
                      <h4 className="text-gray-900 mb-3">② Processes（流程）——從 Studio 上傳的流程放在哪？</h4>
                      <p className="text-gray-700 mb-3">
                        流程是在 Studio 做好的。但它不會自動跑，必須：
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mb-3">
                        <li>Publish（從 Studio 上傳到 Orchestrator）</li>
                        <li>建立 Process（定義這隻流程怎麼跑）</li>
                      </ul>
                      <p className="text-gray-700 mb-2">Process 決定：</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mb-3">
                        <li>用哪個 Robot 來跑？</li>
                        <li>用哪個版本？</li>
                        <li>用哪些參數？</li>
                      </ul>
                      <p className="text-gray-700">這就像：</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                        <li>後端程式上傳到 GitLab</li>
                        <li>再透過 Argo 部署成可以執行的版本</li>
                      </ul>
                    </div>

                    {/* ③ Jobs */}
                    <div className="border-l-4 border-green-500 pl-6">
                      <h4 className="text-gray-900 mb-3">③ Jobs（執行紀錄）——每次執行的結果</h4>
                      <p className="text-gray-700 mb-2">Jobs 是用來：</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mb-3">
                        <li>手動啟動流程</li>
                        <li>查看流程是否執行成功</li>
                        <li>查看失敗原因</li>
                        <li>重新執行流程</li>
                      </ul>
                      <p className="text-gray-700 mb-2">這裡會看到：</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mb-3">
                        <li>成功 / 失敗 / In Progress</li>
                        <li>Log（這對 Debug 最關鍵）</li>
                        <li>執行時間</li>
                        <li>用哪個 Robot 跑的</li>
                      </ul>
                      <p className="text-gray-700">Jobs 就像 Cloud Run 或 Jenkins 的執行紀錄。</p>
                    </div>

                    {/* ④ Assets */}
                    <div className="border-l-4 border-purple-500 pl-6">
                      <h4 className="text-gray-900 mb-3">④ Assets（資產）——帳密、API、路徑都放這裡</h4>
                      <p className="text-gray-700 mb-3">
                        Assets 讓你把敏感資訊集中管理，而不是寫死在流程裡：
                      </p>
                      <p className="text-gray-700 mb-2">常用的：</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mb-3">
                        <li>帳號密碼（Credential Asset）</li>
                        <li>Token（Text Asset）</li>
                        <li>API URL（Text Asset）</li>
                        <li>DB Connection String</li>
                        <li>檔案路徑設定（用來控制 DEV / UAT / PROD 各不同）</li>
                      </ul>
                      <p className="text-gray-700 mb-3">Studio 裡面可以用「Get Asset」取得資料。</p>
                      <p className="text-gray-700 mb-2">這就像：</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                        <li>.NET 的 secrets.json</li>
                        <li>AWS Systems Manager Parameter Store</li>
                        <li>Azure Key Vault</li>
                      </ul>
                    </div>

                    {/* ⑤ Queues */}
                    <div className="border-l-4 border-pink-500 pl-6">
                      <h4 className="text-gray-900 mb-3">⑤ Queues（佇列）——大量資料處理的核心</h4>
                      <p className="text-gray-700 mb-3">
                        如果你要處理大量資料（例如 500張發票、50筆固定資產），
                        機器人不能一次吃完，會爆掉。
                      </p>
                      <p className="text-gray-700 mb-2">Queues 可以把資料拆成一筆一筆，讓機器人逐筆處理，優點：</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                        <li>流程不會被大資料量拖死</li>
                        <li>某筆失敗可以 Retry</li>
                        <li>可同時使用多台機器跑（平行處理）</li>
                        <li>企業級流程標準做法（銀行、會計、財務最常用）</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 其他重要功能 */}
                <div className="bg-purple-50 rounded-2xl p-6">
                  <h3 className="text-purple-900 mb-4">🟪 Orchestrator 其他重要功能（一次看懂）</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-purple-200">
                          <th className="text-left py-3 px-4 text-gray-900">功能</th>
                          <th className="text-left py-3 px-4 text-gray-900">在做什麼</th>
                          <th className="text-left py-3 px-4 text-gray-900">為何重要？</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-700">
                        <tr className="border-b border-purple-100">
                          <td className="py-3 px-4">Users & Roles</td>
                          <td className="py-3 px-4">設定哪些人能看哪些資料</td>
                          <td className="py-3 px-4">權限控管</td>
                        </tr>
                        <tr className="border-b border-purple-100">
                          <td className="py-3 px-4">Triggers</td>
                          <td className="py-3 px-4">時間排程、自動觸發流程</td>
                          <td className="py-3 px-4">自動化核心</td>
                        </tr>
                        <tr className="border-b border-purple-100">
                          <td className="py-3 px-4">Logs</td>
                          <td className="py-3 px-4">收集 robot log</td>
                          <td className="py-3 px-4">Debug 用</td>
                        </tr>
                        <tr className="border-b border-purple-100">
                          <td className="py-3 px-4">Monitoring</td>
                          <td className="py-3 px-4">CPU / Robot 狀態</td>
                          <td className="py-3 px-4">監控</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">Packages</td>
                          <td className="py-3 px-4">所有流程版本</td>
                          <td className="py-3 px-4">版本控管</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 工作流程 */}
                <div className="bg-orange-50 rounded-2xl p-6">
                  <h3 className="text-orange-900 mb-4">🟧 整個 RPA 工作流程是這樣運作的</h3>
                  <p className="text-gray-700 mb-4">我用最白話講給你聽：</p>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-start gap-3">
                      <span className="bg-orange-200 text-orange-900 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                      <p>你在 Studio 做好流程</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-orange-200 text-orange-900 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                      <p>Publish 上去 Orchestrator</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-orange-200 text-orange-900 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                      <p>在 Orchestrator 建 Process</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-orange-200 text-orange-900 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">4</span>
                      <p>配好哪台 Machine / Robot 來跑</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-orange-200 text-orange-900 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">5</span>
                      <p>設定 Assets、Queues</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-orange-200 text-orange-900 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">6</span>
                      <p>設定排程（Triggers）</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-orange-200 text-orange-900 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">7</span>
                      <p>Robot 在背景自動執行</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-orange-200 text-orange-900 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">8</span>
                      <p>最後你在 Jobs 和 Logs 看結果</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-4">
                    就是這麼清楚！Orchestrator 控制「怎麼跑、在哪跑、跑什麼」。
                  </p>
                </div>

                {/* 核心價值 */}
                <div className="bg-yellow-50 rounded-2xl p-6">
                  <h3 className="text-yellow-900 mb-4">🟨 Orchestrator 的用途（最核心三價值）</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-gray-900 mb-2">1️⃣ 讓機器人能自動跑流程</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                        <li>不需要人工按按鈕</li>
                        <li>不需要開 Studio</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-gray-900 mb-2">2️⃣ 確保流程統一、可控、可監控</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                        <li>版本、紀錄、排程都集中管理</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-gray-900 mb-2">3️⃣ 讓企業級 RPA 可擴展</h4>
                      <p className="text-gray-700 mb-2 ml-4">你可以：</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-8">
                        <li>多機器</li>
                        <li>多流程</li>
                        <li>多部門</li>
                        <li>多 Queue</li>
                        <li>多系統 API</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 總結 */}
                <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl p-8 text-center">
                  <h3 className="text-gray-900 mb-4">🎉 最後：一句話讓你完全記住 Orchestrator</h3>
                  <div className="space-y-3 text-gray-700 text-xl">
                    <p><strong>Studio</strong> = 做流程</p>
                    <p><strong>Orchestrator</strong> = 管流程（跑、排程、控管）</p>
                    <p><strong>Robot</strong> = 執行流程</p>
                  </div>
                  <p className="text-gray-700 mt-6">
                    只要這句記得，你對 UiPath 的理解就已經是「工程師等級」。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : selectedTech ? (
        /* Coming Soon View for other tech stacks */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-8">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTech(null)}
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-4"
            >
              <span className="text-2xl">←</span>
              <span>返回技術文章</span>
            </motion.button>
            
            <div className="bg-white rounded-3xl p-16 text-center shadow-xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="text-9xl mb-8"
              >
                🚧
              </motion.div>
              <h2 className="text-gray-900 mb-4">{selectedTech} 相關文章</h2>
              <p className="text-gray-600 mb-8 text-xl">尚無文章，敬請期待</p>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-gray-400"
              >
                文章撰寫中...
              </motion.div>
            </div>
          </div>
        </motion.div>
      ) : showVue30Days ? (
        /* Vue 30 Days Detail View */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-8">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowVue30Days(false)}
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-4"
            >
              <span className="text-2xl">←</span>
              <span>返回技術文章</span>
            </motion.button>
            
            <div className="bg-gradient-to-r from-emerald-400 to-green-500 rounded-3xl p-8 text-white mb-8">
              <div className="text-6xl mb-4 text-center">💚</div>
              <h1 className="text-white text-center mb-4">Vue3 30日學習日記</h1>
              <p className="text-white/90 text-center max-w-2xl mx-auto">
                從零開始學習 Vue3，每天一個主題，用生活化的比喻理解複雜概念。30 天後，你也能建立完整的 Vue3 專案！
              </p>
            </div>
          </div>

          {/* 30 Days Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vue30Days.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
                onClick={() => setSelectedDay(day.day)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-gradient-to-br from-emerald-400 to-green-500 text-white rounded-2xl w-16 h-16 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">Day</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-4xl mb-1 bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                      {day.day}
                    </div>
                    {day.date && (
                      <div className="text-sm text-gray-500">
                        📅 {day.date}
                      </div>
                    )}
                  </div>
                </div>
                
                <h3 className="text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {day.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {day.intro}
                </p>
                
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-emerald-600">第 {day.day} 天</span>
                  <motion.span
                    className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ x: 5 }}
                  >
                    閱讀 →
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        /* Original View */
        <>
          {/* Engineer Daily 543 and Tech Stack Row */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Engineer Daily 543 Live Chat - Left Side (2/3) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-2 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-3xl overflow-hidden shadow-xl border-2 border-pink-200"
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{engineerChats[currentChatIndex].avatar}</div>
                    <div>
                      <h3 className="text-white mb-0.5">工程師's 543</h3>
                      <p className="text-white/80 text-xs">{engineerChats[currentChatIndex].title}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowEngineerDaily(true)}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs transition-colors"
                  >
                    查看更多對話 →
                  </motion.button>
                </div>
              </div>

              {/* Live Messages */}
              <div 
                ref={chatContainerRef}
                className="p-4 space-y-2 bg-white overflow-y-auto" 
                style={{ height: '280px' }}
              >
                {engineerChats[currentChatIndex].messages.slice(0, visibleMessages).map((message, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-2 ${message.isMe ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-sm shadow-lg">
                        {message.avatar}
                      </div>
                    </div>

                    {/* Message Content */}
                    <div className={`flex-1 max-w-md ${message.isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-xs ${message.isMe ? 'text-gray-500 order-2' : 'text-gray-700'}`}>
                          {message.sender}
                        </span>
                        <span className={`text-xs text-gray-400 ${message.isMe ? 'order-1' : 'order-2'}`}>
                          {message.time}
                        </span>
                      </div>
                      <div
                        className={`rounded-2xl px-3 py-2 shadow-md ${
                          message.isMe
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-xs leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {visibleMessages < engineerChats[currentChatIndex].messages.length && (
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-sm">
                      💭
                    </div>
                    <div className="bg-gray-100 rounded-2xl px-3 py-2 flex items-center gap-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Progress Indicator */}
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>對話 {currentChatIndex + 1} / {engineerChats.length}</span>
                  <div className="flex gap-1">
                    {engineerChats.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentChatIndex ? 'bg-pink-500 w-6' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tech Stack - Right Side (1/3) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white overflow-hidden relative h-full flex flex-col">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-10 -right-10 text-9xl opacity-10"
                >
                  ⚙️
                </motion.div>

                <h3 className="mb-6 relative z-10">技術棧</h3>
                <div className="relative z-10 flex-1 flex flex-col justify-center gap-4">
                  {/* First Row - 3 items */}
                  <div className="grid grid-cols-3 gap-4">
                    {techStack.slice(0, 3).map((tech, index) => {
                      const Icon = tech.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                          whileHover={{ scale: 1.1, y: -10 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            if (tech.label === 'Vue3') {
                              setShowVue30Days(true);
                            } else {
                              setSelectedTech(tech.label);
                            }
                          }}
                          className="text-center group cursor-pointer"
                        >
                          <div className={`${tech.color} w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-2 group-hover:shadow-2xl transition-shadow`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="text-white/80 group-hover:text-white transition-colors text-sm">
                            {tech.label}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  {/* Second Row - 3 items */}
                  <div className="grid grid-cols-3 gap-4">
                    {techStack.slice(3, 6).map((tech, index) => {
                      const Icon = tech.icon;
                      return (
                        <motion.div
                          key={index + 3}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3 + (index + 3) * 0.1, type: "spring" }}
                          whileHover={{ scale: 1.1, y: -10 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            if (tech.label === 'UiPath') {
                              setShowUiPathOrchestrator(true);
                            } else {
                              setSelectedTech(tech.label);
                            }
                          }}
                          className="text-center group cursor-pointer"
                        >
                          <div className={`${tech.color} w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-2 group-hover:shadow-2xl transition-shadow`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="text-white/80 group-hover:text-white transition-colors text-sm">
                            {tech.label}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Vue3 30 Days and UiPath Orchestrator Row */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* UiPath Orchestrator - Left Side (1/3) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -10 }}
              onClick={() => {
                setSelectedTech(null);
                setShowUiPathOrchestrator(true);
              }}
              className="lg:col-span-1 group cursor-pointer"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 relative overflow-hidden">
                  <motion.div
                    className="text-6xl text-center"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring" }}
                  >
                    🤖
                  </motion.div>
                  <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-4 right-4 text-white/30 text-4xl"
                  >
                    ✦
                  </motion.div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-orange-500">UiPath</span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <Eye className="w-4 h-4" />
                      2,450
                    </span>
                  </div>

                  <h3 className="text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">
                    UiPath Orchestrator 完整指南
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    深入學習 UiPath Orchestrator 中央控制平台，掌握機器人管理、排程部署、監控追蹤等企業級 RPA 自動化核心技術！
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {['UiPath', 'RPA', 'Automation', 'Orchestrator'].map((tag, i) => (
                      <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      2025-12-03
                    </span>
                    <motion.span
                      className="text-orange-500 group-hover:gap-2 flex items-center gap-1 transition-all"
                      whileHover={{ x: 5 }}
                    >
                      閱讀 →
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Vue3 30 Days - Right Side (2/3) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="lg:col-span-2 relative overflow-hidden rounded-3xl"
            >
              <div className={`bg-gradient-to-r ${articles[0].color} p-8 md:p-12 h-full flex items-center`}>
                <div className="grid md:grid-cols-2 gap-8 items-center w-full">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="flex items-center gap-2 text-white/90 mb-4">
                      <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full">
                        {articles[0].category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {articles[0].date}
                      </span>
                    </div>

                    <h2 className="text-white mb-4">{articles[0].title}</h2>
                    <p className="text-white/90 mb-6">
                      {articles[0].excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {articles[0].tags.map((tag, i) => (
                        <span key={i} className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowVue30Days(true)}
                        className="bg-white text-gray-900 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow inline-flex items-center gap-2"
                      >
                        <Code className="w-5 h-5" />
                        閱讀章節
                      </motion.button>
                      <span className="flex items-center gap-1 text-white">
                        <Eye className="w-4 h-4" />
                        {articles[0].views} 次觀看
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2, type: "spring" }}
                    className="relative"
                  >
                    <div className="text-9xl text-center">
                      {articles[0].icon}
                    </div>
                    <motion.div
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -top-8 -right-8 text-6xl opacity-50"
                    >
                      💡
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, 20, 0] }}
                      transition={{ duration: 3, delay: 1, repeat: Infinity }}
                      className="absolute -bottom-8 -left-8 text-6xl opacity-50"
                    >
                      🚀
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(2).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => {
                  if (article.category === 'UiPath') {
                    setShowUiPathOrchestrator(true);
                  }
                }}
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full">
                  <div className={`bg-gradient-to-br ${article.color} p-8 relative overflow-hidden`}>
                    <motion.div
                      className="text-6xl text-center"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring" }}
                    >
                      {article.icon}
                    </motion.div>
                    <motion.div
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-4 right-4 text-white/30 text-4xl"
                    >
                      ✦
                    </motion.div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-orange-500">{article.category}</span>
                      <span className="flex items-center gap-1 text-gray-500">
                        <Eye className="w-4 h-4" />
                        {article.views}
                      </span>
                    </div>

                    <h3 className="text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag, i) => (
                        <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {article.date}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-orange-500 hover:text-orange-600"
                      >
                        閰讀 →
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
      <ScrollToTop />
    </section>
  );
}