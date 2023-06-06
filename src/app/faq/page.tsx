import React from 'react';
const FAQ = () => {
  return (
    <div className=' mx-4 mt-10 mb-4  space-y-4 sm:mx-24'>
      <details className='group border-l-4 border-green-500 bg-[#ffffff] p-6 dark:bg-gray-800 dark:text-gray-100' open>
        <summary className='flex cursor-pointer items-center justify-between'>
          <h5 className='text-lg font-medium text-gray-900 dark:text-gray-100'>What is Splorite?</h5>

          <span className='ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-45' viewBox='0 0 20 20' fill='currentColor'>
              <path fill-rule='evenodd' d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z' clip-rule='evenodd' />
            </svg>
          </span>
        </summary>

        <p className='mt-4 leading-relaxed text-gray-700 dark:text-gray-300'>
          Splorite is an AI-powered education platform that personalizes learning experiences for users. It allows users to search for any topic, which is then broken down into simple,
          easy-to-understand modules. Splorite also offers video and image generation content, example sections, and a chat section with an AI chatbot for interactive learning on any topic.
        </p>
      </details>
      <details className='group border-l-4 border-green-500 bg-gray-50 p-6 dark:bg-gray-800'>
        <summary className='flex cursor-pointer items-center justify-between'>
          <h5 className='text-lg font-medium text-gray-900 dark:text-gray-200'>How do I get started with Splorite?</h5>

          <span className='ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-45' viewBox='0 0 20 20' fill='currentColor'>
              <path fill-rule='evenodd' d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z' clip-rule='evenodd' />
            </svg>
          </span>
        </summary>

        <p className='mt-4 leading-relaxed  text-gray-700 dark:text-gray-300'>
          To get started with Splorite, simply visit the website and sign up for an account. Once you have registered, you can start exploring topics, engaging with the chatbot, and taking advantage
          of the personalized learning experience.
        </p>
      </details>
      <details className='group border-l-4 border-green-500 bg-gray-50 p-6 dark:bg-gray-800'>
        <summary className='flex cursor-pointer items-center justify-between'>
          <h5 className='text-lg font-medium text-gray-900 dark:text-gray-200'>How does Splorite personalize learning experiences?</h5>

          <span className='ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-45' viewBox='0 0 20 20' fill='currentColor'>
              <path fill-rule='evenodd' d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z' clip-rule='evenodd' />
            </svg>
          </span>
        </summary>

        <p className='mt-4 leading-relaxed  text-gray-700 dark:text-gray-300'>
          Splorite uses AI algorithms to understand each user's learning style, preferences, and knowledge gaps. By analyzing user interactions, it tailors content, examples, and questions to meet the
          individual's needs, providing a truly personalized learning experience.
        </p>
      </details>

      <details className='group border-l-4 border-green-500 bg-gray-50 p-6 dark:bg-gray-800'>
        <summary className='flex cursor-pointer items-center justify-between'>
          <h5 className='text-lg font-medium text-gray-900 dark:text-gray-200'>Is Splorite suitable for all age groups and educational levels?</h5>

          <span className='ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-45' viewBox='0 0 20 20' fill='currentColor'>
              <path fill-rule='evenodd' d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z' clip-rule='evenodd' />
            </svg>
          </span>
        </summary>

        <p className='mt-4 leading-relaxed  text-gray-700 dark:text-gray-300'>
          Yes, Splorite caters to users of all age groups and educational levels. Its adaptive learning system can accommodate the needs of different users, from children to adults, and beginners to
          advanced learners.{' '}
        </p>
      </details>

      <details className='group border-l-4 border-green-500 bg-gray-50 p-6 dark:bg-gray-800'>
        <summary className='flex cursor-pointer items-center justify-between'>
          <h5 className='text-lg font-medium text-gray-900 dark:text-gray-200'>Can I access Splorite on multiple devices? </h5>

          <span className='ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-45' viewBox='0 0 20 20' fill='currentColor'>
              <path fill-rule='evenodd' d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z' clip-rule='evenodd' />
            </svg>
          </span>
        </summary>

        <p className='mt-4 leading-relaxed  text-gray-700 dark:text-gray-300'>
          Yes, Splorite is designed to be accessible on various devices, including desktops, laptops, tablets, and smartphones. This allows users to learn on the go and at their own convenience.
        </p>
      </details>

      <details className='group border-l-4 border-green-500 bg-gray-50 p-6 dark:bg-gray-800'>
        <summary className='flex cursor-pointer items-center justify-between'>
          <h5 className='text-lg font-medium text-gray-900 dark:text-gray-200'>How does the video and image generation content work?</h5>

          <span className='ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-45' viewBox='0 0 20 20' fill='currentColor'>
              <path fill-rule='evenodd' d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z' clip-rule='evenodd' />
            </svg>
          </span>
        </summary>

        <p className='mt-4 leading-relaxed  text-gray-700 dark:text-gray-300'>
          Splorite's video and image generation feature uses AI algorithms to generate relevant visual content for the topics users are learning. This helps to enrich the learning experience and
          provide better understanding through visual aids.{' '}
        </p>
      </details>

      <details className='group border-l-4 border-green-500 bg-gray-50 p-6 dark:bg-gray-800'>
        <summary className='flex cursor-pointer items-center justify-between'>
          <h5 className='text-lg font-medium text-gray-900 dark:text-gray-200'>How does the AI chatbot work in the chat section?</h5>

          <span className='ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-45' viewBox='0 0 20 20' fill='currentColor'>
              <path fill-rule='evenodd' d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z' clip-rule='evenodd' />
            </svg>
          </span>
        </summary>

        <p className='mt-4 leading-relaxed  text-gray-700 dark:text-gray-300'>
          The AI chatbot in the chat section is designed to engage users in interactive learning by answering questions and discussing topics in a conversational manner. It uses natural language
          processing and machine learning algorithms to understand user queries and provide accurate and relevant responses.
        </p>
      </details>

      <details className='group border-l-4 border-green-500 bg-gray-50 p-6 dark:bg-gray-800'>
        <summary className='flex cursor-pointer items-center justify-between'>
          <h5 className='text-lg font-medium text-gray-900 dark:text-gray-200'>Is Splorite free to use?</h5>

          <span className='ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-45' viewBox='0 0 20 20' fill='currentColor'>
              <path fill-rule='evenodd' d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z' clip-rule='evenodd' />
            </svg>
          </span>
        </summary>

        <p className='mt-4 leading-relaxed  text-gray-700 dark:text-gray-300'>
          Splorite offers a basic version that allows users to experience the platform with 15 free search queries. Once the free queries have been used, users can continue to access the platform by
          subscribing to the Splorite Premium plan at $9.99 per month.{' '}
          <a href='/subscription' className='text-green-500 underline'>
            The Premium plan{' '}
          </a>{' '}
          includes additional features such as live Google search integration in the chat section, picture-to-text input for the chat section, access to videos and images for course content, and
          access to all other available features.{' '}
        </p>
      </details>

      <details className='group border-l-4 border-green-500 bg-gray-50 p-6 dark:bg-gray-800'>
        <summary className='flex cursor-pointer items-center justify-between'>
          <h5 className='text-lg font-medium text-gray-900 dark:text-gray-200'>How can I get help or support if I have any issues with Splorite?</h5>

          <span className='ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-45' viewBox='0 0 20 20' fill='currentColor'>
              <path fill-rule='evenodd' d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z' clip-rule='evenodd' />
            </svg>
          </span>
        </summary>

        <p className='mt-4 leading-relaxed  text-gray-700 dark:text-gray-300'>
          If you need assistance or have any concerns, you can contact Splorite's customer support team through the website or email. Additionally, you can check the help section or user guides for
          troubleshooting tips and useful information.
        </p>
      </details>
      <details className='group border-l-4 border-green-500 bg-gray-50 p-6 dark:bg-gray-800'>
        <summary className='flex cursor-pointer items-center justify-between'>
          <h5 className='text-lg font-medium text-gray-900 dark:text-gray-200'>I haven't received the verification email. What should I do?</h5>

          <span className='ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-45' viewBox='0 0 20 20' fill='currentColor'>
              <path fill-rule='evenodd' d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z' clip-rule='evenodd' />
            </svg>
          </span>
        </summary>

        <p className='mt-4 leading-relaxed  text-gray-700 dark:text-gray-300'>
          <ol>
            <li>
              1. Check your spam or junk folder: Sometimes, the verification email might be filtered as spam by your email provider. Take a look in your spam or junk folder to see if the email landed
              there.
            </li>
            <br />
            <li>
              2. Verify your email address: Ensure that the email address you provided during the registration process is correct. If you suspect you entered the wrong email, please reach out to our
              support team to update your email address.
            </li>
          </ol>
        </p>
      </details>
    </div>
  );
};

export default FAQ;
