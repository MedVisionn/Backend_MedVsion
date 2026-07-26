import { getChannel } from './rabbitmq.js';

export async function publish(exchange, routingKey, message) {
    const channel = await getChannel();
    await channel.assertExchange(exchange, 'topic', { durable: true });
    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)), { persistent: true });
    console.log(`[RabbitMQ] Published → ${exchange}/${routingKey}`);
}
