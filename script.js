// Estado global de la aplicación
let currentDisplay = '0';
let currentExpression = '';
let lives = 3;
let isSeriousMode = false;
let achievements = [];
let currentMessage = '';

// Mensajes sarcásticos
const sarcasticMessages = [
    "Eso fue difícil, ¿eh?",
    "¿Ejercicio mental o calentamiento?",
    "No hay límites para el ingenio humano.",
    "Wow, matemáticas avanzadas.",
    "¿Necesitas una calculadora para esto?",
    "Impresionante cálculo mental.",
    "¿Estás seguro de que necesitas ayuda?",
    "Esto es nivel preescolar.",
    "¿Practicando las tablas?",
    "Matemáticas básicas en acción.",
    "¿Realmente necesitas ayuda con esto?",
    "Esto es más fácil que contar hasta 3.",
    "¿Estás probando si la calculadora funciona?",
    "Nivel de dificultad: bebé.",
    "¿Quieres que te ayude con las tablas del 1?",
    "Esto es más simple que el ABC.",
    "¿Necesitas una calculadora para sumar 1+1?",
    "Impresionante, has descubierto las matemáticas básicas.",
    "¿Estás practicando para el jardín de niños?",
    "Esto es más fácil que respirar.",
    "¿Quieres que te explique qué es un número?",
    "Nivel de genio: mínimo.",
    "¿Estás seguro de que sabes usar una calculadora?",
    "Esto es más simple que decir 'hola'.",
    "¿Necesitas ayuda para contar con los dedos?",
    "Impresionante dominio de las matemáticas básicas.",
    "¿Estás en modo 'no puedo sumar'?",
    "Esto es más fácil que abrir una puerta."
];

// Easter eggs y logros
const easterEggs = {
    '5318008': {
        id: 'immaturity',
        title: 'Inmadurez Desbloqueada',
        description: 'Encontraste el número del diablo... al revés',
        icon: 'fas fa-smile-wink'
    },
    '42': {
        id: 'universe',
        title: 'La Respuesta Universal',
        description: 'La respuesta al universo y todo lo demás',
        icon: 'fas fa-infinity'
    },
    '07734': {
        id: 'hello',
        title: '¡Hola!',
        description: 'Al revés, claro...',
        icon: 'fas fa-hand-wave'
    },
    '666': {
        id: 'devil',
        title: 'Número del Diablo',
        description: '¿Buscando problemas?',
        icon: 'fas fa-fire'
    },
    '420': {
        id: 'weed',
        title: 'Número Especial',
        description: 'Un número muy... especial',
        icon: 'fas fa-leaf'
    },
    '1337': {
        id: 'leet',
        title: 'Leet Hacker',
        description: '¡Eres un verdadero hacker!',
        icon: 'fas fa-terminal'
    },
    '404': {
        id: 'notfound',
        title: 'Error 404',
        description: 'Resultado no encontrado... ¡Espera!',
        icon: 'fas fa-search'
    },
    '777': {
        id: 'lucky',
        title: '¡Suerte!',
        description: '¡Tres sietes! ¡Jackpot!',
        icon: 'fas fa-dice'
    },
    '123': {
        id: 'sequence',
        title: 'Secuencia Básica',
        description: 'Has descubierto el patrón más simple',
        icon: 'fas fa-sort-numeric-up'
    },
    '999': {
        id: 'emergency',
        title: '¡Emergencia!',
        description: '¿Necesitas ayuda de emergencia?',
        icon: 'fas fa-ambulance'
    },
    '007': {
        id: 'bond',
        title: 'James Bond',
        description: 'Licencia para calcular',
        icon: 'fas fa-user-secret'
    },
    '911': {
        id: 'emergency_us',
        title: '¡Emergencia USA!',
        description: '¿Qué emergencia matemática tienes?',
        icon: 'fas fa-phone'
    },
    '100': {
        id: 'perfect',
        title: '¡Perfecto!',
        description: '¡Cien por ciento!',
        icon: 'fas fa-star'
    },
    '0': {
        id: 'zero',
        title: 'Cero Absoluto',
        description: 'Nada, absolutamente nada',
        icon: 'fas fa-circle'
    },
    '1': {
        id: 'one',
        title: 'El Primero',
        description: 'El número más importante',
        icon: 'fas fa-crown'
    },
    '7': {
        id: 'seven',
        title: 'Número de la Suerte',
        description: '¡Siete! El número de la buena fortuna',
        icon: 'fas fa-clover'
    },
    '13': {
        id: 'unlucky',
        title: 'Número de la Mala Suerte',
        description: '¡Trece! ¿Por qué lo elegiste?',
        icon: 'fas fa-exclamation-triangle'
    },
    '21': {
        id: 'blackjack',
        title: '¡Blackjack!',
        description: '¡21! ¡Ganaste!',
        icon: 'fas fa-spade'
    },

    '88': {
        id: 'infinity',
        title: 'Doble Infinito',
        description: '88 = ∞∞ (infinito doble)',
        icon: 'fas fa-infinity'
    },
    '99': {
        id: 'almost',
        title: 'Casi Perfecto',
        description: '99% - Casi perfecto, pero no del todo',
        icon: 'fas fa-percentage'
    },
    '111': {
        id: 'ones',
        title: 'Tres Unos',
        description: '111 - ¿Ves el patrón?',
        icon: 'fas fa-sort-numeric-up'
    },
    '222': {
        id: 'twos',
        title: 'Tres Dos',
        description: '222 - ¿Otro patrón?',
        icon: 'fas fa-sort-numeric-up'
    },
    '333': {
        id: 'threes',
        title: 'Tres Tres',
        description: '333 - ¿Sigues viendo patrones?',
        icon: 'fas fa-sort-numeric-up'
    },
    '444': {
        id: 'fours',
        title: 'Tres Cuatros',
        description: '444 - ¿Cuántos patrones más?',
        icon: 'fas fa-sort-numeric-up'
    },
    '555': {
        id: 'fives',
        title: 'Tres Cincos',
        description: '555 - ¿Te aburres de los patrones?',
        icon: 'fas fa-sort-numeric-up'
    },
    '666': {
        id: 'devil',
        title: 'Número del Diablo',
        description: '¿Buscando problemas?',
        icon: 'fas fa-fire'
    },
    '777': {
        id: 'lucky',
        title: '¡Suerte!',
        description: '¡Tres sietes! ¡Jackpot!',
        icon: 'fas fa-dice'
    },
    '888': {
        id: 'triple_eight',
        title: 'Triple Ocho',
        description: '888 - Triple suerte',
        icon: 'fas fa-clover'
    },
    '999': {
        id: 'emergency',
        title: '¡Emergencia!',
        description: '¿Necesitas ayuda de emergencia?',
        icon: 'fas fa-ambulance'
    },
    '1000': {
        id: 'thousand',
        title: 'Mil',
        description: '¡Mil! Un número redondo',
        icon: 'fas fa-circle'
    }
};

