function esPrimo(numero) {
    if (numero <= 1) return false;
    for (let i = 2; i < numero; i++) {
        if (numero % i === 0) return false;
    }
    return true;
}

// Probando
console.log("¿7 es primo?", esPrimo(7)); // true
console.log("¿10 es primo?", esPrimo(10)); // false

