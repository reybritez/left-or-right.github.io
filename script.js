// Clase para manejar la configuración inicial
class SetupManager {
    constructor() {
        // Banco de preguntas recomendadas
        this.recommendedQuestions = [
            {
                question: "¿Qué te gustaría cenar?",
                optionA: "Hamburguesas",
                optionB: "Lomito"
            },
            {
                question: "¿Qué te gustaría tomar?",
                optionA: "Cerveza",
                optionB: "Fernet"
            },
            {
                question: "¿Qué prefieres para el postre?",
                optionA: "Helado",
                optionB: "Flan"
            },
            {
                question: "¿Qué actividad prefieres?",
                optionA: "Ver una película",
                optionB: "Salir a caminar"
            },
            {
                question: "¿Qué música prefieres?",
                optionA: "Rock",
                optionB: "Reggaeton"
            },
            {
                question: "¿Qué estación del año prefieres?",
                optionA: "Verano",
                optionB: "Invierno"
            },
            {
                question: "¿Qué prefieres para desayunar?",
                optionA: "Café con tostadas",
                optionB: "Té con galletas"
            },
            {
                question: "¿Qué deporte prefieres?",
                optionA: "Fútbol",
                optionB: "Básquet"
            }
        ];
        
        this.selectedQuestions = [];
        this.customQuestions = [];
        
        this.setupScreen = document.getElementById('setupScreen');
        this.recommendedQuestionsContainer = document.getElementById('recommendedQuestions');
        this.startSurveyBtn = document.getElementById('startSurveyBtn');
        this.selectedCountSpan = document.getElementById('selectedCount');
        
        this.renderRecommendedQuestions();
        this.updateSelectedCount();
    }
    
    renderRecommendedQuestions() {
        this.recommendedQuestionsContainer.innerHTML = '';
        
        this.recommendedQuestions.forEach((q, index) => {
            const questionItem = document.createElement('div');
            questionItem.className = 'question-item recommended-question-item';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `question-${index}`;
            checkbox.checked = true; // Por defecto todas seleccionadas
            checkbox.addEventListener('change', () => this.updateSelectedCount());
            
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'question-content-wrapper';
            
            const label = document.createElement('label');
            label.htmlFor = `question-${index}`;
            label.className = 'question-label';
            
            const questionText = document.createElement('div');
            questionText.className = 'question-text';
            questionText.textContent = q.question;
            
            label.appendChild(questionText);
            
            // Campos editables para las opciones
            const optionsEditContainer = document.createElement('div');
            optionsEditContainer.className = 'options-edit-container';
            
            const optionAWrapper = document.createElement('div');
            optionAWrapper.className = 'option-edit-wrapper';
            const optionALabel = document.createElement('label');
            optionALabel.textContent = 'A:';
            optionALabel.className = 'option-edit-label';
            const optionAInput = document.createElement('input');
            optionAInput.type = 'text';
            optionAInput.className = 'option-edit-input';
            optionAInput.id = `optionA-${index}`;
            optionAInput.value = q.optionA;
            optionAInput.placeholder = 'Opción A';
            optionAWrapper.appendChild(optionALabel);
            optionAWrapper.appendChild(optionAInput);
            
            const optionBWrapper = document.createElement('div');
            optionBWrapper.className = 'option-edit-wrapper';
            const optionBLabel = document.createElement('label');
            optionBLabel.textContent = 'B:';
            optionBLabel.className = 'option-edit-label';
            const optionBInput = document.createElement('input');
            optionBInput.type = 'text';
            optionBInput.className = 'option-edit-input';
            optionBInput.id = `optionB-${index}`;
            optionBInput.value = q.optionB;
            optionBInput.placeholder = 'Opción B';
            optionBWrapper.appendChild(optionBLabel);
            optionBWrapper.appendChild(optionBInput);
            
            optionsEditContainer.appendChild(optionAWrapper);
            optionsEditContainer.appendChild(optionBWrapper);
            
            contentWrapper.appendChild(label);
            contentWrapper.appendChild(optionsEditContainer);
            
            questionItem.appendChild(checkbox);
            questionItem.appendChild(contentWrapper);
            
            this.recommendedQuestionsContainer.appendChild(questionItem);
        });
    }
    
