import { Draggable } from '../models/drag-drop';
import { Project } from '../models/project';
import { Component } from './base-component';

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  private project: Project;

  get persons() {
    const p = this.project.people;
    if (p === 1) {
      return '1 человек назначен';
    }
    if (p === 2 || p === 3 || p === 4) {
      return `${this.project.people} человека назначено`;
    }
    return `${this.project.people} человек назначено`;
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  dragEndHandler(_: DragEvent) {}

  configure() {
    this.element.addEventListener(
      'dragstart',
      this.dragStartHandler.bind(this),
    );
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.persons;
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}
