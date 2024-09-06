document.addEventListener('DOMContentLoaded', function() {
    const keys = document.querySelector('.calculator-keys'); // Selecciona el contenedor de los botones
    const screen = document.querySelector('.calculator-screen'); // Selecciona la pantalla de la calculadora
    let currentInput = ''; // Almacena el número o la operación actual
    let previousInput = ''; // Almacena el número anterior
    let operator = ''; // Almacena el operador actual

    // Función para actualizar la pantalla
    function updateScreen(value) {
        screen.value = value;
    }

    // Función para realizar el cálculo
    function calculate() {
        let result = 0;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch(operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case 'x':
                result = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('No se puede dividir por cero');
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        
        currentInput = result.toString();
        operator = '';
        previousInput = '';
    }

    // Manejo de eventos al hacer clic en los botones
    keys.addEventListener('click', function(event) {
        const target = event.target;
        const value = target.textContent;

        if (target.classList.contains('operator')) {
            // Si se hace clic en un operador
            if (currentInput === '') return; // Evitar operar sin un número
            if (previousInput !== '') {
                calculate();
            }
            operator = value;
            previousInput = currentInput;
            currentInput = '';
        } else if (target.classList.contains('equal-sign')) {
            // Si se hace clic en el botón "="
            if (currentInput === '' || previousInput === '') return;
            calculate();
            updateScreen(currentInput);
        } else if (target.classList.contains('cero-sign')) {
            // Si se hace clic en el botón "CE"
            currentInput = '0';
            previousInput = '';
            operator = '';
            updateScreen(currentInput);
            
        } else if (target.classList.contains('delete')) {
            // Si se hace clic en el botón "Delete"
            currentInput = currentInput.slice(0, -1); // Elimina el último dígito
            if (currentInput === '') {
                currentInput = '0'; // Si se borra todo, mostrar 0
            }
            updateScreen(currentInput);
        } else {
            // Si se hace clic en un número o en el punto
            if (currentInput === '0') {
                currentInput = ''; // Borra el '0' inicial para permitir nuevos números
            }
            currentInput += value;
            updateScreen(currentInput);
        }
    });
});