    getSelectedQuestions() {
        const selected = [];
        
        // Obtener preguntas recomendadas seleccionadas con sus opciones editadas
        this.recommendedQuestions.forEach((q, index) => {
            const checkbox = document.getElementById(`question-${index}`);
            if (checkbox && checkbox.checked) {
                const optionAInput = document.getElementById(`optionA-${index}`);
                const optionBInput = document.getElementById(`optionB-${index}`);
                
                // Obtener los valores editados de los campos de entrada
                const editedOptionA = optionAInput ? optionAInput.value.trim() : q.optionA;
                const editedOptionB = optionBInput ? optionBInput.value.trim() : q.optionB;
                
                // Validar que las opciones no estén vacías
                if (editedOptionA && editedOptionB) {
                    selected.push({
                        question: q.question,
                        optionA: editedOptionA,
                        optionB: editedOptionB
                    });
                }
            }
        });
        
        // Agregar preguntas personalizadas
        selected.push(...this.customQuestions);
        
        return selected;
    }
    
    updateSelectedCount() {
        const count = this.getSelectedQuestions().length;
        this.selectedCountSpan.textContent = count;
        this.startSurveyBtn.disabled = count === 0;
    }
    
    addCustomQuestion(question, optionA, optionB) {
        if (!question || !optionA || !optionB) {
            alert('Por favor completa todos los campos');
            return false;
        }
        
        const newQuestion = {
            question: question.trim(),
            optionA: optionA.trim(),
            optionB: optionB.trim()
        };
        
        this.customQuestions.push(newQuestion);
        this.updateSelectedCount();
        
        // Agregar visualmente a la lista
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item custom-question-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `custom-question-${this.customQuestions.length - 1}`;
        checkbox.checked = true;
        checkbox.addEventListener('change', () => this.updateSelectedCount());
        
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.className = 'question-label';
        
        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.textContent = newQuestion.question;
        
        const optionsText = document.createElement('div');
        optionsText.className = 'question-options';
        optionsText.textContent = `A: ${newQuestion.optionA} | B: ${newQuestion.optionB}`;
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-question-btn';
        removeBtn.textContent = '✕';
        removeBtn.onclick = () => {
            const index = this.customQuestions.indexOf(newQuestion);
            if (index > -1) {
                this.customQuestions.splice(index, 1);
                questionItem.remove();
                this.updateSelectedCount();
            }
        };
        
        label.appendChild(questionText);
        label.appendChild(optionsText);
        
        questionItem.appendChild(checkbox);
        questionItem.appendChild(label);
        questionItem.appendChild(removeBtn);
        
        this.recommendedQuestionsContainer.appendChild(questionItem);
        
        return true;
    }
}

// Clase del juego
class LeftRightGame {
    constructor(questions) {
        this.questionNumber = 0;
        this.isGameOver = false;
        this.currentQuestionIndex = 0;
        this.userSelections = [];
        this.questions = questions || [];
        
        // Elementos del DOM
        this.questionElement = document.getElementById('question');
        this.optionsContainer = document.getElementById('optionsContainer');
        this.questionNumberElement = document.getElementById('questionNumber');
        this.totalQuestionsElement = document.getElementById('totalQuestions');
        this.gameOverScreen = document.getElementById('gameOver');
        this.finalScoreElement = document.getElementById('finalScore');
        this.resultsContainer = document.getElementById('resultsContainer');
        this.finishButton = document.getElementById('finishButton');
        
        // Crear opciones dinámicamente
        this.createOptions();
        
        // Configurar total de preguntas
        this.totalQuestionsElement.textContent = this.questions.length;
        
        this.setupEventListeners();
        this.loadQuestion();
    }

    createOptions() {
        // Limpiar contenedor
        this.optionsContainer.innerHTML = '';
        
        // Crear opción A
        const optionA = document.createElement('div');
        optionA.className = 'option option-a';
        optionA.id = 'optionA';
        optionA.onclick = () => this.selectOption('A');
        
        const labelA = document.createElement('div');
        labelA.className = 'option-label';
        labelA.textContent = 'A';
        
        const textA = document.createElement('div');
        textA.className = 'option-text';
        textA.id = 'textA';
        
        optionA.appendChild(labelA);
        optionA.appendChild(textA);
        
        // Crear opción B
        const optionB = document.createElement('div');
        optionB.className = 'option option-b';
        optionB.id = 'optionB';
        optionB.onclick = () => this.selectOption('B');
        
        const labelB = document.createElement('div');
        labelB.className = 'option-label';
        labelB.textContent = 'B';
        
        const textB = document.createElement('div');
        textB.className = 'option-text';
        textB.id = 'textB';
        
        optionB.appendChild(labelB);
        optionB.appendChild(textB);
        
        // Agregar al contenedor
        this.optionsContainer.appendChild(optionA);
        this.optionsContainer.appendChild(optionB);
        
        // Guardar referencias
        this.optionA = optionA;
        this.optionB = optionB;
        this.optionAText = textA;
        this.optionBText = textB;
    }

