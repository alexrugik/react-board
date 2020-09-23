import * as React from 'react';
import './board.css';
import { DraggableItem } from '../draggable-item/draggable-item';
import { boardStore } from '../../store/board';
import { BoardItem } from '../../reducers/board';
import { updateItem } from '../../actions/board';
import { Unsubscribe } from 'redux';

interface BoardState {
  draggableItems: BoardItem[];
}

export interface BoardSettings {
  width: number;
  height: number;
}

export interface BoardProps {
  settings: BoardSettings;
}

export class Board extends React.Component<BoardProps> {
  public state: BoardState = {
    draggableItems: []
  };
  private subscriptions: any[] = [];

  constructor(props: Readonly<BoardProps>) {
    super(props);
  }

  componentDidMount(): void {
    this
      .subscribeToDraggableItemsStore()
      .setState({
        draggableItems: boardStore.getState()
      });
  }

  componentWillUnmount(): void {
    this.subscriptions.forEach((subscription: Unsubscribe) => subscription);
  }

  onDrop($event: React.DragEvent<HTMLDivElement>) {
    $event.preventDefault();
    const id = $event.dataTransfer.getData('id');
    const x = $event.clientX + Number.parseInt($event.dataTransfer.getData('x'), 10);
    const y = $event.clientY + Number.parseInt($event.dataTransfer.getData('y'), 10);
    boardStore.dispatch(
      updateItem(
        Number.parseInt(id, 10),
        x,
        y
      )
    );
  }

  onDragOver($event: React.DragEvent) {
    $event.preventDefault();
  }

  render() {
    return <div className="board"
                id='board'
                style={
                  {
                    width: this.props.settings.width,
                    height: this.props.settings.height,
                  }
                }
                onDragOver={this.onDragOver}
                onDrop={this.onDrop.bind(this)}>
      {this.state.draggableItems.map((item: BoardItem, index) => {
        return <DraggableItem key={item.id}
                              settings={item}>
        </DraggableItem>;
      })}
    </div>;
  }

  private subscribeToDraggableItemsStore() {
    this.subscriptions.push(
      boardStore
        .subscribe(
          () => {
            this.setState({
              draggableItems: boardStore.getState()
            });
          }
        )
    );
    return this;
  }
}
