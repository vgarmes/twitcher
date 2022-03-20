# Twitcher

Twitcher aims to offer the YouTube experience with Twitch's videos on demand. Watch your favorite streamer's latest videos and create playlists to watch them later.

### [🚀 See the app in action 🚀](https://twitcher-zero.vercel.app/)

## NextAuth configuration

1. Register your application at the [Twitch developer portal](https://dev.twitch.tv/).

2. The redirect URI should follow the format as indicated on [https://next-auth.js.org/v3/configuration/providers](https://next-auth.js.org/v3/configuration/providers). On localhost this would be:
   `http://localhost:3000/api/auth/callback/twitch`

3. Create a `.env.local` file at the root of your project and add the client ID and client secret. You will also need to set the canonical URL of your site and a random string (secret) for encryption (https://next-auth.js.org/configuration/options):

```
NEXT_PUBLIC_TWITCH_CLIENT_ID=YOUR_TWITCH_CLIENT_ID
TWITCH_CLIENT_SECRET=YOUR_TWITCH_CLIENT_SECRET
NEXTAUTH_URL=http://example.com
NEXTAUTH_SECRET=RANDOM_BASE64_STRING
```

Since the client ID is required in the request headers for calls to the Twitch API, it is exposed to the browser by prefixing it with `NEXT_PUBLIC_`. Client IDs are public and can be shared.

## MongoDB configuration

Create an account in https://www.mongodb.com and a new collection. Set the collection URI in the environment variables:

```
MONGO_URI=YOUR_MONGO_DB_URI
```
