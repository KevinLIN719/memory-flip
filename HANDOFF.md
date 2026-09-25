# 项目交接文档 · 记忆翻牌（memory-flip）

> **这份文件是给「新会话」看的启动说明。** 新会话的 agent 请先完整读完本文件，再开始干活。
> 最后更新：第 2 天结束时（本地与远程均为 `a159f65`）

---

## 0. 给新会话 agent 的一句话开场

> 读 `HANDOFF.md`，用户是编程新手，我们正在做 7 天项目「记忆翻牌」。第 1、2 天已完成并 push，现在要继续第 3 天（点击翻牌 + 防连点锁）。请按文件里的「教学约定」和「第 3 天任务规格」直接开工。

---

## 1. 用户画像与教学约定（**重要，必须遵守**）

### 用户背景
- 编程基础：Python 基础、C++ 基础、HTML/CSS/JS 基础
- 每天可投入：**1-2 小时**
- 最终目标：练手 + 放进作品集（所以要"能跑、能给人看"）
- 环境：**Windows**，工作目录 `D:\Projects\Self`

### 教学风格要求（用户明确提过）
1. **用中文，语气像朋友聊天**，别太正式
2. **一次只推进一天，绝不一次性灌太多信息**
3. 每一步都要有明确的「**👉 现在你该做什么**」和**具体命令**
4. 每条命令都要给出「**✅ 预期结果**」——新手需要知道"什么算成功"
5. 每天涉及的新概念，要用**大白话**解释（用户会问"为什么"，要给理由）
6. **报错时给 3 个常见原因 + 解决办法**（这是用户点名的要求）
7. 阶段性给出**检查点**，让用户回报结果再继续

### 交流习惯
- 用户会主动问"为什么"和安全性问题（例如问过 API key 会不会泄露）
- 用户喜欢看到**进度确认**，所以每轮结尾要问 1-2 个可验证的问题
- 用户会自己动手改目录结构（把项目从 `Self\memory-flip\` 提到了 `Self\` 根目录）

---

## 2. 项目基本信息

| 项 | 值 |
|---|---|
| 项目名 | 记忆翻牌（Memory Flip） |
| 一句话 | 16 张卡牌两两配对的网页小游戏，记录步数、用时，通关给评价 |
| 技术栈 | 纯 HTML + CSS + 原生 JS，**零依赖、零构建工具** |
| 难度 | ⭐⭐（2/5） |
| GitHub 仓库 | https://github.com/KevinLIN719/memory-flip |
| 部署目标 | GitHub Pages（第 7 天做） |
| 当前分支 | `main`，已追踪 `origin/main` |
| 当前提交 | `a159f65` — `feat: 渲染 4x4 卡牌网格并实现 Fisher-Yates 洗牌` |
| 本地与远程 | **完全同步，工作区干净** |

### 为什么选纯原生、零依赖
用户是新手，**第一优先级是"别在环境上翻车"**。所以：
- 不用 npm / 不用打包器 / 不用框架
- 双击 `index.html` 就能跑
- 唯一的"第三方"是第 6 天可能用到的 emoji 和纯 CSS 动画

---

## 3. 文件结构（**项目文件在仓库根目录，没有子文件夹包裹**）

```
D:\Projects\Self\                 <- 会话工作目录 = 项目根目录
├── .gitattributes                换行符规则（LF），二进制文件标记
├── .gitignore                    忽略 node_modules / .vscode / 日志 / .env
├── HANDOFF.md                    ← 本文件
├── index.html                    骨架：标题区 + 状态区 + 棋盘区 + 按钮区
├── css/
│   └── style.css                 深蓝配色、4×4 Grid、卡牌静态样式（第 2 天版）
└── js/
    └── script.js                 符号表 / 造牌 / 洗牌 / 渲染（第 2 天版）
```

**注意**：`index.html` 里的 `#board` 仍然是**空的**，16 张牌是 JS 在页面加载时算出来塞进去的。
调试时如果棋盘空白 → 先看控制台有没有报错，再看 `✅ 已渲染 16 张卡牌` 有没有打印出来。

