class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  constructor() {
    this.templateElement = <HTMLTemplateElement>document.getElementById('project-input')!
    this.hostElement = <HTMLDivElement>document.getElementById('app');

    const importedHTMLContent = document.importNode(this.templateElement.content, true);
    this.element = <HTMLFormElement>importedHTMLContent.firstElementChild;
    this.attach()
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const projectInput = new ProjectInput();