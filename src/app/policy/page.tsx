import React from 'react';

const PolicyPage = () => {
  return (
    <div className='min-h-screen bg-gray-100 dark:bg-[#111827]'>
      <div className='container mx-auto py-8'>
        <h1 className='mb-6 text-2xl font-bold'>Privacy Policy for Splorite</h1>

        <div className='mb-6'>
          <h2 className='mb-2 text-lg font-bold'>1. Information We Collect</h2>
          <p>
            <span className='font-bold'>1.1 Personal Information:</span> When you create an account or use our services, we may collect personal information such as your name, email address, and other
            contact details. We may also collect payment information if you choose to subscribe to our premium features.
          </p>
          <p>
            <span className='font-bold'>1.2 Usage Information:</span> We may collect information about how you use our website and services, including your search queries, interactions with our
            content, and other usage data.
          </p>
        </div>

        <div className='mb-6'>
          <h2 className='mb-2 text-lg font-bold'>2. How We Use Your Information</h2>
          <p>
            <span className='font-bold'>2.1 Provide and Personalize Services:</span> We use your information to provide personalized learning experiences, generate relevant content, and improve our
            services.
          </p>
          <p>
            <span className='font-bold'>2.2 Communication:</span> We may use your email address to send you important updates, newsletters, and promotional offers related to our services. You can
            opt-out of marketing communications at any time.
          </p>
          <p>
            <span className='font-bold'>2.3 Billing and Payments:</span> If you subscribe to our premium features, we use your payment information to process and manage your subscription.
          </p>
        </div>

        <div className='mb-6'>
          <h2 className='mb-2 text-lg font-bold'>3. Data Sharing and Disclosure</h2>
          <p>
            <span className='font-bold'>3.1 Service Providers:</span> We may share your personal information with trusted third-party service providers who assist us in delivering our services. These
            providers are obligated to maintain the confidentiality and security of your information.
          </p>
          <p>
            <span className='font-bold'>3.2 Legal Requirements:</span> We may disclose your information if required by law, court order, or government regulation to comply with legal obligations and
            protect our rights, property, or safety.
          </p>
        </div>

        <div className='mb-6'>
          <h2 className='mb-2 text-lg font-bold'>4. Data Security</h2>
          <p>We employ industry-standard security measures to protect your information from unauthorized access, alteration, disclosure, or destruction.</p>
        </div>

        <div className='mb-6'>
          <h2 className='mb-2 text-lg font-bold'>5. Children's Privacy</h2>
          <p>
            Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe that we have inadvertently collected
            information from a child, please contact us, and we will take appropriate steps to remove the information.
          </p>
        </div>

        <div className='mb-6'>
          <h2 className='mb-2 text-lg font-bold'>6. Your Rights and Choices</h2>
          <p>You have the right to access, update, and delete your personal information. You can manage your account settings or contact us to exercise these rights.</p>
        </div>

        <div className='mb-6'>
          <h2 className='mb-2 text-lg font-bold'>7. Changes to this Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the updated policy on our website or through other communication channels.
          </p>
        </div>

        <div className='mb-6'>
          <h2 className='mb-2 text-lg font-bold'>8. Contact Us</h2>
          <p>If you have any questions or concerns regarding this Privacy Policy or our data practices, please contact us at support@splorite.com.</p>
        </div>

        <p className='text-sm'>
          This Privacy Policy is effective as of the day you sign up to splorite. By continuing to use our services, you acknowledge and agree to the terms outlined in this Privacy Policy.
        </p>

        <p className='text-sm'>Note: This is a sample privacy policy and should be reviewed and customized to meet your specific requirements and applicable laws.</p>
      </div>
    </div>
  );
};

export default PolicyPage;
