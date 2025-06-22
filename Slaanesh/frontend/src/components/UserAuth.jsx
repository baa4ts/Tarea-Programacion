export const UserAuth = async (endpoint, data) => {
  const response = await fetch(`http://localhost:3000/api/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const body = await response.json();
  return {
    status: response.status,
    data: body,
  };
};
