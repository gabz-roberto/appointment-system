import { prisma } from "@/src/lib/prisma";
import { ClientRepository } from "@/src/domain/client/ClientRepository";
import { Client } from "@/src/domain/client/Client";

export class ClientPrismaRepository implements ClientRepository {

  async list(): Promise<Client[]> {
    return prisma.client.findMany();
  }

  async toggleStatus(id: string, active: boolean): Promise<void> {
    await prisma.client.update({
      where: { id },
      data: { active },
    });
  }
}
