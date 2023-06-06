import { handleAuth } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res);
    } catch (error) {
      console.error('Error during authentication callback:', error);

      if (error.message === 'Please verify your email before logging in.') {
        // Perform the redirection using Next.js routing
        const router = useRouter();
        router.push('/verify-email'); // Replace with your desired page URL
      } else {
        // Handle other errors accordingly
        res.status(500).end('Internal Server Error');
      }
    }
  },
});
