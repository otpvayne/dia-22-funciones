let edad = 20;
let pais = "Colombia";
let nombre = "Andrés";

if (edad >= 18 && pais === "Colombia") {
  if (nombre === "Andrés") {
    console.log("Acceso especial autorizado 🔑");
  } else {
    console.log("Acceso autorizado ✅");
  }
} else {
  console.log("Acceso denegado 🚫");
}

