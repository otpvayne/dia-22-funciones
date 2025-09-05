function contarVocales(texto) {
    let contador = 0;
    let vocales = "aeiouAEIOU";

    for (let letra of texto) {
        if (vocales.includes(letra)) {
            contador++;
        }
    }
    return contador;
}

// Probando
console.log("Vocales en 'Programación':", contarVocales("Programación")); // 5

