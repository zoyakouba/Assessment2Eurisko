import { MockMethod } from 'vite-plugin-mock';

import { generateResponse, generateToken } from '../../mock/mock.util';

const mock: MockMethod[] = [
  {
    url: '/api/login',
    method: 'post',
    timeout: 2000,
    response: ({ body }: { body: { email: string; password: string } }) => {
      if (body) {
        const { email, password } = body;
        if (email === 'academy@gmail.com' && password === 'academy123') {
          const expiresIn = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365; // 1 year
          const accessToken = generateToken({ email, password, expiresIn });

          return generateResponse({ expiresIn, accessToken });
        }

        return generateResponse({}, 401, 'Invalid Credentials!');
      }
      return generateResponse({}, 500, 'Server Error!');
    },
  },
];
export default mock
