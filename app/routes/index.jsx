import { json } from "@remix-run/cloudflare";
import { Form, useLoaderData, useActionData } from "@remix-run/react";

export async function loader ({ context, params }) {
  const data = { alerts: [], log: [] }

  const alertsKeys = await context.ALERTS.list()
  for (const k of alertsKeys.keys) {
    let alertData = await context.ALERTS.get(k.name, {type: "json"})
    data.alerts.push({ key: k.name, ...alertData })
  }

  const logKeys = await context.LOG.list()
  data.log = await Promise.all(logKeys.keys.map(k => context.LOG.get(k.name, {type: "json"})))

  return json(data)
};

export async function action({ context, request }) {
  const form = await request.formData();
  if (form.get("_method") === "delete") {
    await context.ALERTS.delete(form.get("key"))
    return json({ message: "Alert endpoint deleted." })
  } else {
    const name = form.get("name");
    const url = form.get("url");
    await context.ALERTS.put(crypto.randomUUID(), JSON.stringify({ name: name, url: url }))
    return json({ message: "New alert endpoint created." })
  }
}

export default function Index() {
  const data = useLoaderData()
  const actionData = useActionData()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Nowcasting Alerts</h1>
      <p>Setup and manage alerts that are triggered when <a href="https://www.nowcasting.io">OpenClimateFix Nowcasting</a> forecasts deviate from <a href="https://www.solar.sheffield.ac.uk/pvlive/">Sheffield Solar PV_Live</a>.</p>
      <p>Every 5 minutes we look at the most up to date Nowcast forecast for the most recent PV_Live forecast. If the forecasts deviate by 0.5GW or more either way, we trigger all alert endpoinds configured below.</p>
      <h2>Alert Endpoints</h2>
      <ul>
        {data.alerts.map((alert) => 
          <li>{alert.name} <pre>{alert.url}</pre> 
            <Form method="post">
              <input type="hidden" name="key" value={alert.key} />
              <input type="hidden" name="_method" value="delete" />
              <button type="submit">Delete</button>
            </Form>
          </li>
        )}
      </ul>
      <h3>Create Alert</h3>
      <p>{actionData && actionData.message}</p>
      <Form method="post">
        <div>
          <input type="text" name="name" placeholder="Name" />
          <input type="text" name="url" placeholder="Webhook URL" />
          <button type="submit">Save</button>
        </div>
      </Form>
      <h2>Alert Log</h2>
      <ul>
        {data.log.map((log) => 
          <li><pre>{log.time}</pre><br />{log.text}</li>
        )}
      </ul>
    </div>
  );
}
