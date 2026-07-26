import amqp from 'amqplib';

let channel = null;

export async function getChannel() {
    if (channel) return channel;
    const url = process.env.RABBITMQ_URL || 'amqp://user:password@localhost:5672';
    const connection = await amqp.connect(url);
    channel = await connection.createChannel();
    console.log('[RabbitMQ] Connected');
    return channel;
}
