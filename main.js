document.addEventListener('DOMContentLoaded', () => {
    const locationSpan = document.querySelector('.terminal_location');
    const cursorSpan = document.querySelector('.terminal_cursor');
    const contentDiv = document.querySelector('.terminal_content');

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    async function typeCommand(cmd) {
        cursorSpan.style.display = 'none';
        locationSpan.textContent = '~ $ ';
        for (const ch of cmd) {
            locationSpan.textContent += ch;
            await sleep(100);
        }
        await sleep(300);
        locationSpan.textContent = '~ $ ';
        cursorSpan.style.display = 'inline-block';
    }

    async function executeCommand(cmd) {
        await typeCommand(cmd);
        runCommand(cmd);
    }

    function renderMenu(items) {
        contentDiv.style.display = 'block';
        contentDiv.className = 'terminal_content'; // Reseta classes
        contentDiv.innerHTML = `
      <ul class="cmd-list">
        ${items.map(i => `<li data-cmd="${i.cmd}">${i.label}</li>`).join('')}
      </ul>`;

        contentDiv.querySelectorAll('li').forEach(li => {
            li.addEventListener('click', () => {
                contentDiv.innerHTML = '';
                executeCommand(li.dataset.cmd);
            });
        });
    }

    function runCommand(cmd) {
        // raiz
        if (cmd === 'ls' || cmd === 'cd ..') {
            renderMenu([
                { cmd: 'cat contact', label: 'contact.txt' },
                { cmd: 'cat skills', label: 'skills.json' },
                { cmd: 'cd projects', label: 'projects/' },
            ]);
            return;
        }

        // arquivos
        if (cmd.startsWith('cat ')) {
            const file = cmd.split(' ')[1];
            contentDiv.style.display = 'block';
            contentDiv.className = 'terminal_content'; // Reseta classes

            if (file === 'contact') {
                contentDiv.innerHTML = `
          <ul>
            <li><a href="https://github.com/gatorabs" target="_blank">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/gabriel-jos%C3%A9-spioni-estev%C3%A3o-742403235/" target="_blank">LinkedIn</a></li>
            <li><a href="https://drive.google.com/file/d/1bkzUlNjgfZLJ6Ybokw7oN8X4zulfdbdH/view?usp=sharing" target="_blank">Resume</a></li>
          </ul>
          <ul class="cmd-list">
            <li data-cmd="cd ..">cd ..</li>
          </ul>
        `;
            }
            else if (file === 'skills') {
                const skillsData = {
                    "languages": [
                        {
                            "name": "C#",
                            "frameworks": [
                                { "name": ".NET" },
                                { "name": "ASP.NET" } // Adding ASP.NET here too, as it's typically C# related
                            ]
                        },
                        {
                            "name": "Python",
                            "frameworks": [
                                { "name": "Flask" } // Adding Flask under Python
                            ]
                        },
                        { "name": "C++" }, // C++ doesn't have specific frameworks listed in your example
                    ],
                };

                contentDiv.classList.add('long-content');
                contentDiv.innerHTML = `
          <pre>${JSON.stringify(skillsData, null, 2)}</pre>
          <ul class="cmd-list">
            <li data-cmd="cd ..">cd ..</li>
          </ul>
        `;
            }

            // Adiciona evento de voltar
            contentDiv.querySelector('li[data-cmd="cd .."]')?.addEventListener('click', () => {
                contentDiv.innerHTML = '';
                executeCommand('cd ..');
            });
            return;
        }

        // pasta projects
        if (cmd === 'cd projects') {
            renderMenu([
                { cmd: 'ls', label: 'cd ..' },
                { cmd: 'ls portfolio-web', label: 'portfolio-web' },
                { cmd: 'ls fluxo-de-dados', label: 'fluxo-de-dados' },
                { cmd: 'ls visão-computacional', label: 'visão-computacional' },
            ]);
            return;
        }

        // sub-ls dentro de projects
        if (cmd.startsWith('ls ')) {
            const dir = cmd.split(' ')[1];
            contentDiv.style.display = 'block';
            contentDiv.className = 'terminal_content';
            contentDiv.innerHTML = `
        <p>Conteúdo de <strong>${dir}</strong>...</p>
        <ul class="cmd-list">
          <li data-cmd="ls">cd ..</li>
        </ul>`;
            contentDiv.querySelector('li').addEventListener('click', () => {
                contentDiv.innerHTML = '';
                executeCommand('ls');
            });
            return;
        }
    }

    // Inicia o terminal
    executeCommand('ls');
});