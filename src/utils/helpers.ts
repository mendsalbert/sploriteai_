import { v4 as uuid } from 'uuid';
export interface ParsedString {
  id: number;
  title: string;
  description: string;
}

interface SubComponent {
  id: number;
  name: string;
  description: string;
}

interface Module {
  id: number;
  name: string;
  subComponents: SubComponent[];
}

// export function parseString(str: any): ParsedString[] {
//   const regex = /^(\d+)\. (.+): (.+)$/gm;
//   const matches = str.matchAll(regex);
//   const results: ParsedString[] = [];

//   for (const match of matches as any) {
//     const [_, id, title, description] = match;
//     results.push({ id: parseInt(id), title, description });
//   }

//   return results;
// }

export function parseString(str: any): ParsedString[] {
  const regex1 = /^(\d+)\. (.+): (.+)$/gm;
  const regex2 = /^(\d+)\. (.+)\n\n(.+)/gm;
  const matches1 = str.matchAll(regex1);
  const matches2 = str.matchAll(regex2);
  const results: ParsedString[] = [];

  // Case 1
  for (const match of matches1) {
    const [_, id, title, description] = match;
    results.push({ id: parseInt(id), title, description });
  }

  // Case 2
  for (const match of matches2) {
    const [_, id, title, description] = match;
    results.push({ id: parseInt(id), title: title.trim(), description: description.trim() });
  }

  // Case 3
  if (results.length === 0) {
    const regex3 = /^(\d+)\. (.+)\n\n(.+)/gm;
    const matches3 = str.matchAll(regex3);
    let id = 1;
    for (const match of matches3) {
      const [_, title, description] = match;
      results.push({ id: id, title: title.trim(), description: description.trim() });
      id++;
    }
  }

  return results;
}

export function addParagraphs(str: any) {
  // Split the string into separate sentences
  const sentences = str.split('. ');

  // Initialize an empty string to store the paragraphs
  let result = '';

  // Loop through each sentence and add it to the current paragraph
  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    result += sentence + '. ';

    // If the current paragraph has reached 3 sentences, add a paragraph tag
    if ((i + 1) % 3 === 0) {
      result += '\n\n';
    }
  }

  // Return the result with the paragraph tags added
  return result;
}

export function estimateReadTime(paragraph: string) {
  const wordsPerMinute = 200;
  const words = paragraph.split(' ').length;
  const minutes = words / wordsPerMinute;
  const readTime = Math.ceil(minutes);

  return readTime;
}

export function parseModules(input: any): Module[] {
  const lines = input.split('\n');
  const modules: Module[] = [];
  let moduleId = 0;
  let subComponentId = 0;
  let currentModule: Module | null = null;
  let currentSubComponent: SubComponent | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) {
      continue; // Ignore empty lines
    }
    if (trimmedLine.endsWith(':')) {
      // We're parsing a module name
      currentModule = {
        id: ++moduleId,
        name: trimmedLine.slice(0, -1),
        subComponents: [],
      };
      modules.push(currentModule);
      currentSubComponent = null;
    } else if (trimmedLine.startsWith('- ')) {
      // We're parsing a sub-component name
      if (!currentModule) {
        throw new Error('Sub-component found before any module');
      }
      currentSubComponent = {
        id: ++subComponentId,
        name: trimmedLine.slice(2),
        description: '',
      };
      currentModule.subComponents.push(currentSubComponent);
    } else if (currentSubComponent) {
      // We're parsing a sub-component description
      currentSubComponent.description += line + '\n';
    } else {
      // We're parsing a module description
      if (!currentModule) {
        throw new Error('Module description found before any module');
      }
      currentModule.name += '\n' + line;
    }
  }
  return modules;
}

export function transformObjectToArray(obj: any) {
  return Object?.entries(obj).map(([key, value]) => ({
    id: key,
    title: value,
    description: value,
    // id: key,
    // query: value,
    // results: value,
  }));
}

interface Section {
  title: string;
  content: string;
}

export function parseSections(text: any): Section[] {
  const lines = text.trim().split('\n');

  const sections: Section[] = [];
  let currentTitle: string | null = null;
  let currentContent: string | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (/^\d+\. /.test(trimmedLine)) {
      if (currentTitle !== null && currentContent !== null) {
        sections.push({ title: currentTitle, content: currentContent });
      }

      currentTitle = trimmedLine.slice(trimmedLine.indexOf(' ') + 1);
      currentContent = '';
    } else if (currentTitle !== null) {
      if (currentContent !== null) {
        currentContent += '\n';
      }

      currentContent += trimmedLine;
    }
  }

  if (currentTitle !== null && currentContent !== null) {
    sections.push({ title: currentTitle, content: currentContent });
  }

  return sections;
}

