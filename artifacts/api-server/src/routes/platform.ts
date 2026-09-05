import { Router, type IRouter } from "express";
import {
  CreatePaymentMethodBody,
  DecideDepositBody,
  DecideDepositParams,
  GetPlanParams,
  GetPlanResponse,
  GetDashboardResponse,
  GetAdminOverviewResponse,
  ListActivityResponse,
  ListAdminDepositsResponse,
  ListAdminPaymentMethodsResponse,
  ListAuditLogsResponse,
  ListDocumentsResponse,
  ListNotificationsResponse,
  ListPlansResponse,
  ListTransactionsResponse,
  UpdatePaymentMethodBody,
  UpdatePaymentMethodParams,
} from "@workspace/api-zod";
import { readSupabase, writeSupabase } from "../lib/supabase";
import {
  activity,
  adminOverview,
  auditLogs,
  dashboard,
  deposits,
  documents,
  notifications,
  paymentMethods,
  plans,
  transactions,
  type PaymentMethod,
  type Plan,
} from "../lib/platform-data";
import { randomUUID } from "node:crypto";
import { requireAdmin, requireAuth } from "../middlewares/auth";

const router: IRouter = Router();

function normalizePlan(row: Record<string, unknown>): Plan {
  return {
    id: String(row.id),
    name: String(row.name),
    category: String(row.category),
    risk: String(row.risk),
    duration: String(row.duration),
    minimum: Number(row.minimum),
    targetReturn: row.target_return ? String(row.target_return) : undefined,
    fee: String(row.fee),
    liquidity: String(row.liquidity),
    status: String(row.status),
    description: String(row.description),
    color: String(row.color ?? "sage"),
  };
}

async function currentPlans(): Promise<Plan[]> {
  const rows = await readSupabase<Record<string, unknown>>({
    table: "investment_plans",
    query: "select=*",
  });
  return rows?.length ? rows.map(normalizePlan) : plans;
}

router.get("/plans", async (_req, res) => {
  res.json(ListPlansResponse.parse(await currentPlans()));
});

router.get("/plans/:id", async (req, res) => {
  const { id } = GetPlanParams.parse(req.params);
  const result = (await currentPlans()).find((plan) => plan.id === id);
  if (!result) {
    res.status(404).json({ error: "Plan not found" });
    return;
  }
  res.json(GetPlanResponse.parse(result));
});

router.get("/dashboard", requireAuth, (_req, res) => {
  res.json(GetDashboardResponse.parse(dashboard));
});

router.get("/activity", requireAuth, (_req, res) => {
  res.json(ListActivityResponse.parse(activity));
});

router.get("/transactions", requireAuth, (_req, res) => {
  res.json(ListTransactionsResponse.parse(transactions));
});

router.get("/documents", requireAuth, (_req, res) => {
  res.json(ListDocumentsResponse.parse(documents));
});

router.get("/notifications", requireAuth, (_req, res) => {
  res.json(ListNotificationsResponse.parse(notifications));
});

router.get("/admin/overview", requireAdmin, (_req, res) => {
  res.json(GetAdminOverviewResponse.parse(adminOverview));
});

async function currentPaymentMethods(): Promise<PaymentMethod[]> {
  const rows = await readSupabase<Record<string, unknown>>({
    table: "payment_methods",
    query: "select=*&order=updated_at.desc",
  });
  if (!rows?.length) return paymentMethods;
  return rows.map((row) => ({
    id: String(row.id),
    type: String(row.type),
    name: String(row.name),
    asset: String(row.asset),
    network: String(row.network),
    destination: String(row.destination),
    status: String(row.status),
    version: Number(row.version),
    updatedAt: String(row.updated_at ?? row.updatedAt),
    instructions: row.instructions ? String(row.instructions) : undefined,
    minAmount: row.min_amount ? Number(row.min_amount) : undefined,
  }));
}

router.get("/admin/payment-methods", requireAdmin, async (_req, res) => {
  res.json(ListAdminPaymentMethodsResponse.parse(await currentPaymentMethods()));
});

router.post("/admin/payment-methods", requireAdmin, async (req, res) => {
  const input = CreatePaymentMethodBody.parse(req.body);
  const item: PaymentMethod = {
    id: `${input.type.toLowerCase().replace(/\s+/g, "-")}-${randomUUID().slice(0, 8)}`,
    type: input.type,
    name: input.name,
    asset: input.asset,
    network: input.network,
    destination: input.destination,
    status: "Draft",
    version: 1,
    updatedAt: new Date().toISOString(),
    instructions: input.instructions,
    minAmount: input.minAmount,
  };
  paymentMethods.unshift(item);
  await writeSupabase("payment_methods", {
    id: item.id,
    type: item.type,
    name: item.name,
    asset: item.asset,
    network: item.network,
    destination: item.destination,
    status: item.status,
    version: item.version,
    updated_at: item.updatedAt,
    instructions: item.instructions,
    min_amount: item.minAmount,
  }, "POST");
  res.status(201).json(item);
});

router.patch("/admin/payment-methods/:id", requireAdmin, async (req, res) => {
  const { id } = UpdatePaymentMethodParams.parse(req.params);
  const input = UpdatePaymentMethodBody.parse(req.body);
  const item = paymentMethods.find((method) => method.id === id);
  if (!item) {
    res.status(404).json({ error: "Payment method not found" });
    return;
  }
  Object.assign(item, input, {
    version: item.version + 1,
    updatedAt: new Date().toISOString(),
  });
  await writeSupabase("payment_methods", {
    status: item.status,
    instructions: item.instructions,
    destination: item.destination,
    version: item.version,
    updated_at: item.updatedAt,
  }, "PATCH", `id=eq.${encodeURIComponent(id)}`);
  res.json(item);
});

router.get("/admin/deposits", requireAdmin, async (_req, res) => {
  const rows = await readSupabase<Record<string, unknown>>({
    table: "deposits",
    query: "select=*&order=submitted_at.desc",
  });
  const response = rows?.length
    ? rows.map((row) => ({
        id: String(row.id),
        customer: String(row.customer),
        amount: Number(row.amount),
        asset: String(row.asset),
        network: String(row.network),
        reference: String(row.reference),
        status: String(row.status),
        submittedAt: String(row.submitted_at ?? row.submittedAt),
        method: row.method ? String(row.method) : undefined,
      }))
    : deposits;
  res.json(ListAdminDepositsResponse.parse(response));
});

router.post("/admin/deposits/:id/decision", requireAdmin, (req, res) => {
  const { id } = DecideDepositParams.parse(req.params);
  const input = DecideDepositBody.parse(req.body);
  const item = deposits.find((deposit) => deposit.id === id);
  if (!item) {
    res.status(404).json({ error: "Deposit not found" });
    return;
  }
  const statusByDecision: Record<string, string> = {
    confirm: "Verified · ledger pending",
    reject: "Rejected",
    request_info: "Needs information",
    mark_mismatch: "Mismatch",
  };
  item.status = statusByDecision[input.decision] ?? "Escalated";
  auditLogs.unshift({
    id: `audit-${randomUUID().slice(0, 8)}`,
    action: `Deposit ${input.decision}`,
    actor: "ops@tradeverge.live",
    timestamp: new Date().toISOString(),
    outcome: input.reason,
  });
  res.json(item);
});

router.get("/admin/audit", requireAdmin, (_req, res) => {
  res.json(ListAuditLogsResponse.parse(auditLogs));
});

export default router;