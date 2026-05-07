# 🌍 European Travel Agency - Weather Forecast Dashboard

> 🎓 **Proyecto Final - Programa de Certificación de Coursera**
> **Desarrollador:** Yurani Martínez
> **Perfil:** Tecnóloga en Desarrollo de Software | Especialista en Logística

## 📝 Descripción del Proyecto
Este sitio web es una solución interactiva para una Agencia de Viajes Europea que permite a los usuarios consultar el pronóstico del clima de 7 días en tiempo real. El proyecto integra el procesamiento de datos locales (CSV) con el consumo de servicios externos (API REST), ofreciendo una experiencia inmersiva mediante efectos visuales dinámicos.

## 🚀 Tecnologías y Herramientas
- **Frontend:** HTML5, CSS3 (Glassmorphism), JavaScript (ES6+).
- **Datos:** JSON para respuesta de API y CSV para base de datos de ciudades.
- **API Externa:** [7Timer! Weather API](http://www.7timer.info/).
- **Efectos:** [Particles.js](https://vincentgarreau.com/particles.js/) para simulación atmosférica.
- **Testing:** Postman para validación de endpoints y estructura de datos.

## 🔧 Desafío Técnico: Resolución de CORS
Durante el desarrollo, se identificó un bloqueo por política **CORS (Cross-Origin Resource Sharing)** que impedía la carga de datos en el navegador, a pesar de que la API respondía correctamente en Postman.

**Mi Solución:**
En lugar de depender de extensiones del navegador, implementé un **túnel proxy dinámico** en la lógica de `fetch`. Esto permitió:
1. Añadir las cabeceras de seguridad necesarias de forma transparente.
2. Garantizar que el sitio sea funcional para cualquier usuario final sin configuraciones adicionales.
3. Normalizar las coordenadas mediante `encodeURIComponent()` para una comunicación robusta.

## ✨ Valor Agregado y Enfoque Personal
Este proyecto destaca por ir más allá de los requisitos básicos del curso:

* **Identidad Visual Inteligente:** Configuré el sistema de partículas para que reaccione al estado del clima. La lluvia, la nieve y el cielo despejado tienen físicas personalizadas (opacidad, forma y velocidad) que mejoran la retención del usuario sin distraer del contenido.
* **Eficiencia Logística en Datos:** Apliqué algoritmos de filtrado temporal para transformar un flujo masivo de datos (64 registros) en una vista simplificada de 7 días, facilitando la planificación de viajes.
* **Diseño Premium:** Uso de técnicas modernas de CSS como `backdrop-filter` y degradados dinámicos para una estética profesional.

## 📁 Estructura de Archivos
- `index.html`: Estructura semántica y accesibilidad.
- `main.js`: Lógica asíncrona, manejo de errores y efectos visuales.
- `css/master.css`: Estilos, animaciones y diseño responsivo.
- `city_coordinates.csv`: Base de datos local de destinos europeos.

## ⚙️ Cómo Ejecutar el Proyecto
1. Clona el repositorio.
2. Abre `index.html` utilizando un servidor local (ej. Live Server en VS Code).
3. Selecciona un destino del menú desplegable para activar la sincronización satelital.

---
*Este proyecto demuestra mi capacidad para resolver problemas complejos de integración web, manejar múltiples formatos de datos y diseñar interfaces orientadas al usuario final.*

[LinkedIn](TU_LINK_DE_LINKEDIN_AQUÍ) | [Portafolio](https://yuranimar.github.io/PRIMEX/)