// Operaciones simples que merecen sarcasmo
const simpleOperations = [
    // Sumas básicas
    '1+1', '2+2', '3+3', '4+4', '5+5', '1+2', '2+1', '1+3', '3+1', '1+4', '4+1',
    '1+5', '5+1', '1+6', '6+1', '1+7', '7+1', '1+8', '8+1', '1+9', '9+1',
    '2+3', '3+2', '2+4', '4+2', '2+5', '5+2', '2+6', '6+2', '2+7', '7+2',
    '2+8', '8+2', '2+9', '9+2', '3+4', '4+3', '3+5', '5+3', '3+6', '6+3',
    '3+7', '7+3', '3+8', '8+3', '3+9', '9+3', '4+5', '5+4', '4+6', '6+4',
    '4+7', '7+4', '4+8', '8+4', '4+9', '9+4', '5+6', '6+5', '5+7', '7+5',
    '5+8', '8+5', '5+9', '9+5', '6+7', '7+6', '6+8', '8+6', '6+9', '9+6',
    '7+8', '8+7', '7+9', '9+7', '8+9', '9+8',
    
    // Sumas con números menores a 10 (nuevas)
    '1+1', '1+2', '1+3', '1+4', '1+5', '1+6', '1+7', '1+8', '1+9',
    '2+1', '2+2', '2+3', '2+4', '2+5', '2+6', '2+7', '2+8', '2+9',
    '3+1', '3+2', '3+3', '3+4', '3+5', '3+6', '3+7', '3+8', '3+9',
    '4+1', '4+2', '4+3', '4+4', '4+5', '4+6', '4+7', '4+8', '4+9',
    '5+1', '5+2', '5+3', '5+4', '5+5', '5+6', '5+7', '5+8', '5+9',
    '6+1', '6+2', '6+3', '6+4', '6+5', '6+6', '6+7', '6+8', '6+9',
    '7+1', '7+2', '7+3', '7+4', '7+5', '7+6', '7+7', '7+8', '7+9',
    '8+1', '8+2', '8+3', '8+4', '8+5', '8+6', '8+7', '8+8', '8+9',
    '9+1', '9+2', '9+3', '9+4', '9+5', '9+6', '9+7', '9+8', '9+9',
    
    // Restas básicas
    '1-1', '2-2', '3-3', '4-4', '5-5', '6-6', '7-7', '8-8', '9-9', '10-10',
    '2-1', '3-1', '4-1', '5-1', '6-1', '7-1', '8-1', '9-1', '10-1',
    '3-2', '4-2', '5-2', '6-2', '7-2', '8-2', '9-2', '10-2',
    '4-3', '5-3', '6-3', '7-3', '8-3', '9-3', '10-3',
    '5-4', '6-4', '7-4', '8-4', '9-4', '10-4',
    '6-5', '7-5', '8-5', '9-5', '10-5',
    '7-6', '8-6', '9-6', '10-6',
    '8-7', '9-7', '10-7',
    '9-8', '10-8',
    '10-9',
    
    // Multiplicaciones básicas
    '1*1', '2*1', '1*2', '3*1', '1*3', '4*1', '1*4', '5*1', '1*5',
    '6*1', '1*6', '7*1', '1*7', '8*1', '1*8', '9*1', '1*9', '10*1', '1*10',
    '2*2', '3*2', '2*3', '4*2', '2*4', '5*2', '2*5',
    '3*3', '4*3', '3*4', '5*3', '3*5',
    '4*4', '5*4', '4*5',
    '5*5',
    
    // Operaciones con 0
    '0*999', '0/123', '0+1', '1+0', '0+2', '2+0', '0+3', '3+0', '0+4', '4+0',
    '0+5', '5+0', '0+6', '6+0', '0+7', '7+0', '0+8', '8+0', '0+9', '9+0',
    '0+10', '10+0', '0-1', '1-0', '0-2', '2-0', '0-3', '3-0', '0-4', '4-0',
    '0-5', '5-0', '0-6', '6-0', '0-7', '7-0', '0-8', '8-0', '0-9', '9-0',
    '0-10', '10-0', '0*1', '1*0', '0*2', '2*0', '0*3', '3*0', '0*4', '4*0',
    '0*5', '5*0', '0*6', '6*0', '0*7', '7*0', '0*8', '8*0', '0*9', '9*0',
    '0*10', '10*0',
    
    // Operaciones con 1
    '1*999', '1/1', '1*123', '1*456', '1*789',
    
    // Operaciones muy simples
    '0+0', '1+1', '2+2', '3+3', '4+4', '5+5', '6+6', '7+7', '8+8', '9+9', '10+10',
    '0*0', '1*1', '2*2', '3*3', '4*4', '5*5', '6*6', '7*7', '8*8', '9*9', '10*10',
    '1-1', '2-2', '3-3', '4-4', '5-5', '6-6', '7-7', '8-8', '9-9', '10-10',
    '1/1', '2/2', '3/3', '4/4', '5/5', '6/6', '7/7', '8/8', '9/9', '10/10'
];

