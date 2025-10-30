// AI Agents Presentation - Interactive Controls

// State Management
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const progressFill = document.querySelector('.progress-fill');
const slideNumberDisplay = document.getElementById('slideNumber');
const currentTimeDisplay = document.getElementById('currentTime');

// Video Showcase - all videos play simultaneously
const showcaseVideos = document.querySelectorAll('.showcase-video');

// Initialize
function init() {
    updateProgressBar();
    updateSlideNumber();
    startClock();
    
    // Start all videos playing on slide 0
    if (currentSlide === 0) {
        playAllVideos();
    }
}

// Update slide number display
function updateSlideNumber() {
    slideNumberDisplay.textContent = `${currentSlide + 1} / ${totalSlides}`;
}

// Clock function
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    currentTimeDisplay.textContent = `${hours}:${minutes}`;
}

function startClock() {
    updateClock(); // Update immediately
    setInterval(updateClock, 1000); // Update every second
}

// Navigate to specific slide
function goToSlide(index) {
    // Validate index
    if (index < 0 || index >= totalSlides) return;
    
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    slides[currentSlide].classList.add('prev');
    
    // Update current slide index
    currentSlide = index;
    
    // Add active class to new slide
    slides[currentSlide].classList.remove('prev');
    slides[currentSlide].classList.add('active');
    
    // Scroll to top of the new slide
    slides[currentSlide].scrollTop = 0;
    
    // Update UI
    updateProgressBar();
    updateSlideNumber();
    
    // Handle video showcase - pause videos when leaving slide 0
    if (currentSlide !== 0) {
        pauseAllVideos();
    } else {
        playAllVideos();
    }
}

// Navigate to next slide
function nextSlide() {
    const nextIndex = (currentSlide + 1) % totalSlides;
    goToSlide(nextIndex);
}

// Navigate to previous slide
function prevSlide() {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(prevIndex);
}

// Update progress bar
function updateProgressBar() {
    const progress = ((currentSlide + 1) / totalSlides) * 100;
    progressFill.style.width = `${progress}%`;
}

// Video Showcase Functions - Play all simultaneously
function playAllVideos() {
    showcaseVideos.forEach(video => {
        video.play().catch(err => {
            console.log('Video autoplay prevented:', err);
        });
    });
}

function pauseAllVideos() {
    showcaseVideos.forEach(video => {
        video.pause();
    });
}

// Event Listeners - ONLY arrow button clicks
document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

// Initialize on page load
init();

// Add smooth animations to cards on slide change
slides.forEach(slide => {
    const cards = slide.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Manual click on video items to play specific video
videoItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        if (currentSlide === 0 && index !== currentPlayingVideo) {
            // Stop current video
            showcaseVideos[currentPlayingVideo].pause();
            videoItems[currentPlayingVideo].classList.remove('playing');
            
            // Play clicked video
            currentPlayingVideo = index;
            playNextVideo();
        }
    });
});

