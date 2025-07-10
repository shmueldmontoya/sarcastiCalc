// Estado global de la aplicación
let currentDisplay = '0';
let currentExpression = '';
let lives = 3;
let isSeriousMode = false;
let achievements = [];
let currentMessage = '';
let operationHistory = [];
let totalOperations = 0;
let totalErrors = 0;
let isDarkMode = false;
let soundEnabled = true;
let sessionStartTime = Date.now();
let totalSessionTime = 0;

// Modo desafío
let isChallengeMode = false;
let challengeTimer = null;
let challengeTimeLeft = 30;
let challengeScore = 0;
let challengeTarget = 0;

// Sistema de partículas
let particlesCanvas;
let particlesCtx;
let particles = [];
let animationId;

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
    },
    // Los easter eggs de años se manejan dinámicamente en checkDynamicEasterEggs()
    '2000': {
        id: 'millennium',
        title: 'Milenio',
        description: '¡2000! El nuevo milenio',
        icon: 'fas fa-star'
    },
    '1999': {
        id: 'y2k',
        title: 'Y2K',
        description: '¡1999! El año del bug del milenio',
        icon: 'fas fa-bug'
    },
    '1984': {
        id: 'big_brother',
        title: 'Big Brother',
        description: '¡1984! George Orwell tenía razón',
        icon: 'fas fa-eye'
    },
    '1776': {
        id: 'independence',
        title: 'Independencia',
        description: '¡1776! Declaración de independencia',
        icon: 'fas fa-flag'
    },
    '1492': {
        id: 'discovery',
        title: 'Descubrimiento',
        description: '¡1492! Colón descubrió América',
        icon: 'fas fa-ship'
    },
    '123456789': {
        id: 'sequence',
        title: 'Secuencia Perfecta',
        description: '¡123456789! La secuencia más famosa',
        icon: 'fas fa-sort-numeric-up'
    },
    '987654321': {
        id: 'reverse_sequence',
        title: 'Secuencia Inversa',
        description: '¡987654321! Al revés también funciona',
        icon: 'fas fa-sort-numeric-down'
    },
    '111111111': {
        id: 'ones',
        title: 'Nueve Unos',
        description: '¡111111111! ¿Repetitivo?',
        icon: 'fas fa-redo'
    },
    '999999999': {
        id: 'nines',
        title: 'Nueve Nueves',
        description: '¡999999999! Casi un billón',
        icon: 'fas fa-9'
    },
    '314159265': {
        id: 'pi',
        title: 'Pi',
        description: '¡314159265! Los primeros dígitos de π',
        icon: 'fas fa-circle'
    },
    '271828182': {
        id: 'euler',
        title: 'Número de Euler',
        description: '¡271828182! Los primeros dígitos de e',
        icon: 'fas fa-infinity'
    },
    '161803398': {
        id: 'golden_ratio',
        title: 'Número Áureo',
        description: '¡161803398! Los primeros dígitos de φ',
        icon: 'fas fa-spiral'
    },
    '112358132': {
        id: 'fibonacci',
        title: 'Secuencia de Fibonacci',
        description: '¡112358132! Los primeros números de Fibonacci',
        icon: 'fas fa-seedling'
    },
    '101010101': {
        id: 'binary_pattern',
        title: 'Patrón Binario',
        description: '¡101010101! ¿Eres programador?',
        icon: 'fas fa-code'
    },
    '121212121': {
        id: 'repeating_pattern',
        title: 'Patrón Repetitivo',
        description: '¡121212121! ¿Te gustan los patrones?',
        icon: 'fas fa-repeat'
    },
    '555555555': {
        id: 'fives',
        title: 'Nueve Cincos',
        description: '¡555555555! ¿El número de la suerte?',
        icon: 'fas fa-5'
    },
    '777777777': {
        id: 'lucky_sevens',
        title: 'Sietes de la Suerte',
        description: '¡777777777! ¡Jackpot!',
        icon: 'fas fa-dice'
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
const secretCommands = ['zen', 'serio', '1337', 'serious', 'normal', 'volver', 'dark', 'oscuro', 'sound', 'sonido', 'stats', 'estadisticas', 'history', 'historial'];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    loadState();
    loadStatistics();
    updateDisplay();
    updateLives();
    updateModeIndicator();
    loadAchievements();
    
    // Inicializar sistema de partículas
    initParticles();
    
    // Verificar logros de tiempo cada minuto
    setInterval(() => {
        const stats = getStatistics();
        checkTimeAchievements();
    }, 60000); // Cada minuto
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
    playSound('click');
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
    // Limpiar historial y estadísticas
    operationHistory = [];
    totalOperations = 0;
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
    saveStatistics();
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
            
            // Agregar al historial
            addToHistory(fullExpression, result);
            
            // Modo desafío: incrementar puntuación
            if (isChallengeMode) {
                challengeScore++;
                if (challengeScore >= challengeTarget) {
                    endChallengeMode();
                    return;
                }
                // Generar nueva operación
                setTimeout(() => generateChallengeOperation(), 500);
            }
            
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
            playSound('error');
            
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
    totalErrors++;
    updateLives();
    
    // Verificar logros por errores
    checkErrorAchievements();
    
    if (lives <= 0) {
        enterChaosMode();
    } else if (lives === 2) {
        enterChaosLevel1();
    } else if (lives === 1) {
        enterChaosLevel2();
    }
    
    saveState();
}

