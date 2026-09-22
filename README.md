# Soul Motion · Academia de Baile

Demo navegable de gestión para una academia de baile: alumnos, maestros,
administración y encargados. Estático, sin backend y sin base de datos.

## Correrlo

```bash
cd ~/Documents/SoulMotion
python3 -m http.server 5510
# abrir http://localhost:5510
```

Los módulos ES no cargan desde `file://`: hay que servirlo.

## Los cuatro accesos

| Rol | Persona demo | Qué ve |
| --- | --- | --- |
| Alumno | Camila Ordóñez | Inicio, mis clases, carné con QR, mensualidad |
| Maestro | Bruno Estrada | Inicio, agenda, pasar lista |
| Administración | **Diana Caravantes** | Inicio con KPIs, alumnos, pagos, asistencia |
| Encargado | Lucía Méndez | Sus hijos, pagos de la familia, carnés |

El selector de la barra superior cambia de rol sin volver a la pantalla de acceso.

## Datos

Todo el estado (alumnos, pagos, asistencia) vive en `localStorage`, clave
`soulmotion-academy-demo-v1`. "Reiniciar demo" lo borra y repone los datos de
muestra. Nada sale del navegador.

Ver [AGENTS.md](AGENTS.md) para las reglas del repo.
