import z from "zod";

export const signupSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(5),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const zapCreateschema = z.object({
  availableTriggerId: z.string(),
  triggerMetadata: z.any().optional(),
  action: z.array(
    z.object({
      availableActionId: z.string(),
      actionMetadata: z.any().optional(),
    })
  ),
});
