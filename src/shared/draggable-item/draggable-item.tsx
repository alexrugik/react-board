import * as React from 'react';
import './draggable-item.css';
import { BoardItem } from '../../reducers/board';

interface DraggableItemState {
  x: number;
  y: number;
}

export class DraggableItem extends React.Component<BoardItem> {
  public state: DraggableItemState = {
    x: 0,
    y: 0
  };

  constructor(props: BoardItem) {
    super(props);
  }

  componentDidMount(): void {
    this.updateState();
  }

  componentDidUpdate(prevProps: Readonly<BoardItem>, prevState: Readonly<{}>, snapshot?: any): void {
    if (this.props.x !== prevProps.x || this.props.y !== prevProps.y) {
      this.updateState();
    }
  }

  onDragStart($event: React.DragEvent<HTMLDivElement>) {
    const el: HTMLDivElement = $event.target as HTMLDivElement;
    const left = Number.parseInt(el.style.left, 10);
    const top = Number.parseInt(el.style.top, 10);
    $event.dataTransfer.setData('id', ($event.target as HTMLDivElement).id);
    $event.dataTransfer.setData('x', (left - $event.clientX).toString());
    $event.dataTransfer.setData('y', (top - $event.clientY).toString());
  }

  private updateState() {
    this.setState({
      x: this.props.x,
      y: this.props.y
    });
  }

  render() {
    return <div
      id={this.props.id.toString()}
      style={
        {
          width: this.props.width,
          height: this.props.height,
          backgroundColor: this.props.backgroundColor,
          left: this.state.x,
          top: this.state.y
        }
      }
      onDragStart={this.onDragStart.bind(this)}
      draggable="true"
      className="item">
    </div>;
  }
}
