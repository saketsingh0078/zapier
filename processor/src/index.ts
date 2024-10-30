import { Kafka } from "kafkajs";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

async function main() {
  const producer = kafka.producer();
  await producer.connect();

  while (1) {
    const pendingRow = await client.zapRunOutBox.findMany({
      where: {},
      take: 10,
    });

    await producer.send({
      topic: "zap-events",
      messages: pendingRow.map((r) => {
        return {
          value: r.zapRunId,
        };
      }),
    });

    await client.zapRunOutBox.deleteMany({
      where: {
        id: {
          in: pendingRow.map((r) => r.id),
        },
      },
    });
  }
}

main();
