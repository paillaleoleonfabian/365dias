// Estructura recomendada:
// assets/recuerdos/01-blondie/foto-1.webp
// assets/recuerdos/01-blondie/foto-2.webp
// assets/recuerdos/01-blondie/video-1.mp4
// assets/recuerdos/01-blondie/musica.mp3
//
// Para agregar más fotos a un carrusel:
// 1. Copia la imagen dentro de la carpeta del recuerdo.
// 2. Nómbrala como foto-2.webp, foto-3.webp, etc.
// 3. Agrega la ruta dentro del arreglo media.
//
// Para llenar la galería inferior:
// 1. Copia tus fotos dentro de assets/galeria/.
// 2. Usa nombres simples: foto-1.webp, foto-2.webp, foto-3.webp, etc.
// 3. Ajusta los textos de gallery si quieres personalizar cada instante.
//
// También puedes usar videos MP4 en media, por ejemplo:
// "assets/recuerdos/03-pololeo/video-1.mp4"
window.STORY = {
  assetVersion: "2026-07-07-audio-2",
  chapters: [
    {
      number: "01",
      title: "Una noche en la Blondie",
      date: "Nuestro primer beso",
      text: "Entre música, luces y nervios llegó nuestro primer beso. Dando comienzo a nuestra hermosa historia.",
      media: [
        "assets/recuerdos/01-blondie/foto-1.webp"
      ],
      audio: "assets/recuerdos/01-blondie/musica.mp3"
    },
    {
      number: "02",
      title: "Un día en el MIM",
      date: "Curiosidad compartida",
      text: "Fuimos a jugar, descubrir y reírnos. A tu lado, hasta aprender cosas nuevas se convierte en uno de mis recuerdos favoritos.",
      media: [
        "assets/recuerdos/02-mim/foto-1.webp",
        "assets/recuerdos/02-mim/foto-2.webp",
        "assets/recuerdos/02-mim/foto-3.webp",
        "assets/recuerdos/02-mim/foto-4.webp"
      ],
      audio: "assets/recuerdos/02-mim/musica.mp3"
    },
    {
      number: "03",
      title: "12 de Julio",
      date: "Nuestro día oficial",
      text: "Nuestra historia ya había comenzado, pero ese día decidimos ponerle nombre a lo que sentíamos y elegirnos oficialmente.",
      media: [
        "assets/recuerdos/03-pololeo/foto-1.webp",
        "assets/recuerdos/03-pololeo/video-1.mp4"
      ],
      audio: "assets/recuerdos/03-pololeo/musica.mp3"
    },
    {
      number: "04",
      title: "Una tarde en el País de las Maravillas",
      date: "Nuestro café de Alicia",
      text: "Entre colores, detalles imposibles y muchas fotografías, vivimos una tarde distinta y muy nuestra. Un pequeño mundo de fantasía que ahora también forma parte de nuestra historia.",
      media: [
        "assets/recuerdos/04-pais-maravillas/foto-1.webp",
        "assets/recuerdos/04-pais-maravillas/foto-2.webp",
        "assets/recuerdos/04-pais-maravillas/foto-3.webp",
        "assets/recuerdos/04-pais-maravillas/foto-4.webp",
        "assets/recuerdos/04-pais-maravillas/foto-5.webp"
      ],
      audio: "assets/recuerdos/04-pais-maravillas/musica.mp3"
    },
    {
      number: "05",
      title: "Algarrobo",
      date: "18 de septiembre",
      text: "Mar, arena y un feriado que ahora siempre tendrá un significado especial: fue nuestra primera escapada juntos.",
      media: [
        "assets/recuerdos/05-algarrobo/foto-1.webp",
        "assets/recuerdos/05-algarrobo/foto-2.webp",
        "assets/recuerdos/05-algarrobo/foto-3.webp"
      ],
      audio: "assets/recuerdos/05-algarrobo/musica.mp3"
    },
    {
      number: "06",
      title: "Imagine Dragons",
      date: "Una noche para recordar",
      text: "Entre luces, canciones y una emoción enorme, vivimos una noche que tenía mucho de ti y que terminó quedándose también en nuestra historia.",
      media: [
        "assets/recuerdos/06-imagine-dragons/foto-1.webp",
        "assets/recuerdos/06-imagine-dragons/video-1.mp4",
        "assets/recuerdos/06-imagine-dragons/foto-3.webp",
        "assets/recuerdos/06-imagine-dragons/video-2.mp4"
      ],
      audio: "assets/recuerdos/06-imagine-dragons/musica.mp3"
    },
    {
      number: "07",
      title: "Nuestro 14 de febrero",
      date: "San Valentín",
      text: "La primera vez que celebramos nuestro amor en este día. Una escapada romántica, un recuerdo sencillo, bonito y completamente nuestro.",
      media: [
        "assets/recuerdos/07-san-valentin/foto-1.webp",
        "assets/recuerdos/07-san-valentin/foto-2.webp",
        "assets/recuerdos/07-san-valentin/foto-3.webp",
        "assets/recuerdos/07-san-valentin/foto-4.webp"
      ],
      audio: "assets/recuerdos/07-san-valentin/musica.mp3"
    },
    {
      number: "08",
      title: "El Embalse del Yeso",
      date: "Una aventura más",
      text: "Entre montañas y agua azul pensaba algo: no importa tanto el destino cuando el viaje es contigo.",
      media: [
        "assets/recuerdos/08-embalse/foto-1.webp",
        "assets/recuerdos/08-embalse/foto-2.webp",
        "assets/recuerdos/08-embalse/foto-3.webp",
        "assets/recuerdos/08-embalse/foto-4.webp",
        "assets/recuerdos/08-embalse/foto-5.webp",
        "assets/recuerdos/08-embalse/foto-6.webp"
      ],
      audio: "assets/recuerdos/08-embalse/musica.mp3"
    }
  ],
  gallery: [
  {
    date: "Un pedacito de nosotros",
    phrase: "Qué bonito es coincidir contigo.",
    image: "assets/galeria/foto-1.webp"
  },
  {
    date: "Tú y yo",
    phrase: "Mi lugar favorito siempre será a tu lado.",
    image: "assets/galeria/foto-2.webp"
  },
  {
    date: "Un día cualquiera",
    phrase: "Mis días favoritos suelen tenerte dentro.",
    image: "assets/galeria/foto-3.webp"
  },
  {
    date: "Esa sonrisa",
    phrase: "Quiero seguir siendo testigo de tu felicidad.",
    image: "assets/galeria/foto-4.webp"
  },
  {
    date: "Juntos",
    phrase: "No importa dónde, si es contigo.",
    image: "assets/galeria/foto-5.webp"
  },
  {
    date: "Sin planearlo",
    phrase: "Los mejores recuerdos llegaron sin avisar.",
    image: "assets/galeria/foto-6.webp"
  },
  {
    date: "Una aventura más",
    phrase: "La vida se siente más bonita desde que la comparto contigo.",
    image: "assets/galeria/foto-7.webp"
  },
  {
    date: "Nosotros",
    phrase: "Te elegiría en esta y en todas nuestras historias.",
    image: "assets/galeria/foto-8.webp"
  },
  {
    date: "Otro instante nuestro",
    phrase: "Ojalá la vida nos regale miles de momentos como este.",
    image: "assets/galeria/foto-9.webp"
  },
  {
    date: "Mi persona favorita",
    phrase: "De todas las casualidades de mi vida, tú eres mi favorita.",
    image: "assets/galeria/foto-10.webp"
  },
  {
    date: "Siempre tú",
    phrase: "Volvería a encontrarte en todas mis vidas.",
    image: "assets/galeria/foto-11.webp"
  },
  {
    date: "Mi lugar feliz",
    phrase: "Qué suerte la mía de poder compartir la vida contigo.",
    image: "assets/galeria/foto-12.webp"
  },
  {
    date: "Te Amo",
    phrase: "No podia faltar jajaja.",
    image: "assets/galeria/foto-13.webp"
  }
]
};
