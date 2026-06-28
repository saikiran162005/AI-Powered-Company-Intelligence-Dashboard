export const swotPrompt = `Perform a detailed SWOT analysis for {companyName}.

Provide a comprehensive analysis in the following JSON format:

{
  "company": "{companyName}",
  "strengths": [
    {
      "area": "Category",
      "description": "Detailed explanation",
      "impact": "Competitive advantage"
    }
  ],
  "weaknesses": [
    {
      "area": "Category",
      "description": "Detailed explanation",
      "impact": "Impact on business"
    }
  ],
  "opportunities": [
    {
      "area": "Category",
      "description": "Detailed explanation",
      "potential": "Revenue potential"
    }
  ],
  "threats": [
    {
      "area": "Category",
      "description": "Detailed explanation",
      "likelihood": "Probability of occurrence"
    }
  ],
  "summary": "Overall strategic summary"
}`;
