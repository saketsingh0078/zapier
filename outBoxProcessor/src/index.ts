import { Kafka } from "kafkajs";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
  clientId: "outBoxProcessor",
  brokers: ["localhost:9092"],
});

async function main() {
  const consumer = kafka.consumer({ groupId: "test-group" });
  await consumer.connect();
  await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });

  while (1) {
    await consumer.run({
      autoCommit: false,
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });
        await new Promise((r) => setTimeout(r, 5000));
        await consumer.commitOffsets([
          {
            topic: TOPIC_NAME,
            partition: partition,
            offset: (parseInt(message.offset) + 1).toString(),
          },
        ]);
      },
    });
  }
}

main();
