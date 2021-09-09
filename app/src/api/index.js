const URL_API = 'https://localhost:3000/auth/';

const loginUser = async (provider = 'local') => {
  try {
    const res = await fetch(URL_API + 'singin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        email: 'test4@gmail.com',
        password: '22222',
      }),
    });
    console.log(res);
    if (!res.ok) {
      const errorMessage = { status: res.status, statusText: res.statusText };
      throw errorMessage;
    }

    const json = await res.json();
    console.log(json);
    return json;
  } catch (error) {
    return console.log(error);
  }
};

export default loginUser;
