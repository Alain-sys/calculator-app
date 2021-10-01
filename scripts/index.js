let radio1 = document.getElementById('radio1');
let radio2 = document.getElementById('radio2');
let radio3 = document.getElementById('radio3');
let radioControl = document.querySelector('.radio-control');

function themeStorage() {
  let storedValue1 = localStorage.getItem('theme1');
  let storedValue2 = localStorage.getItem('theme2');
  let storedValue3 = localStorage.getItem('theme3');
  let storeControl = localStorage.getItem('cursor');

  if (storedValue1 !== null) {
    console.log('1 background color etc...');
    theme();
  } else if (storedValue2 !== null) {
    console.log('2 background color etc...');
    theme();
  } else if (storedValue3 !== null) {
    console.log('3 background color etc...');
    theme();
  }

  if (storeControl !== null) {
    theme();
  }
}
themeStorage();

function theme() {
  if (radio1.checked) {
    radioControl.style.left = '6%';
    localStorage.setItem('theme1', radio1.checked);
    localStorage.setItem('cursor', radioControl.style.left);
    localStorage.removeItem('theme2');
    localStorage.removeItem('theme3');
  } else if (radio2.checked) {
    radioControl.style.left = '40%';
    localStorage.setItem('theme2', radio2.checked);
    localStorage.setItem('cursor', radioControl.style.left);
    localStorage.removeItem('theme1');
    localStorage.removeItem('theme3');
  } else if (radio3.checked) {
    radioControl.style.left = '75%';
    localStorage.setItem('theme3', radio3.checked);
    localStorage.setItem('cursor', radioControl.style.left);
    localStorage.removeItem('theme1');
    localStorage.removeItem('theme2');
  }
}

radio1.addEventListener('change', () => {
  theme();
});

radio2.addEventListener('change', () => {
  theme();
});

radio3.addEventListener('change', () => {
  theme();
});
