self.addEventListener("message", (e: MessageEvent) => {
  const max = 1e8
  for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= max; j++) {
      // Comment required to satify TSlint.
    }

    (self as DedicatedWorkerGlobalScope).postMessage(`Hello from worker, ${i}.`)
  }

  (self as DedicatedWorkerGlobalScope).postMessage(e.data);
}, false);