    setupEventListeners() {
        // Eventos de teclado
        document.addEventListener('keydown', (e) => {
            if (this.isGameOver) return;
            const key = e.key.toLowerCase();
            if (key === 'a') {
                this.selectOption('A');
            } else if (key === 'b') {
                this.selectOption('B');
            }
        });
        
        // Eventos táctiles para móviles (swipe izquierda/derecha)
        let touchStartX = 0;
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
        
        document.addEventListener('touchend', (e) => {
            if (this.isGameOver) return;
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.selectOption('A');
                } else {
                    this.selectOption('B');
                }
            }
        });
    }

    selectOption(choice) {
        if (this.isGameOver) return;

        const currentQuestion = this.questions[this.currentQuestionIndex];
        
        // Guardar la selección
        this.userSelections.push({
            questionNumber: this.questionNumber + 1,
            question: currentQuestion.question,
            selectedOption: choice,
            selectedText: choice === 'A' ? currentQuestion.optionA : currentQuestion.optionB,
            optionA: currentQuestion.optionA,
            optionB: currentQuestion.optionB
        });

        // Animación de selección
        const selectedOption = choice === 'A' ? this.optionA : this.optionB;
        selectedOption.classList.add('selected');
        
        // Deshabilitar ambas opciones temporalmente
        this.optionA.style.pointerEvents = 'none';
        this.optionB.style.pointerEvents = 'none';
        
        // Mostrar botón de finalizar si hay al menos una respuesta
        if (this.userSelections.length > 0) {
            this.finishButton.style.display = 'block';
        }
        
        // Esperar un momento para mostrar la animación, luego cargar siguiente pregunta
        setTimeout(() => {
            selectedOption.classList.remove('selected');
            this.nextQuestion();
        }, 500);
    }

    loadQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.finishGame();
            return;
        }
        
        const currentQuestion = this.questions[this.currentQuestionIndex];
        
        this.questionElement.textContent = currentQuestion.question;
        this.optionAText.textContent = currentQuestion.optionA;
        this.optionBText.textContent = currentQuestion.optionB;
        
        // Habilitar las opciones
        this.optionA.style.pointerEvents = 'auto';
        this.optionB.style.pointerEvents = 'auto';
        
        // Animación de entrada
        this.questionElement.style.opacity = '0';
        this.optionA.style.opacity = '0';
        this.optionB.style.opacity = '0';
        
        setTimeout(() => {
            this.questionElement.style.opacity = '1';
            this.optionA.style.opacity = '1';
            this.optionB.style.opacity = '1';
        }, 100);
    }

    nextQuestion() {
        this.questionNumber++;
        this.currentQuestionIndex++;
        this.questionNumberElement.textContent = this.questionNumber;
        
        if (this.currentQuestionIndex >= this.questions.length) {
            this.finishGame();
            return;
        }
        
        this.loadQuestion();
    }

    finishGame() {
        this.isGameOver = true;
        this.finalScoreElement.textContent = this.userSelections.length;
        
        // Lanzar confeti
        launchConfetti();
        
        // Mostrar pantalla de resultados con animación
        this.gameOverScreen.style.display = 'block';
        this.gameOverScreen.style.opacity = '0';
        
        setTimeout(() => {
            this.gameOverScreen.style.transition = 'opacity 0.5s ease';
            this.gameOverScreen.style.opacity = '1';
        }, 100);
        
        this.finishButton.style.display = 'none';
        
        // Mostrar resultados después de un pequeño delay
        setTimeout(() => {
            this.showResults();
        }, 300);
    }

    showResults() {
        this.resultsContainer.innerHTML = '';
        
        if (this.userSelections.length === 0) {
            this.resultsContainer.innerHTML = '<p>No hay selecciones para mostrar.</p>';
            return;
        }
        
        const resultsTitle = document.createElement('h3');
        resultsTitle.textContent = '🎉 Tus Selecciones 🎉';
        resultsTitle.className = 'results-title';
        this.resultsContainer.appendChild(resultsTitle);
        
        const resultsList = document.createElement('div');
        resultsList.className = 'results-list';
        
        this.userSelections.forEach((selection, index) => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.style.opacity = '0';
            resultItem.style.transform = 'translateY(20px)';
            
            const questionDiv = document.createElement('div');
            questionDiv.className = 'result-question';
            questionDiv.innerHTML = `<span class="question-number">${selection.questionNumber}</span> ${selection.question}`;
            
            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'result-options';
            
            const optionA = document.createElement('div');
            optionA.className = selection.selectedOption === 'A' ? 'result-option selected' : 'result-option';
            optionA.innerHTML = `<span class="option-label-badge">A</span><span class="option-text">${selection.optionA}</span>`;
            
            const optionB = document.createElement('div');
            optionB.className = selection.selectedOption === 'B' ? 'result-option selected' : 'result-option';
            optionB.innerHTML = `<span class="option-label-badge">B</span><span class="option-text">${selection.optionB}</span>`;
            
            optionsDiv.appendChild(optionA);
            optionsDiv.appendChild(optionB);
            
            resultItem.appendChild(questionDiv);
            resultItem.appendChild(optionsDiv);
            resultsList.appendChild(resultItem);
            
            // Animación escalonada
            setTimeout(() => {
                resultItem.style.transition = 'all 0.4s ease';
                resultItem.style.opacity = '1';
                resultItem.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });
        
        this.resultsContainer.appendChild(resultsList);
    }

    reset() {
        this.questionNumber = 0;
        this.currentQuestionIndex = 0;
        this.isGameOver = false;
        this.userSelections = [];
        this.questionNumberElement.textContent = '0';
        this.gameOverScreen.style.display = 'none';
        this.finishButton.style.display = 'none';
        this.loadQuestion();
    }
}