// Función para verificar si una operación es simple (suma o resta con números del 1-9)
function isSimpleAdditionOrSubtraction(expression) {
    const parts = expression.split(' ');
    if (parts.length !== 3) return false;
    
    const operator = parts[1];
    const secondNumber = parseInt(parts[2]);
    
    // Verificar si es suma o resta con números del 0-9
    return (operator === '+' || operator === '-') && secondNumber >= 0 && secondNumber <= 9;
}

// Comandos secretos
const secretCommands = ['zen', 'serio', '1337', 'serious', 'normal', 'volver'];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    loadState();
    updateDisplay();
    updateLives();
    updateModeIndicator();
    loadAchievements();
});

// Funciones principales de la calculadora
function appendNumber(num) {
    // Permitir escribir 0 como primer número
    if (currentDisplay === '0') {
        currentDisplay = num;
    } else {
        // Limitar la longitud del número para evitar desbordamiento
        if (currentDisplay.length < 12) {
            currentDisplay += num;
        }
    }
    updateDisplay();
}

function appendOperator(operator) {
    // Permitir operadores incluso si el display es '0'
    currentExpression = currentDisplay + ' ' + operator + ' ';
    currentDisplay = '0';
    updateDisplay();
}

function clearDisplay() {
    currentDisplay = '0';
    currentExpression = '';
    currentMessage = '';
    updateDisplay();
    hideMessage();
}

