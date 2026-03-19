import { db, passwordResets, type NewPasswordReset, type PasswordReset } from "@college-erp/db";
import { and, eq, gt } from "drizzle-orm";

export class PasswordResetRepository {
  async create(data: NewPasswordReset): Promise<PasswordReset> {
    const [reset] = await db.insert(passwordResets).values(data).returning();
    return reset;
  }

  async findByToken(token: string): Promise<PasswordReset | undefined> {
    return db.query.passwordResets.findFirst({
      where: and(
        eq(passwordResets.token, token),
        eq(passwordResets.isUsed, false),
        gt(passwordResets.expiresAt, new Date())
      ),
    });
  }

  async markAsUsed(token: string): Promise<void> {
    await db
      .update(passwordResets)
      .set({ isUsed: true })
      .where(eq(passwordResets.token, token));
  }

  async deleteExpired(): Promise<void> {
    await db
      .delete(passwordResets)
      .where(gt(passwordResets.expiresAt, new Date()));
  }
}
