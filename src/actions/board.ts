export const UPDATE_ITEM = 'UPDATE_ITEM';

export interface UPDATE_ITEM_ACTION {
  type: string;
  id: number;
  x: number;
  y: number;
}

export function updateItem(id: number, x: number, y: number): UPDATE_ITEM_ACTION {
  return {type: UPDATE_ITEM, id, x, y};
}
