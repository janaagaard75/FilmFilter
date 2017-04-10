self.addEventListener("message", e => {
  const max = 1e8
  for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= max; j++) {
      // Comment required to satify TSlint.
    }

    (self.postMessage as any)(`Hello from worker, ${i}.`)
  }

  (self.postMessage as any)(e.data);
}, false);