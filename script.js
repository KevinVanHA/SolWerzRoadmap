document.addEventListener("DOMContentLoaded", () => {
    

    const map = document.getElementById('map');
    const background = document.getElementById('background');
    const mapContainer = document.getElementById('map-container');
    let scale = 1;
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    const updateScale = (newScale) => {
        scale = newScale;
        map.style.transform = `scale(${scale})`;
    };

    const updateParallax = () => {
        const rect = map.getBoundingClientRect();
        const xPercent = ((rect.left - mapContainer.offsetLeft) / mapContainer.clientWidth) * 100;
        const yPercent = ((rect.top - mapContainer.offsetTop) / mapContainer.clientHeight) * 100;
        background.style.transform = `translate(${xPercent / 10}%, ${yPercent / 10}%)`;
    };

    mapContainer.addEventListener('wheel', (event) => {
        event.preventDefault();
        if (event.deltaY < 0) {
            updateScale(scale + 0.1);
        } else {
            updateScale(scale - 0.1);
        }
        updateParallax();
    });

    mapContainer.addEventListener('mousedown', (event) => {
        isDragging = true;
        startX = event.clientX;
        startY = event.clientY;
        initialLeft = map.offsetLeft;
        initialTop = map.offsetTop;
        mapContainer.style.cursor = 'grabbing';
    });

    mapContainer.addEventListener('mouseup', () => {
        isDragging = false;
        mapContainer.style.cursor = 'grab';
    });

    mapContainer.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const dx = event.clientX - startX;
            const dy = event.clientY - startY;
            map.style.left = `${initialLeft + dx}px`;
            map.style.top = `${initialTop + dy}px`;
            updateParallax();
        }
    });

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

    // Close popup functionality
    const popup = document.getElementById('popup');
    const planetName = document.getElementById('planet-name');
    const planetInfo = document.getElementById('planet-info');
    const closeBtn = document.querySelector('.close-btn');

    closeBtn.addEventListener('click', () => {
        popup.classList.add('hidden');
    });

    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.add('hidden');
        }
    });
});
