export interface Course_add {
  subjectId: number,
  title: string,
  language: string,
  thumbnailUrl: string,
  price: number,
  level: number,
  tagsIds: number[],
  prerequisitesIds: number[],
  learningObjectives: string[]
}
export interface instructor {
  instructorId: number,
  instructorName: string,

}
export interface review
  {
      id: number,
      numberOfStars: number,
      date: string,
      content: string,
      studentName: string,
      profilePictureUrl: string
    }

export interface Course_get {
  id: number,
  title: string,
  subject: string,
  thumbnailUrl: string,
  instructor: "string",
  rating: number,
  duration: number,
  price: number,
  totalEnrolled: number,
  numberOfLectures: number,
  deductionAmount: number,
  lastUpdatedDate: string,
  uploadDate: string,
  level: number,
  deductionType: number,
  tags: [
    string
  ],
  prerequisites: [
    string
  ],
  learningObjectives: [
    string
  ],
  lecturesLinks: [
    string
  ],
  reviews: review[]
  }
