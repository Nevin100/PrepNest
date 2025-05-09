import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const userData = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    if (userData?.length == 0) {
      const user = await ctx.db.insert("users", {
        name: args.name,
        email: args.email,
        credits: 50000,
      });
      console.log("User created:", user);
      return user;
    }
    return userData[0];
  },
});
