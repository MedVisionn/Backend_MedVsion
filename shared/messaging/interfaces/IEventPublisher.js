export class IEventPublisher {
  /**
   * Publishes an event to the message broker.
   * @param {string} exchange - The routing exchange
   * @param {string} routingKey - The routing key
   * @param {Object} message - The message payload
   */
  async publish(exchange, routingKey, message) {
    throw new Error('Method not implemented.');
  }
}
