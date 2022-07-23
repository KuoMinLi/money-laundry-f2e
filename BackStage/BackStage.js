// 製造data
const data = {
  title: '擔任詐騙集團之車手，有可能觸犯洗錢罪嗎？',
  item: '向無特殊信賴關係之他人租用、購買或施用詐術取得帳戶使用，以製造金流斷點，妨礙金融秩序，均屬之',
  description: '依洗錢防制法第15條之規定，收受、持有或使用之財物或財產上利益，有下列情形之一，而無合理來源且與收入顯不相當者，處6月以上5年以下有期徒刑，得併科新臺幣500萬元以下罰金：一、冒名或以假名向金融機構申請開立帳戶。二、以不正方法取得他人向金融機構申請開立之帳戶。三、規避第7條至第10條所定洗錢防制程序，所謂行為人以不正方法，例如：向無特殊信賴關係之他人租用、購買或施用詐術取得帳戶使用，以製造金流斷點，妨礙金融秩序',
  location: [1, 4],
};
console.log(data);

// Allow multiple draggable items
function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
}

const dragSources = document.querySelectorAll('[draggable="true"]');
dragSources.forEach((dragSource) => {
  dragSource.addEventListener('dragstart', dragStart);
});

// Allow multiple dropped targets

function cancelDefault(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

function dropped(e) {
  cancelDefault(e);
  const id = e.dataTransfer.getData('text/plain');
  const tt = document.querySelector(`#${id}`);
  e.target.appendChild(tt);
  console.log(e.target);
}

const dropTargets = document.querySelectorAll('[data-role="drag-drop-container"]');
dropTargets.forEach((dropTarget) => {
  dropTarget.addEventListener('drop', dropped);
  dropTarget.addEventListener('dragenter', cancelDefault);
  dropTarget.addEventListener('dragover', cancelDefault);
});

const inputText = document.querySelector('#input');
console.log(inputText.value);
