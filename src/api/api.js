
 export async function getData(endpoint) {
  result = await fetch(`${import.meta.env.VITE_BASE_URL}products`).then((res) =>
      res.json()
    );
    return result;
}