function checkErrorAchievements() {
    const errorAchievements = [
        { id: 'first_error', count: 1, title: 'Primer Error', description: '¡Tu primer error! Todos cometemos errores', icon: 'fas fa-exclamation-triangle' },
        { id: 'five_errors', count: 5, title: 'Propenso a Errores', description: '5 errores cometidos', icon: 'fas fa-bug' },
        { id: 'ten_errors', count: 10, title: 'Desastre', description: '10 errores cometidos', icon: 'fas fa-fire' },
        { id: 'twenty_errors', count: 20, title: 'Catástrofe', description: '20 errores cometidos', icon: 'fas fa-bomb' },
        { id: 'fifty_errors', count: 50, title: 'Leyenda del Error', description: '50 errores cometidos', icon: 'fas fa-skull' }
    ];
    
    errorAchievements.forEach(achievement => {
        if (totalErrors === achievement.count && !isAchievementUnlocked(achievement.id)) {
            unlockAchievement({
                id: achievement.id,
                title: achievement.title,
                description: achievement.description,
                icon: achievement.icon
            });
        }
    });
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

// Modo oscuro
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    const container = document.querySelector('.calculator-container');
    const body = document.body;
    
    if (isDarkMode) {
        container.classList.add('dark-mode');
        body.classList.add('dark-mode');
        showMessage('Modo oscuro activado', 'info');
    } else {
        container.classList.remove('dark-mode');
        body.classList.remove('dark-mode');
        showMessage('Modo claro activado', 'info');
    }
    
    saveState();
}

// Sonidos
function playSound(type = 'click') {
    if (!soundEnabled) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'click':
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            break;
        case 'success':
            oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
            break;
        case 'error':
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);
            break;
        case 'achievement':
            oscillator.frequency.setValueAtTime(784, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(880, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(1047, audioContext.currentTime + 0.2);
            break;
    }
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    showMessage(soundEnabled ? 'Sonidos activados' : 'Sonidos desactivados', 'info');
    saveState();
}

function toggleChallengeMode() {
    if (isChallengeMode) {
        endChallengeMode();
    } else {
        startChallengeMode();
    }
}

function startChallengeMode() {
    isChallengeMode = true;
    challengeTimeLeft = 30;
    challengeScore = 0;
    challengeTarget = Math.floor(Math.random() * 20) + 10; // 10-30 operaciones
    
    showMessage(`¡Modo Desafío! Completa ${challengeTarget} operaciones en 30 segundos`, 'info');
    
    // Generar operación aleatoria
    generateChallengeOperation();
    
    // Iniciar temporizador
    challengeTimer = setInterval(() => {
        challengeTimeLeft--;
        updateChallengeDisplay();
        
        if (challengeTimeLeft <= 0) {
            endChallengeMode();
        }
    }, 1000);
    
    updateModeIndicator();
}

function endChallengeMode() {
    isChallengeMode = false;
    clearInterval(challengeTimer);
    
    const success = challengeScore >= challengeTarget;
    const message = success 
        ? `¡Desafío completado! ${challengeScore}/${challengeTarget} operaciones`
        : `¡Tiempo agotado! ${challengeScore}/${challengeTarget} operaciones`;
    
    showMessage(message, success ? 'success' : 'error');
    
    if (success) {
        createConfetti();
        unlockAchievement({
            id: 'challenge_completed',
            title: 'Desafío Completado',
            description: 'Completaste un desafío de tiempo',
            icon: 'fas fa-stopwatch'
        });
    }
    
    clearDisplay();
    updateModeIndicator();
}

