import { useState, useEffect } from 'react';
import type { WeatherData } from '../types/weather';

interface CityResult {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  admin1?: string;
}

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<CityResult[]>([]);
  const [favorites, setFavorites] = useState<CityResult[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('weather_favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const saveFavorites = (newFavorites: CityResult[]) => {
    setFavorites(newFavorites);
    localStorage.setItem('weather_favorites', JSON.stringify(newFavorites));
  };

  const toggleFavorite = (city: CityResult) => {
    const exists = favorites.find(f => f.name === city.name && f.country === city.country);
    if (exists) {
      saveFavorites(favorites.filter(f => f.name !== city.name));
    } else {
      saveFavorites([...favorites, city]);
    }
  };

  const fetchWeatherData = async (lat: number, lon: number, city: string, country: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto`);
      const data = await res.json();
      setWeather({ city, country, current: data.current, daily: data.daily, hourly: data.hourly });
    } catch (err) { 
      setError("Error de conexión"); 
    } finally {
      setLoading(false);
    }
  };

  const searchCities = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=es&format=json`);
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    }
  };

  const fetchWeatherByCity = async (city: string) => {
    setLoading(true); setError(null);
    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=es&format=json`);
      const geoData = await geoRes.json();
      if (!geoData.results) throw new Error("Ciudad no encontrada");
      const { latitude, longitude, name, country } = geoData.results[0];
      fetchWeatherData(latitude, longitude, name, country);
    } catch (err) { setError("No se encontró la ubicación"); setLoading(false); }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => fetchWeatherData(lat, lon, "Ubicación Actual", "");

  const fetchWeatherByLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
        (err) => {
          setError("Permiso de ubicación denegado");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocalización no soportada");
    }
  };

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      fetchWeatherByCity(lastCity);
    } else {
      fetchWeatherByCity("Madrid");
    }
  }, []);

  useEffect(() => {
    if (weather?.city && weather.city !== "Ubicación Actual") {
      localStorage.setItem('lastCity', weather.city);
    }
  }, [weather]);

  return { 
    weather, 
    loading, 
    error, 
    fetchWeatherByCity, 
    fetchWeatherData,
    searchCities, 
    searchResults, 
    setSearchResults,
    fetchWeatherByLocation,
    favorites,
    toggleFavorite
  };
};
