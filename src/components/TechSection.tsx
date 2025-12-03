import { motion } from 'motion/react';
import { Code, Terminal, Cpu, Rocket, GitBranch, Zap, Eye, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { Typewriter } from './Typewriter';
import piniaImage from 'figma:asset/bb39f016a3dd8893163ade79d95a27bddfd0cbdf.png';

export function TechSection() {
  const [showVue30Days, setShowVue30Days] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

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
              { path: '/', description: '首頁' },
              { path: '/about', description: '關於我們' },
              { path: '/game', description: '遊戲區' }
            ]
          },
          {
            type: 'steps',
            title: '📦 今天的實作是什麼?',
            description: '點擊「首頁」出現首頁內容，點擊「關於」出現介紹內容。就像家裡不用蓋兩間房子，同一個大門進去，走不同走廊就能到不同房間。',
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
    { day: 8, date: '2025-11-08', title: 'provide/inject —— 跨層的紅包傳遞', intro: '爺爺直接把紅包給孫子，不用父母轉交。' },
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
    { day: 11, date: '2025-11-11', title: 'Transition —— 元件的華麗走秀', intro: 'Transition 幫元素加進出場動畫。' },
    { day: 12, date: '2025-11-12', title: 'Composition API 重構 —— 收納箱整理', intro: 'Composition API 幫程式收納整理，方便重用。' },
    { day: 13, date: '2025-11-13', title: '自訂 Hook —— 媽媽的獨門秘方', intro: '把重複邏輯抽成 Hook，隨時重用。' },
    { day: 14, date: '2025-11-14', title: 'Ref vs Reactive —— 存錢筒與全家帳本', intro: 'ref 管單一值，reactive 管整個物件。' },
    { day: 15, date: '2025-11-15', title: '事件修飾符 — 規則小貼紙', intro: '修飾符幫事件加規則，避免亂跑。' },
    { day: 16, date: '2025-11-16', title: 'v-if / v-show —— 燈泡 vs 窗簾', intro: 'v-if 是有或沒有，v-show 是隱藏。' },
    { day: 17, date: '2025-11-17', title: 'v-for —— 批量烤餅乾', intro: 'v-for 批次渲染，就像一次烤一盤餅乾。' },
    { day: 18, date: '2025-11-18', title: '表單修飾符 —— 自動修正小幫手', intro: '修飾符幫表單資料更乾淨。' },
    { day: 19, date: '2025-11-19', title: 'Pinia 資料持久化 —— 冰箱的備用電池', intro: 'Pinia 配合 localStorage，重新整理頁面資料仍然存在。' },
    { day: 20, date: '2025-11-20', title: 'Router 巢狀路由 —— 房子裡的房間', intro: '巢狀路由讓頁面能有子頁面，例如 /user/1/profile。' },
    { day: 21, date: '2025-11-21', title: 'Router 守衛 —— 門口的保全', intro: 'beforeEach 檢查登入或權限，決定能否進頁面。' },
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
      title: 'TypeScript 高級類型系統實戰',
      excerpt: '掌握 TypeScript 的高級類型特性，包括泛型、條件類型、映射類型等進階技巧...',
      category: 'TypeScript',
      date: '2024-11-25',
      views: 987,
      tags: ['TypeScript', 'Programming'],
      icon: '📘',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 3,
      title: 'Next.js 14 App Router 最佳實踐',
      excerpt: 'App Router 的完整指南，從基礎到進階，包含 Server Actions、Streaming 等實戰經驗...',
      category: 'Next.js',
      date: '2024-11-22',
      views: 1567,
      tags: ['Next.js', 'React', 'SSR'],
      icon: '▲',
      color: 'from-gray-700 to-gray-900'
    },
    {
      id: 4,
      title: 'Tailwind CSS 性能優化指南',
      excerpt: '學習如何優化 Tailwind CSS 的構建大小，提升載入速度，並實現最佳的開發體驗...',
      category: 'CSS',
      date: '2024-11-20',
      views: 823,
      tags: ['CSS', 'Tailwind', 'Performance'],
      icon: '🎨',
      color: 'from-sky-400 to-cyan-500'
    },
    {
      id: 5,
      title: 'Web 動畫完全指南',
      excerpt: '從 CSS 動畫到 Motion，全面掌握現代 Web 動畫技術，打造流暢的用戶體驗...',
      category: 'Animation',
      date: '2024-11-18',
      views: 1102,
      tags: ['Animation', 'Motion', 'UX'],
      icon: '✨',
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 6,
      title: '前端性能監控與優化',
      excerpt: '建立完整的前端性能監控系統，識別瓶頸並實施有效的優化策略...',
      category: 'Performance',
      date: '2024-11-15',
      views: 756,
      tags: ['Performance', 'Monitoring'],
      icon: '⚡',
      color: 'from-yellow-400 to-orange-500'
    }
  ];

  const techStack = [
    { icon: Code, label: 'Vue3', color: 'bg-emerald-500' },
    { icon: GitBranch, label: 'Git', color: 'bg-orange-500' },
    { icon: Terminal, label: '.NET', color: 'bg-purple-600' },
    { icon: Code, label: 'C#', color: 'bg-violet-600' },
    { icon: Cpu, label: 'SQL', color: 'bg-blue-600' }
  ];

  const codeText = `const 歡迎 = () => {
  return (
    <div>
      <h1>持續學習，不斷進步 🚀</h1>
      <p>分享知識，共同成長 💡</p>
    </div>
  );
};`;

  return (
    <section className="container mx-auto px-4 py-12">
      {selectedDay !== null ? (
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
                          <p className="text-gray-700 leading-relaxed">{section.text}</p>
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
                                    <p className="text-gray-700">{item.text}</p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Demo Section */}
                      {section.type === 'demo' && !section.codeSections && (
                        <div>
                          <h2 className="text-gray-900 mb-4">{section.title}</h2>
                          <p className="text-gray-700 mb-4">{section.description}</p>
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
                          <p className="text-gray-700 mb-4">{section.description}</p>
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
                          <p className="text-gray-700 leading-relaxed mb-4">{section.description}</p>
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
                          <p className="text-gray-700 leading-relaxed mb-4">{section.description}</p>
                          <ol className="list-decimal pl-6">
                            {section.steps.map((step: any, i: number) => (
                              <li key={i} className="mb-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-emerald-500 font-bold">{step.number}.</span>
                                  <span className="text-gray-900 font-bold">{step.title}</span>
                                </div>
                                {step.description && <p className="text-gray-700 leading-relaxed mt-2">{step.description}</p>}
                                <div className="bg-gray-900 rounded-2xl overflow-hidden mt-4">
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
                            <p className="text-gray-700 leading-relaxed mb-4">{section.content}</p>
                            {section.highlight && (
                              <div className="bg-white/50 rounded-xl p-4 mb-4 border-l-4 border-emerald-500">
                                <p className="text-emerald-800">👉 {section.highlight}</p>
                              </div>
                            )}
                            {section.conclusion && (
                              <p className="text-gray-700 leading-relaxed mb-4">{section.conclusion}</p>
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
                                        <p className="text-white/90">{point.text || point.description}</p>
                                      </div>
                                    </div>
                                  )}
                                  {!point.icon && (
                                    <>
                                      {point.title && <h4 className="text-white mb-2">{point.title}</h4>}
                                      <p className="text-white/90">{point.description}</p>
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
                    onClick={() => setSelectedDay(day.day)}
                  >
                    閰讀 →
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        /* Original View */
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mb-12 bg-gray-900 rounded-3xl p-8 overflow-hidden relative"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <pre className="text-green-400 font-mono overflow-x-auto">
              <code>
                <Typewriter text={codeText} delay={30} />
              </code>
            </pre>
          </motion.div>

          {/* Tech Stack and Featured Article */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Tech Stack - Left Side (1/3) */}
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
                          onClick={() => setSelectedTech(tech.label)}
                          className="text-center group cursor-pointer"
                        >
                          <div className={`${tech.color} w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-2 group-hover:shadow-2xl transition-shadow`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="text-white/80 group-hover:text-white transition-colors">
                            {tech.label}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  {/* Second Row - 2 items */}
                  <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto w-full">
                    {techStack.slice(3, 5).map((tech, index) => {
                      const Icon = tech.icon;
                      return (
                        <motion.div
                          key={index + 3}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3 + (index + 3) * 0.1, type: "spring" }}
                          whileHover={{ scale: 1.1, y: -10 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedTech(tech.label)}
                          className="text-center group cursor-pointer"
                        >
                          <div className={`${tech.color} w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-2 group-hover:shadow-2xl transition-shadow`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="text-white/80 group-hover:text-white transition-colors">
                            {tech.label}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Featured Article - Right Side (2/3) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 relative overflow-hidden rounded-3xl"
            >
              <div className={`bg-gradient-to-r ${articles[0].color} p-8 md:p-12 h-full flex items-center`}>
                <div className="grid md:grid-cols-2 gap-8 items-center w-full">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
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
                        閰讀章節
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
                    transition={{ delay: 0.8, type: "spring" }}
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
            {articles.slice(1).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
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
    </section>
  );
}