$(document).ready(function() {
  // get geolocation
  jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCysMOApW54Jlg78poSl9wLwZZ6NljSyUc", function(success) {
    let position = {coords: {latitude: success.location.lat, longitude: success.location.lng}};
    let coordinatesString = 'https://api.apixu.com/v1/current.json?key=ec4a2339055640bcbe5154348181204&q=' + position.coords.latitude + ',' + position.coords.longitude;

	// get google api response
    let baseUrl = coordinatesString;
    function sendAjaxGet(url, func) {
      let xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.HTTPRequest");
      xhr.onreadystatechange = function() {
          if(this.readyState == 4 && this.status == 200) {
              func(this);
          }
      }
      xhr.open("GET", url);
      xhr.send();
    }

    function getWeather() {
        sendAjaxGet(baseUrl, displayWeather);
    }

    getWeather();

    function displayWeather(xhr) {
      response = xhr.response;
      let weather = JSON.parse(response);

      let fahrenheit = weather.current.temp_f + '\u00B0' + 'F';
      let celcius = weather.current.temp_c + '\u00B0' + 'C'

      $('.condition3').css( 'cursor', 'pointer' );
      $('.condition4').css( 'cursor', 'pointer' );
      $('.condition3').html(fahrenheit);

      $('.condition3').click(function() {           
        $('.condition3').hide();
        $('.condition4').html(celcius).show();

        $('.condition4').click(function() {           
          $('.condition4').hide();
          $('.condition3').html(fahrenheit).show();
        });
      });

      $('.condition1').html(weather.location.name);
      $('.icon_position').append("<img src='http:" + weather.current.condition.icon + "'>");
    }
  })
});