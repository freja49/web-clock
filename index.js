

function getTime() {
    var time = new Date();
    var hour = (time.getHours() < 10 ? "0" : "") + time.getHours();
    var minu = (time.getMinutes() < 10 ? "0" : "") + time.getMinutes();
    var icon = document.querySelector(".icon");
    var words = document.querySelector(".words");
    var week = time.getDay();
    var day = time.getDate();
    var month = time.getMonth() + 1;
    document.querySelector(".time").innerText = hour + ":" + minu;
    document.querySelector(".current_week").innerText = week;
    document.querySelector(".current_day").innerText = day;
    document.querySelector(".current_month").innerText = month;


    if (hour >= 12 && hour <= 18) {
        icon.classList.add("sun");
        words.innerText = "Good Afternoon";
    } else if (hour < 12) {
        icon.classList.add("sun");
        words.innerText = "Good Morning";
    } else if (hour > 18) {
        icon.classList.add("moon");
        words.innerText = "Good Evening";

    }
    
    
}
setInterval(getTime, 1000);

var quote= document.querySelector(".quote");
var author= document.querySelector(".author");

async function updateQuote() {
    // Fetch a random quote from the Quotable API
    const response = await fetch("https://api.quotable.io/random",
   {param:{
        maxLength:10
    }});
    const data = await response.json();
    if (response.ok) {
      // Update DOM elements
      quote.innerText = data.content;
      author.innerText=`--${data.author}`;
    } else {
      quote.innerText = "An error occured";
      console.log(data);
    }
}
updateQuote();


var geocoder;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
} 
//Get the latitude and the longitude;
function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    codeLatLng(lat, lng)
}

function errorFunction(){
    alert("Geocoder failed");
}

  function initialize() {
    geocoder = new google.maps.Geocoder();



  }

  function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      console.log(results)
        if (results[1]) {
         //formatted address
         alert(results[0].formatted_address)
        //find country name
             for (var i=0; i<results[0].address_components.length; i++) {
            for (var b=0;b<results[0].address_components[i].types.length;b++) {

            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                    //this is the object you are looking for
                    city= results[0].address_components[i];
                    break;
                }
            }
        }
        //city data
        alert(city.short_name + " " + city.long_name)


        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }
 