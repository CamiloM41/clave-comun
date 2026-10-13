export const events = [
  { time: 5, title: '¿Qué es OSINT?', detail: 'Open Source Intelligence: recolección y análisis de datos de acceso público en internet.' },
  { time: 23, title: 'SOCMINT', detail: 'Inteligencia enfocada en redes sociales. Los atacantes extraen información técnica y conductual de publicaciones cotidianas.' },
  { time: 48, title: 'Metadatos EXIF', detail: 'Las fotografías guardan datos ocultos como modelo de cámara, hora y coordenadas GPS precisas.' },
  { time: 72, title: 'Método Burrows-Delta', detail: 'Análisis estilométrico que mide la frecuencia de palabras y la estructura de las oraciones para identificar o suplantar la firma lingüística de una persona.' },
  { time: 98, title: 'Correlación de datos e identidades sintéticas', detail: 'Conectar pequeñas piezas (cafetería, perro, ciudad) permite armar perfiles falsos pero realistas para fraudes de spear phishing.' },
  { time: 125, title: 'Hunting vs. Farming', detail: 'Hunting es cacería rápida y dirigida; Farming es cultivar confianza durante meses usando intereses comunes para extraer información.' },
  { time: 155, title: 'Compartimentación operacional', detail: 'Segmentar identidades: usar correos aislados para servicios críticos (banco) y otros para promociones o redes.' }
];

export const questions = [
  { q: '1. ¿Por qué es peligroso subir a redes sociales la foto de un café o una comida sin cuidado?',
    o: ['Porque la foto puede guardarse con tu ubicación exacta y la hora en que estuviste ahí',
        'Porque las fotos de comida hacen que tu celular gaste más batería',
        'Porque la red social puede borrarte la foto automáticamente por privacidad'], c: 0 },
  { q: '2. Si un estafador analiza cómo escribes en tus publicaciones, ¿qué podría hacer?',
    o: ['Adivinar la contraseña de tu Wi-Fi',
        'Imitar tu forma de hablar para enviar mensajes falsos a tus conocidos y engañarlos',
        'Bloquear tus cuentas de redes sociales para siempre'], c: 1 },
  { q: '3. ¿Cuál es una buena costumbre para proteger tus cuentas en internet?',
    o: ['Usar la misma contraseña y el mismo correo para absolutamente todo',
        'No usar correo electrónico para nada y hablar solo por llamadas',
        'Usar correos diferentes para cosas importantes (como el banco) y para registros cotidianos'], c: 2 }
];

export const tiers = {
  3: ['Nivel experto', '¡Excelente trabajo! Sabes exactamente cómo cuidar la información que compartes en internet.'],
  2: ['Nivel intermedio', 'Vas por muy buen camino. Con un poco más de cuidado en tus fotos y correos estarás mucho más protegido.'],
  1: ['Sigue aprendiendo sobre OSINT', 'Aprende más sobre OSINT para cuidar tu vida digital. Volver a escuchar el episodio te ayudará.'],
  0: ['Nivel: en riesgo', 'Te recomendamos volver a escuchar el episodio para aprender pequeños trucos que protegerán tu día a día en internet.']
};

// Microcertificaciones: una por pregunta acertada + la completa con 3/3.
export const certs = [
  { id: 'q0', title: 'Metadatos y huella en tus fotos', desc: 'Reconoce que una foto puede revelar tu ubicación exacta y la hora en que estuviste ahí.' },
  { id: 'q1', title: 'Suplantación por estilo de escritura', desc: 'Entiende cómo un estafador puede imitar tu forma de escribir para engañar a tus conocidos.' },
  { id: 'q2', title: 'Compartimentación de identidades', desc: 'Separa tus correos: uno para lo importante (banco) y otro para registros cotidianos.' },
  { id: 'all', title: 'Fundamentos de OSINT para la vida digital', desc: 'Completó el episodio y respondió correctamente toda la evaluación de OSINT.' }
];
