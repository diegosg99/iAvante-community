const REPUTATION = {
    like: 10,
    post: 50,
    pregunta: 80,
    respuesta: 50,
    asistencia: 100,
    seguidor: 50,
  }
  
  exports.setReputation = (action) => {
      return REPUTATION[action];
  }
  