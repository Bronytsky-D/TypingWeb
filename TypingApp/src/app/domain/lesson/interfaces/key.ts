export interface Key {
  id: string;
  display: string;
  finger: FingerType;
}
export type KeyboardLayout = Key[][];
export enum FingerType {
  LEFT_PINKY = 'left-pinky',
  LEFT_RING = 'left-ring', 
  LEFT_MIDDLE = 'left-middle',
  LEFT_INDEX = 'left-index',
  LEFT_THUMB = 'left-thumb',
  RIGHT_THUMB = 'right-thumb',
  RIGHT_INDEX = 'right-index',
  RIGHT_MIDDLE = 'right-middle',
  RIGHT_RING = 'right-ring',
  RIGHT_PINKY = 'right-pinky'
}
