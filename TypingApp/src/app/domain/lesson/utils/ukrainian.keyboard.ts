import { FingerType, KeyboardLayout } from "../interfaces/key";

export const UKRAINIAN_KEYBOARD: KeyboardLayout = [
  [
    { id: 'й', display: 'Й', finger: FingerType.LEFT_PINKY },
    { id: 'ц', display: 'Ц', finger: FingerType.LEFT_RING },
    { id: 'у', display: 'У', finger: FingerType.LEFT_MIDDLE },
    { id: 'к', display: 'К', finger: FingerType.LEFT_INDEX },
    { id: 'е', display: 'Е', finger: FingerType.LEFT_INDEX },
    { id: 'н', display: 'Н', finger: FingerType.RIGHT_INDEX },
    { id: 'г', display: 'Г', finger: FingerType.RIGHT_INDEX },
    { id: 'ш', display: 'Ш', finger: FingerType.RIGHT_MIDDLE },
    { id: 'щ', display: 'Щ', finger: FingerType.RIGHT_RING },
    { id: 'з', display: 'З', finger: FingerType.RIGHT_PINKY },
    { id: 'х', display: 'Х', finger: FingerType.RIGHT_PINKY },
    { id: 'ї', display: 'Ї', finger: FingerType.RIGHT_PINKY }

  ],
  [
    { id: 'ф', display: 'Ф', finger: FingerType.LEFT_PINKY },
    { id: 'і', display: 'І', finger: FingerType.LEFT_RING },
    { id: 'в', display: 'В', finger: FingerType.LEFT_MIDDLE },
    { id: 'а', display: 'А', finger: FingerType.LEFT_INDEX },
    { id: 'п', display: 'П', finger: FingerType.LEFT_INDEX },
    { id: 'р', display: 'Р', finger: FingerType.RIGHT_INDEX },
    { id: 'о', display: 'О', finger: FingerType.RIGHT_INDEX },
    { id: 'л', display: 'Л', finger: FingerType.RIGHT_MIDDLE },
    { id: 'д', display: 'Д', finger: FingerType.RIGHT_RING },
    { id: 'ж', display: 'Ж', finger: FingerType.RIGHT_PINKY },
    { id: 'є', display: 'Є', finger: FingerType.RIGHT_PINKY }
  ],
  [
    { id: 'я', display: 'Я', finger: FingerType.LEFT_PINKY },
    { id: 'ч', display: 'Ч', finger: FingerType.LEFT_RING },
    { id: 'с', display: 'С', finger: FingerType.LEFT_MIDDLE },
    { id: 'м', display: 'М', finger: FingerType.LEFT_INDEX },
    { id: 'и', display: 'И', finger: FingerType.LEFT_INDEX },
    { id: 'т', display: 'Т', finger: FingerType.RIGHT_INDEX },
    { id: 'ь', display: 'Ь', finger: FingerType.RIGHT_INDEX },
    { id: 'б', display: 'Б', finger: FingerType.RIGHT_MIDDLE },
    { id: 'ю', display: 'Ю', finger: FingerType.RIGHT_RING },
    { id: '.', display: '.', finger: FingerType.RIGHT_PINKY }
  ],
  [
    { id: 'space', display: 'Пробіл', finger: FingerType.LEFT_THUMB }
  ]
];