export interface Course_add {
    subjectId: number,
  title: string,
  language: string,
  thumbnailUrl: string,
  price: string,
  courseLevel: string,
  tagsIds: number[],
  prerequisitesIds: number[],
  learningObjectives: string[]
}
