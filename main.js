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

// Skills toggle
const skillsContainer = document.getElementById('skillsContainer');
const skillsToggle = document.getElementById('skillsToggle');

if (skillsContainer && skillsToggle) {
  const isMobile = window.innerWidth <= 720;
  
  function initSkillsToggle() {
    if (window.innerWidth <= 720) {
      skillsContainer.classList.add('collapsed');
      skillsToggle.style.display = 'inline-flex';
    } else {
      skillsContainer.classList.remove('collapsed');
      skillsToggle.style.display = 'none';
    }
  }
  
  skillsToggle.addEventListener('click', () => {
    skillsContainer.classList.toggle('collapsed');
    skillsToggle.textContent = skillsContainer.classList.contains('collapsed') ? '+ Mais' : '- Menos';
  });
  
  window.addEventListener('resize', initSkillsToggle);
  initSkillsToggle();
}
 