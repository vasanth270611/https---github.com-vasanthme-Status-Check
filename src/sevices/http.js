export const httpCall = async (url, method = "GET", data = null) => {
  const options = {
    method,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    throw Error(
      JSON.stringify({
        status: response.status,
        message: response.text(),
      })
    );
  }
  return await response.json();
};
