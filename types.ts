export interface Subject {
  id: string;
  name: string;
}

export interface Submission {
  studentName: string;
  major: string;
  class: string;
  selectedElectives: string[];
}