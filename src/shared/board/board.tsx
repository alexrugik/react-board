import * as React from 'react';
import './board.css';
import { DraggableItem } from '../draggable-item/draggable-item';
import { boardStore } from '../../store/board';
import { BoardItem } from '../../reducers/board';
import { updateItem } from '../../actions/board';

interface BoardState {
  draggableItems: BoardItem[];
}

export class Board extends React.Component {
  public state: BoardState = {
    draggableItems: []
  };

  constructor(props: any) {
    super(props);
  }

  componentDidMount(): void {
    this
      .subscribeToDraggableItemsStore()
      .setState({
        draggableItems: boardStore.getState()
      });
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
                onDragOver={this.onDragOver}
                onDrop={this.onDrop.bind(this)}>
      {this.state.draggableItems.map((item: BoardItem, index) => {
        return <DraggableItem key={index}
                              id={item.id}
                              height={item.height}
                              width={item.width}
                              backgroundColor={item.backgroundColor}
                              x={item.x}
                              y={item.y}>
        </DraggableItem>;
      })}
    </div>;
  }

  private subscribeToDraggableItemsStore() {
    boardStore
      .subscribe(
        () => {
          this.setState({
            draggableItems: boardStore.getState()
          });
        }
      );
    return this;
  }
}
