import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Wind, Droplets, Sun, MapPin, Sunrise, Navigation, Thermometer, Heart, X
} from 'lucide-react';
import '../styles/weather.scss';
import { useWeather } from '../hooks/useWeather';
import WeatherEffects from './WeatherEffects';
import BentoCard from './BentoCard';
import { BentoSkeleton } from './Skeleton';
import { getWeatherIcon, formatTime, getBgGradient, getWeatherDescription } from '../utils/weatherUtils';

export default function WeatherApp() {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const { 
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
  } = useWeather();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) {
      searchCities(value);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleSelectCity = (lat: number, lon: number, name: string, country: string) => {
    fetchWeatherData(lat, lon, name, country);
    setQuery('');
    setShowResults(false);
    setSearchResults([]);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      fetchWeatherByCity(query);
      setShowResults(false);
    }
  };

  const isFavorite = weather && favorites.some(f => f.name === weather.city);

  return (
    <div className="relative min-h-screen w-full text-white font-sans bg-black selection:bg-white/20 overflow-hidden">
      
      <div className={`fixed inset-0 transition-colors duration-[2000ms] bg-gradient-to-br ${weather ? getBgGradient(weather.current.weather_code, weather.current.is_day) : 'from-black to-black'}`}>
        {weather && <WeatherEffects code={weather.current.weather_code} isDay={weather.current.is_day} />}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-8 min-h-screen flex flex-col">
        
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center backdrop-blur-md">
              <div className="w-4 h-4 rounded-full bg-white/90 shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
            </div>
            <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight leading-none">Weather<span className="opacity-40 font-normal">OS</span></span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 leading-none mt-1">Premium</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto" ref={searchRef}>
            <button 
              onClick={fetchWeatherByLocation}
              className="p-2.5 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-colors text-white/70 hover:text-white"
              title="Usar mi ubicación"
            >
              <Navigation size={18} />
            </button>

            <div className="relative group w-full md:w-[300px]">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4 group-focus-within:text-white transition-colors" />
                <input 
                  value={query}
                  onChange={handleSearchInput}
                  onFocus={() => query.length > 2 && setShowResults(true)}
                  placeholder="Buscar ciudad..."
                  className="w-full bg-[#1a1a1d]/50 border border-white/5 rounded-full py-2.5 pl-10 pr-4 text-xs text-white placeholder-white/20 focus:outline-none focus:bg-[#252529]/80 focus:border-white/10 transition-all shadow-lg"
                />
              </form>

              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1d]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50">
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleSelectCity(result.latitude, result.longitude, result.name, result.country)}
                      className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white group-hover:text-white transition-colors">{result.name}</span>
                        <span className="text-[10px] text-white/40">{result.admin1 ? `${result.admin1}, ` : ''}{result.country}</span>
                      </div>
                      <MapPin size={14} className="text-white/20 group-hover:text-white/60" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {loading && <BentoSkeleton />}

        {error && (
          <div className="flex-1 flex items-center justify-center text-center animate-in fade-in zoom-in duration-300">
            <div className="bg-red-500/10 border border-red-500/20 px-6 py-4 rounded-2xl backdrop-blur-md">
               <p className="text-red-200 text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && weather && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10 animate-in fade-in duration-700 slide-in-from-bottom-4">
            
            <BentoCard className="md:col-span-2 lg:col-span-2 row-span-2 justify-between min-h-[340px] group">
              <div className="flex justify-between items-start w-full pt-1">
                 <div>
                    <div className="flex items-center gap-2 text-white/50 mb-1">
                        <MapPin size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{weather.city}</span>
                    </div>
                    <h2 className="text-2xl font-medium tracking-tight text-white/90 capitalize">
                        {getWeatherDescription(weather.current.weather_code)}
                    </h2>
                 </div>
                 <div className="flex flex-col items-end gap-2">
                    <button 
                      onClick={() => toggleFavorite({ 
                        id: Date.now(), 
                        name: weather.city, 
                        country: weather.country, 
                        latitude: 0, 
                        longitude: 0 
                      })}
                      className={`p-2 rounded-full transition-all ${isFavorite ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-white/20 hover:bg-white/10 hover:text-white'}`}
                    >
                      <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
                    </button>
                    <div className="text-right">
                        <span className="text-xs font-bold text-white/30 block uppercase tracking-widest">Hoy</span>
                        <span className="text-xs text-white/50">{new Date().toLocaleDateString('es-ES', {day: 'numeric', month: 'short'})}</span>
                    </div>
                 </div>
              </div>

              <div className="flex-1 flex flex-col justify-center py-4">
                  <div className="flex items-center gap-6">
                      <span className="text-[8rem] leading-none font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 drop-shadow-2xl">
                          {Math.round(weather.current.temperature_2m)}°
                      </span>
                      
                      <div className="h-24 w-[1px] bg-gradient-to-b from-white/0 via-white/10 to-white/0 mx-2" />
                      
                      <div className="flex flex-col justify-center gap-3">
                          <div className="flex items-center gap-3 text-sm font-medium">
                             <div className="flex flex-col items-center">
                                <span className="text-[9px] uppercase text-white/30 tracking-wider mb-0.5">Max</span>
                                <span className="text-white/90">{Math.round(weather.daily.temperature_2m_max[0])}°</span>
                             </div>
                             <div className="flex flex-col items-center">
                                <span className="text-[9px] uppercase text-white/30 tracking-wider mb-0.5">Min</span>
                                <span className="text-white/60">{Math.round(weather.daily.temperature_2m_min[0])}°</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-white/40 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                             <Thermometer size={12} className="text-white/60"/>
                             <span>Sensación</span>
                             <span className="text-white">{Math.round(weather.current.apparent_temperature)}°</span>
                          </div>
                      </div>
                  </div>
              </div>
              
              <div className="absolute -bottom-2 right-6 opacity-100 pointer-events-none scale-110 transition-transform duration-700 group-hover:scale-125 drop-shadow-2xl">
                 {getWeatherIcon(weather.current.weather_code, weather.current.is_day, 180)}
              </div>
            </BentoCard>

            <div className="md:col-span-1 lg:col-span-2 row-span-2 grid grid-cols-2 gap-4">
               
               <BentoCard title="Viento" icon={Wind} className="aspect-square">
                  <div className="flex-1 flex flex-col items-center justify-center relative">
                      <div className="absolute inset-0 border border-white/5 rounded-full m-2 animate-[spin_12s_linear_infinite]" />
                      <div className="absolute inset-0 border border-white/5 rounded-full m-6 border-dashed animate-[spin_20s_linear_infinite_reverse]" />
                      
                      <div style={{ transform: `rotate(${weather.current.wind_direction_10m}deg)` }} className="transition-transform duration-1000 p-2 bg-white/5 rounded-full mb-2">
                          <Navigation size={18} className="text-white fill-white" />
                      </div>
                      <div className="text-center z-10">
                          <span className="text-2xl font-bold block">{Math.round(weather.current.wind_speed_10m)}</span>
                          <span className="text-[9px] uppercase text-white/40">km/h</span>
                      </div>
                  </div>
               </BentoCard>

               <BentoCard title="Humedad" icon={Droplets} className="aspect-square">
                  <div className="flex-1 flex flex-col justify-end pb-2">
                      <span className="text-4xl font-bold tracking-tighter">{weather.current.relative_humidity_2m}<span className="text-lg text-white/30 align-top">%</span></span>
                      <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]" style={{ width: `${weather.current.relative_humidity_2m}%` }} />
                      </div>
                  </div>
               </BentoCard>

               <BentoCard title="Amanecer" icon={Sunrise} className="aspect-square">
                   <div className="flex-1 flex flex-col justify-center items-center">
                       <div className="relative w-full h-16 flex items-end justify-center mb-2">
                           <div className="absolute w-full border-b border-white/10 bottom-0" />
                           <div className="w-24 h-24 border border-white/20 rounded-full absolute -bottom-12 border-dashed opacity-30" />
                           <Sun size={24} className="text-amber-300 relative z-10 mb-[-12px] drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                       </div>
                       <span className="text-xl font-bold">{formatTime(weather.daily.sunrise[0])}</span>
                   </div>
               </BentoCard>

               <BentoCard title="Índice UV" icon={Sun} className="aspect-square">
                   <div className="flex-1 flex flex-col justify-end pb-2">
                       <span className="text-4xl font-bold tracking-tighter">{weather.daily.uv_index_max[0]}</span>
                       <span className="text-[10px] font-bold uppercase text-white/30 mt-1 tracking-widest">
                           {weather.daily.uv_index_max[0] > 6 ? 'Alto' : weather.daily.uv_index_max[0] > 3 ? 'Medio' : 'Bajo'}
                       </span>
                   </div>
               </BentoCard>
            </div>

            <BentoCard className="col-span-1 md:col-span-3 lg:col-span-4 min-h-[160px]">
                <div className="flex items-center justify-between mb-4 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Próximas 24 Horas</span>
                    <div className="h-[1px] flex-1 mx-4 bg-white/5" />
                </div>
                <div className="flex overflow-x-auto gap-8 pb-2 no-scrollbar mask-gradient cursor-grab active:cursor-grabbing">
                    {weather.hourly.time.slice(0, 24).map((t, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 min-w-[4rem] group opacity-60 hover:opacity-100 transition-all duration-300">
                            <span className="text-[10px] font-medium text-white/40">{i === 0 ? 'Ahora' : formatTime(t)}</span>
                            <div className="transform group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300">
                                {getWeatherIcon(weather.hourly.weather_code[i], 1, 22)}
                            </div>
                            <span className="text-lg font-bold">{Math.round(weather.hourly.temperature_2m[i])}°</span>
                        </div>
                    ))}
                </div>
            </BentoCard>

            <BentoCard className="md:col-span-3 lg:col-span-2" title="Pronóstico 7 Días">
                <div className="flex flex-col gap-0.5 mt-2">
                    {weather.daily.time.map((day, i) => (
                        <div key={i} className="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-white/5 transition-colors group">
                            <span className="text-xs font-medium text-white/50 w-20 capitalize group-hover:text-white transition-colors">
                                {new Date(day).toLocaleDateString('es-ES', { weekday: 'long' })}
                            </span>
                            <div className="flex-1 flex justify-center opacity-60 group-hover:opacity-100">
                                {getWeatherIcon(weather.daily.weather_code[i], 1, 16)}
                            </div>
                            <div className="flex gap-4 w-24 justify-end text-xs">
                                <span className="font-bold">{Math.round(weather.daily.temperature_2m_max[i])}°</span>
                                <span className="text-white/30 font-medium">{Math.round(weather.daily.temperature_2m_min[i])}°</span>
                            </div>
                        </div>
                    ))}
                </div>
            </BentoCard>
            
             <BentoCard className="md:col-span-3 lg:col-span-2 flex flex-col" title="Ubicaciones Guardadas">
                {favorites.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-white/30 gap-2">
                    <Heart size={24} className="opacity-20" />
                    <span className="text-xs">No hay ubicaciones guardadas</span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 mt-2 overflow-y-auto max-h-[200px] pr-2 custom-scrollbar">
                    {favorites.map((fav) => (
                      <div key={fav.name} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer" onClick={() => fetchWeatherByCity(fav.name)}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300">
                            <MapPin size={14} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold">{fav.name}</span>
                            <span className="text-[10px] text-white/40">{fav.country}</span>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleFavorite(fav); }}
                          className="p-2 rounded-full hover:bg-white/10 text-white/20 hover:text-red-400 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
             </BentoCard>

          </div>
        )}
      </div>
    </div>
  );
}
