/**
 * PROYECTO: European Travel Agency - Weather Forecast
 * Descripción: Gestión asíncrona de datos CSV y API JSON de 7Timer!
 */

document.addEventListener('DOMContentLoaded', () => {
    const selectCiudades = document.getElementById('selector-ciudades');
    const contenedorClima = document.getElementById('contenedor-clima');
    const nombreCiudadH2 = document.getElementById('nombre-ciudad-actual');

    // 1. CARGAR CIUDADES DESDE EL CSV (Procesamiento de datos locales)
    async function cargarCiudades() {
        try {
            const respuesta = await fetch('city_coordinates.csv');
            if (!respuesta.ok) throw new Error("No se encuentra el archivo CSV");
            
            const datos = await respuesta.text();
            const filas = datos.trim().split('\n').slice(1); // Saltar cabecera
            
            selectCiudades.innerHTML = '<option value="">-- ELIGE UNA CIUDAD --</option>';
            
            filas.forEach(fila => {
                const columnas = fila.split(',');
                if (columnas.length >= 4) {
                    const [lat, lon, ciudad, pais] = columnas;
                    const opt = document.createElement('option');
                    // Almacenamos coordenadas y nombre para uso posterior
                    opt.value = `${lat.trim()}|${lon.trim()}|${ciudad.trim()}`;
                    opt.textContent = `${ciudad.trim()}, ${pais.trim()}`;
                    selectCiudades.appendChild(opt);
                }
            });
            console.log("Base de datos de ciudades lista.");
        } catch (e) {
            console.error("Error al cargar el CSV:", e);
            selectCiudades.innerHTML = '<option>Error al cargar destinos</option>';
        }
    }

    // 2. OBTENER CLIMA (Llamada asíncrona HTTP y procesamiento JSON)
    async function obtenerClima(lat, lon, nombre) {
        try {
            nombreCiudadH2.textContent = nombre.toUpperCase();
            contenedorClima.innerHTML = '<div class="mensaje">Consultando satélite...</div>';

            // Limpieza y normalización de coordenadas
            const cleanLat = parseFloat(lat.replace(',', '.'));
            const cleanLon = parseFloat(lon.replace(',', '.'));

            // Construcción de URL para la API 7Timer!
          // 1. Definimos la dirección original de la API
const apiUrl = `http://www.7timer.info/bin/api.pl?lon=${cleanLon}&lat=${cleanLat}&product=civil&output=json`;

// 2. La envolvemos en un proxy gratuito que gestiona el CORS por nosotros
const url = `https://corsproxy.io/?` + encodeURIComponent(apiUrl);

console.log("Iniciando petición vía Proxy a:", url);

            const res = await fetch(url);
            if (!res.ok) throw new Error("La API no respondió correctamente");
            
            const data = await res.json();
            if (!data.dataseries) throw new Error("Formato JSON inesperado");

            // Actualizar interfaz y efectos visuales
            actualizarEfectoVisual(data.dataseries[0].weather);
            renderizarResultados(data.dataseries);

        } catch (e) {
            console.error("Detalle del error:", e);
            contenedorClima.innerHTML = `
                <div style="color: #ff4d4d; padding: 20px; background: rgba(0,0,0,0.3); border-radius: 10px;">
                    <strong>Error de Conexión</strong><br>
                    No pudimos sincronizar con el servicio meteorológico.<br>
                    <small>Causa: ${e.message}</small>
                </div>`;
        }
    }

    // 3. RENDERIZAR RESULTADOS (Manipulación del DOM)
    function renderizarResultados(series) {
        contenedorClima.innerHTML = '';
        // Obtenemos un registro cada 24h (8 intervalos de 3h) para cubrir 7 días
        const pronostico = series.filter((_, i) => i % 8 === 0).slice(0, 7);
        
        pronostico.forEach((dia, i) => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'tarjeta-clima';
            tarjeta.innerHTML = `
                <p>DÍA ${i+1}</p>
                <div class="temp">${dia.temp2m}°C</div>
                <div class="estado">${dia.weather.toUpperCase()}</div>
            `;
            contenedorClima.appendChild(tarjeta);
        });
    }

    // 4. EFECTOS DINÁMICOS DE PARTÍCULAS
function actualizarEfectoVisual(clima) {
    let config;
    const c = clima.toLowerCase();

    // LLUVIA: Más fina y rápida, con forma de línea
    if (c.includes('rain') || c.includes('ts')) {
        config = {
            "particles": {
                "number": { "value": 150 },
                "color": { "value": "#ffffff" },
                "shape": { "type": "line" }, // Forma de gota
                "opacity": { "value": 0.3 },
                "size": { "value": 1 },
                "move": { "speed": 25, "direction": "bottom", "straight": true } 
            }
        };
    } 
    // NUBES: Grandes, muy lentas y casi transparentes
    else if (c.includes('cloudy')) {
        config = {
            "particles": {
                "number": { "value": 6 },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.05 }, // Casi invisibles
                "size": { "value": 150 },      // Muy grandes como nubes
                "move": { "speed": 0.5, "direction": "right" }
            }
        };
    }
    // DESPEJADO: Un brillo sutil (como polvo en el sol)
    else {
        config = {
            "particles": {
                "number": { "value": 30 },
                "opacity": { "value": 0.2 },
                "size": { "value": 2 },
                "move": { "speed": 1, "direction": "none", "random": true }
            }
        };
    }
    
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", config);
    }
}           
         // 5. EVENTO DE CAMBIO EN EL SELECTOR
    selectCiudades.addEventListener('change', (e) => {
        if(e.target.value) {
            const partes = e.target.value.split('|');
            const lat = partes[0];
            const lon = partes[1];
            const nombre = partes[2];
            obtenerClima(lat, lon, nombre);
        }
    });

    // Iniciar carga de ciudades
    cargarCiudades();
}); // Este cierra el document.addEventListener('DOMContentLoaded', ...)