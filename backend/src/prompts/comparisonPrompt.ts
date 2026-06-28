export const comparisonPrompt = `Compare {company1} and {company2} across multiple dimensions.

Provide a comprehensive comparison in JSON format:

{
  "company1": "{company1}",
  "company2": "{company2}",
  "comparison": {
    "businessModel": {
      "company1": "Description",
      "company2": "Description",
      "winner": "Analysis of which is stronger"
    },
    "marketPosition": {
      "company1": "Description",
      "company2": "Description",
      "winner": "Analysis"
    },
    "financialPerformance": {
      "company1": "Description",
      "company2": "Description",
      "winner": "Analysis"
    },
    "innovation": {
      "company1": "Description",
      "company2": "Description",
      "winner": "Analysis"
    },
    "customerBase": {
      "company1": "Description",
      "company2": "Description",
      "winner": "Analysis"
    },
    "riskProfile": {
      "company1": "Description",
      "company2": "Description",
      "riskier": "Analysis"
    }
  },
  "overallAnalysis": "Summary of comparison",
  "investmentRecommendation": "Which is a better investment and why"
}`;
