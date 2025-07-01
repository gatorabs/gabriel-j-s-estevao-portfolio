document.addEventListener('DOMContentLoaded', () => {
    const userElement = document.querySelector('.terminal_location');
    const terminalContent = document.querySelector('.terminal_content');
    const terminalCursor = document.querySelector('.terminal_cursor');
    
    let typingText = 'system_profiler';
    let currentCharIndex = 0;

    
    function typeCommand() {
        if (currentCharIndex < typingText.length) {
            userElement.textContent += typingText[currentCharIndex];
            currentCharIndex++;
            setTimeout(typeCommand, 100); 
        } else {
            
            setTimeout(() => {
                userElement.textContent = '~ $';
                showTerminalContent();
            }, 500);
        }
    }

    
    function showTerminalContent() {
        terminalContent.style.display = 'block'; 
        terminalContent.innerHTML += `
            <ul>
                <li><a href="https://github.com/gatorabs" target="_blank">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/gabriel-jos%C3%A9-spioni-estev%C3%A3o-742403235/" target="_blank">LinkedIn</a></li>
                <li><a href="https://drive.google.com/file/d/1bkzUlNjgfZLJ6Ybokw7oN8X4zulfdbdH/view?usp=sharing" target="_blank">Resume</a></li>
                <li><a href="mailto:gabrielprivate123@gmail.com" target="_blank">Email</a></li>
            </ul>
        `;
    }

    
    typeCommand();
});
