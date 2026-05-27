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

// Calcular duração automática
function calculateDuration(startDate, lang) {
  const start = new Date(startDate);
  const now = new Date();
  
  let months = (now.getFullYear() - start.getFullYear()) * 12;
  months += now.getMonth() - start.getMonth();
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years === 0) {
    return lang === 'pt' ? `${months} mês` : `${months} month`;
  } else if (remainingMonths === 0) {
    const yearText = lang === 'pt' ? (years === 1 ? 'ano' : 'anos') : (years === 1 ? 'year' : 'years');
    return `${years} ${yearText}`;
  } else {
    const yearText = lang === 'pt' ? (years === 1 ? 'ano' : 'anos') : (years === 1 ? 'year' : 'years');
    const monthText = lang === 'pt' ? (remainingMonths === 1 ? 'mês' : 'meses') : (remainingMonths === 1 ? 'month' : 'months');
    return `${years} ${yearText} ${remainingMonths} ${monthText}`;
  }
}

document.querySelectorAll('.role-duration').forEach(element => {
  const startDate = element.dataset.startDate;
  const lang = element.dataset.lang;
  const durationText = calculateDuration(startDate, lang);
  
  const text = element.textContent;
  element.textContent = text.replace('[duração]', durationText).replace('[duration]', durationText);
});

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
 