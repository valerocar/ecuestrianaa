ECUESTRIANA

Sitio estático en español para la escuela de equitación de Zona Real, Guadalajara.

Ejecutar localmente:
  ./run.sh
Abrir http://localhost:8037. Ctrl+C detiene el servidor.
Para elegir otro puerto: PORT=8040 ./run.sh

Los archivos listos para servir están en dist/:
  index.html — contenido y datos de contacto
  styles.css — diseño y adaptación a pantallas
  app.js — menú, galería y reproductor
  assets/ — fotografías, emblema y vídeo del material proporcionado

No requiere instalación, compilación ni fuentes externas. Las fotografías,
el emblema y el vídeo se sirven desde el propio sitio.

Contacto confirmado en las publicaciones proporcionadas:
  WhatsApp: +52 33 3443 1233
  Instagram: @ecuestrianaa
  Zona: Zona Real, Guadalajara

No se publican dirección exacta, tarifas ni horarios porque no estaban
confirmados en el material. La visita se coordina por WhatsApp.
El formulario abre WhatsApp con un mensaje preparado: el visitante decide
si lo envía. No se almacenan datos. También hay enlaces de contacto directo.
La galería admite flechas del teclado y Escape para cerrar.
El vídeo se reproduce solo al pulsar y se detiene al cerrar.
El reproductor usa una copia con limpieza suave, color y nitidez mejorados,
optimizada para la web. El original dist/assets/moments.mp4 sigue intacto.
Proceso reproducible, comparación y comprobaciones: video-enhancements/.

Publicación en GitHub Pages:
  Repositorio: https://github.com/valerocar/ecuestrianaa
  Sitio: https://valerocar.github.io/ecuestrianaa/
  .github/workflows/pages.yml publica dist/ al cambiar el sitio en main.
  También se puede ejecutar manualmente desde GitHub Actions.
  En Settings > Pages, la fuente de publicación debe ser GitHub Actions.
  No se necesita compilar ni instalar dependencias.

La identidad previa de Sites se conserva en .openai/hosting.json como
referencia; la publicación del sitio se realiza ahora con GitHub Pages.
La vista previa local fue verificada en tamaños de teléfono, tablet y
escritorio. Los originales de las fotografías siguen en el repositorio.

Diseño para teléfonos:
  Cabecera fija, menú compacto, texto legible y controles amplios.
  Acceso a WhatsApp en la parte inferior, oculto al editar campos.
  Galería horizontal y visor adaptado a orientación vertical y horizontal.
  Campos de 16 px y 52 px de alto; márgenes para áreas seguras del dispositivo.
  Imágenes WebP con srcset para descargar la resolución adecuada.

Fotografías:
  Los JPG originales en dist/assets/ se mantienen intactos.
  dist/assets/enhanced/ contiene las copias mejoradas usadas por el sitio.
  photo-enhancements/ contiene PNG de máxima calidad, prompts, comparación
  visual y sumas SHA-256 para verificar la conservación de los originales.
