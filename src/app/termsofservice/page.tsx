import React from 'react';

const TermOfService = () => {
  return (
    <div className='min-h-screen bg-gray-100 dark:bg-[#111827]'>
      <div className='container mx-auto py-8'>
        <h1 className='mb-6 text-2xl font-bold'>Terms of Service</h1>

        <div className='mb-6'>
          <h2 className='mb-2 text-lg font-bold'>1. Acceptance of Terms</h2>
          <p>
            By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with these terms, please do not use our
            services.
          </p>
        </div>

        <div className='mb-6'>
          <h2 className='mb-2 text-lg font-bold'>2. Use of Services</h2>
          <p>
            You may use our services for personal, non-commercial purposes, subject to these Terms of Service. You agree not to use our services for any illegal or unauthorized purpose and to comply
            with all applicable laws and regulations.
          </p>
        </div>

        <div className='mb-6'>
          <h2 className='mb-2 text-lg font-bold'>3. Intellectual Property</h2>
          <p>
            The content and materials provided through our services, including text, graphics, images, and software, are owned by or licensed to us and are protected by intellectual property laws. You
            may not modify, reproduce, distribute, or create derivative works based on such content without our prior written consent.
          </p>
        </div>

        <div className='mb-6'>
          <h2 className='mb-2 text-lg font-bold'>4. Privacy</h2>
          <p>
            We respect your privacy and handle your personal information in accordance with our Privacy Policy. By using our services, you consent to the collection, use, and disclosure of your
            information as described in the Privacy Policy.
          </p>
        </div>

        <div className='mb-6'>
          <h2 className='mb-2 text-lg font-bold'>5. Limitation of Liability</h2>
          <p>
            In no event shall we be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with the use of our services or the inability to use
            our services, even if we have been advised of the possibility of such damages.
          </p>
        </div>

        <div className='mb-6'>
          <h2 className='mb-2 text-lg font-bold'>6. Indemnification</h2>
          <p>
            You agree to indemnify and hold us harmless from any claims, losses, liabilities, and expenses (including attorney's fees) arising out of or in connection with your use of our services or
            any violation of these Terms of Service.
          </p>
        </div>

        <div className='mb-6'>
          <h2 className='mb-2 text-lg font-bold'>7. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of [your jurisdiction]. Any disputes arising out of or in connection with these terms shall be subject
            to the exclusive jurisdiction of the courts in [your jurisdiction].
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermOfService;
