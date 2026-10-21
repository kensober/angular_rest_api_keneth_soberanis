# Multiverso Explorer

Aplicación Angular para explorar personajes de Digimon, Dragon Ball Z, Pokémon y Demon Slayer mediante API REST. Incluye dashboard, rutas sin recarga, listados paginados, modal de imagen, páginas de detalle, estados de carga/error/vacío y temas claro/oscuro.

## Requisitos

- Node.js 20.19+, 22.12+ o una versión compatible con Angular 21
- npm

## Ejecutar

```bash
npm install
npm start
```

Abre `http://localhost:4200`.

## Verificar

```bash
npm run build
npm test -- --watch=false
```

## Estructura fácil de explicar

- `src/app/core/models`: contratos TypeScript compartidos.
- `src/app/core/services`: un servicio independiente por API y un adaptador común.
- `src/app/shared`: tarjeta reutilizable y diálogo de imagen.
- `src/app/pages`: dashboard, listado paginado y detalle.
- `src/app/layout`: header responsivo y selector de tema.

Las URL base están declaradas como constantes al inicio de cada servicio. Las imágenes se cargan desde las APIs; no se incluye arte protegido dentro del proyecto.

## Nota de entrega

El PDF exige un repositorio llamado `angular_rest_api_nombre1_apellido1` y al menos siete commits progresivos. Este proyecto no inicializa Git: crea el repositorio con tu nombre y registra avances reales antes de entregar la URL.
