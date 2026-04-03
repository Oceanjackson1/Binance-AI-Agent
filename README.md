# Binance AI Agent

基于 MCP（Model Context Protocol）协议的 **Binance 全功能 AI Agent**，将 Binance Skills Hub 的 25 个技能模块映射为 170 个 MCP 工具，让 AI 助手（Claude Code / Claude Desktop 等）可以通过自然语言完成 Binance 上的一切操作。

## 功能概览

| 分类 | 模块 | 工具数 | 能力 |
|------|------|--------|------|
| **现货交易** | spot | 15 | 查价格、K线、下单、撤单、查订单、OCO 订单 |
| **U本位合约** | usds-futures | 14 | 合约下单、设杠杆、设保证金模式、查持仓 |
| **币本位合约** | coin-futures | 12 | 币本位合约全套操作 |
| **期权** | options | 8 | 期权下单、查持仓、查成交 |
| **统一账户** | portfolio-margin | 10 | 统一保证金模式下交易 |
| **统一账户 Pro** | portfolio-margin-pro | 6 | Pro 版统一账户 |
| **杠杆** | margin | 12 | 借币、还币、杠杆交易 |
| **算法交易** | algo | 10 | TWAP/VP 算法订单 |
| **Alpha** | alpha | 4 | Alpha 代币交易 |
| **资产管理** | assets | 10 | 余额查询、划转、提币、充值地址 |
| **子账户** | sub-account | 8 | 创建/管理子账户 |
| **赚币** | simple-earn | 8 | 活期/定期理财申购赎回 |
| **VIP 借贷** | vip-loan | 8 | 借款、还款、查利率 |
| **闪兑** | convert | 6 | 代币兑换、限价兑换 |
| **C2C** | p2p | 3 | P2P 广告搜索、订单历史 |
| **法币** | fiat | 2 | 法币出入金记录 |
| **链上支付** | onchain-pay | 4 | 法币购买加密货币 |
| **代币信息** | token-info | 4 | 搜索代币、查详情、K线 |
| **地址分析** | address-info | 3 | 链上钱包持仓/交易分析 |
| **代币审计** | token-audit | 3 | 合约安全扫描、蜜罐检测 |
| **代币化证券** | tokenized-securities | 3 | RWA 代币化美股数据 |
| **市场排行** | market-rank | 4 | 热门币、涨跌幅、交易量排行 |
| **Meme 交易** | meme-rush | 5 | Pump.fun/Four.meme 代币交易 |
| **交易信号** | trading-signal | 4 | Smart Money / 巨鲸预警 |
| **币安广场** | square-post | 4 | 发帖、浏览、热门内容 |

**合计：25 个模块，170 个工具**

## 快速开始

### 环境要求

- Node.js >= 20.0.0
- Binance 账号 + API Key

### 安装

```bash
git clone https://github.com/Oceanjackson1/Binance-AI-Agent.git
cd Binance-AI-Agent
npm install
npm run build
```

### 配置

复制环境变量模板并填入你的 API 密钥：

```bash
cp .env.example .env
```

编辑 `.env`：

```env
BINANCE_API_KEY=你的API密钥
BINANCE_API_SECRET=你的API密钥Secret
BINANCE_ENVIRONMENT=testnet
```

> **建议**：首次使用请设置为 `testnet`（测试网），验证功能正常后再切换到 `mainnet`。

### 获取 API Key

