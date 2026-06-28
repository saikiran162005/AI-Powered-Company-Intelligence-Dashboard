export const followUpPrompt = `You are continuing a conversation about {companyName}.

Previous research context:
{context}

User question: {userQuestion}

Based on the research context and previous information about {companyName}, provide a detailed and insightful answer to the user's question.

If the question requires new information beyond the research context, indicate where additional research would be helpful.

Maintain consistency with the previously provided company information while answering the specific question.`;
