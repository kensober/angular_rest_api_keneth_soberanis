# Explorador de personajes

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

## Cómo está organizado

- `src/app/pages/dashboard`: página de inicio con las cuatro tarjetas.
- `src/app/pages/character-list`: lista y paginación de personajes.
- `src/app/pages/character-detail`: datos de un personaje.
- `src/app/shared`: tarjeta reutilizable y ventana para ampliar imágenes.
- `src/app/core/services`: un servicio por API y `CharacterApiService`, que elige cuál usar.
- `src/app/core/models`: tipos de TypeScript para los personajes.
- `src/app/app.routes.ts`: rutas que conectan las páginas.

Cada página tiene su archivo `.ts` para la lógica, `.html` para lo que se ve y `.scss` para los estilos. `src/index.html` solo contiene el elemento `<app-root>` donde Angular carga la aplicación; la página de inicio está en `src/app/pages/dashboard`.

## Recorrido de una petición

1. El usuario entra a una ruta, por ejemplo `/pokemon`.
2. `CharacterListComponent` lee `pokemon` de la ruta y solicita la página de resultados.
3. `CharacterApiService` selecciona `PokemonService`.
4. `PokemonService` pide los datos a PokéAPI y los convierte al modelo común.
5. El componente muestra las tarjetas con `CharacterCardComponent` y permite cambiar de página.

En los listados y detalles se usa `signal` para los datos que llegan después de una petición HTTP. Al llamar `.set(...)`, Angular actualiza la pantalla. `@if` muestra carga, resultados o error; `@for` repite las tarjetas. Los cuatro servicios son necesarios porque cada API entrega datos con una estructura distinta.

Las URL base están declaradas como constantes al inicio de cada servicio. Las imágenes se cargan desde las APIs; no se incluye arte protegido dentro del proyecto.

## Nota de entrega

Repositorio público: [angular_rest_api_keneth_soberanis](https://github.com/kensober/angular_rest_api_keneth_soberanis).

El historial de la rama `main` contiene más de siete commits progresivos que documentan la creación del proyecto, la configuración de Angular Material, el dashboard y la integración de cada API.
