export type Aspects = {
    title:string,
    description: string
}
export const aspects: Aspects[] = [
    {
      title: "Personal Selection",
      description: "Select the commit message candidate that you would use in this context."
    },
    {
      title: "Rationality",
      description: "Select the commit message that provides the most clear and logical explanation for the code changes, explaining the reasoning behind them and the nature of the change."
    },
    {
      title: "Comprehensiveness",
      description: "Select the commit message that provides the best summary of what has been changed, including all relevant details necessary to understand the modifications."
    },
    {
      title: "Conciseness",
      description: "Select the commit message that best communicates the necessary information in a concise way, focusing on being succinct and enabling easy and quick understanding."
    },
    {
      title: "Expressiveness",
      description: " Select the commit message that is more well-structured, grammatically correct, and fluent."
    },
  ]
  