function deleteLast() {
    if (currentDisplay.length > 1) {
        currentDisplay = currentDisplay.slice(0, -1);
    } else {
        currentDisplay = '0';
    }
    updateDisplay();
}

function resetProgress() {
    // Resetear vidas
    lives = 3;
    // Resetear modo serio
    isSeriousMode = false;
    // Limpiar logros
    achievements = [];
    // Limpiar display
    clearDisplay();
    // Remover clases de caos
    const container = document.querySelector('.calculator-container');
    container.classList.remove('chaos-mode', 'chaos-level-1', 'chaos-level-2', 'chaos-level-3', 'serious-mode');
    // Habilitar botones
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = '1';
    });
    // Ocultar botón de reparar
    document.getElementById('repairBtn').style.display = 'none';
    // Actualizar UI
    updateLives();
    updateModeIndicator();
    updateAchievementsDisplay();
    // Guardar estado
    saveState();
    saveAchievements();
    showMessage('¡Progreso reiniciado!', 'success');
}

function calculate() {
    // Verificar si solo hay un número (easter egg directo)
    if (!currentExpression && currentDisplay !== '0') {
        checkDirectEasterEgg(currentDisplay);
        return;
    }
    
    if (currentExpression && currentDisplay !== '0') {
        const fullExpression = currentExpression + currentDisplay;
        
        try {
            // Verificar easter eggs antes del cálculo
            checkEasterEggs(fullExpression);
            
            // Realizar el cálculo
            const result = evaluateExpression(fullExpression);
            
            // Verificar si es una operación simple
            if (isSimpleOperation(fullExpression) || isSimpleAdditionOrSubtraction(fullExpression)) {
                showSarcasticMessage();
            }
            
            currentDisplay = result.toString();
            currentExpression = '';
            updateDisplay();
            
        } catch (error) {
            loseLife();
            showError('Error de sintaxis');
            
            // Mensajes sarcásticos para errores
            if (!isSeriousMode) {
                const errorMessages = [
                    "¿Estás seguro de que sabes matemáticas?",
                    "Esto no es una calculadora mágica.",
                    "¿Necesitas ayuda con las operaciones básicas?",
                    "Error 404: Cerebro no encontrado.",
                    "¿Estás intentando romper la calculadora?",
                    "Esto no es un juego de adivinanzas.",
                    "¿Quieres que te explique qué es un número?",
                    "Error de usuario: Operación inválida.",
                    "¿Estás practicando para el examen de kinder?",
                    "Esto es más fácil que contar hasta 3."
                ];
                const errorMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
                setTimeout(() => showMessage(errorMessage, 'sarcastic'), 1000);
            }
        }
    }
    
    // Verificar operaciones incompletas que causan errores
    if (currentExpression && currentDisplay === '0') {
        loseLife();
        showError('Operación incompleta');
        if (!isSeriousMode) {
            setTimeout(() => showMessage('¿Olvidaste escribir el segundo número?', 'sarcastic'), 1000);
        }
    }
}

function evaluateExpression(expression) {
    // Reemplazar símbolos para evaluación segura
    const cleanExpression = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-')
        .replace(/%/g, '/100');
    
    // Evaluación segura
    const result = Function('"use strict"; return (' + cleanExpression + ')')();
    
    if (!isFinite(result)) {
        throw new Error('Resultado inválido');
    }
    
    return result;
}

// Sistema de vidas
function loseLife() {
    lives--;
    updateLives();
    
    if (lives <= 0) {
        enterChaosMode();
    } else if (lives === 2) {
        enterChaosLevel1();
    } else if (lives === 1) {
        enterChaosLevel2();
    }
    
    saveState();
}

function updateLives() {
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        if (index < lives) {
            heart.classList.remove('lost');
        } else {
            heart.classList.add('lost');
        }
    });
}

// Modos de caos
function enterChaosLevel1() {
    const container = document.querySelector('.calculator-container');
    container.classList.add('chaos-mode');
    container.classList.add('chaos-level-1');
}

function enterChaosLevel2() {
    const container = document.querySelector('.calculator-container');
    container.classList.add('chaos-mode');
    container.classList.add('chaos-level-2');
}

