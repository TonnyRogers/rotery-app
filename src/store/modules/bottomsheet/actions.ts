export interface BottomSheetData {
  componentype: string;
  type: string;
  id: number;
}

export enum BottomSheetActions {
  SHOW_BOTTOM_SHEET = '@bottomSheet/SHOW_BOTTOM_SHEET',
  HIDE_BOTTOM_SHEET = '@bottomSheet/HIDE_BOTTOM_SHEET',
}

export function showBottomSheet(data: BottomSheetData) {
  return {
    type: BottomSheetActions.SHOW_BOTTOM_SHEET,
    payload: data,
  };
}

export function hideBottomSheet() {
  return {
    type: BottomSheetActions.HIDE_BOTTOM_SHEET,
  };
}
