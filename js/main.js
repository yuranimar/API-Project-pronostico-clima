/**
 * Lógica de negocio para WeatherTravel
 * Maneja carga de CSV local y consultas a API externa.
 */

const citySelector = document.getElementById('city-selector');
const weatherDisplay = document.getElementById('weather-display');

/**
 * Procesa el archivo CSV de ciudades y llena el menú desplegable
 */
async function initializeApp() {
    try {
        const response = await fetch('city_coordinates.csv');
        const csvData = await response.text();
        
        // Dividir por líneas y omitir el encabezado 
        const lines = csvData.trim().split('\n').slice(1);
        
        citySelector.innerHTML = '<option value="">-- Elige un destino --</option>';

        lines.forEach(line => {
            const [lat, lon, city, country] = line.split(',');
            if (city) {
                const option = document.createElement('option');
                option.value = `${lat.trim()},${lon.trim()}`;
                option.textContent = `${city.trim()}, ${country.trim()}`;
                citySelector.appendChild(option);
            }
        });
    } catch (error) {
        console.error("Error cargando configuración:", error);
        citySelector.innerHTML = '<option>Error al cargar ciudades</option>';
    }
}

/**
 * Llama a la API de 7Timer! usando coordenadas geográficas
 */
async function fetchWeather(lat, lon) {
    const API_URL = `https://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civil&output=json`;

    try {
        weatherDisplay.innerHTML = '<p>Consultando el cielo europeo...</p>';
        
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Fallo en la conexión");

        const data = await response.json();
        renderForecast(data.dataseries);
    } catch (err) {
        weatherDisplay.innerHTML = '<p class="error-msg">Servicio temporalmente no disponible.</p>';
    }
}

/**
 * Renderiza el pronóstico de 7 días filtrando los datos de la API
 */
function renderForecast(series) {
    weatherDisplay.innerHTML = "";
    
    // La API devuelve datos cada 3 horas; saltamos 8 registros para obtener un resumen diario
    const sevenDayForecast = series.filter((_, i) => i % 8 === 0).slice(0, 7);

    sevenDayForecast.forEach((day, index) => {
        const card = document.createElement('article');
        card.className = 'weather-card';
        card.innerHTML = `
            <h3>Día ${index + 1}</h3>
            <p style="font-size: 1.5rem; font-weight: bold;">${day.temp2m}°C</p>
            <p>Estado: ${translateStatus(day.weather)}</p>
        `;
        weatherDisplay.appendChild(card);
    });
}

function translateStatus(code) {
    const dictionary = {
        'clear': 'Despejado',
        'pcloudy': 'Parcialmente Nublado',
        'mcloudy': 'Nublado',
        'rain': 'Lluvia',
        'snow': 'Nieve',
        'ts': 'Tormenta'
    };
    return dictionary[code] || code;
}

// Evento de cambio de ciudad
citySelector.addEventListener('change', (e) => {
    if (e.target.value) {
        const [lat, lon] = e.target.value.split(',');
        fetchWeather(lat, lon);
    }
});

// Inicio de la aplicación
document.addEventListener('DOMContentLoaded', initializeApp);