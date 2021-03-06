# Sudocrypt 2020

Platform for Sudocrypt 2020, a map-based text adventure. Built with Next.js,
next-auth, Prisma and MySQL.

## Setup
- Install `mysql` and `node`.
- Clone the repositories and install dependencies.
```sh
git clone https://github.com/dotangad/sudocrypt
cd sudocrypt
yarn
```
- Go over to the [Discord dev portal](https://discord.com/developers) and create an app. Add `https://localhost:3000/api/auth/callback/discord` as a valid redirect URI and copy the client ID and secret.
- Fill out the `.env.local` file with the following values.
```
DATABASE_URL=                         # MySQL connection URL
AUTH_SECRET=                          # Random string for authentication
NEXTAUTH_URL="http://localhost:3000"  # URL where your app is running (this is used to generate the callback URL by next-auth)
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
```
- Run database migrations.
```
DATABASE_URL=<your database url> yarn prisma migrate up --experimental
```
- Start the app.
```
npm run dev
```
- You should have a local version of Sudocrypt v10.0 at `https://localhost:3000` 🎉.

## TODO
- [x] Command handler and TUI
- [x] OpenLevel and answering
- [x] Movement commands
- [x] Level points
- [x] Teleport functionality
- [x] Leaderboard
- [x] Admin prop on UserMeta
- [x] Exun prop on UserMeta
- [x] Admin pages
- [x] DQ functionality
- [x] Leaderboard blanks
- [x] Submit empty command
- [x] Locked levels
- [x] Answer flagging
- [x] Scrolling
- [x] Streamline status command
- [x] Remove leaderboard - keep only rank in the `me` command
- [x] Add map to website
- [x] Explainer doc
- [x] Add levels
- [x] Move to prod
