import { parseModules, parseString, parseSections, transformQuiz, addParagraphs } from '@/utils/helpers';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Configuration, OpenAIApi } from 'openai';
import { getUserPreference } from '../preferenceReducer';

const initialState = {
  topics: [] as any,
  isLoading: false,
  isCompleted: false,
  error: null as any,
  hasTyped: false,
  isExpandLoading: false,
  isCompletedExpand: false,
  expandedTopics: [] as any,
  detailedTopic: '' as any,
  isDetailedLoading: false,
  isCompletedDetailed: false,
  searchHistory: [] as any,
  expandedTopicTitle: null,
  isFetched: false,
  generatedQuiz: '' as any,
  generatedQuizLoading: false,
  generatedExamples: [] as any,
  generatedExamplesLoading: false,
};

const configuration = new Configuration({
  organization: 'org-iW0tOES3m75oHB2cx9IxyB8I',
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const isBrowser = typeof window !== 'undefined';
const isSubscribed = isBrowser ? Boolean(localStorage.getItem('isSubscribed')) : false;
// console.log('@@@####@@@###@@@####@@###', isSubscribed);

export const searchTopicAsync = createAsyncThunk('search/searchTopic', async (query: any) => {
  const preference = JSON.parse(localStorage.getItem('preference') as any);

  const completion = await openai.createCompletion({
    model: 'text-davinci-003',

    // prompt: `

    //     As an online educational tutor, your job is to help students learn and master topics in an organized and efficient manner. Your first task is to accept a search topic from a user, and break it down into smaller modules that are easier to study and understand. For example, if a student searched for "Introduction to Computer Science", you would need to break down the topic into modules such as "History of Computers", "Software Development", "Programming Languages", "Data Structures and Algorithms" and so on.

    // Your prompt is to provide the user with a well-organized and concise set of modules, that cover all the important topics related to their search query. Make sure to explain why each module is important and how it fits into the overall topic. Additionally, you may include resources such as textbooks, online courses, videos, and interactive exercises that will help the student learn and practice the concepts in each module.

    //     Break down the concept of ${query} into smaller modules for ${preference.difficultyLevel} learners. Please use the following format for each module:

    //   1. [Module name]: [short description].

    // For example:
    // 1. some module name here: and its description here.

    // Please provide a maximum of 7 modules and a brief description for each.
    // Note: Keep the module names and descriptions consistent and avoid changing them for each request.
    // `,
    prompt: `A student wants to learn about a ${query} , generate 6 modules that a student can use to learn as ${preference.difficultyLevel} . A module consists of a title and a description, separated by a colon.`,
    temperature: 1.4,
    top_p: 0.7,
    max_tokens: isSubscribed ? 120 : 60,
  });
  return parseString(completion.data.choices[0]?.text);
});

export const expandTopicAsync = createAsyncThunk('search/expandTopic', async (title: any, { getState }: any) => {
  const preference = JSON.parse(localStorage.getItem('preference') as any);
  const expandedTopic = getState().search.expandedTopics.find((topic: any) => topic.title === title);
  if (expandedTopic) {
    return expandedTopic.content;
  }
  const cachedData = localStorage.getItem(title);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  const searchQuery = localStorage.getItem('searchQuery');
  const completion = await openai.createCompletion({
    model: 'text-curie-001',
    // prompt: `Please provide a numbered list of subtopics for the concept of ${title}, focusing on the most important and basic concepts and ideas necessary for understanding ${title}. Use clear and concise language that is appropriate for ${preference.difficultyLevel} learners, and avoid any unnecessary technical jargon. Each subtopic should be accompanied by a brief description that provides a high-level overview of its content. Please number the subtopics in ascending order, starting from 1.    `,
    prompt: `Create an outline with 4 sections for teaching a student about ${title} in the context or scope of ${searchQuery} `,
    top_p: 0.5,
    max_tokens: isSubscribed ? 150 : 75,
  });
  const parsedData = parseSections(completion.data.choices[0]?.text);

  localStorage.setItem(title, JSON.stringify(parsedData));
  return parsedData;
});

// export const detailedTopic = createAsyncThunk('search/detailedTopic', async ({ title, query }: { title: any; query: any }) => {
// export const detailedTopic = createAsyncThunk('search/detailedTopic', async ({ title, query }: { title: string; query: string }) => {
export const detailedTopic = createAsyncThunk('search/detailedTopic', async ({ title, query }: { title: string; query: string }) => {
  const preference = JSON.parse(localStorage.getItem('preference') as any);

  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    //   prompt: `
    //   You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.
    //   Module Title: ${title}

    //   Introduction: In this module, we will explore the concept of ${title} in the context of ${query}. Provide a brief overview of the concept.

    //   Description: Explain the concept in detail, catering to ${difficultyLevel} learners. Focus on the most essential aspects, using simple and clear language. Avoid unnecessary technical jargon and maintain consistency in the sub-components you address.

    //   Examples:

    //   - Include relevant examples when applicable, such as mathematical equations, chemical symbols, organic chemistry structures, or coding samples in various programming languages.

    // Conclusion: Summarize the key points of the explanation and provide any additional insights or tips that might be helpful for learners.
    //   `,

    prompt: `
Teach a student about the  topic ${title} and subtopic ${query} and by writing paragraphs as ${preference.difficultyLevel} learner
        `,

    //     prompt: `
    //     You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown. Explain the concept ${title} in the context of the topic ${query} in great detail for ${preference.difficultyLevel} learners. Focus on the most essential aspects. Please use simple and clear language, and avoid any unnecessary technical jargon. Note: Be consistent with the sub-component you are breaking down and do not change it upon every request.

    //     Format the output results as follows:

    //     1. Module Title: ${title}
    //     2. Introduction: Provide a brief overview of the concept in the context of ${query}.
    //     3. Description: Explain the concept in detail, catering to ${preference.difficultyLevel} learners. Focus on the most essential aspects, using simple and clear language. Avoid unnecessary technical jargon and maintain consistency in the sub-components you address.
    //     4. Examples: Include relevant examples when applicable, using appropriate formatting:

    //        - Mathematical equations using LaTeX format:
    //          * Inline equation: \`$E = mc^2$\`
    //          * Displayed equation: \`$$\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$\`

    //        - Chemical symbols and equations:
    //          * Chemical symbols: \`H₂O, CO₂, NH₃\`
    //          * Chemical equations: \`2H₂ + O₂ → 2H₂O\`

    //        - Coding samples in various programming languages. Use appropriate Markdown formatting for code examples, like:
    //          \```python
    //          def example_function():
    //              pass
    //          \```

    //     5. Conclusion: Summarize the key points of the explanation and provide any additional insights or tips that might be helpful for learners.

    // `,

    temperature: 1,
    top_p: 0.5,

    max_tokens: isSubscribed ? 300 : 100,
  });

  return completion.data.choices[0]?.text;
});

