import { ERROR_MESSAGES } from '@/constants';

export const get = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.SERVER_ERROR);
  }

  const responseData = await response.json();

  return responseData;
};

export const post = async <Req, Res>(url: string, data: Req): Promise<Res> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(`Request failed with status ${responseData.status}`);
  }

  return responseData as Res;
};

export const put = async <T>(url: string, data: T): Promise<void> => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const responseData = await response.json();
    throw new Error(`Request failed with status ${responseData.status}`);
  }
};

export const patch = async <Req, Res>(url: string, data: Req): Promise<Res> => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(`Request failed with status ${responseData.status}`);
  }

  return responseData;
};

export const remove = async (url: string): Promise<void> => {
  const response = await fetch(url, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const responseData = await response.json();
    throw new Error(`Request failed with status ${responseData.status}`);
  }
};
