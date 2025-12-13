import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import {
  createPerson,
  getPerson,
  listPersons,
  updatePerson,
  deletePerson,
} from "@/lib/personService";

const handler = createMcpHandler(
  (server) => {
    // CREATE
    server.tool(
      "createPerson",
      { name: z.string(), age: z.number().int(), email: z.string().email() },
      { title: "Create a new person in meal-habit-tracker" },
      async ({ name, age, email }) => {
        const person = await createPerson({ name, age, email });
        return { content: [{ type: "text", text: "Person created" }], structuredContent: person };
      }
    );

    // READ (list)
    server.tool(
      "listPersons",
      {},
      { title: "List all persons" },
      async () => {
        const persons = await listPersons();
        return { content: [{ type: "text", text: `Found ${persons.length} persons` }], structuredContent: { persons } };
      }
    );

    // READ (single)
    server.tool(
      "getPerson",
      { id: z.string() },
      { title: "Get a person by id" },
      async ({ id }) => {
        const pid = Number(id);
        const person = await getPerson(pid);
        return { content: [{ type: "text", text: "Person fetched" }], structuredContent: person ?? undefined };
      }
    );

    // UPDATE
    server.tool(
      "updatePerson",
      { id: z.string(), name: z.string().optional(), age: z.number().int().optional(), email: z.string().email().optional() },
      { title: "Update a person by id" },
      async ({ id, name, age, email }) => {
        const pid = Number(id);
        const person = await updatePerson(pid, { name, age, email });
        return { content: [{ type: "text", text: "Person updated" }], structuredContent: person ?? undefined };
      }
    );

    // DELETE
    server.tool(
      "deletePerson",
      { id: z.string() },
      { title: "Delete a person by id" },
      async ({ id }) => {
        const pid = Number(id);
        await deletePerson(pid);
        return { content: [{ type: "text", text: "Person deleted" }], structuredContent: { status: "deleted" } };
      }
    );
  },
  {},
  { basePath: "/api", maxDuration: 60, verboseLogs: true }
);

export { handler as GET, handler as POST };


