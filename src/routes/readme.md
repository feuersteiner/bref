# Building Component Demo Pages

## Page Header

By default, the layout handles the displaying of the component title, description, and icon in a header component, based on the list of pages defined in `src/internal/layout/types.ts` as `PAGES`.

Implications:

- No need to add a section that has a title and description for each component page (this should be done in the `PAGES` array).
- Consistent styling and layout for all component demo pages.

## Component Demos

Each component demo page should focus on showcasing the component itself. Use sections to demonstrate different features or variations of the component (e.g., different button styles, sizes, states).

This should be done using the `Section` component from the internal layout library.

This should also be useful for dev-time testing of components.

After the variants, there has to be always a section showing the code snippet to use the component, using the `CodeSnippet` component from the internal layout library.

## Gotchas

- use `navigateTo` from `../internal/navigate.ts` (or relative path from your route) for navigation between pages instead of `goto` directly, to ensure correct path resolution based on the app's base path.
- Ensure that all paths linking to `.ts` files are relative paths, otherwise Vite/SvelteKit may have issues resolving them.
- If your page already includes a good title and description at the top, move them to the `PAGES` array in `src/internal/layout/types.ts` to avoid duplication, then remove the redundant title and description from the page itself.