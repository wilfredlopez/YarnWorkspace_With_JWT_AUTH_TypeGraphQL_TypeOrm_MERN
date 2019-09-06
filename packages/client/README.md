# TypeScript Next.js with Apollo Client and @graphql-codegen/cli

This is a really simple project that show the usage of Next.js with TypeScript.

# GENERATE GRAPHQL INTERFACES AUTOMATICALLY

create your queries and mutations under graphql folder. (follow examples on user mutations and queries)

run `yarn generate` it will generate schemas with graphql-codegen (Your server needs to be running in the background)

# USE CASES

- Wrap your components with AmIAuthorizedComponent. follow the example in authorized.tsx
- to get the current user you can use the MeComponent. see example on components/Header.tsx
