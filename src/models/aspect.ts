export type Aspects = {
    title:string,
    description: string
}
export const aspects: Aspects[] = [
    {
      title: "Rationality",
      description: "Evaluates whether the commit message provides a clear and logical explanation for the code changes, including the reasoning behind them (the 'Why') and specifying the commit type."
    },
    {
      title: "Comprehensiveness",
      description: "Assesses whether the message delivers a complete summary of the changes made (the 'What') and includes all critical details necessary to understand the modifications, avoiding omissions."
    },
    {
      title: "Conciseness",
      description: "Determines if the message communicates the necessary information in a clear and succinct manner, enabling easy and quick understanding."
    },
    {
      title: "Expressiveness",
      description: "Checks whether the commit message is well-structured, grammatically correct, and effectively conveys its intent."
    },
    {
      title: "Your Final Choice",
      description: "Represents your ultimate selection, which will be applied as the chosen commit message."
    }
  ]
  