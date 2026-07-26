import { getChannel } from './rabbitmq.js';

export async function subscribe(exchange, queueName, routingKey, callback) {
    const channel = await getChannel();
    await channel.assertExchange(exchange, 'topic', { durable: true });
    const { queue } = await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(queue, exchange, routingKey);
    console.log(`[RabbitMQ] Subscribed → ${queueName} (${routingKey})`);
    channel.consume(queue, async (msg) => {
        if (!msg) return;
        try {
            await callback(JSON.parse(msg.content.toString()));
            channel.ack(msg);
        } catch (err) {
            console.error('[RabbitMQ] Handler error:', err.message);
            channel.nack(msg, false, false);
        }
    });
}
