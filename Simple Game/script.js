// Game data structure
const gameData = {
    start: {
        text: "You hop into your space rocket and blast off into the stars. Suddenly, a friendly robot named Cosmo appears on your screen!",
        options: [
            { text: "Say hello to Cosmo", next: "meetCosmo" },
            { text: "Ask Cosmo where to find adventure", next: "adventure" },
            { text: "Invite Cosmo to join your journey", next: "joinJourney" }
        ]
    },
    meetCosmo: {
        text: "Cosmo beams with joy and says, 'Let's explore the universe together! Choose a color, and I'll show you something amazing.'",
        action: "chooseColor"
    },
    adventure: {
        text: "Cosmo winks, 'Adventure awaits! Pick a color, and we'll find wonders beyond imagination.'",
        action: "chooseColor"
    },
    joinJourney: {
        text: "Cosmo hops aboard your rocket. 'I'm excited! Let's pick a color to set our course.'",
        action: "chooseColor"
    },
    chooseColor: {
        text: "Which color do you choose?",
        colors: [
            { color: "Red", next: "redPlanet" },
            { color: "Green", next: "greenMoon" },
            { color: "Blue", next: "blueStar" }
        ]
    },
    redPlanet: {
        text: "You arrive at the Red Planet, where mountains are made of strawberries! Cosmo asks, 'What should we do?'",
        options: [
            { text: "Climb the strawberry mountains", next: "climbMountains" },
            { text: "Eat strawberries", next: "eatStrawberries" },
            { text: "Fly to another color", next: "chooseColor" }
        ]
    },
    greenMoon: {
        text: "Landing on the Green Moon, you find forests of glowing emerald trees. Cosmo says, 'This is magical!'",
        options: [
            { text: "Explore the forest", next: "exploreForest" },
            { text: "Have a picnic", next: "havePicnic" },
            { text: "Fly to another color", next: "chooseColor" }
        ]
    },
    blueStar: {
        text: "Soaring to the Blue Star, you swim in a sky of sapphire bubbles! Cosmo laughs, 'Bubbly fun!'",
        options: [
            { text: "Pop bubbles", next: "popBubbles" },
            { text: "Collect bubbles", next: "collectBubbles" },
            { text: "Fly to another color", next: "chooseColor" }
        ]
    },
    // Additional scenes...
    climbMountains: {
        text: "You and Cosmo climb the sweet mountains, reaching the top to see a fantastic view of space candy clouds!",
        options: [
            { text: "Taste a cloud", next: "tasteCloud" },
            { text: "Fly to another color", next: "chooseColor" }
        ]
    },
    eatStrawberries: {
        text: "The strawberries are delicious! Cosmo does a happy dance. 'This is the best space snack ever!'",
        options: [
            { text: "Dance with Cosmo", next: "dance" },
            { text: "Fly to another color", next: "chooseColor" }
        ]
    },
    // ...Further scenes can be added similarly
    tasteCloud: {
        text: "The cloud tastes like cotton candy! What an adventure you've had with Cosmo.",
        options: [
            { text: "Restart Adventure", next: "start" }
        ]
    },
    dance: {
        text: "You both dance joyfully under the stars. The universe is full of wonders!",
        options: [
            { text: "Restart Adventure", next: "start" }
        ]
    },
    // End scenes...
};

// Game functionality
let currentNode = gameData.start;

function updateStory(node) {
    const storyDiv = document.getElementById('story');
    const optionsDiv = document.getElementById('options');
    storyDiv.innerHTML = `<p>${node.text}</p>`;
    optionsDiv.innerHTML = '';

    if (node.action === "chooseColor") {
        node.colors.forEach(option => {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'color-option';
            colorDiv.style.backgroundColor = option.color.toLowerCase();
            colorDiv.onclick = () => {
                currentNode = gameData[option.next];
                updateStory(currentNode);
            };
            optionsDiv.appendChild(colorDiv);
        });
    } else if (node.options) {
        node.options.forEach(option => {
            const button = document.createElement('div');
            button.className = 'option';
            button.textContent = option.text;
            button.onclick = () => {
                currentNode = gameData[option.next];
                updateStory(currentNode);
            };
            optionsDiv.appendChild(button);
        });
    } else {
        // End of the story
        const restartButton = document.createElement('div');
        restartButton.className = 'option';
        restartButton.textContent = 'Restart Adventure';
        restartButton.onclick = () => {
            currentNode = gameData.start;
            updateStory(currentNode);
        };
        optionsDiv.appendChild(restartButton);
    }
}

// Initialize the game
updateStory(currentNode);
