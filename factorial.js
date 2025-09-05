function factorial(n) {
    let resultado = 1;
    for (let i = 1; i <= n; i++) {
        resultado *= i;
    }
    return resultado;
}

// Probando
console.log("Factorial de 5:", factorial(5)); // 120

