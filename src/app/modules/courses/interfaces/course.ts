export interface Course_add {
  subjectId: number,
  title: string,
  language: string,
  thumbnailUrl: string,
  price: number,
  courseLevel: number,
  tagsIds: number[],
  prerequisitesIds: number[],
  learningObjectives: string[]
}
