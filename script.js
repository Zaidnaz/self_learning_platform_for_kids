// script.js

// 1. YouTube Video Mapping
const videoLinks = {
    english: "HcGFpEk1Gp0",
    math: "U3zBzQIIROQ",
    nature: "2tHrxdtN_i0",
    hindi: "iiJ7ljS0I50"
};

// 2. Question Bank (Updated)
const questionBank = {
    math: [
        { q: "🍎 + 🍎 = ?", a: ["2", "3", "1", "4"], correct: 0, visual: "🍎🍎" },
        { q: "3 - 1 = ?", a: ["2", "5", "0", "3"], correct: 0, visual: "🖐️" },
        { q: "Which is BIGGER?", a: ["🐘", "🐜", "🐱", "🐁"], correct: 0, visual: "⚖️" }
    ],
    english: [
        { q: "A for...?", a: ["Apple", "Ball", "Cat", "Dog"], correct: 0, visual: "🅰️" },
        { q: "Find the CAT", a: ["🐶", "🐱", "🐮", "🐷"], correct: 1, visual: "🔍" },
        { q: "Opposite of HOT?", a: ["Cold", "Big", "Red", "Up"], correct: 0, visual: "🔥" }
    ],
    nature: [
        { q: "Who lives in water?", a: ["🐟", "🦅", "🦁", "🐒"], correct: 0, visual: "🌊" },
        { q: "Color of the Sun?", a: ["Yellow", "Blue", "Green", "Pink"], correct: 0, visual: "☀️" },
        { q: "Which is a fruit?", a: ["🥕", "🥦", "🍌", "🥔"], correct: 2, visual: "🧺" }
    ],
    hindi: [
        { q: "आम (Mango)?", a: ["🥭", "🍎", "🍌", "🍇"], correct: 0, visual: "😋" },
        { q: "एक (1) + एक (1) = ?", a: ["दो (2)", "तीन (3)", "चार (4)", "पाँच (5)"], correct: 0, visual: "🔢" }
    ]
};

// 3. Translations
const translations = {
    en: { 
        welcome: "Welcome!", enterName: "Your Name:", start: "Let's Go!", 
        dashboard: "My Dashboard", profile: "My Profile", slate: "Magic Slate",
        math: "Math", nature: "EVS / Science", english: "English", hindi: "Hindi",
        watch: "📺 Watch", quiz: "🎮 Quiz", 
        score: "Score:", chooseAvatar: "Choose Your Hero:", save: "Save Profile",
        logout: "Logout"
    },
    hi: { 
        welcome: "स्वागत है!", enterName: "तुम्हारा नाम:", start: "चलो चलें!", 
        dashboard: "मेरा डैशबोर्ड", profile: "मेरी प्रोफाइल", slate: "जादुई स्लेट",
        math: "गणित", nature: "पर्यावरण (EVS)", english: "अंग्रेजी", hindi: "हिंदी",
        watch: "📺 देखो", quiz: "🎮 खेलो", 
        score: "अंक:", chooseAvatar: "अपना अवतार चुनें:", save: "सेव करें",
        logout: "बाहर जाएं"
    },
    te: { 
        welcome: "స్వాగతం!", enterName: "నీ పేరు:", start: "పదండి!", 
        dashboard: "నా డాష్‌బోర్డ్", profile: "నా ప్రొఫైల్", slate: "మ్యాజిక్ స్లేట్",
        math: "గణితం", nature: "పర్యావరణం (EVS)", english: "ఆంగ్లం", hindi: "హిందీ",
        watch: "📺 చూడు", quiz: "🎮 ఆడు", 
        score: "స్కోరు:", chooseAvatar: "నీ బొమ్మను ఎంచుకో:", save: "సేవ్ చేయండి",
        logout: "లాగౌట్"
    },
    kn: { 
        welcome: "ಸ್ವಾಗತ!", enterName: "ನಿಮ್ಮ ಹೆಸರು:", start: "ಹೋಗೋಣ!", 
        dashboard: "ನನ್ನ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", profile: "ನನ್ನ ಪ್ರೊಫైಲ್", slate: "ಮ್ಯಾಜಿಕ್ ಸ್ಲೇಟ್",
        math: "ಗಣಿತ", nature: "ಪರಿಸರ (EVS)", english: "ಇಂಗ್ಲಿಷ್", hindi: "ಹಿಂದಿ",
        watch: "📺 ನೋಡಿ", quiz: "🎮 ಆಟ", 
        score: "ಅಂಕಗಳು:", chooseAvatar: "ನಿಮ್ಮ ಚಿತ್ರ ಆರಿಸಿ:", save: "ಉಳಿಸಿ",
        logout: "ಲಾಗ್ ಔಟ್"
    }
};

