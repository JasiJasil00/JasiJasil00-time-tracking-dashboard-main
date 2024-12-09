// Function to update card time
function updateCardTime(timeframe, data) {
    const cards = document.querySelectorAll('.card');
    data.forEach((item, index) => {
      const card = cards[index];
      if (!card) return;
  
      const currentTime = item.timeframes[timeframe]?.current ?? '0';
      const previousTime = item.timeframes[timeframe]?.previous ?? '0';
  
      const currentElement = card.querySelector('h1');
      const previousElement = card.querySelector('p');
  
      if (currentElement && previousElement) {
        currentElement.textContent = `${currentTime}hrs`;
        previousElement.textContent = `Last Week - ${previousTime}hrs`;
      }
    });
  }
  
  // Function to handle active button state
  function setActiveButton(activeClass) {
    const buttons = document.querySelectorAll('.options button');
    buttons.forEach(button => {
      if (button.classList.contains(activeClass)) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }
  
  // Fetch JSON data and set up event listeners
  fetch('./data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Default to weekly data
      updateCardTime('weekly', data);
      setActiveButton('weekly');
  
      // Add event listeners for buttons
      document.querySelector('.daily').addEventListener('click', () => {
        updateCardTime('daily', data);
        setActiveButton('daily');
      });
      document.querySelector('.weekly').addEventListener('click', () => {
        updateCardTime('weekly', data);
        setActiveButton('weekly');
      });
      document.querySelector('.monthly').addEventListener('click', () => {
        updateCardTime('monthly', data);
        setActiveButton('monthly');
      });
    })
    .catch(error => {
      console.error('Error loading data:', error);
    });
  