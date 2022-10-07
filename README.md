# Nowcasting Alerts

Prototype for a Nowcasting Alerts service. We use a Cloudflare Workers cron to fetch the most recent Nowcasting and PV_Live forecasts, and check if there's a deviation in values (currently hard coded to 0.5GW). If there is, we make a POST request to all configured alert URLs.

This app is built with [Remix](https://remix.run/docs) and deployed to [Cloudflare Pages](https://developers.cloudflare.com/pages).

There is a sister repo 

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

### Setup KV for production

Data for this app is stored using Cloudflare key-value storage
Goto main nav Workers > KV.
Create KV namespaces: nowcasting-alerts-ALERTS, nowcasting-alerts-LOG
Go back to the Cloudflare Pages project > Settings > Functions > KV namespace bindings. Add bindings: ALERTS = nowcasting-alerts-ALERTS, LOG = nowcasting-alerts-LOG