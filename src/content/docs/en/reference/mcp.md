---
title: "4.4. MCP Service"
---

The gateway hosts a built-in MCP (Model Context Protocol) server that exposes machine data, analytics and gateway status as "tools" for MCP-capable AI clients (Claude Code, Claude Desktop, MCP Inspector, and others). Users can query machines in natural language instead of calling the HTTP API by hand. The cloud platform (Hub) offers the same MCP server and forwards calls to the target gateway.

:::note[Note]
MCP tools go through the exact same processing path inside the gateway as the HTTP API, so the data an MCP tool returns is identical to the matching HTTP endpoint. The full tool list, parameters and return format are in the *Communication Protocol* chapter 6, MCP Service; this section only covers enabling and configuring MCP on the gateway.
:::

## 4.4.1. Overview {#overview}

The MCP server is served at `/mcp`, on the same port as the gateway's HTTP API, e.g. `http://192.168.100.1/mcp`. It currently exposes 33 **read-only** tools covering machine configuration, live status, analytics and gateway system information. Anything involving writes, machine control or program transfer has no MCP tool and still requires the HTTP API.

MCP is enabled by default — there is no separate switch in the gateway admin UI. `/mcp` is reachable as soon as the gateway's HTTP API is reachable.

## 4.4.2. Authentication {#auth}

The MCP server shares the same authentication and access control as the HTTP API — nothing extra to configure:

- **Key / token**: an MCP client must send `Authorization: Bearer <credential>` in its request header. The credential can be a JWT obtained after login, or a key generated for a user under **User Security Settings** ([3.12.1.3.2. User Security Settings](/en/usage/settings/#user-security)). A JWT expires after 24 hours, and MCP client configuration is usually saved long-term, so **a key starting with "sk-" is recommended** to avoid calls silently failing once the JWT expires.
- **IP whitelist**: if the IP whitelist is enabled under [3.6.6. HTTP Settings](/en/usage/communication/#http), `/mcp` requests are subject to it as well.
- **Authorized APIs**: with [Security Control](/en/usage/settings/#security-control) turned on, a non-admin user can only call the tools covered by their authorized API list, using the same rule as the HTTP API (see [3.12.1.3.2. User Security Settings](/en/usage/settings/#user-security)); a tool call without permission returns an error. Admin users can call every tool.

## 4.4.3. Calling Through the Cloud Platform {#cloud}

If the gateway is connected to the Bivrost cloud platform, an MCP client can instead connect to the cloud platform's MCP server (`https://{cloud-platform-address}/mcp`), which forwards the call to the target gateway; the tool list is identical to a direct gateway connection. In this case send `accessToken: <gateway access token>` instead — the same gateway access token entered under [3.6.1. Cloud Platform](/en/usage/communication/#cloud) — which both authenticates the caller and selects which gateway the call runs on.

## 4.4.4. Client Configuration Examples {#client}

Using Claude Code as an example, add the gateway's MCP server:

```bash
claude mcp add --transport http bivrost-gateway http://192.168.100.1/mcp --header "Authorization: Bearer <key>"
```

Add the cloud platform's MCP server:

```bash
claude mcp add --transport http bivrost-hub https://cloud.example.com/mcp --header "accessToken: <gateway access token>"
```

Other MCP-capable clients generally use JSON configuration in this shape:

```json
{
  "mcpServers": {
    "bivrost-gateway": {
      "type": "http",
      "url": "http://192.168.100.1/mcp",
      "headers": {
        "Authorization": "Bearer <key>"
      }
    }
  }
}
```

Once configured, ask the client questions in natural language, e.g. "What is the current status of machine 1?" or "Show OEE for group 1 over the last day" — the client picks the matching tool and calls the gateway automatically.

Without a real machine tool on hand, use a [mock machine](/en/usage/machines/#add-machine) to test the MCP tools.

## 4.4.5. Limitations {#limitations}

- Every tool is **read-only** — none of them can change configuration, control a machine, or transfer files; use the HTTP API or the web admin UI for writes.
- The data covered by each tool and its field meanings match the corresponding HTTP endpoint; see the full list in *Communication Protocol* chapter 6, MCP Service, section 6.4. Tool List.
