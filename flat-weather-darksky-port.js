/*
The plugin's author hasn't updated the script in 2 years.
Yahoo's API has been depreciated, opentweather is now $45/month
I have added the code necessary to make this work with DarkSky's free api
    (1000 calls/day for free; $0.0001/call after that).
The only caveat is that their API doesn't allow you to call it from the client-side (i.e. Javascript), 
 so you will have to build your own backend to make the call.
Add the code below:
    match the ORIGINAL line number and add the code below 
    (best if you add the snippets in reverse orders so the line numbers above it still line up)
If you are the original author (dsmmcken), feel free to use this code or contact me if you have a problem with it being public.
*/

//28 	//darksky doesn't allow customer-facing requests. you will have to use some sort of backend to retrieve the data
,"darksky" : ["/your_weather_endpoint"]

//155
else if (this.settings.api == "darksky") {
    //Build this out in your backend. Darksy doesn't allow calls from the client side (JS)
}

//208
else if (that.settings.api == "darksky" && args.status == 403) {
    console.log("Error authenticating with the darkmap api see error object below for details:");
    console.log(args);
    promise.reject(args, that);
}

//264
//default handling
else {
    error = "Sorry, the weather service is currently down. Please try again later."
}

//660

else if (settings.api == "darksky") {
    out.location = settings.location; //darksky doesn't return a city/state

    out.today = {};
    out.today.temp = {};
    out.today.temp.now = Math.round(input.currently.temperature);
    out.today.temp.min = Math.round(input.daily.data[0].temperatureMin);
    out.today.temp.max = Math.round(input.daily.data[0].temperatureMax);

    out.today.desc = input.daily.data[0].summary.capitalize();

    //key = darksky code, value = standard code (based on openweathermap codes)
        // -hail, thunderstorm, and torndado are not implemented by darksky yet, added anyways
        // -if partly-cloudy-night is the worst weather condition that was found, that it was clear during the day.
    var codes = {
        'clear-day' : '800',
        'clear-night' : '800',
        'rain' : '521',
        'snow' : '601',
        'sleet' : '611',
        'wind' : '954',
        'fog' : '741',
        'cloudy' : '802',
        'partly-cloudy-day' : '802',
        'partly-cloudy-night' : '800',
        'hail' : '906',
        'thunderstorm' : '200',
        'tornado' : '900',
    }

    out.today.code = codes[input.currently.icon];

    out.today.wind = {}
    out.today.wind.speed = input.currently.windSpeed;
    out.today.wind.deg = input.currently.windBearing;
    
    out.today.humidity = input.currently.humidity;
    out.today.pressure = input.currently.pressure;
    out.today.sunrise = epochToHours(input.daily.data[0].sunriseTime);
    out.today.sunset = epochToHours(input.daily.data[0].sunsetTime);

    out.today.day = getDayString(new Date(), settings.strings.days);
    
    out.forecast = [];
    for (var i = 0; i < settings.forecast; i++) {
        var forecast = {};
        forecast.day = getDayString(new Date(input.daily.data[i].time * 1000), settings.strings.days); //api time is in unix epoch
        forecast.code = codes[input.daily.data[i].icon];
        forecast.desc = input.daily.data[i].summary.capitalize();
        forecast.temp = {max: Math.round(input.daily.data[i].temperatureMax), min: Math.round(input.daily.data[i].temperatureMin)}
        out.forecast.push(forecast);
    }
