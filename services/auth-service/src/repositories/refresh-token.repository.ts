import { db, refreshTokens, type NewRefreshToken, type RefreshToken } from "@college-erp/db";
import { and, eq, gt } from "drizzle-orm";

export class RefreshTokenRepository {
  async create(data: NewRefreshToken): Promise<RefreshToken> {
    const [token] = await db.insert(refreshTokens).values(data).returning();
    return token;
  }

  async findByToken(token: string): Promise<RefreshToken | undefined> {
    return db.query.refreshTokens.findFirst({
      where: and(
        eq(refreshTokens.token, token),
        eq(refreshTokens.isRevoked, false),
        gt(refreshTokens.expiresAt, new Date())
      ),
    });
  }

  async findByUserId(userId: string): Promise<RefreshToken[]> {
    return db.query.refreshTokens.findMany({
      where: and(
        eq(refreshTokens.userId, userId),
        eq(refreshTokens.isRevoked, false),
        gt(refreshTokens.expiresAt, new Date())
      ),
    });
  }

  async revoke(token: string): Promise<void> {
    await db
      .update(refreshTokens)
      .set({ isRevoked: true })
      .where(eq(refreshTokens.token, token));
  }

  async revokeAllForUser(userId: string): Promise<void> {
    await db
      .update(refreshTokens)
      .set({ isRevoked: true })
      .where(eq(refreshTokens.userId, userId));
  }

  async deleteExpired(): Promise<void> {
    await db
      .delete(refreshTokens)
      .where(gt(refreshTokens.expiresAt, new Date()));
  }
}
