export const researchPrompt = `Research the following company and provide a comprehensive intelligence report.

Company Name: {companyName}

Provide the following information in a structured JSON format:

{
  "overview": {
    "description": "Brief company description",
    "founded": "Year founded",
    "headquarters": "Location",
    "founder": "Founder name(s)",
    "ceo": "Current CEO",
    "website": "Company website"
  },
  "industry": "Industry classification",
  "financials": {
    "revenue": "Latest annual revenue",
    "employees": "Approximate number of employees",
    "funding": "Total funding raised (if applicable)"
  },
  "products": ["List of main products/services"],
  "businessModel": "Explanation of how the company makes money",
  "competitors": ["List of main competitors"],
  "marketPosition": "Company's position in the market",
  "technologyStack": ["Key technologies used"],
  "swot": {
    "strengths": ["Key strengths"],
    "weaknesses": ["Key weaknesses"],
    "opportunities": ["Growth opportunities"],
    "threats": ["Market threats"]
  },
  "recentNews": ["Recent developments and news"],
  "aiInsights": "AI-generated strategic insights and analysis",
  "riskAssessment": ["Identified risks and challenges"],
  "opportunities": ["Strategic opportunities for growth"],
  "recommendations": ["Actionable recommendations for improvement"]
}`;
