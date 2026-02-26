console.info("Starting health check...");

fetch(`http://localhost:${process.env.HTTP_PORT || 4001}/health`).then(
  async (res) => {
    if (res.ok) {
      const result = await res.json();
      console.info("health check passed");
      console.log(result);

      process.exit(0);
    } else {
      console.warn("health check failed");

      process.exit(1);
    }
  },
);
