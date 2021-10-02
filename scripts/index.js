let radio1 = document.getElementById('radio1');
let radio2 = document.getElementById('radio2');
let radio3 = document.getElementById('radio3');
let radioControl = document.querySelector('.radio-control');

let themeId = 0;
let themeSwitcher = document.querySelectorAll('.theme-switcher');

function getLocalStorage() {
  for (let i = 0; i < themeSwitcher.length; i++) {
    let storageThemeSwitcher = themeSwitcher[i];
    if (storageThemeSwitcher.checked) {
      console.log('find');
      let storageThemeSwitcherId = storageThemeSwitcher.id;
      console.log(storageThemeSwitcherId);
      if (storageThemeSwitcherId === 'radio1') {
        localStorage.setItem('switchTheme', storageThemeSwitcherId);
        // radioControl.style.left = '6%';
      } else if (storageThemeSwitcherId === 'radio2') {
        localStorage.setItem('switchTheme', storageThemeSwitcherId);
        // radioControl.style.left = '40%';
      } else if (storageThemeSwitcherId === 'radio3') {
        localStorage.setItem('switchTheme', storageThemeSwitcherId);
        // radioControl.style.left = '75%';
      }
    }
  }
}

if (localStorage.getItem('switchTheme') == null) {
  // console.log('localstorage null');
  getLocalStorage();
}

function switchTheme() {
  if (localStorage.getItem('switchTheme') === 'radio1') {
    radioControl.style.left = '6%';
    radio1.setAttribute('checked', true);
  } else if (localStorage.getItem('switchTheme') === 'radio2') {
    radioControl.style.left = '40%';
    radio2.setAttribute('checked', true);
  } else if (localStorage.getItem('switchTheme') === 'radio3') {
    radioControl.style.left = '75%';
    radio3.setAttribute('checked', true);
  }
}

switchTheme();

themeSwitcher.forEach((theme) => {
  theme.addEventListener('change', () => {
    themeId = theme.id;
    localStorage.setItem('switchTheme', themeId);
    switchTheme();
  });
});
