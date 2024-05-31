export const fetchResponse = async (url, method, body) => {
  const result = fetch(`https://noteum-api.vercel.app/${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: body ? JSON.stringify(body) : null,
  })
    .then(async (response) => {
      if (response.ok) {
        return response.status !== 204 ? response.json() : null;
      }

      const error = await response.json();

      return {
        error: {
          code: response.status,
          name: error.name,
          message: error.message,
        },
      };
    })
    .then((data) => {
      return data;
    });

  return result;
};
