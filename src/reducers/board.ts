import { UPDATE_ITEM, UPDATE_ITEM_ACTION } from '../actions/board';

export interface BoardItem {
  id: number,
  width: number,
  height: number,
  x: number,
  y: number
  backgroundColor: string
}

const initialState: BoardItem[] = [
  {id: 0, width: 100, height: 100, x: 10, y: 10, backgroundColor: '#5FD0E4'},
  {id: 1, width: 40, height: 100, x: 100, y: 200, backgroundColor: '#9E5FE4'},
];

export function boardApp(state: BoardItem[] = initialState, action: UPDATE_ITEM_ACTION): BoardItem[] {
  switch (action.type) {
    case UPDATE_ITEM: {
      return state.map(item => {
        return action.id === item.id ?
          Object.assign({}, item, {x: action.x, y: action.y}) :
          item;
      });
    }
    default: {
      return state;
    }
  }
}
