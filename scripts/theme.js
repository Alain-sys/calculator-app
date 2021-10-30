let radio1 = document.getElementById('radio1');
let radio2 = document.getElementById('radio2');
let radio3 = document.getElementById('radio3');
let themeSwitcher = document.querySelectorAll('.theme-switcher');
let radioControl = document.querySelector('.radio-control');
let themeId = 0;

// verify which themeSwitcher is checked, take his id if it's checked and save it in localStorage
function getLocalStorage() {
  for (let i = 0; i < themeSwitcher.length; i++) {
    let storageThemeSwitcher = themeSwitcher[i];
    if (storageThemeSwitcher.checked) {
      let storageThemeSwitcherId = storageThemeSwitcher.id;
      if (storageThemeSwitcherId === 'radio1') {
        localStorage.setItem('switchTheme', storageThemeSwitcherId);
      } else if (storageThemeSwitcherId === 'radio2') {
        localStorage.setItem('switchTheme', storageThemeSwitcherId);
      } else if (storageThemeSwitcherId === 'radio3') {
        localStorage.setItem('switchTheme', storageThemeSwitcherId);
      }
    }
  }
}

// verify the id of the localStorage and add style with attribute according to his id
function switchTheme() {
  if (localStorage.getItem('switchTheme') === 'radio1') {
    document.querySelector('html').dataset['theme'] = '1';
    radioControl.style.left = '6%';
    radio1.setAttribute('checked', true);
  } else if (localStorage.getItem('switchTheme') === 'radio2') {
    document.querySelector('html').dataset['theme'] = '2';
    radioControl.style.left = '40%';
    radio2.setAttribute('checked', true);
  } else if (localStorage.getItem('switchTheme') === 'radio3') {
    document.querySelector('html').dataset['theme'] = '3';
    radioControl.style.left = '75%';
    radio3.setAttribute('checked', true);
  }
}

// if localstorage is null call the function getLocalStorage and SwitchTheme else call the function switchTheme
function verifyLocalStorage() {
  if (localStorage.getItem('switchTheme') == null) {
    radioControl.style.left = '6%';
    getLocalStorage();
    switchTheme();
  } else {
    switchTheme();
  }
}

verifyLocalStorage();

// call the function switchTheme and save themeId in localStorage when themeSwitcher change
themeSwitcher.forEach((theme) => {
  theme.addEventListener('change', () => {
    themeId = theme.id;
    localStorage.setItem('switchTheme', themeId);
    switchTheme();
  });
});
