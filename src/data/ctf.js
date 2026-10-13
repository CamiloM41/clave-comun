export const challenges = [
  { id: 'web-101', title: 'El secreto en el HTML', category: 'Web', difficulty: 'Fácil', points: 100, hintCost: 20,
    description: 'En el menú del restaurante escondieron una clave para obtener un descuento. La clave dice: "Busca la palabra que empieza por CTF y termina en 2026 en esta frase: CTF{descuento_hacker_2026}"',
    hint: 'Copia y pega exactamente el texto que está entre las llaves "CTF{...}".',
    flag: 'CTF{descuento_hacker_2026}',
    explanation: '¡Facilísimo! En la web real, a veces las claves se ocultan a simple vista en los textos o notas de la página.' },
  { id: 'crypto-101', title: 'El código César (mover letras)', category: 'Criptografía', difficulty: 'Fácil', points: 150, hintCost: 30,
    description: 'Julio César usaba un truco para enviar mensajes: mover cada letra 1 posición hacia adelante en el abecedario (la A es B, la B es C).\nSi el mensaje encriptado es "DUG", ¿cuál es la palabra original al retroceder 1 letra?',
    hint: 'Resta 1 posición a cada letra: D → C, U → T, G → F. La palabra resuelta es CTF.',
    flag: 'CTF{CTF}',
    explanation: '¡Exacto! El cifrado César funciona desplazando el abecedario. Al retroceder 1 posición en DUG obtenemos CTF.' },
  { id: 'phishing-101', title: 'Detecta al estafador', category: 'Seguridad Digital', difficulty: 'Fácil', points: 200, hintCost: 40,
    description: 'Te llega un correo urgente diciendo: "Tu cuenta de banco ha sido bloqueada. Entra a www.banc0-segur0-hack.com y pon tu clave".\n¿Cómo se llama esta estafa donde fingen ser un banco para robarte?',
    hint: 'Empieza por la letra P y suena como "pescar" en inglés: P _ _ _ _ I N G.',
    flag: 'CTF{phishing}',
    explanation: 'El phishing es cuando los cibercriminales envían correos o enlaces falsos haciéndose pasar por empresas reales para robar tus datos.' },
  { id: 'social-101', title: 'La contraseña débil', category: 'Seguridad', difficulty: 'Fácil', points: 250, hintCost: 50,
    description: 'Un usuario creó una contraseña súper insegura juntando los números del 1 al 6 seguidos. Completa la bandera con esa contraseña.',
    hint: 'La secuencia numérica más famosa y típica del mundo: 123456.',
    flag: 'CTF{123456}',
    explanation: 'Usar contraseñas como "123456" o "password" permite que cualquiera adivine tus accesos en segundos.' }
];

export const rivals = [
  { name: 'CyberPhantom', points: 700, solved: 4, avatar: '🥷' },
  { name: 'ZeroCool', points: 450, solved: 3, avatar: '👨‍💻' },
  { name: 'ByteMaster', points: 250, solved: 2, avatar: '🤖' },
  { name: 'Principiante', points: 100, solved: 1, avatar: '👾' }
];

export const rankName = (xp) => xp >= 1000 ? 'Elite Cyber Warrior' : xp >= 500 ? 'Security Researcher' : xp >= 200 ? 'Junior Pentester' : 'Script Kiddie';