function enterChaosMode() {
    const container = document.querySelector('.calculator-container');
    container.classList.add('chaos-mode');
    container.classList.add('chaos-level-3');
    
    // Deshabilitar botones
    const buttons = document.querySelectorAll('.btn:not(.btn-repair)');
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.5';
    });
    
    // Mostrar botón de reparar
    document.getElementById('repairBtn').style.display = 'block';
    
    showMessage('¡MODO CAOS ACTIVADO! La calculadora está rota...', 'error');
}

function repairCalculator() {
    lives = 3;
    isSeriousMode = false;
    
    const container = document.querySelector('.calculator-container');
    container.classList.remove('chaos-mode', 'chaos-level-1', 'chaos-level-2', 'chaos-level-3');
    
    // Habilitar botones
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = '1';
    });
    
    // Ocultar botón de reparar
    document.getElementById('repairBtn').style.display = 'none';
    
    updateLives();
    updateModeIndicator();
    clearDisplay();
    saveState();
    
    showMessage('¡Calculadora reparada!', 'success');
}

// Modo serio
function toggleSeriousMode() {
    isSeriousMode = !isSeriousMode;
    const container = document.querySelector('.calculator-container');
    
    if (isSeriousMode) {
        container.classList.add('serious-mode');
        showMessage('Modo serio activado - Sin sarcasmo ni easter eggs', 'info');
    } else {
        container.classList.remove('serious-mode');
        showMessage('Modo normal activado - ¡Bienvenido de vuelta al sarcasmo!', 'info');
    }
    
    updateModeIndicator();
    saveState();
}

function updateModeIndicator() {
    const indicator = document.getElementById('modeIndicator');
    const modeText = indicator.querySelector('.mode-text');
    
    if (isSeriousMode) {
        modeText.textContent = 'Modo Serio';
    } else if (lives <= 0) {
        modeText.textContent = 'MODO CAOS';
    } else {
        modeText.textContent = 'Modo Normal';
    }
}

// Easter eggs y logros
function checkEasterEggs(expression) {
    const result = evaluateExpression(expression);
    const resultStr = result.toString();
    
    if (easterEggs[resultStr] && !isAchievementUnlocked(easterEggs[resultStr].id)) {
        unlockAchievement(easterEggs[resultStr]);
    }
}

function checkDirectEasterEgg(number) {
    // Solo verificar easter eggs, no mostrar mensajes sarcásticos para números directos
    if (easterEggs[number] && !isAchievementUnlocked(easterEggs[number].id)) {
        unlockAchievement(easterEggs[number]);
        showMessage(`¡Easter egg desbloqueado: ${easterEggs[number].title}!`, 'achievement');
    }
}

function isSimpleOperation(expression) {
    return simpleOperations.includes(expression.replace(/\s/g, ''));
}

function showSarcasticMessage() {
    if (!isSeriousMode) {
        const message = sarcasticMessages[Math.floor(Math.random() * sarcasticMessages.length)];
        showMessage(message, 'sarcastic');
    }
}

function showSarcasticMessageForSimpleNumber() {
    if (!isSeriousMode) {
        const simpleMessages = [
            "¿Realmente necesitas una calculadora para esto?",
            "¿Estás contando con los dedos?",
            "Esto es más fácil que decir tu nombre.",
            "¿Necesitas ayuda para escribir números?",
            "Impresionante, has descubierto los números.",
            "¿Estás practicando para el examen de kinder?",
            "Esto es más simple que abrir los ojos.",
            "¿Quieres que te explique qué es un número?",
            "Nivel de genio: inexistente.",
            "¿Estás seguro de que sabes usar una calculadora?"
        ];
        const message = simpleMessages[Math.floor(Math.random() * simpleMessages.length)];
        showMessage(message, 'sarcastic');
    }
}

// Sistema de logros
function unlockAchievement(achievement) {
    if (!isAchievementUnlocked(achievement.id)) {
        achievements.push(achievement.id);
        saveAchievements();
        showAchievementNotification(achievement);
        updateAchievementsDisplay();
    }
}

function isAchievementUnlocked(achievementId) {
    return achievements.includes(achievementId);
}

