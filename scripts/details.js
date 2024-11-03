function getWonderNameFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('name');
}

async function displayWonderDetails() {
  const wonderName = getWonderNameFromUrl();
  if (!wonderName) {
      document.getElementById('wonder-details').innerHTML = 'No wonder name provided in the URL.';
      return;
  }

  try {
      const response = await fetch('https://www.world-wonders-api.org/v0/wonders');
      const wonders = await response.json();
      const wonder = wonders.find(w => w.name === decodeURIComponent(wonderName));

      if (!wonder) {
          document.getElementById('wonder-details').innerHTML = 'Wonder not found.';
          return;
      }

      document.getElementById('wonder-details').innerHTML = `
          <h2>${wonder.name}</h2>
          <p><strong>Location:</strong> ${wonder.location}</p>
          <p><strong>Description:</strong> ${wonder.summary}</p>
          <p><strong>Construction Date:</strong> ${wonder.build_year || 'N/A'}</p>
          <img src="${wonder.links.images[0]}" alt="${wonder.name}" width="300">
      `;
  } catch (error) {
      console.error('Error fetching wonder details:', error);
      document.getElementById('wonder-details').innerHTML = 'Error loading details. Please try again later.';
  }
}

displayWonderDetails();