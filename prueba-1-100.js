let pares = [];

for (let i = 1; i <= 100; i++) {
  if (i % 2 === 0) {   // si el resto de dividir por 2 es 0, es par
    pares.push(i);     // agregar al array
  }
}

console.log("Números pares:", pares);
console.log("Cantidad de pares:", pares.length);

