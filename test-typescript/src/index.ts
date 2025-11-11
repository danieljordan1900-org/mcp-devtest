import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Lista de amigos
const friends = ["Juan", "Pepe", "Marci"];

// Crear el servidor MCP
const server = new McpServer({
  name: "friends-server",
  version: "1.0.0",
});

// Registrar herramienta para obtener la lista de amigos
server.registerTool(
  "get_friends",
  {
    title: "Obtener Lista de Amigos",
    description: "Obtiene la lista de amigos disponibles",
    inputSchema: {},
    outputSchema: {
      friends: z.array(z.string()),
      count: z.number(),
    },
  },
  async () => {
    const output = {
      friends: friends,
      count: friends.length,
    };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(output, null, 2),
        },
      ],
      structuredContent: output,
    };
  }
);

// Iniciar el servidor
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Servidor MCP de amigos iniciado correctamente");
}

main().catch((error) => {
  console.error("Error al iniciar el servidor:", error);
  process.exit(1);
});