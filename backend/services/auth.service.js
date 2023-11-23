const bcrypt = require('bcrypt');

// Función para codificar una contraseña
exports.hashPassword = async (password) => {
  try {
    const saltRounds = 10; // Número de rondas de sal (ajusta según tus necesidades)
    const salt = await bcrypt.genSalt(saltRounds); // Genera una sal aleatoria

    const hashedPassword = await bcrypt.hash(password, salt); // Cifra los datos con la sal generada

    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

// Función para verificar una contraseña
exports.comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};