document.addEventListener("DOMContentLoaded", () => {
    const planets = [
        { name: 'Tatooine', info: 'A desert planet with two suns.', x: 50, y: 70, image: '/images/Tatooine.png' },
        { name: 'Rodia', info: 'The capital of the Galactic Republic.', x: 80, y: 30, image: '/images/rodia.png' },
        { name: 'Naboo', info: 'An icy planet and the site of a Rebel Alliance base.', x: 20, y: 40, image: '/images/naboo.png' },
        { name: 'Mustafar', info: 'An icy planet and the site of a Rebel Alliance base.', x: 10, y: 50, image: '/images/mustafar.png' }

        // Add more planets as needed
    ];
  
        const map = document.getElementById('map');
        const popup = document.getElementById('popup');
        const planetName = document.getElementById('planet-name');
        const planetInfo = document.getElementById('planet-info');
        const closeBtn = document.querySelector('.close-btn');
    
        planets.forEach(planet => {
            const container = document.createElement('div');
            container.classList.add('planet-container');
            container.style.left = `${planet.x}%`;
            container.style.top = `${planet.y}%`;
    
            const div = document.createElement('div');
            div.classList.add('planet');
            div.style.backgroundImage = `url('${planet.image}')`;
            div.title = planet.name;
    
            const text = document.createElement('div');
            text.classList.add('planet-text');
            text.textContent = planet.name;
    
            container.appendChild(div);
            container.appendChild(text);
    
            container.addEventListener('click', () => {
                planetName.textContent = planet.name;
                planetInfo.textContent = planet.info;
                popup.classList.remove('hidden');
            });
    
            map.appendChild(container);
        });
    
        closeBtn.addEventListener('click', () => {
            popup.classList.add('hidden');
        });
    
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.add('hidden');
            }
        });
    });
    