1. 登录 [Binance 官网](https://www.binance.com)
2. 进入 **用户中心** → **API 管理**
3. 点击 **创建 API** → 选择 **系统生成**
4. 完成安全验证后获得 API Key 和 Secret Key

**测试网 API Key** 请在 [testnet.binance.vision](https://testnet.binance.vision) 申请。

### 启动

```bash
# 直接运行
npm start

# 开发模式（热重载）
npm run dev
```

## 接入 Claude

### Claude Desktop

编辑 `~/Library/Application Support/Claude/claude_desktop_config.json`（macOS）：

```json
{
  "mcpServers": {
    "binance-ai-agent": {
      "command": "node",
      "args": ["/你的路径/Binance-AI-Agent/dist/index.js"],
      "env": {
        "BINANCE_API_KEY": "你的key",
        "BINANCE_API_SECRET": "你的secret",
        "BINANCE_ENVIRONMENT": "testnet"
      }
    }
  }
}
```

重启 Claude Desktop，即可在对话中使用所有 Binance 功能。

### Claude Code

在 `~/.claude/settings.json` 中添加相同的 MCP Server 配置。

## 使用示例

配置完成后，你可以直接用自然语言操作 Binance：

```
"查看 BTC 当前价格"
"帮我以 60000 USDT 的限价买入 0.1 BTC"
"查看我的合约持仓"
"把 ETHUSDT 合约杠杆设为 10 倍"
"查看我所有账户的总资产"
"把 500 USDT 从现货划转到合约账户"
"申购 1000 USDT 的活期理财"
"今天涨幅最大的前 10 个币是哪些？"
"分析这个以太坊地址持有了哪些代币：0x..."
"帮我审计这个合约地址是不是骗局：0x..."
"最近有什么聪明钱大额买入的信号？"
```

## 项目结构

```
├── src/
│   ├── index.ts                 # 入口文件
│   ├── server.ts                # MCP Server 工厂
│   ├── core/
│   │   ├── client.ts            # Binance HTTP 客户端（签名、限速、重试）
│   │   ├── auth.ts              # HMAC-SHA256 签名
│   │   ├── config.ts            # 配置加载
│   │   ├── endpoints.ts         # API 端点注册表
│   │   ├── errors.ts            # 错误类型定义
│   │   ├── rate-limiter.ts      # 速率限制器
│   │   └── types.ts             # 共享类型
│   ├── modules/                 # 25 个技能模块
│   │   ├── index.ts             # 中央模块注册
│   │   ├── spot/                # 现货交易
│   │   ├── usds-futures/        # U本位合约
│   │   ├── coin-futures/        # 币本位合约
│   │   ├── options/             # 期权
│   │   ├── portfolio-margin/    # 统一账户
│   │   ├── portfolio-margin-pro/# 统一账户 Pro
│   │   ├── margin/              # 杠杆
│   │   ├── algo/                # 算法交易
│   │   ├── alpha/               # Alpha 交易
│   │   ├── assets/              # 资产管理
│   │   ├── sub-account/         # 子账户
│   │   ├── simple-earn/         # 赚币
│   │   ├── vip-loan/            # VIP 借贷
│   │   ├── convert/             # 闪兑
│   │   ├── p2p/                 # C2C 交易
│   │   ├── fiat/                # 法币
│   │   ├── onchain-pay/         # 链上支付
│   │   ├── token-info/          # 代币信息
│   │   ├── address-info/        # 地址分析
│   │   ├── token-audit/         # 代币审计
│   │   ├── tokenized-securities/# 代币化证券
│   │   ├── market-rank/         # 市场排行
│   │   ├── meme-rush/           # Meme 交易
│   │   ├── trading-signal/      # 交易信号
│   │   └── square-post/         # 币安广场
│   └── utils/
│       ├── logger.ts            # 日志工具
│       └── formatting.ts        # 响应格式化
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── .env.example
└── .gitignore
```

## 架构设计

```
┌──────────────────────────────────────────┐
│          AI 客户端（Claude 等）            │
└────────────────┬─────────────────────────┘
                 │ MCP 协议 (stdio)
┌────────────────▼─────────────────────────┐
│           MCP Server (170 tools)         │
│  ┌────────────────────────────────────┐  │
│  │    25 个技能模块（Skill Modules）    │  │
│  └──────────────┬─────────────────────┘  │
│  ┌──────────────▼─────────────────────┐  │
│  │    BinanceClient（核心客户端）       │  │
│  │  签名 · 限速 · 重试 · 环境路由      │  │
│  └──────────────┬─────────────────────┘  │
└─────────────────┬────────────────────────┘
                  │ HTTPS
┌─────────────────▼────────────────────────┐
│          Binance API 服务器               │
│  api · fapi · dapi · eapi · papi         │
└──────────────────────────────────────────┘
```

## 安全设计

- **默认测试网**：`BINANCE_ENVIRONMENT=testnet`，避免意外操作真实资金
- **交易警告**：所有下单工具描述中标注 ⚠️ 警告
- **测试下单**：`spot_test_order` 等工具验证参数但不实际执行
- **交易不重试**：交易端点失败后不自动重试，防止重复下单
- **模块开关**：通过 `BINANCE_ENABLE_*` 环境变量关闭不需要的模块

## 模块控制

通过环境变量启用/禁用特定模块（默认全部启用）：

```env
BINANCE_ENABLE_SPOT=true
BINANCE_ENABLE_USDS_FUTURES=true
BINANCE_ENABLE_MARGIN=false        # 关闭杠杆模块
BINANCE_ENABLE_MEME_RUSH=false     # 关闭 Meme 交易
```

## 技术栈

| 技术 | 用途 |
|------|------|
| TypeScript | 类型安全 |
| MCP SDK | MCP 协议实现 |
| Zod | 参数校验 |
| Node.js `crypto` | HMAC-SHA256 签名 |
| Native `fetch` | HTTP 请求 |
| tsup | 构建打包 |

## 开发

```bash
# 类型检查
npm run typecheck

# 开发模式
npm run dev

# 构建
npm run build
```

## 许可证

MIT

## 致谢

- [Binance Skills Hub](https://www.binance.com/en/skills) — 技能定义与 API
- [Model Context Protocol](https://modelcontextprotocol.io/) — MCP 协议规范
- [Anthropic Claude](https://claude.ai/) — AI 客户端
