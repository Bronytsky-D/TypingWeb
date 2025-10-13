import { Lesson } from "../modules/interfaces/lesson";

export const LESSONS: Lesson[] = [
  // ==============================
  // 1–10: Home row letter pairs
  // ==============================
  {
    id: 1,
    title: 'Letter Pair: F and J',
    description: 'Practice index fingers on F and J.',
    keys: ['f', 'j'],
    language: 'en'
  },
  {
    id: 2,
    title: 'Друкуємо букви: А та О',
    description: 'Тренування вказівних пальців на літери А і О.',
    keys: ['а', 'о'],
    language: 'uk'
  },
  {
    id: 3,
    title: 'Letter Pair: D and K',
    description: 'Practice middle fingers on D and K.',
    keys: ['d', 'k'],
    language: 'en'
  },
  {
    id: 4,
    title: 'Друкуємо букви: В та Л',
    description: 'Тренування середніх пальців на літери В і Л.',
    keys: ['в', 'л'],
    language: 'uk'
  },
  {
    id: 5,
    title: 'Letter Pair: S and L',
    description: 'Practice ring fingers on S and L.',
    keys: ['s', 'l'],
    language: 'en'
  },
  {
    id: 6,
    title: 'Друкуємо букви: І та Д',
    description: 'Тренування безіменних пальців на літери І і Д.',
    keys: ['і', 'д'],
    language: 'uk'
  },
  {
    id: 7,
    title: 'Letter Pair: A and ;',
    description: 'Practice pinky fingers on A and ;',
    keys: ['a', ';'],
    language: 'en'
  },
  {
    id: 8,
    title: 'Друкуємо букви: Ф та Ж',
    description: 'Тренування мізинців на літери Ф і Ж.',
    keys: ['ф', 'ж'],
    language: 'uk'
  },
  {
    id: 9,
    title: 'Letter Pair: G and H',
    description: 'Practice index fingers on G and H.',
    keys: ['g', 'h'],
    language: 'en'
  },
  {
    id: 10,
    title: 'Друкуємо букви: П та Р',
    description: 'Тренування вказівних пальців на літери П і Р.',
    keys: ['п', 'р'],
    language: 'uk'
  },

  {
    id: 11,
    title: 'Combo: F, J, D, K',
    description: 'Combine index and middle finger keys.',
    keys: ['f', 'j', 'd', 'k'],
    language: 'en'
  },
  {
    id: 12,
    title: 'Комбінація: А, О, В, Л',
    description: 'Комбіноване тренування вказівних і середніх пальців.',
    keys: ['а', 'о', 'в', 'л'],
    language: 'uk'
  },
  {
    id: 13,
    title: 'Combo: S, L, A, ;',
    description: 'Combine ring and pinky finger keys.',
    keys: ['s', 'l', 'a', ';'],
    language: 'en'
  },
  {
    id: 14,
    title: 'Комбінація: І, Д, Ф, Ж',
    description: 'Комбіноване тренування безіменних і мізинців.',
    keys: ['і', 'д', 'ф', 'ж'],
    language: 'uk'
  },
  {
    id: 15,
    title: 'Home Row Practice',
    description: 'Practice all home row keys in sequence.',
    keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
    language: 'en'
  },
  {
    id: 16,
    title: 'Практика домашнього ряду',
    description: 'Тренуйте всі клавіші домашнього ряду по порядку.',
    keys: ['ф', 'і', 'в', 'а', 'р', 'п', 'о', 'л', 'д', 'ж'],
    language: 'uk'
  },
  {
    id: 17,
    title: 'Home Row Sentences',
    description: 'Type sentences using only home row letters.',
    keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
    language: 'en'
  },
  {
    id: 18,
    title: 'Речення домашнього ряду',
    description: 'Друкуйте речення лише з літер домашнього ряду.',
    keys: ['ф', 'і', 'в', 'а', 'р', 'п', 'о', 'л', 'д', 'ж'],
    language: 'uk'
  },

  {
    id: 19,
    title: 'Letter Pair: R and U',
    description: 'Practice index fingers on R and U.',
    keys: ['r', 'u'],
    language: 'en'
  },
  {
    id: 20,
    title: 'Друкуємо букви: К та Г',
    description: 'Тренування вказівних пальців на літери К і Г.',
    keys: ['к', 'г'],
    language: 'uk'
  },
  {
    id: 21,
    title: 'Letter Pair: E and I',
    description: 'Practice middle fingers on E and I.',
    keys: ['e', 'i'],
    language: 'en'
  },
  {
    id: 22,
    title: 'Друкуємо букви: У та Ш',
    description: 'Тренування середніх пальців на літери У і Ш.',
    keys: ['у', 'ш'],
    language: 'uk'
  },
  {
    id: 23,
    title: 'Letter Pair: W and O',
    description: 'Practice ring fingers on W and O.',
    keys: ['w', 'o'],
    language: 'en'
  },
  {
    id: 24,
    title: 'Друкуємо букви: Ц та Щ',
    description: 'Тренування безіменних пальців на літери Ц і Щ.',
    keys: ['ц', 'щ'],
    language: 'uk'
  },
  {
    id: 25,
    title: 'Letter Pair: Q and P',
    description: 'Practice pinky fingers on Q and P.',
    keys: ['q', 'p'],
    language: 'en'
  },
  {
    id: 26,
    title: 'Друкуємо букви: Й та З',
    description: 'Тренування мізинців на літери Й і З.',
    keys: ['й', 'з'],
    language: 'uk'
  },
  {
    id: 27,
    title: 'Letter Pair: T and Y',
    description: 'Practice index fingers on T and Y.',
    keys: ['t', 'y'],
    language: 'en'
  },
  {
    id: 28,
    title: 'Друкуємо букви: Е та Н',
    description: 'Тренування вказівних пальців на літери Е і Н.',
    keys: ['е', 'н'],
    language: 'uk'
  },
  {
    id: 29,
    title: 'Top Row Practice',
    description: 'Practice all top row keys in sequence.',
    keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    language: 'en'
  },
  {
    id: 30,
    title: 'Практика верхнього ряду',
    description: 'Тренуйте всі клавіші верхнього ряду по порядку.',
    keys: ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з'],
    language: 'uk'
  },
  {
    id: 31,
    title: 'Top Row Sentences',
    description: 'Type sentences using only top row letters.',
    keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    language: 'en'
  },
  {
    id: 32,
    title: 'Речення верхнього ряду',
    description: 'Друкуйте речення лише з літер верхнього ряду.',
    keys: ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з'],
    language: 'uk'
  },

  {
    id: 33,
    title: 'Letter Pair: V and N',
    description: 'Practice index fingers on V and N.',
    keys: ['v', 'n'],
    language: 'en'
  },
  {
    id: 34,
    title: 'Друкуємо букви: М та Т',
    description: 'Тренування вказівних пальців на літери М і Т.',
    keys: ['м', 'т'],
    language: 'uk'
  },
  {
    id: 35,
    title: 'Letter Pair: C and M',
    description: 'Practice middle fingers on C and M.',
    keys: ['c', 'm'],
    language: 'en'
  },
  {
    id: 36,
    title: 'Друкуємо букви: С та Ь',
    description: 'Тренування середніх пальців на літери С і Ь.',
    keys: ['с', 'ь'],
    language: 'uk'
  },
  {
    id: 37,
    title: 'Letter Pair: X and ,',
    description: 'Practice ring fingers on X and ,.',
    keys: ['x', ','],
    language: 'en'
  },
  {
    id: 38,
    title: 'Друкуємо букви: Ч та Б',
    description: 'Тренування безіменних пальців на літери Ч і Б.',
    keys: ['ч', 'б'],
    language: 'uk'
  },
  {
    id: 39,
    title: 'Letter Pair: Z and .',
    description: 'Practice pinky fingers on Z and .',
    keys: ['z', '.'],
    language: 'en'
  },
  {
    id: 40,
    title: 'Друкуємо букви: Я та Ю',
    description: 'Тренування мізинців на літери Я і Ю',
    keys: ['я', 'ю'],
    language: 'uk'
  },
  {
    id: 41,
    title: 'Bottom Row Practice',
    description: 'Practice all bottom row keys in sequence.',
    keys: ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.'],
    language: 'en'
  },
  {
    id: 42,
    title: 'Практика нижнього ряду',
    description: 'Тренуйте всі клавіші нижнього ряду по порядку.',
    keys: ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.'],
    language: 'uk'
  },
  {
    id: 43,
    title: 'Bottom Row Sentences',
    description: 'Type sentences using only bottom row letters.',
    keys: ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.'],
    language: 'en'
  },
  {
    id: 44,
    title: 'Речення нижнього ряду',
    description: 'Друкуйте речення лише з літер нижнього ряду.',
    keys: ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.'],
    language: 'uk'
  }
];