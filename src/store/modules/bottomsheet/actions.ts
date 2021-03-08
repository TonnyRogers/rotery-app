export interface BottomSheetData {
  componentype: string;
  type: string;
  id: number;
}

export function showBottomSheet(data: BottomSheetData) {
  return {
    type: '@bottomSheet/SHOW_BOTTOM_SHEET',
    payload: data,
  };
}

export function hideBottomSheet() {
  return {
    type: '@bottomSheet/HIDE_BOTTOM_SHEET',
  };
}
