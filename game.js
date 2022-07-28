const data = [
  {
    type: '詐騙',
    level: 1,
    title: '以下何者沒有犯法?',
    item: [
      {
        id: '1',
        name: '擔任詐騙集團之車手',
        description: '1台中一年輕人王小明(化名)，近日前往倍兒好廣告公司應聘網紅，被要求押金10萬保證金才得以入職接受教育',
        law: '依洗錢防制法第15條之規定，收受、持有或使用之財物或財產上利益，有下列情形之一，而無合理來源且與收入顯不相當者，處6月以上5年以下有期徒',
        ans: false,
      },
      {
        id: '2',
        name: '擔任詐騙集團之車手',
        description: '2台中一年輕人王小明(化名)，近日前往倍兒好廣告公司應聘網紅，被要求押金10萬保證金才得以入職接受教育',
        law: '依洗錢防制法第15條之規定，收受、持有或使用之財物或財產上利益，有下列情形之一，而無合理來源且與收入顯不相當者，處6月以上5年以下有期徒',
        ans: false,
      },
      {
        id: '3',
        name: '擔任詐騙集團之水手',
        description: '',
        law: '',
        ans: true,
      },
      {
        id: '4',
        name: '擔任詐騙集團之車手',
        description: '4台中一年輕人王小明(化名)，近日前往倍兒好廣告公司應聘網紅，被要求押金10萬保證金才得以入職接受教育',
        law: '依洗錢防制法第15條之規定，收受、持有或使用之財物或財產上利益，有下列情形之一，而無合理來源且與收入顯不相當者，處6月以上5年以下有期徒',
        ans: false,
      },
    ],
  },
  {
    type: '詐騙',
    level: 2,
    title: '以下何者沒有犯法?',
    item: [
      {
        id: '5',
        name: '替「別人」的犯罪所得漂白',
        description: '台中一年輕人王小明(化名)，替「別人」的犯罪所得漂白',
        law: '依洗錢防制法第2條，本法所稱洗錢，指下列行為：一、意圖掩飾或隱匿特定犯罪所得來源，或使他人逃',
        ans: false,
      },
      {
        id: '6',
        name: '替「別人」的犯罪所得漂白',
        description: '台中一年輕人王小明(化名)，替「別人」的犯罪所得漂白',
        law: '依洗錢防制法第2條，本法所稱洗錢，指下列行為：一、意圖掩飾或隱匿特定犯罪所得來源，或使他人逃',
        ans: false,
      },
      {
        id: '7',
        name: '替「別人」的犯罪所得漂白',
        description: '台中一年輕人王小明(化名)，替「別人」的犯罪所得漂白',
        law: '依洗錢防制法第2條，本法所稱洗錢，指下列行為：一、意圖掩飾或隱匿特定犯罪所得來源，或使他人逃',
        ans: false,
      },
      {
        id: '8',
        name: '替「別人」的犯罪出庭自白',
        description: '',
        law: '',
        ans: true,
      },
    ],
  },
];

const itemarea = document.querySelector('.itemarea');
const itemBtn = document.querySelector('.item');
const contanier = document.querySelector('.contanier');
const newsArea = document.querySelector('.news_area');
const Gamestart = document.querySelector('.Gamestart');
const Gamesreset = document.querySelector('.Gamereset');
const man = document.querySelector('.man');
const titletext = document.querySelector('.title');
const date = document.querySelector('.date');
const newsTitle = document.querySelector('.news_title');
const newsDescription = document.querySelector('.news_description');
const newsLaw = document.querySelector('.news_law');

const gameman = 'https://media.giphy.com/media/qQJBEm2e9qOkh9W1Z7/giphy.gif';
const gamemanImage = 'https://media.giphy.com/media/yMByKc6xaOCR7Pkn0L/giphy.gif';
const gamemanError = 'https://media.giphy.com/media/AWxZgaOyDZFwJu7YiZ/giphy.gif';

let gamelevel = 1;

// 先預設詐騙
let gametype = '詐騙';

// 畫面選項渲染
function render(type, level, title, item) {
  let str = '';
  item.forEach((i) => {
    str += `<button class="item dashed"  data-id="${i.id}">${i.name}</button>`;
  });
  itemarea.innerHTML = str;
  titletext.textContent = `Q${level}:${title}`;
  newsTitle.textContent = `${type}反受害 洗錢詐騙新招`;
}

// 取得日期
function getdate() {
  let str = '';
  const dateObject = new Date();
  const day = dateObject.getDate();
  const month = dateObject.getMonth();
  const year = dateObject.getFullYear();
  str += `${year}年${month + 1}月${day}日`;
  date.textContent = str;
}

// 數據整理
function chooseData(num, str) {
  data.forEach((i) => {
    if (num === i.level && str === i.type) {
      const {
        type, level, title, item,
      } = i;
      render(type, level, title, item);
    }
  });
}

// 遊戲開始
function start() {
  chooseData(gamelevel, gametype);
  getdate();
  contanier.classList.add('d-flex');
  Gamestart.classList.add('d-none');
  itemarea.classList.remove('d-none');
  titletext.classList.remove('d-none');
  titletext.classList.add('text-start');
  man.classList.remove('w600');
  man.style.backgroundImage = `url(${gamemanImage})`;
}

// 晉級下一關
function next(num, str) {
  chooseData(num, str);
  itemarea.classList.remove('animate__backOutDown', 'animate__delay-1s');
  itemBtn.classList.remove('correct');
  itemarea.classList.add('animate__backInDown');
}

// 回到主遊戲
function reset() {
  contanier.classList.remove('d-flex');
  Gamestart.classList.remove('d-none');
  itemarea.classList.add('d-none');
  titletext.classList.add('d-none');
  man.classList.add('w600');
  newsArea.classList.add('d-none');
  man.style.backgroundImage = `url(${gameman})`;
  gamelevel = 1;
  gametype = '詐騙';
}

// 監聽按鈕
Gamestart.addEventListener('click', start);
Gamesreset.addEventListener('click', reset);

// 按鈕關卡判斷邏輯
itemarea.addEventListener('click', (e) => {
  if (e.target.nodeName === 'BUTTON') {
    const { id } = e.target.dataset;
    let TypeData = data.find((i) => gametype === i.type && gamelevel === i.level);
    TypeData.item.forEach((i) => {
      if (i.id === id) {
        if (i.ans) {
          e.target.classList.add('correct');
          itemarea.classList.add('animate__backOutDown', 'animate__delay-1s');
          gamelevel += 1;
          setTimeout((() => render(gamelevel, gametype)), 1500);
          setTimeout((() => next(gamelevel, gametype)), 1500);
          TypeData = [];
        } else {
          e.target.classList.add('error');
          man.style.backgroundImage = `url(${gamemanError})`;
          newsArea.classList.remove('d-none');
          newsDescription.textContent = `${i.description}`;
          newsLaw.textContent = `${i.law}`;
        }
      }
    });
  }
});
