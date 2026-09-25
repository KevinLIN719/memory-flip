/* ============================================================
   记忆翻牌 —— 主逻辑
   第 1 天：确认 JS 被成功加载
   第 2 天：生成 16 张牌 + 洗牌 + 渲染到棋盘
   ============================================================ */

// 'use strict' 让 JS 用严格模式运行。
// 大白话：它会把你一些不小心的写法直接报错，而不是默默帮你"猜"。
// 新手开着它，能提前发现很多低级 bug。
'use strict';

// console.log 会在浏览器的"控制台"里打印文字。
// 控制台是前端开发最重要的调试工具，一定要学会打开它。
console.log('✅ script.js 加载成功');

// 下面这两行是"自检"：
// 确认 HTML 里的元素真的能被 JS 找到。如果打印出 null，说明 id 写错了。
console.log('board 元素：', document.getElementById('board'));
console.log('restart 按钮：', document.getElementById('restart-btn'));

// ============================================================
// 一、符号表
// 8 个符号，等会儿每个复制一份，就是 16 张牌。
// 为什么不用 emoji？因为 emoji 在不同系统上画得不一样，
// 有的还会显示成"豆腐块"（□）。用这种基础字符最稳。
// ============================================================
const SYMBOLS = ['★', '●', '▲', '■', '◆', '♥', '♠', '♣'];

// ============================================================
// 二、全局状态：deck（牌堆）
// 这是整个游戏最核心的一个数组。每一张牌都是一个"对象"，
// 记录了它的全部信息。页面长什么样，完全由这个数组决定。
// ============================================================
let deck = [];

// ============================================================
// 三、createDeck() —— 造出 16 张牌（还没洗）
// 为什么每个符号要两份？因为配对游戏必须"成对"。
// ============================================================
function createDeck() {
  // 用 .flatMap()：把每个符号变成"两张牌"，再把结果拍平成一个数组。
  // 相当于：[★] -> [★, ★]，8 个符号过完就是 16 张牌。
  return SYMBOLS.flatMap((symbol, index) => {
    // 同一个符号的两张牌，除了 id 不同，其它字段完全一样。
    // id 用来区分"这是两张不同的牌"，即使它们图案相同。
    return [
      { id: index * 2,     symbol, matched: false, flipped: false },
      { id: index * 2 + 1, symbol, matched: false, flipped: false },
    ];
  });
}

// ============================================================
// 四、shuffle() —— Fisher-Yates 洗牌算法
// 为什么不用 sort(() => Math.random() - 0.5)？
// 那是网上流传最广的错误写法：它的随机分布不均匀，
// 有些排列出现的概率会明显偏高，洗出来的牌"不够乱"。
// Fisher-Yates 才是数学上被证明公平的算法。
// ============================================================
function shuffle(array) {
  // 从最后一张牌开始，往前倒着走（i 从 15 一直到 1）
  for (let i = array.length - 1; i > 0; i--) {
    // 在 0 ~ i 之间随机挑一个位置（包含 0 和 i 本身）
    const j = Math.floor(Math.random() * (i + 1));

    // 把第 i 张和第 j 张交换位置。
    // 这三行是"交换两个变量"的经典写法，需要个临时变量中转一下，
    // 就像交换两杯水必须借第三个空杯子。
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  // 直接在原数组上改的，但把结果也 return 出去，
  // 这样调用时可以写成 deck = shuffle(deck)，读起来更清楚。
  return array;
}

// ============================================================
// 五、renderBoard() —— 把 deck 数组"画"成页面上的卡牌
// 关键思想：数据（deck）和画面（DOM）分开。
// deck 是唯一真相，页面只是它的一张"照片"。
// 以后翻牌、配对，我们都只改 deck，然后重新画一次。
// ============================================================
function renderBoard() {
  const board = document.getElementById('board');

  // 先把棋盘清空。留空字符串等于"里面的东西全删掉"。
  // 为什么要清空？以后点"重新开始"时会再调用这个函数，
  // 不清空的话牌会一层层叠上去，越点越多。
  board.innerHTML = '';

  // 遍历 deck 里的每一张牌，为它创建对应的 DOM 元素
  deck.forEach((card) => {
    // 1) 外层：一张牌，用 <button> 而不是 <div>，
    //    因为按钮天生就能被点击、能被键盘 Tab 选中，对无障碍更友好。
    const cardEl = document.createElement('button');
    cardEl.type = 'button';
    cardEl.className = 'card';
    cardEl.dataset.id = card.id;          // 把 id 记在元素上，第 3 天点击时要用
    cardEl.setAttribute('aria-label', '未翻开的卡牌');

    // 2) 内层容器：以后翻转动画就转这一层
    const innerEl = document.createElement('div');
    innerEl.className = 'card__inner';

    // 3) 正面：写符号。textContent 只当纯文字处理，比 innerHTML 安全
    const frontEl = document.createElement('div');
    frontEl.className = 'card__face card__face--front';
    frontEl.textContent = card.symbol;

    // 4) 背面：现在看到的就是这一面，上面不写东西
    const backEl = document.createElement('div');
    backEl.className = 'card__face card__face--back';

    // 5) 按"由内到外"的顺序拼装：正面/背面 -> 内层 -> 外层 -> 棋盘
    innerEl.appendChild(frontEl);
    innerEl.appendChild(backEl);
    cardEl.appendChild(innerEl);
    board.appendChild(cardEl);
  });

  console.log(`✅ 已渲染 ${deck.length} 张卡牌`);
}

// ============================================================
// 六、启动：页面加载时跑一次
// 顺序很重要：先造牌 -> 再洗牌 -> 最后才画出来。
// 如果先画再洗，画面上就是没洗过的顺序。
// ============================================================
deck = shuffle(createDeck());
renderBoard();

// 下面这行是给第 2 天验收用的：刷新页面，看顺序是不是每次都不同。
console.log(
  '本次牌序：',
  deck.map((card) => card.symbol).join(' ')
);

// ------------------------------------------------------------
// 后面的路线图（今天还没写）
// ------------------------------------------------------------
// 第 3 天：点击翻牌 + 防连点锁
// 第 4 天：配对判断逻辑
// 第 5 天：步数统计 + 计时器
// 第 6 天：通关结算面板 + 动画打磨
