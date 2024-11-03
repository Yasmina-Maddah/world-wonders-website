function getWonderNameFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('name');
}

async function displayWonderDetails() {
    const wonderName = getWonderNameFromUrl();
    if (!wonderName) {
        document.querySelector('.details-card').innerHTML = 'No wonder name provided in the URL.';
        return;
    }

    try {
        const response = await fetch('https://www.world-wonders-api.org/v0/wonders');
        const wonders = await response.json();
        const wonder = wonders.find(w => w.name === decodeURIComponent(wonderName));

        if (!wonder) {
            document.querySelector('.details-card').innerHTML = 'Wonder not found.';
            return;
        }

        // Populate the HTML elements with data
        document.getElementById('wonder-name').textContent = wonder.name;
        document.getElementById('wonder-image').src = wonder.links.images[0];
        document.getElementById('wonder-location').innerHTML = `<strong>Location:</strong> ${wonder.location}`;
        document.getElementById('wonder-description').innerHTML = `<strong>Description:</strong> ${wonder.summary}`;
        document.getElementById('wonder-construction').innerHTML = `<strong>Construction Date:</strong> ${wonder.build_year || 'N/A'}`;
    } catch (error) {
        console.error('Error fetching wonder details:', error);
        document.querySelector('.details-card').innerHTML = 'Error loading details. Please try again later.';
    }
}

displayWonderDetails();