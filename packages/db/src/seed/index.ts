import { db } from "../client";
import { colleges } from "../schemas/academic/colleges";
import { users } from "../schemas/auth/users";

async function seed() {
  console.log("Seeding database...");

  try {
    const existingCollege = await db.select().from(colleges).limit(1);

    if (existingCollege.length > 0) {
      console.log("Database already seeded. Skipping.");
      process.exit(0);
    }

    const [college] = await db
      .insert(colleges)
      .values({
        name: "Demo College of Engineering",
        slug: "demo-college",
        email: "admin@democollege.edu",
        phone: "9876543210",
        city: "Surat",
        state: "Gujarat",
      })
      .returning();

    console.log("Created college:", college.name);

    await db.insert(users).values({
      collegeId: college.id,
      name: "Super Admin",
      email: "superadmin@college-erp.com",
      role: "super_admin",
      isActive: true,
      isVerified: true,
    });

    console.log("Created super admin user");

    await db.insert(users).values({
      collegeId: college.id,
      name: "College Admin",
      email: "admin@democollege.edu",
      role: "college_admin",
      isActive: true,
      isVerified: true,
    });

    console.log("Created college admin user");
    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seed();