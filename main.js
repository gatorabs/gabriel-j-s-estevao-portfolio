const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const languageToggle = document.getElementById('languageToggle');

const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
const savedLang = localStorage.getItem('portfolio-lang') || 'pt';

root.dataset.theme = savedTheme;
root.dataset.lang = savedLang;
updateButtons();

themeToggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('portfolio-theme', root.dataset.theme);
  updateButtons();
});

languageToggle.addEventListener('click', () => {
  root.dataset.lang = root.dataset.lang === 'pt' ? 'en' : 'pt';
  localStorage.setItem('portfolio-lang', root.dataset.lang);
  updateButtons();
});

function updateButtons() {
  themeToggle.textContent = root.dataset.theme === 'dark' ? '☾' : '☀';
  languageToggle.textContent = root.dataset.lang === 'pt' ? 'EN' : 'PT';
  document.documentElement.lang = root.dataset.lang === 'pt' ? 'pt-BR' : 'en';
}
 