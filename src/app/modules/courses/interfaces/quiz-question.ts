export interface QuizQuestion_post {
  id:number,
  content: string,
  quizId: 0,
  quizQuestionChoices: [
    {
      id:number,
      content: string,
      isRight: boolean,
      clarification?: string
    },
    {
      id:number,
      content: string,
      isRight: boolean,
      clarification?: string
    },
    {
      id:number,
      content: string,
      isRight: boolean,
      clarification?: string
    },
    {
      id:number,
      content: string,
      isRight: boolean,
      clarification?: string
    },
  ]
}

