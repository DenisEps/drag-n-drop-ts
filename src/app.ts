/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />
/* eslint-disable max-classes-per-file */

namespace App {
  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
}
