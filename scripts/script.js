async function fetchWonders() {
    try {
      const response = await fetch('https://www.world-wonders-api.org/v0/wonders');
      const wonders = await response.json();
      displayWonders(wonders);
    } catch (error) {
      console.error('Error fetching wonders:', error);
    }
  }

  fetchWonders();

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
    window.location.href = `details.html?id=${id}`;
  }
