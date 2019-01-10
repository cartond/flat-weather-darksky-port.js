# Flat Weather Darksky Port


The plugin's two API options are Yahoo and OpenWeather, Yahoo's API has been depreciated, openweather's basic (required for this plugins API call) is now $45/month.

The plugin's author hasn't updated the script in 2 years so I have added the code necessary to make this work with DarkSky's free api (1000 calls/day for free; $0.0001/call after that).

The only caveat is that their API doesn't allow you to call it from the client-side (i.e. browser Javascript), so you will have to build your own backend to make the call.


The code includes the ORIGINAL line number (from v 1.3) on where to add it

- (best if you add the snippets in reverse orders so the line numbers above it still line up)

If you are the original author (dsmmcken), feel free to use this code or contact me if you 
have a problem with it being public. I have sent you an email already.