
const weather = {
    apiKey: "f3b611da5429191938e106def43d23b8",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) =>{ 
             console.log(data);
           return this.displayWeather(data)});
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity,temp_max,temp_min,pressure} = data.main;
      const { speed } = data.wind;
      console.log(temp_max,temp_min)
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".container").style.backgroundImage =
        "url('https://source.unsplash.com/1080x1920/?" + name + "')";
      document.querySelector('.MaxTemp').innerText = "Maximum temprature in "+ temp_max+"°C";
      document.querySelector('.MinTemp').innerText = "Maximum temprature in "+ temp_min +"°C";
      document.querySelector('.Atomic').innerText = " Atmospheric pressure "+pressure+" hPa";
      document.querySelector(".weather").classList.remove("loading");
    },
    search:function(){
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Mumbai");