export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export const transformQuiz = (literalString: any): Question[] => {
  // Step 1: Split the literal string into an array of individual questions
  const questionStrings = literalString.split('\n\n');

  // Step 2: Create an empty array to store the converted questions
  const convertedQuestions: Question[] = [];

  // Step 3: Loop through the array of questions
  for (let i = 0; i < questionStrings.length; i++) {
    // Step 3a: Create a new question object
    const newQuestion: Question = { question: '', options: [], answer: '' };

    // Step 3b: Use string manipulation to extract the question, options, and answer from each string
    const questionParts = questionStrings[i].split('\n');
    newQuestion.question = questionParts[0].slice(3).trim(); // remove the question number and "What is"
    newQuestion.answer = questionParts[questionParts.length - 1].slice(9).trim(); // remove "Answer: " and the space
    newQuestion.options = questionParts
      .slice(1, questionParts.length - 1) // get the options only
      .map((option: any) => option.slice(3)) // remove the option letter and the space
      .map((option: any) => option.trim()); // remove any remaining whitespace

    // Step 3c: Assign the extracted values to the properties of the new question object
    convertedQuestions.push(newQuestion);
  }

  // Step 4: Remove the extra empty array if it exists
  if (convertedQuestions.length > 0 && convertedQuestions[convertedQuestions.length - 1].question === '') {
    convertedQuestions.pop();
  }

  // Step 5: Return the array of converted questions
  return convertedQuestions;
};

// export function convertDataToObject(data: any) {
//   // Split the data by newline character
//   const dataArray = data.split('\n');

//   // Initialize an empty array to store objects
//   const objectArray = [];

//   // Loop through each line of data
//   for (let i = 0; i < dataArray.length; i++) {
//     // Split each line by comma
//     const lineArray = dataArray[i].split(',');

//     // Extract the name and prompt query from the line
//     const name = lineArray[0].replace(/"/g, '');
//     const query = lineArray[1]?.replace(/"/g, '');

//     // Create an object with the name and prompt query and push it to the object array
//     objectArray.push({ name, query });
//   }

//   // Return the object array
//   return objectArray;
// }

// export function convertDataToObject(data: any) {
//   const dataArray = data.split('\n');
//   const resultArray = [] as any;

//   dataArray.forEach((item: any) => {
//     const itemArray = item.split(',');
//     const id = uuid(); // Generate a unique ID for each item
//     const name = itemArray[0].slice(1, -1); // Remove the quotes
//     const description = name.toLowerCase() + ' mode'; // Generate a description based on the name
//     const content = itemArray[1]?.slice(1, -1); // Remove the quotes
//     const model = 'modelgtp.3'; // Set the model to a default value
//     const folderId = uuid(); // Set the folder ID to null

//     const newItem = { id, name, description, content, model, folderId };
//     resultArray.push(newItem);
//   });

//   return resultArray;
// }

// export function convertDataToObject(data: any) {
//   const dataArray = data.split('\n');
//   const resultArray = [] as any;

//   const getRandomColor = () => {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

//   dataArray.forEach((item: any) => {
//     const itemArray = item.split(',');
//     const id = uuid(); // Generate a unique ID for each item
//     const name = itemArray[0].slice(1, -1); // Remove the quotes
//     const description = name.toLowerCase() + ' mode'; // Generate a description based on the name
//     const content = itemArray[1]?.slice(1, -1); // Remove the quotes
//     const model = 'modelgtp.3'; // Set the model to a default value
//     const folderId = null; // Set the folder ID to null
//     const color = getRandomColor(); // Get a random color for the object

//     const newItem = { id, name, description, content, model, folderId, color };
//     // Check if any field is empty before adding to the result array
//     if (Object.values(newItem).every((value) => value !== '')) {
//       resultArray.push(newItem);
//     }
//   });

//   return resultArray;
// }
// export function convertDataToObject(data: any) {
//   // Split the data into individual prompts
//   const prompts = data.split('\n');

//   // Define an array to store the converted objects
//   const objects = [] as any;

//   // Loop through each prompt
//   prompts.forEach((prompt: any) => {
//     // Split the prompt into its components
//     const components = prompt.split('","');

//     // Extract the values for each component
//     const name = components[0].replace('"', '');
//     const description = name + ' mode';
//     const content = components[1]?.replace('"', '').replace('\\', '');
//     const model = 'modelgtp.3'; // default model value
//     const folderId = uuid(); // generate a unique ID for the folder

//     // Create an object with the extracted values
//     const obj = {
//       id: uuid(),
//       name,
//       description,
//       content,
//       model,
//       folderId,
//     };

//     // Add the object to the array
//     objects.push(obj);
//   });

//   // Return the array of objects
//   return objects;
// }

export function convertDataToObject(data: any) {
  // Split the data into individual prompts
  const prompts = data.split('\n');

  // Define an array to store the converted objects
  const objects = [] as any;

  // Loop through each prompt
  prompts.forEach((prompt: any) => {
    // Split the prompt into its components
    const components = prompt.split('","');

    // Extract the values for each component
    const name = components[0]?.replace('"', '');
    const description = name + ' mode';
    const content = components[1]?.replace('"', '').replace('\\', '');
    const model = 'modelgtp.3'; // default model value
    const folderId = uuid(); // generate a unique ID for the folder

    // Create an object with the extracted values
    const obj = {
      id: uuid(),
      name,
      description,
      content,
      model,
      folderId,
      color: '#' + Math.floor(Math.random() * 16777215).toString(16), // generate a random color
    };

    // Check if any property of the object is empty, and skip if it is
    let empty = false;
    Object.values(obj).forEach((value) => {
      if (!value) {
        empty = true;
      }
    });

    // Add the object to the array if it is not empty
    if (!empty) {
      objects.push(obj);
    }
  });

  // Return the array of objects
  return objects;
}

export function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
