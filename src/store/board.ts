import { createStore } from 'redux';
import { boardApp } from '../reducers/board';

export const boardStore = createStore(boardApp);