let currentUser = JSON.parse(localStorage.getItem('kidUser')) || { 
    name: "", lang: "en", score: 0, avatar: "🐼" 
};

document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    const langSelect = document.getElementById('global-lang');
    if(langSelect) langSelect.value = currentUser.lang;
});

function setLanguage(lang) {
    currentUser.lang = lang;
    localStorage.setItem('kidUser', JSON.stringify(currentUser));
    updateUI();
}

function updateUI() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(translations[currentUser.lang][key]) {
            el.innerText = translations[currentUser.lang][key];
        }
    });
    document.querySelectorAll('.user-name').forEach(el => el.innerText = currentUser.name || "Friend");
    document.querySelectorAll('.user-score').forEach(el => el.innerText = currentUser.score);
    document.querySelectorAll('.user-avatar').forEach(el => el.innerText = currentUser.avatar);
}

function login() {
    const name = document.getElementById('nameInput').value;
    if(name) {
        currentUser.name = name;
        localStorage.setItem('kidUser', JSON.stringify(currentUser));
        window.location.href = 'dashboard.html';
    } else {
        alert("Please enter a name!");
    }
}

function logout() {
    localStorage.removeItem('kidUser');
    window.location.href = 'index.html';
}

// --- QUIZ LOGIC with CONFETTI ---
let currentQuiz = [];
let questionIndex = 0;

function loadQuestionUI(subject) {
    if(!questionBank[subject]) subject = 'math'; // Default fallback
    const qList = questionBank[subject];
    
    // Check if finished
    if(questionIndex >= qList.length) {
        document.getElementById('quiz-container').innerHTML = `
            <div class='text-center'>
                <span style='font-size:5rem'>🏆</span>
                <h2 class="mt-3">Finished!</h2>
                <h3 class="text-warning">Total Score: ${currentUser.score}</h3>
                <a href='dashboard.html' class='btn btn-lg btn-warning rounded-pill mt-3 fw-bold'>Go Home</a>
            </div>`;
        return;
    }

    const qData = qList[questionIndex];
    document.getElementById('question-text').innerText = qData.q;
    document.getElementById('question-visual').innerText = qData.visual;
    
    const optionsDiv = document.getElementById('options-grid');
    optionsDiv.innerHTML = ''; 

    qData.a.forEach((ans, index) => {
        const btn = document.createElement('div');
        btn.className = 'quiz-option col-12 col-md-5'; 
        btn.innerText = ans;
        btn.onclick = () => checkAnswer(btn, index === qData.correct, subject);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(btn, isCorrect, subject) {
    if(isCorrect) {
        btn.classList.add('correct');
        btn.innerHTML += " ✅";
        currentUser.score += 10;
        localStorage.setItem('kidUser', JSON.stringify(currentUser));
        document.getElementById('user-score').innerText = currentUser.score;
        
        // FIRE CONFETTI
        fireConfetti();
        
        setTimeout(() => {
            questionIndex++;
            loadQuestionUI(subject);
        }, 1500);
    } else {
        btn.classList.add('wrong');
        btn.innerHTML += " ❌";
    }
}

function fireConfetti() {
    // Requires canvas-confetti library
    if(typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}