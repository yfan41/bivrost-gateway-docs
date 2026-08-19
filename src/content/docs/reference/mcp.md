---
title: "4.4. MCP 服务"
---

网关内置 MCP（Model Context Protocol）服务端，把机台数据、数据分析与网关状态以「工具」的形式提供给支持 MCP 的 AI 客户端（如 Claude Code、Claude Desktop、MCP Inspector 等），用户可以用自然语言查询机台，无需自行调用 HTTP 接口。云平台（Hub）也提供同样的 MCP 服务端，调用时由云平台转发至指定网关执行。

:::note[注]
MCP 工具在网关内部走与 HTTP 接口完全相同的处理流程，因此同一数据经 MCP 返回的内容与对应 HTTP 接口完全一致。完整的工具列表、参数与返回格式详见《通讯协议》六、MCP 服务，本节只介绍网关侧的开启与配置方法。
:::

## 4.4.1. 基本说明 {#overview}

MCP 服务端地址为 `/mcp`，与网关的 HTTP 接口共用同一端口，例如 `http://192.168.100.1/mcp`。当前提供 33 个**只读**工具，覆盖机台配置、实时状态、数据分析与网关系统信息；涉及写入、机台控制、程序传输的功能不提供 MCP 工具，仍需通过 HTTP 接口调用。

MCP 功能默认开启，无需在网关管理界面额外开关；只要网关的 HTTP 接口可以正常访问，`/mcp` 地址即可用。

## 4.4.2. 鉴权 {#auth}

MCP 服务端与 HTTP 接口使用同一套鉴权与访问控制，无需单独配置：

- **密钥/令牌**：MCP 客户端需在请求头中携带 `Authorization: Bearer <凭证>`，凭证可以是登录后获取的 JWT，也可以是管理员在**用户安全设置**中为用户生成的密钥（[3.12.1.3.2. 用户安全设置](/usage/settings/#user-security)）。JWT 有效期 24 小时，MCP 客户端配置通常长期保存，**建议使用以 "sk-" 开头的密钥**，避免过期后调用持续失败。
- **IP 白名单**：如在[3.6.6. HTTP 设置](/usage/communication/#http)中启用了 IP 白名单，`/mcp` 请求同样受其限制。
- **授权 API**：开启[安全控制](/usage/settings/#security-control)后，非管理员用户只能调用其授权 API 列表覆盖到的工具，规则与 HTTP 接口一致（见 [3.12.1.3.2. 用户安全设置](/usage/settings/#user-security)）；无权限的工具调用会返回错误。管理员用户可调用全部工具。

## 4.4.3. 云平台调用 {#cloud}

如网关已接入彼络云平台，也可以直接连接云平台的 MCP 服务端（地址形如 `https://{云平台地址}/mcp`），由云平台转发到指定网关执行，工具列表与直连网关一致。此时请求头改为携带 `accessToken: <网关令牌>`，即[3.6.1. 云平台配置](/usage/communication/#cloud)中填写的网关令牌，它既是鉴权凭证，也用于指定要调用哪一台网关。

## 4.4.4. 客户端配置示例 {#client}

以 Claude Code 为例，添加网关 MCP 服务端：

```bash
claude mcp add --transport http bivrost-gateway http://192.168.100.1/mcp --header "Authorization: Bearer <密钥>"
```

添加云平台 MCP 服务端：

```bash
claude mcp add --transport http bivrost-hub https://cloud.example.com/mcp --header "accessToken: <网关令牌>"
```

其它支持 MCP 的客户端一般使用如下形式的 JSON 配置：

```json
{
  "mcpServers": {
    "bivrost-gateway": {
      "type": "http",
      "url": "http://192.168.100.1/mcp",
      "headers": {
        "Authorization": "Bearer <密钥>"
      }
    }
  }
}
```

配置完成后，即可在客户端中用自然语言提问，例如"查询 1 号机台当前状态"“统计 1 号机组最近一天的 OEE”，客户端会自动选择合适的工具调用网关获取数据。

没有实际机床时，可使用[模拟机台](/usage/machines/#add-machine)测试 MCP 工具。

## 4.4.5. 使用限制 {#limitations}

- 全部工具均为**只读**，不提供修改配置、控制机台、传输文件的能力；如需写入操作，仍需使用 HTTP 接口或网页管理界面。
- 工具覆盖的数据范围与字段含义同对应的 HTTP 接口，具体清单见《通讯协议》六、MCP 服务 6.4. 工具列表。
