export interface section_get {
  title: string,
  objectives: string,
  courseId: number,
  id: number,
  order: number,
  showParagraph?: boolean;
}
export interface item_get {
  title: string,
  description: string,
  curriculumSectionId: number,
  id: number,
  order: number,
  itemType: string
}
export interface item_display {

    id: number,
    items:item_get[]

}
