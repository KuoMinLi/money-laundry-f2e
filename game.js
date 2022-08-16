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

// 正確動畫
function correctAnimate(e) {
  e.target.classList.add('correct');
  itemarea.classList.add('animate__backOutDown', 'animate__delay-1s');
}

// 匯入下一關動畫
function nextAnimate() {
  itemarea.classList.remove('animate__backOutDown', 'animate__delay-1s');
  itemBtn.classList.remove('correct');
  itemarea.classList.add('animate__backInDown');
}

// let categories = 0;
// // 取得遊戲關卡種類
// (function getcategories(){
//   return axios({
//     method: 'get',
//     baseURL: 'https://money-laundry.herokuapp.com/v1/api/categories',
//     timeout: 2000,
//   })
//   .then((result) => {
//     let categories = result.data.data;
//     return categories;
//   }).then(data => categories = data)
// })();
// setTimeout((() => console.log(categories)), 1500);

// 取得遊戲關卡種類
function getcategories(){
  return axios({
    method: 'get',
    baseURL: 'https://money-laundry.herokuapp.com/v1/api/categories',
    timeout: 3000,
  })
  .then((result) => {
    let categories = result.data.data;
    rendercategories(categories);

    // 按鈕關卡判斷邏輯
    itemarea.addEventListener('click', (e) => {
      if (e.target.nodeName === 'BUTTON') {
        const { id } = e.target?.dataset;
        categories.forEach((index) => {
          if (index.id == id) {            
            correctAnimate(e);
            setTimeout((() => getgamequestion(index.id,gamelevel)), 1500);
            setTimeout((() => nextAnimate()), 2500);        
          }
        });
      }
      e.preventDefault();
    },true);

  }).catch((err) => {
    console.log(err);
  });
}


// 取得特定種類關卡題目
function getgamequestion(id, level) {
  return axios({
    method: 'get',
    baseURL: `https://money-laundry.herokuapp.com/v1/api/categories/${id}`,
    timeout: 3000,
  })
  .then((result) => {
    newsTitle.textContent = `${result.data.data.type}反受害 洗錢詐騙新招`;
    let gamequestion = result.data.data.Games;
    renderquestion(gamequestion,level);
    const gameid = gamequestion[`${level}`-1].id;
    return getgameitems(gameid);
  })
}
// 取得特定種類關卡選項
function getgameitems(gameid) {
  return axios({
    method: 'get',
    baseURL: `https://money-laundry.herokuapp.com/v1/api/games/${gameid}`,
    timeout: 3000,
  })
  .then((result) => {
    const gameitems = result.data.data.Items;
    const gameid = result.data.data.Category.id;
    renderitems(gameitems);
    // 按鈕關卡判斷邏輯
    itemarea.addEventListener('click', (e) => {
      if (e.target.nodeName === 'BUTTON') {
        const { id } = e.target.dataset;
        e.target.disabled = true;
        gameitems.forEach((i) => {
          if (i.id == id) {
            if (i.ans) {
              correctAnimate(e);
              if (gamelevel === 5) {
                console.log('win');
              } else {
                gamelevel += 1;
                setTimeout((() => getgamequestion(gameid,gamelevel)), 1000);
                setTimeout((() => nextAnimate()), 2500);
                setTimeout((() => e.target.disabled = false), 2500);
              }
            } else {
              errorAnimate(e, i);
            }
          }
        });
      }
    });
  })
}


// 關卡種類畫面渲染
function rendercategories(arr) {
  let str = '';
  arr.forEach(({ id, type }) => {
    str += `<button class="item dashed"  data-id="${id}">${type}</button>`;
  });
  itemarea.innerHTML = str;
  titletext.textContent = `請選擇遊戲關卡`;
}

// 關卡題目畫面渲染
function renderquestion(arr,num) {
  const question = arr.filter((i) => i.level === num );
  titletext.textContent = `Q${question[0].level}:${question[0].title}`;
}

// 關卡選項畫面渲染
function renderitems(arr) {
  let str = '';
  arr.forEach((i) => {
    str += `<button class="item dashed"  data-id="${i.id}">${i.name}</button>`;
  }
  );
  itemarea.innerHTML = str;
}

// 取得日期
function getdate() {
  const dateObject = new Date();
  const day = dateObject.getDate();
  const month = dateObject.getMonth();
  const year = dateObject.getFullYear();
  date.textContent += `${year}年${month + 1}月${day}日`;
}

// 遊戲開始
async function start() {
  await getcategories();
  getdate();
  startAnimate();
}
// 遊戲開始動畫
function startAnimate() {
  contanier.classList.add('d-flex');
  Gamestart.classList.add('d-none');
  itemarea.classList.remove('d-none');
  titletext.classList.remove('d-none');
  titletext.classList.add('text-start');
  man.classList.remove('w600');
  man.style.backgroundImage = `url(${gamemanImage})`;
}

// 錯誤彈出動畫
function errorAnimate(e, item) {
  e.target.classList.add('error');
  man.style.backgroundImage = `url(${gamemanError})`;
  newsArea.classList.remove('d-none');
  newsDescription.textContent = `${item.description}`;
  newsLaw.textContent = `${item.law}`;
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
  categories = '';
  gamequestion = '';
  gameitems = '';
}

// 監聽按鈕
Gamestart.addEventListener('click', start);
Gamesreset.addEventListener('click', reset);
