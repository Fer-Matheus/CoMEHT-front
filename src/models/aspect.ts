export type Aspects = {
    title:string,
    description: string
}
export const aspects: Aspects[] = [
    {title: "Rationality", description: "Which reflects whether the commit message provides a logical explanation for the code change (Why information) and provides the commit type information."},
    {title: "Comprehensiveness", description: "Which reflects whether the message describes a summary of what has been changed (What information) and also covers relevant important details (i.e. whether the message fails to explain the code changes)."},
    {title: "Conciseness", description: "Indicates whether the message conveys information succinctly, ensuring readability and quick comprehension."},
    {title:"Expressiveness", description:"Which reflects whether the message content is grammatically correct."},
    {title:"Your final choise", description:"Your final choise is what your will use."}
  ]