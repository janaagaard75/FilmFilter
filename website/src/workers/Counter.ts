class Counter {
  public messageReceived(e: MessageEvent) {
    postMessage(e.data)
    this.count()
  }

  private count(): void {
    const max = 1e8
    for (let i = 1; i <= 5; i++) {
      for (let j = 1; j <= max; j++) {
        // Comment here to satify TSlint.
      }

      postMessage(`Hello from worker, ${i}.`)
    }
  }
}

const counter = new Counter()
self.addEventListener("message", (e: MessageEvent) => counter.messageReceived(e), false)