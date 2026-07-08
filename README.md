# 365 días

Experiencia web de aniversario para Fabian y Daira, hecha con HTML, CSS y JavaScript puro.

## Estructura de recuerdos

Cada recuerdo vive en su propia carpeta:

```txt
assets/
  recuerdos/
    01-blondie/
      foto-1.webp
      foto-2.webp
      musica.mp3
    02-mim/
      foto-1.webp
      musica.mp3
    03-pololeo/
      video-1.mp4
      musica.mp3
```

Para agregar más fotos o videos a un carrusel:

1. Copia el archivo dentro de la carpeta del recuerdo.
2. Usa nombres simples: `foto-1.webp`, `foto-2.webp`, `video-1.mp4`.
3. Agrega la ruta en `data.js`, dentro del arreglo `media` del recuerdo correspondiente.

Ejemplo:

```js
media: [
  "assets/recuerdos/04-pais-maravillas/foto-1.webp",
  "assets/recuerdos/04-pais-maravillas/foto-2.webp"
]
```

## Música

Para la música de cada recuerdo, agrega un archivo llamado `musica.mp3` dentro de su carpeta.

Ejemplo:

```txt
assets/recuerdos/01-blondie/musica.mp3
```

La música no usa autoplay real al cargar la página; se activa después de la interacción inicial del usuario.

## Galería inferior

La galería inferior se edita en `data.js`, dentro de `gallery`. Esa sección usa un botón de música general desde:

```txt
assets/audio/cancion1.mp3
```

## Probar

Abre `index.html` directamente o levanta un servidor local:

```powershell
python -m http.server 4173
```

Luego entra a:

```txt
http://127.0.0.1:4173
```

GitHub Pages puede publicar este proyecto sin compilación ni dependencias.
