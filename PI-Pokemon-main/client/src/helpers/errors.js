export function getErrors(input, nombreDisponible) {
  let errors = {};

  if (!input.nombre) {
    errors.nombre = "Ingresar un nombre";
  } else if (!/^[a-z]+$/g.test(input.nombre)) {
    errors.nombre = "ingresar solo letras minusculas";
  } else if (input.nombre.length > 15) {
    errors.nombre = "ingresar menos de 15 caracteres";
  } else if (nombreDisponible === false) {
    errors.nombre = "nombre existente,no puede repetirse";
  }

  if (input.tipos.length === 0) {
    errors.tipos = "ingresar un tipo de pokemon";
  } else if (input.tipos.length > 2) {
    errors.tipos = "solo se pueden ingresar 2 tipos";
  }

  if (!input.imagen) {
    errors.imagen = "imagen requerida";
  } else if (!urlRegex.test(input.imagen)) {
    errors.imagen = "formato invalido";
  }

  const vidaError = validateNumber(input.vida, "vida", 9999);

  if (vidaError) {
    errors.vida = vidaError;
  }

  const pesoError = validateNumber(input.peso, "peso", 9999);
  if (pesoError) {
    errors.peso = pesoError;
  }
  const defensaError = validateNumber(input.defensa, "defensa", 9999);
  if (defensaError) {
    errors.defensa = defensaError;
  }
  const alturaError = validateNumber(input.altura, "altura", 9999);
  if (alturaError) {
    errors.altura = alturaError;
  }
  const velocidadError = validateNumber(input.velocidad, "velocidad", 9999);
  if (velocidadError) {
    errors.velocidad = velocidadError;
  }
  const fuerzaError = validateNumber(input.fuerza, "fuerza", 9999);
  if (fuerzaError) {
    errors.fuerza = fuerzaError;
  }
  return errors;
}

function validateNumber(inputNumber, name, max) {
  if (!inputNumber) {
    return "ingresar " + name;
  } else if (inputNumber != parseInt(inputNumber)) {
    return " el valor ingresado debe ser un numero entero";
  } else if (parseInt(inputNumber) < 0) {
    return "no es un numero valido";
  } else if (inputNumber > max) {
    return "numero invalido";
  }
}

const urlRegex =/(https?:\/\/.*\.(?:png|gif|webp|jpeg|jpg|svg))/i