window.onload = function() {
  fetch("/os", { method: "GET" })
    .then(res => {
      if (res.ok) return res.json();
      throw new Error('Request failed');
    })
    .then(data => {
      if (data) {
        document.getElementById('hostname').innerHTML = `Pod - ${data.os}`;
      }
    })
    .catch(error => console.log(error));
};

const btn = document.getElementById('submit');
if (btn) {
  btn.addEventListener('click', () => {
    fetch("/planet", {
      method: "POST",
      body: JSON.stringify({ id: document.getElementById("planetID").value }),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then(res2 => {
      if (res2.ok) return res2.json();
      throw new Error('Request failed.');
    })
    .then(data => {
      if (data) {
        document.getElementById('planetName').innerHTML = `${data.name}`;
        const element = document.getElementById("planetImage");
        element.style.backgroundImage = `url(${data.image})`;
        document.getElementById('planetDescription').innerHTML = data.description.replace(/(.{80})/g, "$1<br>");
      }
    })
    .catch(error => {
      alert("Ooops, We have 8 planets.\nSelect a number from 0 - 8");
      console.log(error);
    });
  });
}