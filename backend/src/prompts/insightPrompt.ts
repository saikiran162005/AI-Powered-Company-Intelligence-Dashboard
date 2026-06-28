export const insightPrompt = `Generate strategic business insights for {companyName}.

Analyze the following aspects and provide AI-generated insights:

{
  "marketTrends": "How current market trends affect this company",
  "competitiveAdvantage": "What gives this company an edge over competitors",
  "futureOutlook": "Predictions for the company's future (3-5 years)",
  "strategicRecommendations": [
    {
      "recommendation": "Specific action",
      "rationale": "Why this matters",
      "expectedOutcome": "Potential results",
      "timeline": "When to implement"
    }
  ],
  "riskMitigation": "How the company should address identified risks",
  "growthOpportunities": "Top 3-5 areas for growth",
  "sustainabilityAnalysis": "Long-term viability assessment",
  "investmentPotential": "Overall investment attractiveness"
}`;
