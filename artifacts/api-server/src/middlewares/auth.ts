import { getAuth } from "@clerk/express";
import type { NextFunction, Request, Response } from "express";

type Role = "investor" | "admin";

function getRole(req: Request): Role {
  const auth = getAuth(req);
  const claims = auth.sessionClaims as Record<string, any> | null | undefined;
  const claimRole =
    claims?.metadata?.role ??
    claims?.public_metadata?.role ??
    claims?.unsafe_metadata?.role;
  return claimRole === "admin" ? "admin" : "investor";
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }
  if (getRole(req) !== "admin") {
    res.status(403).json({ error: "Admin role required" });
    return;
  }
  next();
}

export function authSnapshot(req: Request) {
  const auth = getAuth(req);
  return {
    userId: auth.userId ?? null,
    role: auth.userId ? getRole(req) : null,
  };
}