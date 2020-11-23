const api = {
  key: "86e0646647f1ec169580537b2493273a",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    searchup(document.querySelector('.search-box').value)
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}


function searchup (s) {
  var ids="";
  var links =[];
  var results=[];
  fetch('https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch='+s)
      .then(response => {
          return response.json();
})

.then(result =>{
  results = result.query.search;
  for(var i=0;i<results.length;i++){
    if(results[i+1]!=null){
      ids +=results[i].pageid+"|";
    }
    else{
      ids+=results[i].pageid;
    }
  }
})
.then(a=>{
  fetch("https://en.wikipedia.org/w/api.php?action=query&prop=info&inprop=url&origin=*&format=json&pageids="+ids)
  .then(idresult =>{return idresult.json()})
  .then(idresult =>{
    for(i in idresult.query.pages){
      links.push(idresult.query.pages[i].fullurl);
    }
  })
  .then(g=>{
    document.getElementById("output").innerHTML="";
    for(var i=0;i<results.length;i++){
      document.getElementById("output").innerHTML+="<a href="+links[i]+"'target='_blank'>"+results[i].title+"</a><br>"+results[i].snippet+"<br>";        }
  });
});
}
