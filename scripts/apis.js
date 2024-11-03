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