### 第 2 天建立的关键数据结构（第 3 天直接接着用）
```js
// 模块级变量，保存整个牌堆的状态
let deck = [];

// 每张牌的形状：
{ id: 0, symbol: '★', matched: false, flipped: false }
//  id      : 唯一编号（0~15），用来区分两张图案相同的牌
//  symbol  : 显示的字符
//  matched : 是否已配对成功（第 4 天用）
//  flipped : 是否已翻开（第 3 天用）
```
`renderBoard()` 每次调用都会**先清空 `#board` 再重画**，所以第 3 天改完数据直接再调一次即可。

---

## 4. 第 1 天完成情况（✅ 全部完成）

| 步骤 | 内容 | 状态 |
|---|---|---|
| 1 | 注册 GitHub 账号 | ✅ |
| 2 | 创建公开仓库 `memory-flip`（**没勾 README**，避免 push 冲突） | ✅ |
| 3 | 本地建项目文件夹 | ✅ |
| 4 | 建 `index.html` / `css/style.css` / `js/script.js` 三个文件 | ✅ |
| 5 | 浏览器打开 `index.html`，F12 控制台确认 JS 加载成功 | ✅ |
| 6.1 | `git config --global` 设置用户名邮箱 | ✅ |
| 6.2 | 建 `.gitignore` | ✅ |
| 6.3 | `git init` → `add` → `commit` → `branch -M main` → `remote add` → `push` | ✅ |
| 7 | GitHub 网页确认 5 个文件已上传 | ✅ |

### 第 1 天额外做的两件事
1. **加了 `.gitattributes`**（统一 LF 换行符）—— 因为 `git add` 报了 CRLF warning，顺手把这个坑堵死
2. **做了密钥安全审计** —— 全库扫描确认无任何 API key / 密码 / 敏感文件

---

## 5. 已建立的代码约定（后续必须保持一致）

### HTML 命名
- 用 **BEM 风格** 的 class 名：`app__header`、`hud__value`、`board`
- id 用于 JS 抓取：`board`、`move-count`、`timer`、`restart-btn`、`hud`

### CSS 约定
- 顶部 `:root` 定义 CSS 变量（`--color-bg`、`--color-surface`、`--color-text`、`--color-muted`、`--color-accent`、`--radius`）
- 全局 `* { box-sizing: border-box; margin: 0; padding: 0; }`
- 整体深蓝配色 + 居中布局，`max-width: 480px`（手机宽度）
- 每段 CSS 都有中文注释块

### JS 约定
- 文件顶部 `'use strict';`
- 关键节点用 `console.log` 打印调试信息
- 文件末尾用注释维护「第 N 天要做什么」的路线图

### Git 约定
- commit 用 **Conventional Commits** 中文描述：`chore:` / `feat:` / `style:` / `fix:`
- 每个 `script.js` / `style.css` 的修改都要有中文注释说明作用

---

## 6. 七天计划（第 1、2 天已完成）

| 天 | 目标 | 当天结束能跑的成果 | 状态 |
|---|---|---|---|
| 1 | 建仓库 + 项目骨架 | 页面能打开、控制台自检通过、代码已 push | ✅ |
| 2 | 16 张卡牌排好版 | 4×4 整齐的卡背网格（CSS Grid）+ 洗牌生效 | ✅ |
| 3 | 点一下能翻牌 | 点击翻开、再点翻回，有防连点的"锁" | ⏳ **下一步** |
| 4 | 配对逻辑 | 两张一样的牌翻对了变色/消失，配错自动翻回 | 待做 |
| 5 | 计时 + 步数 | 页面显示「步数：12　用时：00:35」 | 待做 |
| 6 | 通关结算 | 全部配完弹出结算面板 + 翻牌动画打磨 | 待做 |
| 7 | 部署上线 | 拿到公网链接 `kevinlin719.github.io/memory-flip` + 写 README + 打 tag | 待做 |