export const generateQuizOnTopic = createAsyncThunk('search/generateQuizOnTopic', async ({ title, query }: { title: string; query: string }) => {
  const completion = await openai.createCompletion({
    model: 'text-davinci-002',

    prompt: `
    Please create 5 trivia questions about the topic "${title}" within the context of "${query}". Use the following format:
    1.Question 1
    2.Question 2
    3.Question 3
    4.Question 4
    5.Question 5
    Make sure you understand the given context while generating the questions.
    `,
    // prompt: `Generate 5 quizzes and show answers on each on the topic of ${title} in the scope of ${query}. Each quiz should consist of 5 multiple-choice questions with 4 answer options each. Please ensure that the questions and answers are clear, concise, and easy to understand. The quizzes should be suitable for a beginner-level learner and should cover the most important concepts and ideas related to the topic. For each question, include the correct answer directly in the question stem, like this: "What is the capital of France? A) Paris B) London C) Madrid D) Berlin". Note: Please be consistent with the sub-component you are breaking down and do not change it upon every request.`,

    temperature: 0.7,

    max_tokens: isSubscribed ? 100 : 50,
    n: 1,
  });
  // console.log('try questions', completion.data.choices[0].text);
  return completion.data.choices[0].text;
  // return transformQuiz(completion.data.choices[0].text);
  // return parseModules(completion.data.choices[0]?.text);
});

export const generateExamples = createAsyncThunk('search/generateExamples', async ({ title, query }: { title: string; query: string }) => {
  const preference = JSON.parse(localStorage.getItem('preference') as any);

  const completion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown. Provide three practical examples of ${title} in the context of ${query}, suitable for ${preference.difficultyLevel} learners. Use simple language and avoid technical jargon. Your examples should demonstrate how these concepts are applied in real-world scenarios, and should focus on basic concepts that are essential for understanding ${query}`,
    temperature: 0.7,
    max_tokens: 100,
    n: 1,
  });

  return completion.data.choices[0]?.text;
});

export const userTypedSearch = () => {
  return { type: 'search/userTyped' };
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    userTyped: (state) => {
      state.hasTyped = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchTopicAsync.pending, (state) => {
        state.isLoading = true;
        state.isCompleted = !state.isCompleted;
      })
      .addCase(searchTopicAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topics = action.payload;
      })
      .addCase(searchTopicAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(expandTopicAsync.pending, (state) => {
        state.isExpandLoading = true;
        state.isCompletedExpand = !state.isCompleted;
      })
      .addCase(expandTopicAsync.fulfilled, (state, action) => {
        state.isExpandLoading = false;
        state.expandedTopics = action.payload;
      })
      .addCase(expandTopicAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(detailedTopic.pending, (state) => {
        state.isDetailedLoading = true;
      })
      .addCase(detailedTopic.fulfilled, (state, action) => {
        state.isDetailedLoading = false;
        state.detailedTopic = action.payload;
      })
      .addCase(detailedTopic.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(generateQuizOnTopic.pending, (state) => {
        state.isLoading = true;
        state.generatedQuiz = null;
        state.generatedQuizLoading = true;
      })
      .addCase(generateQuizOnTopic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.generatedQuiz = action.payload;
        state.generatedQuizLoading = false;
      })
      .addCase(generateQuizOnTopic.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.generatedQuizLoading = false;
      })
      .addCase(generateExamples.pending, (state) => {
        state.generatedExamplesLoading = true;
      })
      .addCase(generateExamples.fulfilled, (state, action) => {
        state.generatedExamplesLoading = false;
        state.generatedExamples = action.payload;
      })
      .addCase(generateExamples.rejected, (state, action) => {
        state.generatedExamplesLoading = false;
        state.error = action.error.message;
      });
  },
});

export default searchSlice.reducer;
