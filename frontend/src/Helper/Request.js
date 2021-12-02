export const get = async (url, hasToken = true) => {
  const headers = new Headers({ "Content-Type": "application/json" });
  if (hasToken) {
    const token = localStorage.getItem('access_token');
    headers.append('Authorization', `Bearer ${token}`);
  }
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers
    });
    const res = await responseParser(response)
    return res;
  } catch (error) {
    return { status: false, data: { message: 'ocurio un error' } }
  }
}

export const post = async (url, data, hasToken = true) => {
  const headers = new Headers({ "Content-Type": "application/json" });
  if (hasToken) {
    const token = localStorage.getItem('access_token');
    headers.append('Authorization', `Bearer ${token}`);
  }
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers
    })
    const res = await responseParser(response)
    return res;
  } catch (error) {
    return { status: false, data: { message: 'ocurio un error' } }
  }
}

const responseParser = async (response) => {
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  if (response.ok) {
    return { status: true, data };
  }
  return { status: false, data }
}