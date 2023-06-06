import React from 'react';

const HelpPage = () => {
  return (
    <div className='min-h-screen bg-gray-100 dark:bg-[#111827]'>
      <div className='container mx-auto py-8'>
        <h1 className='mb-6 text-4xl font-semibold'>Help Page for Splorite 🛟</h1>

        {/* Getting Started with Splorite */}
        <section className='mb-8'>
          <h2 className='mb-4 text-2xl font-semibold'>1. Getting Started with Splorite</h2>
          <ul className='list-disc pl-6'>
            <li className='mb-2'>Log in: When you first access the Splorite website you will automatically be logged in</li>
          </ul>
        </section>
        <section className='mb-8'>
          <h2 className='mb-4 text-2xl font-semibold'>2. Navigating Splorite </h2>
          <ul className='list-disc pl-6'>
            <li className='mb-2'>
              Search: Use the search bar to enter a topic, keyword, or question you'd like to learn about. The AI will generate personalized modules, examples, and questions related to your search
              query.
            </li>
            <li className='mb-2'>
              Chat section: Engage with the AI chatbot by typing your questions or topics into the chat interface. The chatbot will provide answers and engage in conversations about the subject
              matter.
            </li>
            <li className='mb-2'>Example section: Browse the example section for real-world examples, case studies, and illustrations related to your learning topics.</li>
            <li className='mb-2'>Settings: Manage your account settings, preferences, and subscription plan by clicking on your profile icon and selecting "My Account" from the dropdown menu.</li>
          </ul>
        </section>
        <section className='mb-8'>
          <h2 className='mb-4 text-2xl font-semibold'>3. Troubleshooting</h2>
          <ul className='list-disc pl-6'>
            <li className='mb-2'>Slow loading times: If you're experiencing slow loading times or difficulty accessing content, try refreshing the page or clearing your browser cache. </li>
            <li className='mb-2'>
              Chatbot not responding: If the AI chatbot is not responding or providing inaccurate information, ensure your query is clear and concise, or try rephrasing the question.{' '}
            </li>

            <li className='mb-2'>Error messages: If you encounter any error messages, take note of the error code or message, and contact our support team for assistance. </li>
          </ul>
        </section>
        <section className='mb-8'>
          <h2 className='mb-4 text-2xl font-semibold'>4. Subscription and Billing</h2>
          <ul className='list-disc pl-6'>
            <li className='mb-2'>Upgrading to Premium: To upgrade to the Splorite Premium plan, navigate to your account settings, click "Account Billing," and subscribe. </li>
            <li className='mb-2'>Canceling your subscription: To cancel your subscription, go to your account settings, click "Account Billing," and click on cancel your plan. </li>

            <li className='mb-2'>Billing inquiries: For any billing-related questions or concerns, please contact our support team.</li>
          </ul>
        </section>
        <section className='mb-8'>
          <h2 className='mb-4 text-2xl font-semibold'>5. Contact Us</h2>
          <ul className='list-disc pl-6'>
            <li className='mb-2'>Email: support@splorite.com </li>

            <li className='mb-2'>Social media: Connect with us on our social media channels for updates, news, and additional support. </li>
          </ul>
        </section>
        {/* Navigating Splorite */}
        {/* ... */}

        {/* Troubleshooting */}
        {/* ... */}

        {/* Subscription and Billing */}
        {/* ... */}

        {/* Contact Us */}
        {/* ... */}
      </div>
    </div>
  );
};

export default HelpPage;
