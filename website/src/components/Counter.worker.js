self.addEventListener("message", e => {
  const max = 1e8
  for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= max; j++) {
    }

    self.postMessage(`Hello from worker, ${i}.`)
  }

  self.postMessage(e.data);
}, false);