let radio1 = document.getElementById('radio1');
let radio2 = document.getElementById('radio2');
let radio3 = document.getElementById('radio3');
let radioControl = document.querySelector('.radio-control');

radio1.addEventListener('change', () => {
  if (radio1.checked) {
    console.log('1');
    radioControl.style.left = '7%';
  }
});

radio2.addEventListener('change', () => {
  if (radio2.checked) {
    console.log('2');
    radioControl.style.left = '40%';
  }
});

radio3.addEventListener('change', () => {
  if (radio3.checked) {
    console.log('3');
    radioControl.style.left = '75%';
  }
});
