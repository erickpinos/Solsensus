# TODO : add scheduling
# TODO: add kilowatt peak and baseload variables
# TODO: OpenWeatherMap API


import pyowm

owm = pyowm.OWM('60ef36fb726ad89ab030d09a14910996')

obs = owm.weather_at_place('Bonn')
w = obs.get_weather()
now = w.get_clouds()
