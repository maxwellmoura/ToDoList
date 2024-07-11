// Interface para definir o tipo de uma tarefa
export interface ITask {
  id: number;
  title: string;
  dificuldade: number;
  date: string;
  completionDate: string;
}
