bunx create-next-app@latest digital-market-20240930 --ts --tailwind --app --eslint
bunx --bun shadcn --version
bunx --bun shadcn init
bun install --no-cache -D eslint prettier eslint-plugin-react eslint-plugin-prettier eslint-config-prettier prettier-plugin-tailwindcss

bunx --bun --no-cache shadcn add button
bunx --bun --no-cache shadcn add dropdown-menu


bun run build

bun --no-cache install react-hook-form zod @hookform/resolvers
bun add --no-cache hono
bun add --no-cache @tanstack/react-query
bun add --no-cache @hono/zod-validator
bun add --no-cache node-appwrite
bun add --no-cache server-only
bun add --no-cache pino pino-pretty next-logger
bun add --no-cache @radix-ui/react-visually-hidden
bun add --no-cache react-use
bun add --no-cache nuqs
bun add --no-cache date-fns
