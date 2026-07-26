export class IEventSubscriber {
  /**
   * Subscribes to events from the message broker.
   * @param {string} exchange - The routing exchange
   * @param {string} queueName - The queue name to bind
   * @param {string} routingKey - The routing key to filter
   * @param {Function} callback - The handler for messages
   */
  async subscribe(exchange, queueName, routingKey, callback) {
    throw new Error('Method not implemented.');
  }
}
