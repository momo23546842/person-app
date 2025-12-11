// mcp/personServer.ts
import {
  createPerson,
  getPerson,
  listPersons,
  updatePerson,
  deletePerson,
} from "../src/lib/personService";

export type McpToolName =
  | "create_person"
  | "get_person"
  | "list_persons"
  | "update_person"
  | "delete_person";

export type McpRequest = {
  tool: McpToolName;
  args: any;
};

export type McpResponse =
  | { ok: true; result: any }
  | { ok: false; error: string };

export async function handleMcpRequest(body: McpRequest): Promise<McpResponse> {
  try {
    switch (body.tool) {
      case "create_person": {
        const { name, age, email } = body.args;
        if (!name || typeof age === "undefined" || !email) {
          return { ok: false, error: "name, age と email は必須です" };
        }
        const person = await createPerson({ name, age: Number(age), email: String(email) });
        return { ok: true, result: person };
      }

      case "get_person": {
        const { id } = body.args;
        const person = await getPerson(Number(id));
        return { ok: true, result: person };
      }

      case "list_persons": {
        const persons = await listPersons();
        return { ok: true, result: persons };
      }

      case "update_person": {
        const { id, name, age } = body.args;
        const person = await updatePerson(Number(id), {
          name,
          age: typeof age !== "undefined" ? Number(age) : undefined,
        });
        return { ok: true, result: person };
      }

      case "delete_person": {
        const { id } = body.args;
        const person = await deletePerson(Number(id));
        return { ok: true, result: person };
      }

      default: {
        return { ok: false, error: "unknown tool" };
      }
    }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
