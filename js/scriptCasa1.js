function led(value) {
  fetch('http://'/*endereço ip do arduíno*/'/api/led/' + value)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Erro:', error);
      });
}