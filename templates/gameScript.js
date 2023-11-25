const robot = document.getElementById('robot');
        const gameContainer = document.getElementById('game-container');

        gameContainer.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const robotX = robot.offsetLeft + robot.offsetWidth / 2;
            const robotY = robot.offsetTop + robot.offsetHeight / 2;

            const angle = Math.atan2(mouseY - robotY, mouseX - robotX);
            const angleDeg = angle * (180 / Math.PI);
        });

        function createMissile() {
            const missile = document.createElement('div');
            missile.className = 'missile';
            gameContainer.appendChild(missile);

            const startPosition = Math.floor(Math.random() * 4);
            let startValue;

            switch (startPosition) {
                case 0: // Top
                    startValue = Math.random() * window.innerWidth;
                    missile.style.top = `0px`;
                    missile.style.left = `${startValue}px`;
                    break;
                case 1: // Right
                    startValue = Math.random() * window.innerHeight;
                    missile.style.top = `${startValue}px`;
                    missile.style.left = `${window.innerWidth}px`;
                    break;
                case 2: // Bottom
                    startValue = Math.random() * window.innerWidth;
                    missile.style.top = `${window.innerHeight}px`;
                    missile.style.left = `${startValue}px`;
                    break;
                case 3: // Left
                    startValue = Math.random() * window.innerHeight;
                    missile.style.top = `${startValue}px`;
                    missile.style.left = `0px`;
                    break;
            }

            const robotX = robot.offsetLeft + robot.offsetWidth / 2;
            const robotY = robot.offsetTop + robot.offsetHeight / 2;

            const missileX = parseFloat(missile.style.left) + missile.offsetWidth / 2;
            const missileY = parseFloat(missile.style.top) + missile.offsetHeight / 2;

            const distance = Math.sqrt(Math.pow(robotX - missileX, 2) + Math.pow(robotY - missileY, 2));

            const speed = 150; // Adjust the speed as needed

            const duration = distance / speed;

            missile.style.transition = `top ${duration}s linear, left ${duration}s linear`;
            missile.style.top = `${robotY - missile.offsetHeight / 2}px`;
            missile.style.left = `${robotX - missile.offsetWidth / 2}px`;

            missile.addEventListener('click', () => {
                missile.remove();
            });

            missile.addEventListener('transitionend', () => {
                missile.remove();
            });
        }

        // Initial delay before the first call
        setTimeout(() => {
            createMissile();

            // Subsequent calls at regular intervals
            setInterval(createMissile, 2000);
        }, 10000); // Adjust the initial delay time in milliseconds (5000ms = 5 seconds)