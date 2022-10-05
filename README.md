# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

You will be utilizing Wrangler for local development to emulate the Cloudflare runtime. This is already wired up in your package.json as the `dev` script:

```sh
# start the remix dev server and wrangler
npm run dev
```

Open up [http://127.0.0.1:8788](http://127.0.0.1:8788) and you should be ready to go!

## Deployment

Cloudflare Pages are currently only deployable through their Git provider integrations.

If you don't already have an account, then [create a Cloudflare account here](https://dash.cloudflare.com/sign-up/pages) and after verifying your email address with Cloudflare, go to your dashboard and follow the [Cloudflare Pages deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-anything).

Create a new Cloudflare Pages project, connect this repo.
Set framework to Remix.
Set env var `NODE_VERSION = v16.7.0`

### Setup KV

Data for this app is stored using Cloudflare key-value storage
Goto main nav Workers > KV.
Create KV namespaces: nowcasting-alerts-ALERTS, nowcasting-alerts-LOG
Go back to the Cloudflare Pages project > Settings > Functions > KV namespace bindings. Add bindings: ALERTS = nowcasting-alerts-ALERTS, LOG = nowcasting-alerts-LOG