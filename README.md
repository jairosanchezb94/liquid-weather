# Liquid Weather 🌦️

![Liquid Weather Banner](public/favicon.svg)

Una aplicación de clima moderna, minimalista y visualmente impactante construida con **Astro**, **React** y **TailwindCSS**. Ofrece una experiencia inmersiva con efectos climáticos animados, diseño Bento Grid y datos en tiempo real.

## ✨ Características

* **Diseño Bento Grid:** Interfaz moderna y organizada inspirada en las últimas tendencias de diseño.
* **Efectos Climáticos Inmersivos:**
  * Lluvia y Nieve con física y profundidad (parallax).
  * Animaciones de viento que afectan sutilmente a las tarjetas.
  * Fondos dinámicos que cambian según el clima y la hora del día.
* **Datos en Tiempo Real:**
  * Temperatura actual, sensación térmica, máximas y mínimas.
  * Pronóstico por horas (24h) y diario (7 días).
  * Índice UV, Humedad, Viento y Amanecer/Atardecer.
* **Búsqueda Inteligente:** Autocompletado de ciudades y geolocalización automática.
* **Mapa Interactivo:** Integración con Windy.com para ver el clima global.
* **Favoritos:** Guarda tus ubicaciones preferidas para un acceso rápido.
* **Totalmente Responsive:** Optimizado para móviles, tablets y escritorio.

## 🛠️ Tecnologías Usadas

* **Framework:** [Astro](https://astro.build/)
* **Librería UI:** [React](https://react.dev/)
* **Estilos:** [TailwindCSS](https://tailwindcss.com/) & [Sass](https://sass-lang.com/)
* **Animaciones:** [Framer Motion](https://www.framer.com/motion/) & CSS Keyframes
* **Iconos:** [Lucide React](https://lucide.dev/)
* **APIs:**
  * [Open-Meteo](https://open-meteo.com/) (Datos del clima y Geocoding)
  * [Windy](https://www.windy.com/) (Mapa embebido)

## 🚀 Instalación y Uso

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/tu-usuario/liquid-weather.git
    cd liquid-weather
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**

    Renombra el archivo `.env.example` a `.env` (opcional, ya que las APIs usadas son públicas, pero es buena práctica mantener la estructura).

    ```bash
    cp .env.example .env
    ```

4.  **Iniciar el servidor de desarrollo:**

    ```bash
    npm run dev
    ```

    Abre tu navegador en `http://localhost:4321`.

## 📦 Estructura del Proyecto

```text
src/
├── components/      # Componentes React (WeatherApp, BentoCard, WeatherEffects...)
├── hooks/           # Custom Hooks (useWeather)
├── layouts/         # Layouts de Astro
├── pages/           # Rutas de la aplicación
├── styles/          # Estilos globales y SCSS
├── types/           # Definiciones de tipos TypeScript
└── utils/           # Funciones de utilidad
```

## 🔒 Seguridad y APIs

Este proyecto utiliza APIs públicas que no requieren clave de acceso (API Key) para las funciones básicas, lo que facilita el despliegue y la prueba.

* **Open-Meteo:** No requiere API Key para uso no comercial.
* **Windy Embed:** Uso gratuito mediante iframe.

Sin embargo, se ha configurado el manejo de URLs base a través de variables de entorno (`.env`) para facilitar la escalabilidad o el cambio a proxies privados en el futuro.

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Siéntete libre de usarlo y modificarlo.

---

Hecho con ❤️ por [Jairo Sanchez](https://github.com/jairosanchezb94)
