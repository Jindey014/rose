// Create a single petal with specific parameters
function createPetal(layer, angle, scale, delay) {
    const petal = document.createElement('div');
    petal.className = 'petal';

    // Calculate start and final angles
    const startAngle = angle - 30;
    const finalAngle = angle;

    // Set CSS variables for animation
    petal.style.setProperty('--start-angle', `${startAngle}deg`);
    petal.style.setProperty('--final-angle', `${finalAngle}deg`);
    petal.style.setProperty('--scale', scale);

    // Position petal
    petal.style.top = '50%';
    petal.style.left = '50%';

    // Set animation
    petal.style.animation = `bloomPetal 1.5s ease-out ${delay}s forwards`;

    // Add to appropriate layer
    document.querySelector(`.petals-layer${layer}`).appendChild(petal);
}

// Create the complete rose
function createRose() {
    // Inner layer (layer 1)
    for (let i = 0; i < 6; i++) {
        createPetal(1, i * 60, 1, i * 0.1);
    }

    // Middle layer (layer 2)
    for (let i = 0; i < 8; i++) {
        createPetal(2, i * 45 + 22.5, 1.3, i * 0.1 + 0.3);
    }

    // Outer layer (layer 3)
    for (let i = 0; i < 10; i++) {
        createPetal(3, i * 36 + 18, 1.6, i * 0.1 + 0.6);
    }
}

// Create falling petal animation
function createFallingPetal() {
    const petal = document.createElement('div');
    petal.className = 'falling-petal';

    // Random starting position and movement
    const startX = Math.random() * window.innerWidth;
    const endX = startX + (Math.random() - 0.5) * 200; // Random drift left or right

    petal.style.setProperty('--start-x', `${startX}px`);
    petal.style.setProperty('--end-x', `${endX}px`);

    // Random animation duration between 2 and 5 seconds
    const duration = 2 + Math.random() * 3;
    petal.style.animation = `fall ${duration}s linear forwards`;

    // Set initial position
    petal.style.left = '0';
    petal.style.top = '0';

    document.body.appendChild(petal);

    // Clean up when animation ends
    petal.addEventListener('animationend', () => {
        petal.remove();
    });
}

// Button click handler for more falling petals
function showMorePetals() {
    // Create a burst of 15 petals with staggered timing
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createFallingPetal();
        }, i * 100);
    }
}

// Initialize the page
window.addEventListener('DOMContentLoaded', () => {
    // Create the rose
    createRose();

    // Add button click handler
    const forgivenessBtn = document.getElementById('forgivenessBtn');
    forgivenessBtn.addEventListener('click', showMorePetals);

    // Create initial falling petals
    for (let i = 0; i < 20; i++) {
        setTimeout(createFallingPetal, Math.random() * 3000);
    }

    // Add continuous falling petals
    setInterval(createFallingPetal, 2000);
});