---

## 7. 第 2 天任务规格（✅ 已完成，保留作参考）

### 目标
页面渲染出 **4×4 = 16 张卡背**，整齐排布，还没法点。

### 要改三个文件

**A. `index.html`**
- 把副标题 `<p class="app__subtitle">第 1 天：骨架已就位</p>` 改成第 2 天的文案
- **不需要**为卡牌写任何静态 HTML（由 JS 生成）

**B. `css/style.css`**
- `.board` 补上 `grid-template-columns: repeat(4, 1fr);`
- 新增卡牌样式：`.card`、`.card__inner`、`.card__face`、`.card__face--front`、`.card__face--back`
- 卡背用渐变或图案，正面显示符号
- 第 2 天**只做静态样式**，翻转动画留到第 3 天

**C. `js/script.js`**
- 定义 `const SYMBOLS = ['...8 个不同符号...']`，**符号选平台显示一致的字符**（避开可能渲染成方块的 emoji）
- `function createDeck()` —— 8 个符号各复制一份，共 16 张，每张是 `{ id, symbol, matched: false, flipped: false }` 对象
- `function shuffle(array)` —— **Fisher-Yates 洗牌算法**，并加中文注释解释原理
- `function renderBoard()` —— 清空 `#board`，遍历 `deck` 创建 DOM 卡牌并插入
- 页面加载时调用：`deck = shuffle(createDeck()); renderBoard();`

### 教学要点（要讲给用户听的大白话）
1. **为什么用"数据 + 渲染"分离**：牌的状态存在 `deck` 数组里，DOM 只是"把数据画出来"。以后翻转/匹配都只改数据、再重画，逻辑不会乱。
2. **CSS Grid 是什么**：把容器切成几行几列的格子，子元素自动往格子里填。`repeat(4, 1fr)` = 4 列等宽。
3. **Fisher-Yates 洗牌**：从后往前，每次和前面随机一个位置交换。比 `sort(() => Math.random() - 0.5)` 靠谱得多（后者分布不均匀，是经典错误写法）。
4. **DOM 是什么**：浏览器把 HTML 解析成的一棵"元素树"，JS 可以增删改它。

### 第 2 天验收标准
- 打开 `index.html` 能看到 4×4 = 16 张卡背，间距均匀
- 刷新页面，符号的**排列顺序每次都不同**（说明洗牌生效）
- 控制台自检那三行仍然正常

---

## 4.5 第 2 天完成情况（✅ 全部完成，提交 `a159f65`）

| 步骤 | 内容 | 状态 |
|---|---|---|
| 1 | 提交第 1 天遗留的 `HANDOFF.md`（`218f00b`） | ✅ |
| 2 | `index.html` 副标题改成「第 2 天：16 张牌已就位」 | ✅ |
| 3 | `.board` 加 `grid-template-columns: repeat(4, 1fr)` + `aspect-ratio: 1` 正方形卡牌 | ✅ |
| 4 | 新增卡牌样式（`.card` / `__inner` / `__face` / `--front` / `--back`） | ✅ |
| 5 | `SYMBOLS` 8 个基础字符（★ ● ▲ ■ ◆ ♥ ♠ ♣），**刻意避开 emoji** | ✅ |
| 6 | `createDeck()` 用 `flatMap` 把 8 个符号变成 16 张牌对象 | ✅ |
| 7 | `shuffle()` 实现 Fisher-Yates 洗牌 | ✅ |
| 8 | `renderBoard()` 清空 `#board` 后重建 16 个 `<button class="card">` | ✅ |
| 9 | 浏览器验收：4×4 网格正常，刷新 3 次牌序都不同，控制台 4 行日志正常 | ✅ |
| 10 | `node --check js/script.js` 语法自检通过 | ✅ |

