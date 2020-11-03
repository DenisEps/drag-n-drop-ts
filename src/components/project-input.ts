import { Component } from './base-component';
import { Validate, validate } from '../util/validation';
import { projectState } from '../state/project-state';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;

  descriptionInputElement: HTMLInputElement;

  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');

    this.titleInputElement = <HTMLInputElement>(
      this.element.querySelector('#title')
    );
    this.descriptionInputElement = <HTMLInputElement>(
      this.element.querySelector('#description')
    );
    this.peopleInputElement = <HTMLInputElement>(
      this.element.querySelector('#people')
    );

    this.configure();
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler.bind(this));
  }

  renderContent() {}

  private fetchUserInput(): [string, string, number] | void {
    const title = this.titleInputElement.value;
    const desc = this.descriptionInputElement.value;
    const people = this.peopleInputElement.value;

    const titleValidate: Validate = {
      value: title,
      required: true,
    };
    const descValidate: Validate = {
      value: desc,
      required: true,
      minLength: 5,
    };
    const peopleValidate: Validate = {
      value: +people,
      required: true,
      min: 1,
      max: 6,
    };

    if (
      !validate(titleValidate) ||
      !validate(descValidate) ||
      !validate(peopleValidate)
    ) {
      alert('Вы ввели неверные данные, попробуйте снова');
      return;
    }

    return [title, desc, +people];
  }

  private submitHandler(e: Event): void {
    e.preventDefault();
    const userInput = this.fetchUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }
}
