class ProjectState {
  private projects: any[] = [];
  private static instance: ProjectState;

  private constructor() {

  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, desc: string, people: number) {
    const newProject = {
      id: Math.random().toString(),
      title,
      desc,
      people
    };
    this.projects.push(newProject);
  }
}

const projectState = ProjectState.getInstance();

interface Validate {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

const validate = (validateInput: Validate) => {
  let isValid = true;
  if (validateInput.required) {
    isValid = isValid && validateInput.value.toString().trim().length !== 0;
  }
  if (validateInput.minLength != null && typeof validateInput.value === 'string') {
    isValid = isValid && validateInput.value.length >= validateInput.minLength; 
  }
  if (validateInput.maxLength != null && typeof validateInput.value === 'string') {
    isValid = isValid && validateInput.value.length <= validateInput.maxLength; 
  }
  if (validateInput.min != null && typeof validateInput.value === 'number') {
    isValid = isValid && validateInput.value >= validateInput.min;
  }
  if (validateInput.max != null && typeof validateInput.value === 'number') {
    isValid = isValid && validateInput.value <= validateInput.max;
  }
  return isValid;
}

class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor(private type: 'active' | 'finished') {
    this.templateElement = <HTMLTemplateElement>document.getElementById('project-list')!
    this.hostElement = <HTMLDivElement>document.getElementById('app');

    const importedHTMLContent = document.importNode(this.templateElement.content, true);
    this.element = <HTMLElement>importedHTMLContent.firstElementChild;
    this.element.id = `${this.type}-projects`;
    this.attach();
    this.renderContent();
  }

  private renderContent() {
    let dynamicType;
    if (this.type === 'active') {
      dynamicType = ' АКТИВНЫЕ';
    } else if (this.type === 'finished') {
      dynamicType = ' ЗАВЕРШЕННЫЕ';
    }
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = dynamicType + ' ПРОЕКТЫ';
  }
 
  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = <HTMLTemplateElement>document.getElementById('project-input')!
    this.hostElement = <HTMLDivElement>document.getElementById('app');

    const importedHTMLContent = document.importNode(this.templateElement.content, true);
    this.element = <HTMLFormElement>importedHTMLContent.firstElementChild;
    this.element.id = 'user-input';

    this.titleInputElement = <HTMLInputElement>this.element.querySelector('#title');
    this.descriptionInputElement = <HTMLInputElement>this.element.querySelector('#description');
    this.peopleInputElement =<HTMLInputElement>this.element.querySelector('#people');

    this.configure();
    this.attach();
  }

  private fetchUserInput(): [string, string, number] | void {
    const title = this.titleInputElement.value;
    const desc = this.descriptionInputElement.value;
    const people = this.peopleInputElement.value;

    const titleValidate: Validate = {
      value: title,
      required: true,
    }
    const descValidate: Validate = {
      value: desc,
      required: true,
      minLength: 5,
    }
    const peopleValidate: Validate = {
      value: +people,
      required: true,
      min: 1,
      max: 6,
    }

    if (!validate(titleValidate) || !validate(descValidate) || !validate(peopleValidate)) {
      alert('Вы ввели неверные данные, попробуйте снова')
    }

    return [title, desc, +people];
  }

  private submitHandler(e: Event): void {
    e.preventDefault();
    const userInput = this.fetchUserInput()
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler.bind(this));
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }
}

const projectInput = new ProjectInput();
const activeProjectsList = new ProjectList('active');
const finishedProjectsList = new ProjectList('finished');