### 第 2 天实际实现细节（写第 3 天代码时保持一致的约定）
- 卡牌 DOM 结构（`cardEl.dataset.id` 存了牌的 id，第 3 天点击时用它反查 `deck`）：
  ```html
  <button class="card" data-id="7" aria-label="未翻开的卡牌">
    <div class="card__inner">
      <div class="card__face card__face--front">★</div>  <!-- opacity: 0，藏起来的正面 -->
      <div class="card__face card__face--back"></div>
    </div>
  </button>
  ```
- **翻牌目前是靠 `.card__face--front` 的 `opacity: 0 → 1` 实现的**（不是 3D 旋转）。
  `.card` 上已预留 `perspective: 800px`，`.card__face--front` 上有 `transition: opacity 0.2s ease`。
- 第 3 天推荐做法：给 `.card` 加一个状态 class（例如 `.card--flipped`），CSS 里写
  `.card--flipped .card__face--front { opacity: 1; }`，JS 只负责增删这个 class。
- `.card` 是 `<button>`，**天生可点击、可 Tab 聚焦**，不需要额外加 tabindex。

---

## 4.6 第 3 天任务规格（**下一步照这个开工**）

### 目标
点一下能翻牌，再点一下能翻回去；配对中的牌不能被重复点（防连点"锁"）。

### A. `css/style.css`
- 新增 `.card--flipped .card__face--front { opacity: 1; }`
- 新增 `.card--matched` 的样式（第 4 天用，今天可以先埋着）
- 翻转动画可以今天打磨，也可以留到第 6 天

### B. `js/script.js`
- 新增状态变量：`firstCard`（本次翻开的第一张）、`lockBoard`（布尔锁）
- `function onCardClick(event)`：
  1. 用 `event.target.closest('.card')` 找到被点的牌（**注意：点到的可能是里面的 `.card__face`，不一定是 `.card` 本身**）
  2. 用 `Number(cardEl.dataset.id)` 去 `deck` 里找到对应的牌对象
  3. 如果 `lockBoard` 为真、或这张牌已经翻开/已配对 → 直接 `return`
  4. 否则把该牌对象的 `flipped` 改成 `true`，给元素加上 `.card--flipped`
  5. 存进 `firstCard`；如果 `firstCard` 已有值 → 进入比对（第 4 天做，今天先 `console.log` 两张牌）
- 用**事件委托**绑定：只在 `#board` 上绑一次 `click`，不要给 16 张牌各绑一次
- 「重新开始」按钮今天可以顺手接上：`deck = shuffle(createDeck()); renderBoard();`

### 教学要点（大白话）
1. **事件委托**：把监听器绑在父元素 `#board` 上，靠事件"冒泡"接住子元素的点击。好处是以后牌重画了也不用重新绑。
2. **`event.target` vs `event.currentTarget`**：`target` 是真正被点的那个元素（可能是里面的 div），`currentTarget` 是绑监听器的那个（`#board`）。
3. **`closest()`**：从当前元素往上找最近的符合条件的祖先，正是用来对付"点到里面小元素"的。
4. **防连点锁（`lockBoard`）**：为什么需要？因为翻两张牌比对的瞬间，用户还能再点第三张，会把状态搞乱。加个布尔锁最省事。
5. **`dataset`**：HTML 上的 `data-id` 属性，在 JS 里读作 `element.dataset.id`（永远是小写驼峰）。

### 第 3 天验收标准
- 点任意一张牌 → 正面（符号）显示出来
- 连点两张 → 控制台打印出这两张牌的符号
- 点击过程中没有报错，刷新后一切正常

---

## 8. 待办：第 2 天的收尾提交

`HANDOFF.md` 因第 2 天结束而更新，需要提交推送：

```powershell
git add .
git commit -m "docs: 更新交接文档至第 2 天结束"
git push
```

---

## 9. 环境事实（新会话可直接依赖）

