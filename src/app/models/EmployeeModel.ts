/**MVC Model Definitions */

export interface EmployeeModel {
    id: number;
    name: string;
    completed: boolean;
  }
  
  export namespace EmployeeModel {
    export enum Filter {
      SHOW_ALL = 'all',
      SHOW_ACTIVE = 'active',
      SHOW_COMPLETED = 'completed'
    }
  }