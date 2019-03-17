const URL = 'http://localhost:3000/auth';

export const getAuth = async (accessToken: string) => {
  const result = await fetch(URL, {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  });
  const json = await result.json();
  const { hello } = json;
  return hello as string;
};
