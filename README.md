## NextAuth configuration

1. Register your application at [https://dev.twitch.tv/](twitch developer portal).

2. The redirect URI should follow the format as indicated on [https://next-auth.js.org/v3/configuration/providers](https://next-auth.js.org/v3/configuration/providers). On localhost this would be:
   `http://localhost:3000/api/auth/callback/twitch`

3. Create a `.env.local` file at the root of your project and add the client ID and client secret.

```
TWITCH_CLIENT_ID=YOUR_TWITCH_CLIENT_ID
TWITCH_CLIENT_SECRET=YOUR_TWITCH_CLIENT_SECRET
```
