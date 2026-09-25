# 项目交接文档 · 记忆翻牌（memory-flip）

> **这份文件是给「新会话」看的启动说明。** 新会话的 agent 请先完整读完本文件，再开始干活。
> 最后更新：第 1 天结束时（本地与远程均为 `eeda8ca`）

---

## 0. 给新会话 agent 的一句话开场

> 读 `HANDOFF.md`，用户是编程新手，我们正在做 7 天项目「记忆翻牌」。第 1 天已完成并 push，现在要继续第 2 天。请按文件里的「教学约定」和「第 2 天任务规格」直接开工。

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
| 当前提交 | `eeda8ca` — `chore: 初始化项目骨架与 Git 配置` |
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
│   └── style.css                 深蓝配色、卡牌容器、按钮样式（第 1 天版）
└── js/
    └── script.js                 目前只做加载自检，游戏逻辑待写
```

**注意**：`.gitattributes` 和 `HANDOFF.md` 是第 1 天之后新增的，**需要提交**（见第 8 节）。

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

## 6. 七天计划（第 1 天已完成）

| 天 | 目标 | 当天结束能跑的成果 | 状态 |
|---|---|---|---|
| 1 | 建仓库 + 项目骨架 | 页面能打开、控制台自检通过、代码已 push | ✅ |
| 2 | 16 张卡牌排好版 | 4×4 整齐的卡背网格（CSS Grid） | ⏳ **下一步** |
| 3 | 点一下能翻牌 | 点击翻开、再点翻回，有防连点的"锁" | 待做 |
| 4 | 配对逻辑 | 两张一样的牌翻对了变色/消失，配错自动翻回 | 待做 |
| 5 | 计时 + 步数 | 页面显示「步数：12　用时：00:35」 | 待做 |
| 6 | 通关结算 | 全部配完弹出结算面板 + 翻牌动画打磨 | 待做 |
| 7 | 部署上线 | 拿到公网链接 `kevinlin719.github.io/memory-flip` + 写 README + 打 tag | 待做 |

---

## 7. 第 2 天任务规格（**新会话直接照这个开工**）

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

## 8. 待办：先把当前改动提交掉

`HANDOFF.md` 是新增文件，需要提交并推送（**这一步在开始第 2 天代码之前做**）：

```powershell
git add .
git commit -m "docs: 添加项目交接文档与换行符配置"
git push
```

> `.gitattributes` 之前已随第一次 commit 上传，所以这次实际只会新增 `HANDOFF.md`。

---

## 9. 环境事实（新会话可直接依赖）

| 项 | 值 |
|---|---|
| 操作系统 | Windows |
| 会话工作目录 | `D:\Projects\Self`（**已确认可用，终端/搜索/文件读写全部正常**） |
| Git | 2.53.0.windows.1 |
| Node | v24.21.0 |
| VS Code | 1.138.0 |
| 打开项目的方式 | 直接双击 `index.html`（无需本地服务器） |
| 调试方式 | 浏览器 `F12` → Console 看日志和报错 |

### 已知的历史坑（已解决，仅供理解背景）
- 用户一开始把项目放在 `D:\Projects\CityU 26-27semA\Self`，后来整体挪到 `D:\Projects\Self`
- 会话的 cwd 在创建时锁定，改不了。最终通过**在旧路径建 Junction 目录联接**指向新位置解决
- 如果新会话里又出现 `ENOENT: realpath` 或终端全挂，说明 cwd 又失效了 —— 检查 `D:\Projects\Self` 是否存在

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
| 1 | — | 仓库 + 骨架 + Git 流程走通 | `eeda8ca` |
| 2 | 待开始 | 4×4 卡牌网格 | — |

**下一步动作：提交本文件 → 开始第 2 天。**
