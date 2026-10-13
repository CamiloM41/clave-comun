// [pregunta, pista si la respuesta es "No", destino, etiqueta del enlace]
export const DX = [
  ['¿Uso un gestor de contraseñas?', 'Instala Bitwarden.', 'ac-1', 'Acción 1'],
  ['¿Tengo 2FA en mi correo y mi banco?', 'Activa la verificación en dos pasos.', 'ac-2', 'Acción 2'],
  ['¿Tengo una copia de mis archivos importantes fuera de este computador?', 'Haz copias de seguridad 3-2-1.', 'ac-5', 'Acción 5'],
  ['¿Mis equipos tienen bloqueo y cifrado?', 'Activa BitLocker o FileVault.', 'ac-6', 'Acción 6'],
  ['¿Sé quién tiene acceso a mis cuentas y herramientas?', 'Limita y revisa los accesos.', 'ac-9', 'Acción 9'],
  ['¿Cuando alguien sale del equipo, le quito los accesos el mismo día?', 'Haz una lista de altas y bajas de accesos.', 'ac-9', 'Acción 9'],
  ['¿Mi equipo sabe reconocer un correo o mensaje de phishing?', 'Comparte las reglas anti-estafa con tu equipo.', 'estafas', 'Reglas anti-estafa'],
  ['¿Verifico por otra vía (llamada) cualquier cambio de cuenta bancaria o pago urgente?', 'Confirma siempre por un número que ya tenías.', 'estafas', 'Reglas anti-estafa'],
  ['¿Tengo anotado qué hacer si me hackean?', 'Guarda los pasos de la primera hora.', 'hackeo', 'Si te hackean']
];
export const AC = [
  ['Gestor de contraseñas', 'Bitwarden es gratis. Una contraseña única y larga por cuenta; tú solo memorizas una.'],
  ['Autenticación en dos pasos (2FA)', 'En correo, banco, redes, tienda online, pasarela de pagos y dominio. Usa una app (Google Authenticator, Authy) en vez de SMS.'],
  ['Protege tu correo principal', 'Si alguien entra ahí, puede recuperar todas tus demás cuentas.'],
  ['Actualizaciones automáticas', 'En computador, celular y aplicaciones.'],
  ['Copias de seguridad 3-2-1', '3 copias, en 2 tipos de almacenamiento, 1 fuera de la oficina (nube más disco externo).'],
  ['Cifrado de disco y bloqueo de pantalla', 'BitLocker en Windows, FileVault en Mac, y bloqueo en todos los celulares.'],
  ['Separa lo personal de lo del negocio', 'Cuentas, correos y, si puedes, dispositivos distintos.'],
  ['Cambia las claves por defecto', 'Del router/WiFi y de las cámaras. Crea una red WiFi aparte para invitados.'],
  ['Limita accesos', 'Cada persona solo accede a lo que necesita. Nada de compartir una cuenta entre varios.'],
  ['Revisa tu huella digital', 'Busca tu negocio y tu nombre en Google y verifica tus correos en haveibeenpwned.com.']
];
// [tarea, destino de la acción relacionada, etiqueta]
export const PL = [
  ['Instalar gestor de contraseñas y cambiar las 5 claves más críticas', 'ac-1', 'Acción 1'],
  ['Activar 2FA en correo, banco y redes', 'ac-2', 'Acción 2'],
  ['Configurar copias de seguridad', 'ac-5', 'Acción 5'],
  ['Actualizaciones, bloqueo y cifrado de equipos', 'ac-6', 'Acción 6'],
  ['Revisar accesos del equipo y cuentas compartidas', 'ac-9', 'Acción 9'],
  ['Revisar huella digital y filtraciones', 'ac-10', 'Acción 10'],
  ['Reunión de 15 minutos con el equipo: reglas anti-estafa', 'estafas', 'Reglas anti-estafa']
];
export const RU = [
  ['Urgencia + dinero o claves = sospecha.', 'Los estafadores siempre meten presión.'],
  ['Nunca compartas códigos.', 'Los que llegan por SMS o WhatsApp no se dan a nadie, ni a "soporte".'],
  ['No abras enlaces para "verificar tu cuenta".', 'Entra escribiendo tú la dirección.'],
  ['Cambio de cuenta bancaria de un proveedor.', 'Confirma por llamada a un número que ya tenías.'],
  ['Mensaje de tu "jefe" o "socio" desde un número nuevo.', 'Pedir un favor urgente por WhatsApp es una estafa clásica.']
];
// [parte en negrita, resto]
export const HR = [
  ['Desconecta', ' el equipo afectado de internet (no lo apagues de inmediato si tienes dudas).'],
  ['Cambia las contraseñas', ' desde otro dispositivo limpio, empezando por correo y banco.'],
  ['Avisa al banco', ' si hay dinero o tarjetas involucradas y pide bloqueo.'],
  ['Cierra sesiones activas', ' y revoca accesos en las cuentas comprometidas.'],
  ['Avisa a tu equipo', ' para que nadie abra mensajes extraños de tu parte.'],
  ['Anota', ' qué pasó, cuándo y qué viste. Sirve para denunciar y para aprender.'],
  ['Si hay datos de clientes expuestos', ', en Colombia debes reportarlo a la SIC (Ley 1581 de 2012). Para denunciar el delito, acude al CAI Virtual de la Policía Nacional.']
];
