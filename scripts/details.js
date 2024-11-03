function getWonderIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

async function displayWonderDetails() {
  const wonderId = getWonderIdFromUrl();
  if (!wonderId) {
      document.getElementById('wonder-details').innerHTML = 'No wonder ID provided in the URL.';
      return;
  }

  try {
      const response = await fetch(`https://www.world-wonders-api.org/v0/wonders/${wonderId}`);
      const wonder = await response.json();

      document.getElementById('wonder-details').innerHTML = `
          <h2>${wonder.name}</h2>
          <p><strong>Location:</strong> ${wonder.location}</p>
          <p><strong>Description:</strong> ${wonder.description}</p>
          <p><strong>Construction Date:</strong> ${wonder.construction_date || 'N/A'}</p>
          <img src="${wonder.image_url}" alt="${wonder.name}" width="300">
      `;
  } catch (error) {
      console.error('Error fetching wonder details:', error);
      document.getElementById('wonder-details').innerHTML = 'Error loading details. Please try again later.';
  }
}

displayWonderDetails();