window.addEventListener('DOMContentLoaded', () => {
    const locationSpan = document.querySelector('.terminal_location');
    const cursorSpan = document.querySelector('.terminal_cursor');
    const contentDiv = document.querySelector('.terminal_output');

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
        contentDiv.innerHTML = '';
        runCommand(cmd);
    }

    function renderMenu(items) {
        contentDiv.innerHTML = `
      <ul class="cmd-list">
        ${items.map(i => `<li data-cmd="${i.cmd}">${i.label}</li>`).join('')}
      </ul>`;
        contentDiv.style.display = 'block';

        contentDiv.querySelectorAll('li').forEach(li => {
            li.addEventListener('click', () => {
                executeCommand(li.dataset.cmd);
            });
        });
    }

    function runCommand(cmd) {
        if (cmd === 'ls' || cmd === 'cd ..') {
            renderMenu([
                { cmd: 'cat contact', label: 'contact.txt' },
                { cmd: 'cat skills', label: 'skills.json' },
                { cmd: 'cd projects', label: 'projects/' },
            ]);
            return;
        }

        if (cmd.startsWith('cat ')) {
            const file = cmd.split(' ')[1];
            contentDiv.style.display = 'block';

            if (file === 'contact') {
                contentDiv.innerHTML = `
          <ul>
            <li><a href="https://github.com/gatorabs" target="_blank">github</a></li>
            <li><a href="https://www.linkedin.com/in/gabriel-jos%C3%A9-spioni-estev%C3%A3o-742403235/" target="_blank">linkedin</a></li>
            <li><a href="https://drive.google.com/file/d/1bkzUlNjgfZLJ6Ybokw7oN8X4zulfdbdH/view?usp=sharing" target="_blank">resume</a></li>
          </ul>
          <ul class="cmd-list">
            <li data-cmd="cd .." style="color: #ffffff; text-shadow: 0 0 3px #ffffff;">cd ..</li>
          </ul>
        `;
                contentDiv.querySelector('li[data-cmd="cd .."]').addEventListener('click', () => {
                    executeCommand('cd ..');
                });
            } else if (file === 'skills') {
                const skillsData = {
                    "languages": [
                        { name: "C#", frameworks: [{ name: ".NET" }, { name: "ASP.NET" }] },
                        { name: "Python", frameworks: [{ name: "Flask" }] },
                        { name: "C++" },
                    ],
                };
                contentDiv.innerHTML = `
  <pre><code class="language-json">${JSON.stringify(skillsData, null, 2)}</code></pre>
  <ul class="cmd-list">
    <li data-cmd="cd .." style="color: #ffffff; text-shadow: 0 0 3px #ffffff;">cd ..</li>
  </ul>
`;
                Prism.highlightAll();
                const cdEl = contentDiv.querySelector('li[data-cmd="cd .."]');
                cdEl.addEventListener('click', () => {
                    document.querySelector('.terminal_content').scrollTop = 0;
                    executeCommand('cd ..');
                });
            }
            return;
        }

        if (cmd === 'cd projects') {
            executeCommand('cd ..');
            return;
        }

        if (cmd.startsWith('ls ')) {
            const dir = cmd.split(' ')[1];
            contentDiv.style.display = 'block';
            contentDiv.innerHTML = `
        <p>Conteúdo de <strong>${dir}</strong>...</p>
        <ul class="cmd-list">
          <li data-cmd="ls">cd ..</li>
        </ul>`;
            contentDiv.querySelector('li').addEventListener('click', () => {
                executeCommand('ls');
            });
            return;
        }
    }

    executeCommand('ls');
});