function showAchievementNotification(achievement) {
    const notification = document.getElementById('achievementNotification');
    const title = document.getElementById('achievementTitle');
    const desc = document.getElementById('achievementDesc');
    
    title.textContent = achievement.title;
    desc.textContent = achievement.description;
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function openAchievements() {
    const modal = document.getElementById('achievementsModal');
    modal.style.display = 'flex';
    updateAchievementsDisplay();
}

function closeAchievements() {
    const modal = document.getElementById('achievementsModal');
    modal.style.display = 'none';
}

function updateAchievementsDisplay() {
    const grid = document.getElementById('achievementsGrid');
    grid.innerHTML = '';
    
    Object.values(easterEggs).forEach(achievement => {
        const card = document.createElement('div');
        card.className = `achievement-card ${isAchievementUnlocked(achievement.id) ? 'unlocked' : 'locked'}`;
        
        card.innerHTML = `
            <i class="${achievement.icon} achievement-icon"></i>
            <div class="achievement-title">${achievement.title}</div>
            <div class="achievement-desc">${achievement.description}</div>
        `;
        
        grid.appendChild(card);
    });
}

// Mensajes y UI
function showMessage(text, type = 'info') {
    currentMessage = text;
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
    messageEl.style.display = 'block';
    
    // Auto-ocultar todos los mensajes después de 2 segundos
    setTimeout(() => {
        if (messageEl.textContent === text) { // Solo si no ha cambiado
            hideMessage();
        }
    }, 2000);
}

function hideMessage() {
    const messageEl = document.getElementById('message');
    messageEl.style.display = 'none';
}

function showError(text) {
    showMessage(text, 'error');
}

function updateDisplay() {
    const displayEl = document.getElementById('display');
    displayEl.textContent = currentDisplay;
    document.getElementById('expression').textContent = currentExpression;
    
    // Ajustar tamaño de fuente según la longitud del número
    displayEl.classList.remove('long-number', 'very-long-number');
    if (currentDisplay.length > 8) {
        displayEl.classList.add('long-number');
    }
    if (currentDisplay.length > 12) {
        displayEl.classList.add('very-long-number');
    }
}

// Persistencia de datos
function saveState() {
    localStorage.setItem('sarcastiCalc_state', JSON.stringify({
        lives,
        isSeriousMode,
        currentDisplay,
        currentExpression
    }));
}

function loadState() {
    const saved = localStorage.getItem('sarcastiCalc_state');
    if (saved) {
        const state = JSON.parse(saved);
        lives = state.lives || 3;
        isSeriousMode = state.isSeriousMode || false;
        currentDisplay = state.currentDisplay || '0';
        currentExpression = state.currentExpression || '';
        
        // Aplicar modo serio si estaba activo
        if (isSeriousMode) {
            document.querySelector('.calculator-container').classList.add('serious-mode');
        }
        
        // Aplicar modo caos si las vidas están en 0
        if (lives <= 0) {
            enterChaosMode();
        } else if (lives === 1) {
            enterChaosLevel2();
        } else if (lives === 2) {
            enterChaosLevel1();
        }
    }
}

function saveAchievements() {
    localStorage.setItem('sarcastiCalc_achievements', JSON.stringify(achievements));
}

function loadAchievements() {
    const saved = localStorage.getItem('sarcastiCalc_achievements');
    if (saved) {
        achievements = JSON.parse(saved);
    }
}

// Comandos de teclado
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Números
    if (/[0-9]/.test(key)) {
        appendNumber(key);
    }
    // Operadores
    else if (['+', '-', '*', '/', '%'].includes(key)) {
        appendOperator(key);
    }
    // Enter o igual
    else if (key === 'Enter' || key === '=') {
        calculate();
    }
    // Backspace
    else if (key === 'Backspace') {
        deleteLast();
    }
    // Escape o C
    else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    }
    // Punto decimal
    else if (key === '.') {
        appendNumber('.');
    }
    
    // Comandos secretos
    if (event.ctrlKey && event.shiftKey) {
        const command = prompt('Comando secreto:').toLowerCase();
        if (secretCommands.includes(command)) {
            if (command === 'normal' || command === 'volver') {
                // Forzar salida del modo serio
                if (isSeriousMode) {
                    toggleSeriousMode();
                } else {
                    showMessage('Ya estás en modo normal', 'info');
                }
            } else {
                toggleSeriousMode();
            }
        }
    }
});

// Cerrar modal al hacer clic fuera
document.getElementById('achievementsModal').addEventListener('click', function(event) {
    if (event.target === this) {
        closeAchievements();
    }
}); 