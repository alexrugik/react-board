import * as React from 'react';
import './draggable-item.css';
import { BoardItem } from '../../reducers/board';

interface DraggableItemState {
  x: number;
  y: number;
}

export interface DraggableItemProps {
  settings: BoardItem
}

export class DraggableItem extends React.Component<DraggableItemProps> {
  public state: DraggableItemState = {
    x: 0,
    y: 0
  };

  constructor(props: Readonly<DraggableItemProps>) {
    super(props);
  }

  componentDidMount(): void {
    this.updateState();
  }

  componentDidUpdate(prevProps: Readonly<DraggableItemProps>, prevState: Readonly<{}>, snapshot?: any): void {
    if (this.props.settings.y !== prevProps.settings.y) {
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
      x: this.props.settings.x,
      y: this.props.settings.y
    });
  }

  render() {
    return <div
      id={this.props.settings.id.toString()}
      style={
        {
          width: this.props.settings.width,
          height: this.props.settings.height,
          backgroundColor: this.props.settings.backgroundColor,
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
