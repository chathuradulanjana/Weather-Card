window.onload = function () {
    const locationEl = document.querySelector('.location');
    const dateEl = document.querySelector('.date');
    const temperatureEl = document.querySelector('.temperature');
    const descriptionEl = document.querySelector('.description');
    const humidityEl = document.querySelector('.humidity');
    const windSpeedEl = document.querySelector('.wind-speed');
    const weatherIconEl = document.querySelector('.weather-icon');
  
    const API_KEY = '1041e5fe018a7f646434b0fe65ba210a'; // Replace with your OpenWeatherMap API key
  
    // Function to set the background based on weather condition
    function setWeatherBackground(condition) {
      const body = document.body;
      // Remove any existing weather-related background class
      body.classList.remove('sunshine', 'rain', 'clouds', 'snow');
      
      // Add the appropriate background class based on the weather condition
      switch (condition.toLowerCase()) {
        case 'clear':
          body.classList.add('sunshine');
          break;
        case 'rain':
          body.classList.add('rain');
          break;
        case 'clouds':
          body.classList.add('clouds');
          break;
        case 'snow':
          body.classList.add('snow');
          break;
        default:
          body.classList.add('sunshine'); // Default background
      }
    }
  
    // Get the user's location and fetch the weather data
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();
  
        // Update DOM elements
        locationEl.textContent = data.name;
        dateEl.textContent = new Date().toLocaleDateString();
        temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
        descriptionEl.textContent = data.weather[0].description;
        humidityEl.textContent = data.main.humidity;
        windSpeedEl.textContent = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h
        weatherIconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  
        // Call setWeatherBackground with the weather condition
        setWeatherBackground(data.weather[0].main);
      },
      () => {
        locationEl.textContent = 'Location unavailable';
      }
    );
  };
  