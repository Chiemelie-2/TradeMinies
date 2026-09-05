export type Plan = {
  id: string;
  name: string;
  category: string;
  risk: string;
  duration: string;
  minimum: number;
  targetReturn?: string;
  fee: string;
  liquidity: string;
  status: string;
  description: string;
  color: string;
};

export const plans: Plan[] = [
  {
    id: "steady-income",
    name: "Steady Income",
    category: "Income",
    risk: "Low",
    duration: "12 months",
    minimum: 1000,
    targetReturn: "8.5% target",
    fee: "1.0% management",
    liquidity: "Quarterly",
    status: "Open",
    description: "A diversified income mandate designed for dependable cash flow and measured growth.",
    color: "sage",
  },
  {
    id: "balanced-growth",
    name: "Balanced Growth",
    category: "Growth",
    risk: "Moderate",
    duration: "24 months",
    minimum: 5000,
    targetReturn: "12.8% target",
    fee: "1.25% management",
    liquidity: "Semi-annual",
    status: "Open",
    description: "A balanced allocation across resilient businesses, quality credit, and real assets.",
    color: "gold",
  },
  {
    id: "global-opportunities",
    name: "Global Opportunities",
    category: "Global",
    risk: "Moderate",
    duration: "36 months",
    minimum: 10000,
    targetReturn: "16.2% target",
    fee: "1.5% management",
    liquidity: "Annual",
    status: "Limited",
    description: "Patient capital for a concentrated portfolio of global structural growth themes.",
    color: "ink",
  },
];

export const dashboard = {
  totalValue: 84750,
  availableCash: 12400,
  investedValue: 72350,
  returnPercent: 14.8,
  lastUpdated: "04 Sep 2026, 09:42 WAT",
  kycStatus: "Verified",
  activeInvestments: [
    { id: "inv-001", plan: "Balanced Growth", amount: 50000, value: 54820, status: "Active", maturity: "18 Jun 2028" },
    { id: "inv-002", plan: "Steady Income", amount: 20000, value: 21100, status: "Active", maturity: "02 Mar 2027" },
  ],
};

export const activity = [
  { id: "activity-1", title: "Portfolio valued", detail: "Your latest valuation is ready to review.", time: "Today, 09:42", tone: "success" },
  { id: "activity-2", title: "Document available", detail: "August account statement is ready.", time: "Yesterday", tone: "info" },
  { id: "activity-3", title: "Deposit under review", detail: "Your bank transfer is awaiting verification.", time: "02 Sep", tone: "warning" },
  { id: "activity-4", title: "Security check completed", detail: "New device sign-in confirmed.", time: "28 Aug", tone: "neutral" },
];

export const transactions = [
  { id: "tx-2048", type: "Deposit", description: "Bank transfer · awaiting verification", amount: 12500, status: "Pending", date: "02 Sep 2026", reference: "TV-DEP-2048" },
  { id: "tx-2047", type: "Investment", description: "Balanced Growth allocation", amount: -50000, status: "Settled", date: "18 Jun 2026", reference: "TV-INV-2047" },
  { id: "tx-2041", type: "Return", description: "Steady Income distribution", amount: 860, status: "Settled", date: "01 Jun 2026", reference: "TV-RET-2041" },
  { id: "tx-2032", type: "Deposit", description: "Bank transfer", amount: 20000, status: "Settled", date: "02 Mar 2026", reference: "TV-DEP-2032" },
];

export const documents = [
  { id: "doc-1", name: "August 2026 account statement", type: "Statement", date: "01 Sep 2026", size: "244 KB" },
  { id: "doc-2", name: "Balanced Growth investment agreement", type: "Agreement", date: "18 Jun 2026", size: "1.2 MB" },
  { id: "doc-3", name: "Steady Income risk disclosure", type: "Disclosure", date: "02 Mar 2026", size: "318 KB" },
];

export const notifications = [
  { id: "notification-1", title: "Deposit submitted for review", detail: "We will notify you when operations verifies the transfer.", time: "2 hours ago", category: "Money", unread: true },
  { id: "notification-2", title: "Your monthly valuation is ready", detail: "Portfolio value: $84,750.00 as of 04 Sep 2026.", time: "Today", category: "Investment", unread: true },
  { id: "notification-3", title: "New sign-in confirmed", detail: "Chrome on macOS · Lagos, Nigeria", time: "28 Aug", category: "Security", unread: false },
];

export const adminOverview = {
  totalUsers: 1284,
  aum: 18420000,
  pendingKyc: 18,
  pendingDeposits: 7,
  pendingWithdrawals: 3,
  fees: 284600,
  risk: "Healthy",
};

export type PaymentMethod = {
  id: string;
  type: string;
  name: string;
  asset: string;
  network: string;
  destination: string;
  status: string;
  version: number;
  updatedAt: string;
  instructions?: string;
  minAmount?: number;
};

export const paymentMethods: PaymentMethod[] = [
  {
    id: "pm-bank-ngn",
    type: "Bank transfer",
    name: "TradeVerge operating account",
    asset: "NGN",
    network: "Local transfer",
    destination: "Awaiting admin configuration",
    status: "Draft",
    version: 1,
    updatedAt: "04 Sep 2026, 08:12 WAT",
    instructions: "Add approved bank instructions before publishing to investors.",
    minAmount: 10000,
  },
  {
    id: "pm-btc-mainnet",
    type: "Crypto",
    name: "Bitcoin settlement wallet",
    asset: "BTC",
    network: "Bitcoin mainnet",
    destination: "Awaiting admin configuration",
    status: "Draft",
    version: 1,
    updatedAt: "04 Sep 2026, 08:12 WAT",
    instructions: "Add the verified wallet address, confirmation threshold, and customer copy.",
    minAmount: 0.001,
  },
];

export const deposits = [
  { id: "dep-2048", customer: "Amina Yusuf", amount: 12500, asset: "NGN", network: "Local transfer", reference: "TV-DEP-2048", status: "Pending review", submittedAt: "02 Sep 2026, 14:24", method: "TradeVerge operating account" },
  { id: "dep-2047", customer: "Daniel Okafor", amount: 0.035, asset: "BTC", network: "Bitcoin mainnet", reference: "bc1q…8h2m", status: "Mismatch", submittedAt: "01 Sep 2026, 17:08", method: "Bitcoin settlement wallet" },
  { id: "dep-2044", customer: "Sarah Adeyemi", amount: 50000, asset: "NGN", network: "Local transfer", reference: "TV-DEP-2044", status: "Pending review", submittedAt: "31 Aug 2026, 10:12", method: "TradeVerge operating account" },
];

export const auditLogs = [
  { id: "audit-1", action: "Payment method saved as draft", actor: "finance@tradeverge.live", timestamp: "04 Sep 2026, 08:12", outcome: "Success" },
  { id: "audit-2", action: "Deposit marked mismatch", actor: "ops@tradeverge.live", timestamp: "03 Sep 2026, 16:40", outcome: "Success" },
  { id: "audit-3", action: "KYC additional information requested", actor: "analyst@tradeverge.live", timestamp: "03 Sep 2026, 15:02", outcome: "Success" },
];