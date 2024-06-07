import { getToken } from './functions';

export const API = async ({ endpoint, method, body }) => {
  try {
    const headers = {};

    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (body && !(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(endpoint, {
      method,
      headers,
      body: body instanceof FormData ? body : JSON.stringify(body)
    });

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Expected json response, but received something else');
    }

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(
        `Error en la solicitud: ${res.status} ${res.statusText}. ${errorMessage}`
      );
    }

    const jsonResponse = await res.json();
    return jsonResponse;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw new Error(`Hubo un problema al procesar la solicitud`);
  }
};
