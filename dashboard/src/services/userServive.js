export default (httpClient) => ({
  getMe: async () => {
    const response = await httpClient.get("/users/me");
    console.log("httpClient",httpClient.headers)
    return {
      data: response.data,
    };
  },
});