| 项 | 值 |
|---|---|
| 操作系统 | Windows |
| 会话工作目录 | `D:\Projects\Self`（**已确认可用，终端/搜索/文件读写全部正常**） |
| Git | 2.53.0.windows.1，**装在 `D:\Git`（不是默认的 `C:\Program Files\Git`）** |
| Git 凭据助手 | `credential.helper=manager`，GCM 实际在 `D:\Git\mingw64\bin\git-credential-manager.exe` |
| Node | v24.21.0 |
| VS Code | 1.138.0 |
| 打开项目的方式 | 直接双击 `index.html`（无需本地服务器） |
| 调试方式 | 浏览器 `F12` → Console 看日志和报错 |

### ⚠️ agent 沙箱没有外网权限（第 2 天发现）
- agent 的 `pwsh` 里跑 `git push` / `git fetch` **一定失败**，报错长这样：
  `fatal: unable to access '...': schannel: AcquireCredentialsHandle failed: SEC_E_NO_CREDENTIALS (0x8009030e)`
- **这不是凭据问题，是沙箱断网**：`web_fetch` 能访问 GitHub（说明仓库/网络本身正常），但 `pwsh` 连
  `msftconnecttest.com` 都连不上。
- **处理方式**：agent 只负责 `git add` + `git commit`（本地操作正常），
  **`git push` 交给用户在 VS Code 的终端里手动跑**（用户第 2 天实测一次通过）。
- 下次遇到 `schannel` / `unable to access` 报错，别去折腾凭据，直接判定为网络层问题。

### 已知的历史坑（已解决，仅供理解背景）
- 用户一开始把项目放在 `D:\Projects\CityU 26-27semA\Self`，后来整体挪到 `D:\Projects\Self`
- 会话的 cwd 在创建时锁定，改不了。最终通过**在旧路径建 Junction 目录联接**指向新位置解决
- 如果新会话里又出现 `ENOENT: realpath` 或终端全挂，说明 cwd 又失效了 —— 检查 `D:\Projects\Self` 是否存在
- 第 1 天 `git add` 报过 CRLF warning → 已加 `.gitattributes` 统一成 LF 解决

---

## 10. 安全约定（用户很关心）

第 1 天已做过完整审计，结论：

- ✅ 仓库 5 个文件，无 `.env`、无密钥、无密码
- ✅ 全库正则扫描 `sk-` / `api_key` / `token` / `password` / `Bearer` / `ghp_` / `AKIA` → **零命中**
- ✅ 代码里**没有任何网络请求**（无 `fetch` / 无外链），是纯本地小游戏
- ✅ `.git/config` 里只有普通仓库地址，无内嵌凭据

### 后续必须遵守
1. **密钥绝不进代码** —— 放 `.env`，且 `.env` 必须在 `.gitignore` 里（已配好）
2. 代码里只写 `os.environ["API_KEY"]` 这类"从环境变量取"的写法
3. 万一真提交了密钥：**立刻去服务商后台吊销它**（删 commit 没用，历史里还在）
4. 公开仓库 = 全世界可见，别放学号、手机号等私人信息

---

## 11. 后续第 7 天要提醒的事（部署相关，别提前做）

- 用 **GitHub Pages**：仓库 Settings → Pages → Source 选 `main` 分支 `/ (root)` → Save
- 链接形如 `https://kevinlin719.github.io/memory-flip`
- 还要顺手补一个 `README.md`（作品集门面）：项目截图、玩法说明、如何本地运行、技术栈
- 打 tag：`git tag -a v1.0.0 -m "首个可玩版本"` → `git push origin v1.0.0`
- 教用户用 **GitHub Issue** 记录后续想法（"加音效""支持 6×6 难度"）

---

## 12. 教学进度记录

| 天 | 日期 | 产出 | 提交 |
|---|---|---|---|
| 1 | 2026-09-25 | 仓库 + 骨架 + Git 流程走通 | `eeda8ca` |
| 2 | 2026-09-25 | 4×4 卡牌网格 + Fisher-Yates 洗牌 | `a159f65` |
| 3 | 待开始 | 点击翻牌 + 防连点锁 | — |

**下一步动作：提交本文件 → 开始第 3 天。**
