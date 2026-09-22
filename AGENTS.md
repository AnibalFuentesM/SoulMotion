# AGENTS.md

Contexto para agentes y LLMs que trabajen en este repo. Leer completo antes del primer cambio.

## Qué es

Demo navegable de gestión para **Soul Motion Academia de Baile**. Sitio estático:
sin build, sin framework, sin backend y **sin Supabase**. Todo el estado vive en
`localStorage` bajo la clave `soulmotion-academy-demo-v1`.

Nació como una versión reducida del demo de In Motion (`~/Documents/Inmotion/academia`),
pero es autocontenido: no depende de ese repo ni comparte archivos con él.

## Dónde tocar qué

| Quiero cambiar… | Archivo |
| --- | --- |
| Marca: paleta, tipografía, formas | `assets/css/soul.css` |
| Componentes y detalles de layout | `assets/css/components.css` |
| Layout base (rejilla, shell, tipos) | `assets/css/base.css` |
| Datos demo, pantallas y lógica | `assets/js/app.js` |
| Estructura, intro y shell | `index.html` |

## Reglas

1. **La marca se cambia en `soul.css`, nunca en `base.css` ni en `components.css`.**
   `soul.css` es la tercera capa de overrides: si la borrás junto con su `<link>`,
   vuelve el layout base intacto. Si un cambio no se puede expresar como override,
   decilo antes de editar las capas de abajo.
2. **Un solo acento: `--magenta` (`#d6157e`).** Los tokens heredados `--red`,
   `--red-dark` y `--brand-red` apuntan a él; se conservan porque el layout base
   los usa por nombre. No introduzcas un segundo rosado ni cambies los usos:
   se cambia el valor de `--magenta` y listo.
3. **Sin backend.** No agregues Supabase, Firebase ni fetch a APIs. Si hace falta
   persistencia compartida, se discute antes: hoy la promesa de la demo es que
   corre entera en el navegador del cliente.
4. **No hay paso de build.** Módulos ES nativos y CSS plano. Nada de bundlers ni
   dependencias sin acordarlo.
5. **Datos ficticios.** Todos los nombres, horarios y montos son de demostración.
   La administradora de la demo es **Diana Caravantes**.

## Convenciones

- UI y comentarios en español; nombres de variables y funciones en inglés.
- HTML, CSS y JS planos, un solo archivo JS.

## Antes de dar algo por terminado

- Servir con `python3 -m http.server 5510` y abrir la app (los módulos ES no
  cargan desde `file://`).
- Recorrer los cuatro roles desde la pantalla de acceso.
- Consola del navegador sin errores.
- Probar a 375px de ancho: ahí cambian la barra superior y la inferior.
