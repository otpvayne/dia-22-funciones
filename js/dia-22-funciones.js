'use strict'; // Modo estricto: ayuda a detectar errores comunes.

/* =========================================================
   SECCIÓN 1 — FUNCIONES: declarativa, expresión y flecha
   ========================================================= */

// 1) Declarativa: se define con 'function' y tiene nombre.
//    Se "eleva" (hoisting): puedes llamarla antes de su declaración.
function sumar(a, b) {
  // 'a' y 'b' son parámetros (entradas). Deben ser números.
  // 'return' entrega el resultado a quien llame a la función.
  return a + b;
}

// 2) Expresión de función: se asigna a una variable/constante.
//    NO se eleva como la declarativa (no puedes usarla antes de esta línea).
const restar = function (a, b) {
  return a - b;
};

// 3) Arrow function (función flecha): sintaxis corta, muy usada en callbacks.
//    Si el cuerpo es una sola expresión, el 'return' es implícito.
const multiplicar = (a, b) => a * b;

// 4) Parámetros con valor por defecto: si no pasan 'exp', usa 2.
function potencia(base, exp = 2) {
  return base ** exp;
}

// 5) Rest parameters: reúne N argumentos en un arreglo 'nums'.
const promedio = (...nums) => {
  if (nums.length === 0) return 0;
  const total = nums.reduce((acc, n) => acc + n, 0);
  return total / nums.length;
};

// 6) Funciones puras (mismo input -> mismo output, sin efectos secundarios)
function esPar(n) {
  return n % 2 === 0;
}

// 7) (Opcional) Cierre/closure sencillo: función que "recuerda" su estado interno.
function crearContador() {
  let cuenta = 0;                // variable privada del closure
  return function () {           // retorna función que cierra sobre 'cuenta'
    cuenta++;
    return cuenta;
  };
}
// const contar = crearContador(); // contar() -> 1, luego 2, 3, ...

/* =========================================================
   SECCIÓN 2 — SCOPE: global, función y bloque + hoisting
   ========================================================= */

// Variable global (evítalas en proyectos grandes).
const appName = 'Calculadora Día 22';

// Scope de función: variables declaradas dentro no son visibles fuera.
function ejemploScopeFuncion() {
  const local = 'solo aquí';
  // console.log(local); // OK dentro
}
ejemploScopeFuncion();
// console.log(local); // ❌ Error: 'local' no existe aquí.

// Scope de bloque (let/const): visible solo entre { ... }
{
  let x = 10;
  const y = 20;
  // console.log(x, y); // OK
}
// console.log(x, y); // ❌ No existen fuera del bloque

// 'var' ignora el scope de bloque (se comporta como "función" o global)
function ejemploVar() {
  if (true) {
    var z = 123;  // 'var' no se limita al bloque if
  }
  // console.log(z); // 123 (sigue accesible aquí)
}
ejemploVar();

// Hoisting rápido:
// - Declaraciones de función se "elevan" (puedes llamarlas antes).
// - 'var' se eleva (se declara arriba) pero sin valor (undefined).
// - 'let'/'const' NO permiten usarse antes de definirse (zona muerta temporal).

/* =========================================================
   SECCIÓN 3 — UTILIDADES: validación y parsing numérico
   ========================================================= */

// Convierte a número y valida NaN (no-numérico). Devuelve {ok, value}
function toNumber(input) {
  const value = Number(input);
  return { ok: Number.isFinite(value), value };
}

// Protección: división segura.
function dividir(a, b) {
  if (b === 0) return '❌ No se puede dividir entre cero';
  return a / b;
}

/* =========================================================
   SECCIÓN 4 — MINI PROYECTO: Calculadora por consola
   - Menú con prompt/alert (modo navegador).
   - Reutiliza las funciones anteriores.
   ========================================================= */

function pedirNumero(mensaje) {
  const entrada = prompt(mensaje);               // Pide un string
  const { ok, value } = toNumber(entrada);       // Intenta convertirlo a número
  if (!ok) {
    alert('❌ Valor no numérico. Intenta de nuevo.');
    return null;                                 // señal de error
  }
  return value;
}

// Muestra el menú y ejecuta la opción elegida.
// Llama a esta función desde HTML (botón) o desde consola: startCalculadora()
function startCalculadora() {
  alert(`Bienvenido a ${appName}`);

  // Bucle principal: se repite hasta elegir "0 - Salir".
  while (true) {
    const opcion = prompt(
`Elige una operación:
1) Sumar
2) Restar
3) Multiplicar
4) Dividir
5) Potencia
6) Promedio (N números)
0) Salir`
    );

    if (opcion === null) {
      // Si cancela el prompt, salimos.
      alert('Saliendo…');
      break;
    }

    switch (opcion.trim()) {
      case '1': { // Sumar
        const a = pedirNumero('Ingresa el primer número:');
        if (a === null) break;
        const b = pedirNumero('Ingresa el segundo número:');
        if (b === null) break;
        alert(`Resultado: ${sumar(a, b)}`);
        break;
      }
      case '2': { // Restar
        const a = pedirNumero('Ingresa el primer número:');
        if (a === null) break;
        const b = pedirNumero('Ingresa el segundo número:');
        if (b === null) break;
        alert(`Resultado: ${restar(a, b)}`);
        break;
      }
      case '3': { // Multiplicar
        const a = pedirNumero('Ingresa el primer número:');
        if (a === null) break;
        const b = pedirNumero('Ingresa el segundo número:');
        if (b === null) break;
        alert(`Resultado: ${multiplicar(a, b)}`);
        break;
      }
      case '4': { // Dividir
        const a = pedirNumero('Ingresa el dividendo:');
        if (a === null) break;
        const b = pedirNumero('Ingresa el divisor:');
        if (b === null) break;
        alert(`Resultado: ${dividir(a, b)}`);
        break;
      }
      case '5': { // Potencia
        const base = pedirNumero('Ingresa la base:');
        if (base === null) break;
        const exp = pedirNumero('Ingresa el exponente (por defecto 2):');
        if (exp === null) {
          alert(`Resultado: ${potencia(base)}`); // usa valor por defecto = 2
        } else {
          alert(`Resultado: ${potencia(base, exp)}`);
        }
        break;
      }
      case '6': { // Promedio N números
        const lista = prompt('Ingresa números separados por coma, ej: 10,20,30');
        if (lista === null) break;
        const partes = lista.split(',').map(s => s.trim());
        const nums = [];
        for (const p of partes) {
          const { ok, value } = toNumber(p);
          if (!ok) {
            alert(`❌ "${p}" no es un número válido.`);
            continue;
          }
          nums.push(value);
        }
        if (nums.length === 0) {
          alert('❌ No se ingresaron números válidos.');
          break;
        }
        alert(`Resultado: ${promedio(...nums)}`);
        break;
      }
      case '0':
        alert('¡Gracias por usar la calculadora!');
        return; // salimos de la función y del bucle
      default:
        alert('Opción inválida. Elige 0–6.');
    }
  }
}

// Exponer en window para pruebas desde la consola del navegador:
window.startCalculadora = startCalculadora;

// Ejemplos rápidos en consola (opcional):
// console.log('sumar(2,3) ->', sumar(2,3));
// console.log('promedio(10, 7, 8) ->', promedio(10,7,8));