// Variables globales
let setupManager;
let game;

// Función para agregar pregunta personalizada
function addCustomQuestion() {
    const question = document.getElementById('customQuestion').value;
    const optionA = document.getElementById('customOptionA').value;
    const optionB = document.getElementById('customOptionB').value;
    
    if (setupManager.addCustomQuestion(question, optionA, optionB)) {
        // Limpiar campos
        document.getElementById('customQuestion').value = '';
        document.getElementById('customOptionA').value = '';
        document.getElementById('customOptionB').value = '';
    }
}

// Función para iniciar la encuesta
function startSurvey() {
    const selectedQuestions = setupManager.getSelectedQuestions();
    
    if (selectedQuestions.length === 0) {
        alert('Por favor selecciona al menos una pregunta');
        return;
    }
    
    // Ocultar pantalla de configuración
    document.getElementById('setupScreen').style.display = 'none';
    
    // Mostrar contenedor del juego
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.style.display = 'flex';
    
    // Inicializar el juego con las preguntas seleccionadas
    game = new LeftRightGame(selectedQuestions);
}

// Función para lanzar confeti
function launchConfetti() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            createConfettiPiece(colors);
        }, i * 10);
    }
}

function createConfettiPiece(colors) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.width = Math.random() * 10 + 5 + 'px';
    confetti.style.height = confetti.style.width;
    confetti.style.position = 'fixed';
    confetti.style.top = '-10px';
    confetti.style.zIndex = '9999';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    confetti.style.opacity = '0.9';
    confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
    
    document.body.appendChild(confetti);
    
    const animationDuration = Math.random() * 2000 + 2000;
    const horizontalMovement = (Math.random() - 0.5) * 200;
    
    confetti.style.transition = `all ${animationDuration}ms ease-out`;
    
    setTimeout(() => {
        confetti.style.top = window.innerHeight + 'px';
        confetti.style.left = (parseFloat(confetti.style.left) + horizontalMovement) + 'px';
        confetti.style.transform = `rotate(${Math.random() * 720}deg)`;
        confetti.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
        confetti.remove();
    }, animationDuration + 100);
}

function selectOption(choice) {
    if (game) {
        game.selectOption(choice);
    }
}

// Función global para finalizar el juego
function finishGame() {
    if (game) {
        game.finishGame();
    }
}

// Función global para reiniciar el juego
function resetGame() {
    if (game) {
        game.reset();
    }
}

// Inicializar cuando la página carga
document.addEventListener('DOMContentLoaded', () => {
    setupManager = new SetupManager();
    
    // Permitir agregar pregunta con Enter
    document.getElementById('customQuestion').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addCustomQuestion();
        }
    });
    
    document.getElementById('customOptionA').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('customOptionB').focus();
        }
    });
    
    document.getElementById('customOptionB').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addCustomQuestion();
        }
    });
});