function generateChallengeOperation() {
    const operations = ['+', '-', '*', '/'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    const num1 = Math.floor(Math.random() * 100) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    
    currentDisplay = num1.toString();
    currentExpression = num1 + ' ' + op + ' ';
    updateDisplay();
}

function updateChallengeDisplay() {
    const indicator = document.getElementById('modeIndicator');
    const modeText = indicator.querySelector('.mode-text');
    
    if (isChallengeMode) {
        modeText.textContent = `Desafío: ${challengeTimeLeft}s | ${challengeScore}/${challengeTarget}`;
    } else if (isSeriousMode) {
        modeText.textContent = 'Modo Serio';
    } else if (lives <= 0) {
        modeText.textContent = 'MODO CAOS';
    } else {
        modeText.textContent = 'Modo Normal';
    }
}

function updateModeIndicator() {
    const indicator = document.getElementById('modeIndicator');
    const modeText = indicator.querySelector('.mode-text');
    
    if (isChallengeMode) {
        modeText.textContent = `Desafío: ${challengeTimeLeft}s | ${challengeScore}/${challengeTarget}`;
    } else if (isSeriousMode) {
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
    
    // Verificar easter eggs dinámicos primero
    const dynamicEgg = checkDynamicEasterEggs(resultStr);
    if (dynamicEgg && !isAchievementUnlocked(dynamicEgg.id)) {
        unlockAchievement(dynamicEgg);
        return;
    }
    
    // Verificar easter eggs estáticos
    if (easterEggs[resultStr] && !isAchievementUnlocked(easterEggs[resultStr].id)) {
        unlockAchievement(easterEggs[resultStr]);
    }
}

function checkDirectEasterEgg(number) {
    // Verificar easter eggs dinámicos primero
    const dynamicEgg = checkDynamicEasterEggs(number);
    if (dynamicEgg) {
        unlockAchievement(dynamicEgg);
        showMessage(`¡Easter egg desbloqueado: ${dynamicEgg.title}!`, 'achievement');
        return;
    }
    
    // Verificar easter eggs estáticos
    if (easterEggs[number] && !isAchievementUnlocked(easterEggs[number].id)) {
        unlockAchievement(easterEggs[number]);
        showMessage(`¡Easter egg desbloqueado: ${easterEggs[number].title}!`, 'achievement');
    }
}

function checkDynamicEasterEggs(number) {
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;
    
    // Easter egg del año actual
    if (number === currentYear.toString()) {
        return {
            id: 'current_year',
            title: `Año ${currentYear}`,
            description: `¡${currentYear}! El año en que todo cambió`,
            icon: 'fas fa-calendar'
        };
    }
    
    // Easter egg del año pasado
    if (number === lastYear.toString()) {
        return {
            id: 'last_year',
            title: `Año ${lastYear}`,
            description: `¡${lastYear}! Un año para recordar`,
            icon: 'fas fa-calendar-alt'
        };
    }
    
    return null;
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
        
        // Efectos especiales según el tipo de logro
        if (achievement.id.includes('thousand') || achievement.id.includes('legend')) {
            createConfetti();
        } else {
            createParticles();
        }
        
        playSound('achievement');
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
    
    // Forzar verificación de logros de tiempo antes de mostrar logros
    checkTimeAchievements();
    
    modal.style.display = 'flex';
    updateAchievementsDisplay();
}

function closeAchievements() {
    const modal = document.getElementById('achievementsModal');
    modal.style.display = 'none';
}

function openHistory() {
    const modal = document.getElementById('historyModal');
    const historyList = document.getElementById('historyList');
    
    if (operationHistory.length === 0) {
        historyList.innerHTML = '<p class="empty-message">No hay operaciones en el historial</p>';
    } else {
        historyList.innerHTML = operationHistory.map(item => `
            <div class="history-item">
                <div class="history-expression">${item.expression} = ${item.result}</div>
                <div class="history-time">${item.timestamp}</div>
            </div>
        `).join('');
    }
    
    modal.style.display = 'flex';
}

function closeHistory() {
    const modal = document.getElementById('historyModal');
    modal.style.display = 'none';
}

function openStatistics() {
    const modal = document.getElementById('statisticsModal');
    const statsContent = document.getElementById('statisticsContent');
    
    // Forzar verificación de logros de tiempo antes de mostrar estadísticas
    checkTimeAchievements();
    
    const stats = getStatistics();
    
    statsContent.innerHTML = `
        <div class="stats-grid">
            <div class="stat-item">
                <div class="stat-number">${stats.totalOperations}</div>
                <div class="stat-label">Operaciones Totales</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">${stats.totalErrors}</div>
                <div class="stat-label">Errores Cometidos</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">${stats.accuracy}%</div>
                <div class="stat-label">Precisión</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">${Math.floor(stats.sessionTime / 60)}:${(stats.sessionTime % 60).toString().padStart(2, '0')}</div>
                <div class="stat-label">Tiempo de Sesión</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">${stats.averageOperationsPerMinute}</div>
                <div class="stat-label">Ops/Minuto</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">${stats.achievementsUnlocked}</div>
                <div class="stat-label">Logros Desbloqueados</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">${stats.currentLives}</div>
                <div class="stat-label">Vidas Restantes</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">${stats.isSeriousMode ? 'Sí' : 'No'}</div>
                <div class="stat-label">Modo Serio</div>
            </div>
        </div>
        <div class="stats-details">
            <h3>Últimas Operaciones</h3>
            <div class="recent-operations">
                ${stats.history.slice(0, 5).map(item => `
                    <div class="recent-item">
                        <span>${item.expression} = ${item.result}</span>
                        <small>${item.timestamp}</small>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
}

function closeStatistics() {
    const modal = document.getElementById('statisticsModal');
    modal.style.display = 'none';
}

function updateAchievementsDisplay() {
    const grid = document.getElementById('achievementsGrid');
    grid.innerHTML = '';
    
    // Obtener todos los logros (estáticos + dinámicos)
    const allAchievements = getAllAchievements();
    
    allAchievements.forEach(achievement => {
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

function getAllAchievements() {
    const allAchievements = [];
    
    // Agregar easter eggs estáticos
    Object.values(easterEggs).forEach(achievement => {
        allAchievements.push(achievement);
    });
    
    // Agregar logros de uso
    const usageAchievements = [
        { id: 'first_operation', title: 'Primera Operación', description: '¡Tu primera operación!', icon: 'fas fa-star' },
        { id: 'ten_operations', title: 'Principiante', description: '10 operaciones completadas', icon: 'fas fa-graduation-cap' },
        { id: 'fifty_operations', title: 'Aprendiz', description: '50 operaciones completadas', icon: 'fas fa-book' },
        { id: 'hundred_operations', title: 'Calculadora Maestra', description: '100 operaciones completadas', icon: 'fas fa-crown' },
        { id: 'two_hundred_operations', title: 'Experto', description: '200 operaciones completadas', icon: 'fas fa-medal' },
        { id: 'five_hundred_operations', title: 'Profesor', description: '500 operaciones completadas', icon: 'fas fa-chalkboard-teacher' },
        { id: 'thousand_operations', title: 'Leyenda', description: '1000 operaciones completadas', icon: 'fas fa-trophy' }
    ];
    
    usageAchievements.forEach(achievement => {
        allAchievements.push(achievement);
    });
    
    // Agregar logros de errores
    const errorAchievements = [
        { id: 'first_error', title: 'Primer Error', description: '¡Tu primer error! Todos cometemos errores', icon: 'fas fa-exclamation-triangle' },
        { id: 'five_errors', title: 'Propenso a Errores', description: '5 errores cometidos', icon: 'fas fa-bug' },
        { id: 'ten_errors', title: 'Desastre', description: '10 errores cometidos', icon: 'fas fa-fire' },
        { id: 'twenty_errors', title: 'Catástrofe', description: '20 errores cometidos', icon: 'fas fa-bomb' },
        { id: 'fifty_errors', title: 'Leyenda del Error', description: '50 errores cometidos', icon: 'fas fa-skull' }
    ];
    
    errorAchievements.forEach(achievement => {
        allAchievements.push(achievement);
    });
    
    // Agregar logros de tiempo
    const timeAchievements = [
        { id: 'five_minutes', title: '5 Minutos', description: '5 minutos usando la calculadora', icon: 'fas fa-clock' },
        { id: 'fifteen_minutes', title: '15 Minutos', description: '15 minutos usando la calculadora', icon: 'fas fa-hourglass-half' },
        { id: 'thirty_minutes', title: '30 Minutos', description: '30 minutos usando la calculadora', icon: 'fas fa-hourglass' },
        { id: 'one_hour', title: '1 Hora', description: '1 hora usando la calculadora', icon: 'fas fa-hourglass-end' },
        { id: 'two_hours', title: '2 Horas', description: '2 horas usando la calculadora', icon: 'fas fa-stopwatch' },
        { id: 'five_hours', title: '5 Horas', description: '5 horas usando la calculadora', icon: 'fas fa-calendar-day' }
    ];
    
    timeAchievements.forEach(achievement => {
        allAchievements.push(achievement);
    });
    
    // Agregar logros dinámicos de años
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;
    
    const yearAchievements = [
        { id: 'current_year', title: `Año ${currentYear}`, description: `¡${currentYear}! El año en que todo cambió`, icon: 'fas fa-calendar' },
        { id: 'last_year', title: `Año ${lastYear}`, description: `¡${lastYear}! Un año para recordar`, icon: 'fas fa-calendar-alt' }
    ];
    
    yearAchievements.forEach(achievement => {
        allAchievements.push(achievement);
    });
    
    // Agregar logro de desafío
    const challengeAchievement = { 
        id: 'challenge_completed', 
        title: 'Desafío Completado', 
        description: 'Completaste un desafío de tiempo', 
        icon: 'fas fa-stopwatch' 
    };
    allAchievements.push(challengeAchievement);
    
    return allAchievements;
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

// Funciones de historial y estadísticas
function addToHistory(expression, result) {
    const historyItem = {
        expression: expression,
        result: result,
        timestamp: new Date().toLocaleTimeString()
    };
    
    operationHistory.unshift(historyItem);
    totalOperations++;
    
    // Mantener solo las últimas 10 operaciones
    if (operationHistory.length > 10) {
        operationHistory.pop();
    }
    
    // Verificar logros por uso
    checkUsageAchievements();
    
    saveStatistics();
}

function checkUsageAchievements() {
    const usageAchievements = [
        { id: 'first_operation', count: 1, title: 'Primera Operación', description: '¡Tu primera operación!', icon: 'fas fa-star' },
        { id: 'ten_operations', count: 10, title: 'Principiante', description: '10 operaciones completadas', icon: 'fas fa-graduation-cap' },
        { id: 'fifty_operations', count: 50, title: 'Aprendiz', description: '50 operaciones completadas', icon: 'fas fa-book' },
        { id: 'hundred_operations', count: 100, title: 'Calculadora Maestra', description: '100 operaciones completadas', icon: 'fas fa-crown' },
        { id: 'two_hundred_operations', count: 200, title: 'Experto', description: '200 operaciones completadas', icon: 'fas fa-medal' },
        { id: 'five_hundred_operations', count: 500, title: 'Profesor', description: '500 operaciones completadas', icon: 'fas fa-chalkboard-teacher' },
        { id: 'thousand_operations', count: 1000, title: 'Leyenda', description: '1000 operaciones completadas', icon: 'fas fa-trophy' }
    ];
    
    usageAchievements.forEach(achievement => {
        if (totalOperations === achievement.count && !isAchievementUnlocked(achievement.id)) {
            unlockAchievement({
                id: achievement.id,
                title: achievement.title,
                description: achievement.description,
                icon: achievement.icon
            });
        }
    });
}

function getStatistics() {
    const currentTime = Date.now();
    const sessionTime = Math.floor((currentTime - sessionStartTime) / 1000);
    totalSessionTime = sessionTime;
    
    return {
        totalOperations,
        totalErrors,
        sessionTime,
        averageOperationsPerMinute: sessionTime > 0 ? Math.round((totalOperations / sessionTime) * 60) : 0,
        accuracy: totalOperations > 0 ? Math.round(((totalOperations - totalErrors) / totalOperations) * 100) : 100,
        achievementsUnlocked: achievements.length,
        currentLives: lives,
        isSeriousMode,
        history: operationHistory
    };
}

function checkTimeAchievements() {
    const timeAchievements = [
        { id: 'five_minutes', time: 300, title: '5 Minutos', description: '5 minutos usando la calculadora', icon: 'fas fa-clock' },
        { id: 'fifteen_minutes', time: 900, title: '15 Minutos', description: '15 minutos usando la calculadora', icon: 'fas fa-hourglass-half' },
        { id: 'thirty_minutes', time: 1800, title: '30 Minutos', description: '30 minutos usando la calculadora', icon: 'fas fa-hourglass' },
        { id: 'one_hour', time: 3600, title: '1 Hora', description: '1 hora usando la calculadora', icon: 'fas fa-hourglass-end' },
        { id: 'two_hours', time: 7200, title: '2 Horas', description: '2 horas usando la calculadora', icon: 'fas fa-stopwatch' },
        { id: 'five_hours', time: 18000, title: '5 Horas', description: '5 horas usando la calculadora', icon: 'fas fa-calendar-day' }
    ];
    
    timeAchievements.forEach(achievement => {
        if (totalSessionTime >= achievement.time && !isAchievementUnlocked(achievement.id)) {
            unlockAchievement({
                id: achievement.id,
                title: achievement.title,
                description: achievement.description,
                icon: achievement.icon
            });
        }
    });
}

// Persistencia de datos
function saveState() {
    localStorage.setItem('sarcastiCalc_state', JSON.stringify({
        lives,
        isSeriousMode,
        currentDisplay,
        currentExpression,
        isDarkMode,
        soundEnabled
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
        isDarkMode = state.isDarkMode || false;
        soundEnabled = state.soundEnabled !== undefined ? state.soundEnabled : true;
        
        // Aplicar modo serio si estaba activo
        if (isSeriousMode) {
            document.querySelector('.calculator-container').classList.add('serious-mode');
        }
        
        // Aplicar modo oscuro si estaba activo
        if (isDarkMode) {
            toggleDarkMode();
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

function saveStatistics() {
    localStorage.setItem('sarcastiCalc_statistics', JSON.stringify({
        operationHistory,
        totalOperations,
        totalErrors,
        totalSessionTime,
        sessionStartTime
    }));
}

function loadStatistics() {
    const saved = localStorage.getItem('sarcastiCalc_statistics');
    if (saved) {
        const stats = JSON.parse(saved);
        operationHistory = stats.operationHistory || [];
        totalOperations = stats.totalOperations || 0;
        totalErrors = stats.totalErrors || 0;
        totalSessionTime = stats.totalSessionTime || 0;
        sessionStartTime = stats.sessionStartTime || Date.now();
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
            } else if (command === 'dark' || command === 'oscuro') {
                toggleDarkMode();
            } else if (command === 'sound' || command === 'sonido') {
                toggleSound();
            } else if (command === 'stats' || command === 'estadisticas') {
                openStatistics();
            } else if (command === 'history' || command === 'historial') {
                openHistory();
            } else if (command === 'check' || command === 'verificar') {
                checkTimeAchievements();
                showMessage('Logros de tiempo verificados', 'info');
            } else {
                toggleSeriousMode();
            }
        }
    }
});

// Cerrar modales al hacer clic fuera
document.getElementById('achievementsModal').addEventListener('click', function(event) {
    if (event.target === this) {
        closeAchievements();
    }
});

document.getElementById('historyModal').addEventListener('click', function(event) {
    if (event.target === this) {
        closeHistory();
    }
});

document.getElementById('statisticsModal').addEventListener('click', function(event) {
    if (event.target === this) {
        closeStatistics();
    }
});

// Sistema de partículas
function initParticles() {
    particlesCanvas = document.getElementById('particlesCanvas');
    particlesCtx = particlesCanvas.getContext('2d');
    
    // Configurar canvas
    function resizeCanvas() {
        const container = document.querySelector('.calculator-container');
        const rect = container.getBoundingClientRect();
        particlesCanvas.width = rect.width;
        particlesCanvas.height = rect.height;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

function createParticles() {
    const container = document.querySelector('.calculator-container');
    const rect = container.getBoundingClientRect();
    
    for (let i = 0; i < 20; i++) {
        const particle = {
            x: Math.random() * rect.width,
            y: rect.height,
            vx: (Math.random() - 0.5) * 4,
            vy: -Math.random() * 3 - 2,
            life: 1,
            decay: 0.02
        };
        particles.push(particle);
    }
    
    animateParticles();
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

function animateParticles() {
    if (particles.length === 0) return;
    
    particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        
        // Actualizar posición
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.1; // Gravedad
        particle.life -= particle.decay;
        
        // Dibujar partícula
        particlesCtx.save();
        particlesCtx.globalAlpha = particle.life;
        particlesCtx.fillStyle = `hsl(${Math.random() * 60 + 30}, 100%, 50%)`;
        particlesCtx.beginPath();
        particlesCtx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        particlesCtx.fill();
        particlesCtx.restore();
        
        // Eliminar partículas muertas
        if (particle.life <= 0 || particle.y > particlesCanvas.height) {
            particles.splice(i, 1);
        }
    }
    
    if (particles.length > 0) {
        animationId = requestAnimationFrame(animateParticles);
    }
}