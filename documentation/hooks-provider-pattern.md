## Hooks Provider Pattern

### Overview

- Providers:

  1. `index.ts` -> exports `context.ts` and `Provider.tsx` file
  2. `context.ts` -> describes the content of the Context
  3. `Provider.tsx` -> the actual provider, with its State, State Handlers, and the .tsx export

- Hooks:

  1. Consume the Context, provided by the provider
  2. Return the State and State Handlers

- Components:

  1. Import State and State Handlers from Hooks

### Adding a new Provider:

1. Create new Folder in `providers`
2. Implement `index.ts`, `context.ts`, and `Provider.tsx` files
3. Add Provider to `_app.tsx` file
4. Create Hooks to consume the Provider
