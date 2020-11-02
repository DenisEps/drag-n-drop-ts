// eslint-disable-next-line max-classes-per-file
namespace App {
  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  export class ProjectState extends State<Project> {
    private projects: Project[] = [];

    private static instance: ProjectState;

    private constructor() {
      super();
    }

    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }

    addProject(title: string, description: string, people: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        people,
        ProjectStatus.Active,
      );
      this.projects.push(newProject);
      this.updateListeners();
      // for (const listenerFn of this.listeners) {
      //   listenerFn([...this.projects]);
      // }
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find((proj) => proj.id === projectId);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListeners();
      }
    }

    private updateListeners() {
      this.listeners.forEach((listenerFunc) => {
        listenerFunc([...this.projects]);
      });
    }
  }

  export const projectState = ProjectState.getInstance();
}
