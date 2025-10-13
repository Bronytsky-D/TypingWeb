import { FingerType, KeyboardLayout } from "../interfaces/key";

export const ENGLISH_KEYBOARD: KeyboardLayout = [
  [
    { id: 'q', display: 'Q', finger: FingerType.LEFT_PINKY },
    { id: 'w', display: 'W', finger: FingerType.LEFT_RING },
    { id: 'e', display: 'E', finger: FingerType.LEFT_MIDDLE },
    { id: 'r', display: 'R', finger: FingerType.LEFT_INDEX },
    { id: 't', display: 'T', finger: FingerType.LEFT_INDEX },
    { id: 'y', display: 'Y', finger: FingerType.RIGHT_INDEX },
    { id: 'u', display: 'U', finger: FingerType.RIGHT_INDEX },
    { id: 'i', display: 'I', finger: FingerType.RIGHT_MIDDLE },
    { id: 'o', display: 'O', finger: FingerType.RIGHT_RING },
    { id: 'p', display: 'P', finger: FingerType.RIGHT_PINKY }
  ],
  [
    { id: 'a', display: 'A', finger: FingerType.LEFT_PINKY },
    { id: 's', display: 'S', finger: FingerType.LEFT_RING },
    { id: 'd', display: 'D', finger: FingerType.LEFT_MIDDLE },
    { id: 'f', display: 'F', finger: FingerType.LEFT_INDEX },
    { id: 'g', display: 'G', finger: FingerType.LEFT_INDEX },
    { id: 'h', display: 'H', finger: FingerType.RIGHT_INDEX },
    { id: 'j', display: 'J', finger: FingerType.RIGHT_INDEX },
    { id: 'k', display: 'K', finger: FingerType.RIGHT_MIDDLE },
    { id: 'l', display: 'L', finger: FingerType.RIGHT_RING },
    { id: ';', display: ';', finger: FingerType.RIGHT_PINKY }
  ],
  [
    { id: 'z', display: 'Z', finger: FingerType.LEFT_PINKY },
    { id: 'x', display: 'X', finger: FingerType.LEFT_RING },
    { id: 'c', display: 'C', finger: FingerType.LEFT_MIDDLE },
    { id: 'v', display: 'V', finger: FingerType.LEFT_INDEX },
    { id: 'b', display: 'B', finger: FingerType.LEFT_INDEX },
    { id: 'n', display: 'N', finger: FingerType.RIGHT_INDEX },
    { id: 'm', display: 'M', finger: FingerType.RIGHT_INDEX },
    { id: ',', display: ',', finger: FingerType.RIGHT_MIDDLE },
    { id: '.', display: '.', finger: FingerType.RIGHT_RING },
    { id: '/', display: '/', finger: FingerType.RIGHT_PINKY }
  ],
  [
    { id: 'space', display: 'Space', finger: FingerType.LEFT_THUMB }
  ]
];