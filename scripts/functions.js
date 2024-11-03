function displayWonders(wonders) {
    const wondersList = document.getElementById('wonders-list');
    wondersList.innerHTML = wonders.map(wonder => `
      <div class="wonder">
        <h2>${wonder.name}</h2>
        <p>${wonder.location}</p>
        <button onclick="viewWonderDetails('${wonder.id}')">View Details</button>
      </div>
    `).join('');
  }

  function viewWonderDetails(id) {
    window.location.href = `index.html?id=${id}`;
  }