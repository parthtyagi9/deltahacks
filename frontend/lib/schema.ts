import z from "zod";

export const schema = z.object({
  schema: z.object({
    response: z
      .string()
      .describe(
        "The verbal response to the user's query. For example, 'Sure! I've modified...'"
      ),
    queries: z
      .array(
        z.object({
          name: z
            .string()
            .describe(
              "A short, descriptive name for the insight we are interested in."
            ),
          description: z
            .string()
            .describe(
              "A detailed description of the insight, including what it reveals about the data."
            ),
        })
      )
      .describe("A list of insights relevant to the user's request."),
  }),
});