// Interactive Demo (Slide 2) - Component Data
const componentData = {
    environment: {
        title: '🌍 Environment',
        content: `
            <h3>🌍 Environment</h3>
            <h4>What it is:</h4>
            <p>Everything outside the agent that it can sense or affect.</p>
            <h4>Examples:</h4>
            <ul>
                <li>A user chatting with the agent</li>
                <li>A website or API the agent can access</li>
                <li>Business systems (CRM, ERP, analytics dashboards)</li>
            </ul>
            <h4>In the demo:</h4>
            <p>The environment provides raw data from the outside world that the agent needs to perceive and respond to.</p>
        `
    },
    perception: {
        title: '👁️ Perception (Sensors)',
        content: `
            <h3>👁️ Perception (Sensors)</h3>
            <h4>What it does:</h4>
            <p>Collects and interprets inputs from the environment.</p>
            <h4>Examples:</h4>
            <ul>
                <li>Reading a customer message</li>
                <li>Pulling data from a sales report</li>
                <li>Detecting temperature from a sensor</li>
            </ul>
            <h4>How it works:</h4>
            <p>Data flows from the environment into the agent through perception — like seeing, hearing, or reading information.</p>
        `
    },
    memory: {
        title: '💾 Memory / Knowledge Base',
        content: `
            <h3>💾 Memory / Knowledge Base</h3>
            <h4>What it does:</h4>
            <p>Stores what the agent already knows — facts, past conversations, learned data.</p>
            <h4>Examples:</h4>
            <ul>
                <li>Customer purchase history</li>
                <li>Context from earlier in the chat</li>
                <li>Vector database of knowledge or FAQs</li>
            </ul>
            <h4>In the demo:</h4>
            <p>Think of this as the agent's knowledge vault — a timeline of remembered items, previous questions, and stored facts.</p>
        `
    },
    reasoning: {
        title: '🧮 Reasoning & Decision Engine',
        content: `
            <h3>🧮 Reasoning & Decision Engine</h3>
            <h4>What it does:</h4>
            <p>Thinks about what's happening and decides what to do next.</p>
            <h4>Examples:</h4>
            <ul>
                <li>A chatbot deciding the next reply</li>
                <li>A marketing agent choosing which message to send</li>
                <li>A logistics agent picking the fastest delivery route</li>
            </ul>
            <h4>Under the hood:</h4>
            <p>This is where AI models (like GPT or decision logic) analyze data and plan actions — the "brain" of the agent.</p>
        `
    },
    action: {
        title: '⚙️ Action Layer (Actuators)',
        content: `
            <h3>⚙️ Action Layer (Actuators)</h3>
            <h4>What it does:</h4>
            <p>Executes actions in the real world.</p>
            <h4>Examples:</h4>
            <ul>
                <li>Sending a message</li>
                <li>Creating a report</li>
                <li>Updating a CRM record</li>
                <li>Triggering an automation or API call</li>
            </ul>
            <h4>In the demo:</h4>
            <p>This is where the agent takes concrete steps — sending emails, generating text, or executing commands.</p>
        `
    },
    feedback: {
        title: '🔁 Learning / Feedback Loop',
        content: `
            <h3>🔁 Learning / Feedback Loop</h3>
            <h4>What it does:</h4>
            <p>Evaluates results and improves over time.</p>
            <h4>Examples:</h4>
            <ul>
                <li>Learning which answers users rate highly</li>
                <li>Adjusting marketing strategies from results</li>
                <li>Improving predictions with new data</li>
            </ul>
            <h4>Visual cue:</h4>
            <p>The loop closes — data flows back to perception and memory for next time, creating continuous learning and adaptation.</p>
        `
    }
};

// Interactive Demo Event Handlers
const flowSteps = document.querySelectorAll('.flow-step');
const infoPanel = document.getElementById('infoPanel');
const infoPanelContent = document.getElementById('infoPanelContent');
const closePanel = document.getElementById('closePanel');
const modernToggle = document.getElementById('modernToggle');
const modernLayer = document.getElementById('modernLayer');

if (flowSteps.length > 0) {
    // Flow step click handlers
    flowSteps.forEach(step => {
        step.addEventListener('click', (e) => {
            e.stopPropagation();
            const component = step.dataset.component;
            showComponentInfo(component);
            
            // Highlight active step
            flowSteps.forEach(s => s.classList.remove('active'));
            step.classList.add('active');
        });
    });

    // Close panel handler
    if (closePanel) {
        closePanel.addEventListener('click', () => {
            infoPanel.classList.add('hidden');
            flowSteps.forEach(s => s.classList.remove('active'));
        });
    }

    // Modern toggle handler
    if (modernToggle) {
        modernToggle.addEventListener('click', () => {
            modernLayer.classList.toggle('hidden');
            modernToggle.classList.toggle('active');
            
            if (modernLayer.classList.contains('hidden')) {
                modernToggle.textContent = 'Show Modern AI Agent Layer';
            } else {
                modernToggle.textContent = 'Hide Modern AI Agent Layer';
            }
        });
    }
}

function showComponentInfo(component) {
    const data = componentData[component];
    if (data) {
        infoPanelContent.innerHTML = data.content;
        infoPanel.classList.remove('hidden');
    }
}

console.log('AI Agents Presentation loaded successfully!');
console.log('Controls: Click the navigation arrows on the sides to change slides');
console.log('Video Showcase: All videos play simultaneously');
console.log('Foundation Concepts: Click to expand accordion items');

