const URL = 'http://localhost:3000';

export const getHello = async () => {
  const result = await fetch(URL);
  const json = await result.json();
  const { hello } = json;
  return hello as string;
};
