export default {
  async fetch(request) {
    return new Response("Hello from your empty worker!", {
      headers: { "content-type": "text/plain" },
    });
  },
};