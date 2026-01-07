// script.js

// --- 1. EXPANDED QUESTION BANK ---
// We use emojis as images to keep it simple and offline-friendly
const questionBank = {
    math: [
        { q: "🍎 + 🍎 = ?", a: ["2", "3", "1", "4"], correct: 0, visual: "🍎🍎" },
        { q: "3 - 1 = ?", a: ["2", "5", "0", "3"], correct: 0, visual: "🖐️" },
        { q: "Which is BIGGER?", a: ["🐘", "🐜", "🐱", "🐁"], correct: 0, visual: "⚖️" } // Answer: Elephant
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
    logic: [
        { q: "Complete pattern: 🔴 🔵 🔴 ...", a: ["🔵", "🔴", "🟢", "🟡"], correct: 0, visual: "🎨" },
        { q: "Which one flies?", a: ["✈️", "🚗", "🚲", "🚌"], correct: 0, visual: "☁️" }
    ]
};

// --- TRANSLATIONS (Updated) ---
const translations = {
    en: { dashboard: "My Dashboard", quiz: "Quiz Time", math: "Math", nature: "Nature", logic: "Brain Power", english: "English", goodJob: "Good Job!", tryAgain: "Try Again!" },
    hi: { dashboard: "मेरा डैशबोर्ड", quiz: "क्विज समय", math: "गणित", nature: "प्रकृति", logic: "दिमाग का खेल", english: "अंग्रेजी", goodJob: "बहुत अच्छे!", tryAgain: "फिर कोशिश करो!" },
    te: { dashboard: "నా డాష్‌బోర్డ్", quiz: "క్విజ్ సమయం", math: "గణితం", nature: "ప్రకృతి", logic: "తెలివి తేటలు", english: "ఆంగ్లం", goodJob: "భలే!", tryAgain: "మళ్ళీ ప్రయత్నించు!" },
    kn: { dashboard: "ನನ್ನ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", quiz: "ರಸಪ್ರಶ್ನೆ", math: "ಗಣಿತ", nature: "ಪ್ರಕೃತಿ", logic: "ಬುದ್ಧಿವಂತಿಕೆ", english: "ಇಂಗ್ಲಿಷ್", goodJob: "ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ!", tryAgain: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ!" }
};

let currentUser = JSON.parse(localStorage.getItem('kidUser')) || { name: "Friend", lang: "en", score: 0 };

// --- CORE FUNCTIONS ---
document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(currentUser.lang);
    if(document.getElementById('user-score')) {
        document.getElementById('user-score').innerText = currentUser.score;
    }
});

function applyLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(translations[lang][key]) el.innerText = translations[lang][key];
    });
}

// --- QUIZ LOGIC ---
let currentQuiz = [];
let questionIndex = 0;

function startQuiz(subject) {
    // 1. Load questions
    currentQuiz = questionBank[subject];
    questionIndex = 0;
    
    // 2. Hide dashboard, Show Quiz UI (Simple toggle for single page feel, or redirect)
    // For this example, we assume we are on quiz.html and url params handle it
}

function loadQuestionUI(subject) {
    const qData = questionBank[subject][questionIndex];
    if(!qData) {
        document.getElementById('quiz-container').innerHTML = `
            <div class='text-center'>
                <h1 class='big-emoji'>🏆</h1>
                <h2>Quiz Complete!</h2>
                <a href='dashboard.html' class='btn btn-fun'>Go Home</a>
            </div>`;
        return;
    }

    document.getElementById('question-text').innerText = qData.q;
    document.getElementById('question-visual').innerText = qData.visual;
    
    const optionsDiv = document.getElementById('options-grid');
    optionsDiv.innerHTML = ''; // Clear old buttons

    qData.a.forEach((ans, index) => {
        const btn = document.createElement('div');
        btn.className = 'quiz-option col-12 col-md-5'; // Responsive grid
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
        
        // Wait 1 second then next question
        setTimeout(() => {
            questionIndex++;
            loadQuestionUI(subject);
        }, 1000);
    } else {
        btn.classList.add('wrong');
        btn.innerHTML += " ❌";
    }
}