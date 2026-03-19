import json
import os

ACTIVE_SCHEMES = [
  {
    "id": 1,
    "name": "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    "description": "Income support of ₹6,000 per year in three equal installments to all land holding farmer families.",
    "eligibility": "All landholding farmers' families",
    "benefit": "₹6,000 per year per family directly to bank accounts",
    "applyLink": "https://pmkisan.gov.in/",
    "tag": "Financial Support"
  },
  {
    "id": 2,
    "name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    "description": "A comprehensive crop insurance scheme to provide financial support to farmers suffering crop loss/damage arising out of unforeseen events.",
    "eligibility": "Farmers growing notified crops in notified areas",
    "benefit": "Financial insurance coverage against crop loss (Only 2% premium for Kharif, 1.5% for Rabi)",
    "applyLink": "https://pmfby.gov.in/",
    "tag": "Insurance"
  },
  {
    "id": 3,
    "name": "Kisan Credit Card (KCC)",
    "description": "Meets the adequate and timely credit requirements of farmers for their agricultural operations at heavily subsidized interest rates.",
    "eligibility": "All Farmers - Individuals / Joint borrowers who are owner cultivators",
    "benefit": "Short term credit limits for crops and term loans at 4% interest (with subvention)",
    "applyLink": "https://www.myscheme.gov.in/schemes/kcc",
    "tag": "Credit/Loan"
  },
  {
    "id": 4,
    "name": "Soil Health Card Scheme",
    "description": "Provides information to farmers on nutrient status of their soil along with recommendations on appropriate dosage of nutrients.",
    "eligibility": "All farmers in India",
    "benefit": "Free physical soil test and specific fertilizer recommendations every 2 years",
    "applyLink": "https://soilhealth.dac.gov.in/",
    "tag": "Farming Tech"
  },
  {
    "id": 5,
    "name": "Paramparagat Krishi Vikas Yojana (PKVY)",
    "description": "Promotes organic farming through cluster approach and PGS certification. Reduces reliance on chemical fertilizers.",
    "eligibility": "Farmers willing to adopt organic farming in clusters of 20 hectares",
    "benefit": "Financial assistance of ₹50,000 per hectare for 3 years",
    "applyLink": "https://pgsindia-ncof.gov.in/pkvy",
    "tag": "Organic Farming"
  },
  {
    "id": 6,
    "name": "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
    "description": "Focuses on 'Har Khet Ko Pani' (water to every field) and improving water use efficiency 'More crop per drop'.",
    "eligibility": "Farmers with irrigable land",
    "benefit": "Major subsidies (up to 55%) for drip/sprinkler micro-irrigation equipments",
    "applyLink": "https://pmksy.gov.in/",
    "tag": "Irrigation"
  },
  {
    "id": 7,
    "name": "National Agriculture Market (e-NAM)",
    "description": "A pan-India electronic trading portal which networks the existing APMC mandis to create a unified national market for agricultural commodities.",
    "eligibility": "All farmers, FPOs, and registered traders",
    "benefit": "Better price discovery, transparent auction process, direct online payment",
    "applyLink": "https://enam.gov.in/web/",
    "tag": "Market Access"
  }
]

UPCOMING_SCHEMES = [
  {
    "id": 101,
    "name": "Digital Agriculture Mission (DAM)",
    "description": "A futuristic initiative to create a digital public infrastructure for agriculture, including AgriStack and Krishi DSS.",
    "eligibility": "All registered farmers (Aadhaar linked)",
    "benefit": "Seamless loan approvals, digital crop survey, direct targeted subsidies without paperwork",
    "expectedLaunch": "Early 2026",
    "tag": "Technology Hub"
  },
  {
    "id": 102,
    "name": "PM Programme for Restoration, Awareness, Nourishment and Amelioration of Mother Earth (PM-PRANAM)",
    "description": "Incentivizing States and Union Territories to promote the use of alternative fertilizers and balanced use of chemical fertilizers.",
    "eligibility": "State Govts & subsequent farmer co-ops",
    "benefit": "Funding for adopting bio-fertilizers and massive reduction in farming chemical input cost",
    "expectedLaunch": "Late 2025/2026 Phase-out",
    "tag": "Sustainability"
  },
  {
    "id": 103,
    "name": "NAMASTE Scheme for Mechanization",
    "description": "National Action for Mechanised Sanitation Ecosystem tailored for agricultural waste management and stubble transition.",
    "eligibility": "FPOs and rural agricultural societies",
    "benefit": "Up to 80% subsidy on heavy duty balers and stubble management machinery",
    "expectedLaunch": "Winter 2025",
    "tag": "Equipment/Subsidy"
  },
  {
    "id": 104,
    "name": "Agri-Startup Innovation Fund",
    "description": "A massive dedicated fund designed to finance rural youth starting agritech ventures, drone spraying businesses, or AI farming tools.",
    "eligibility": "Rural youth (18-35), agricultural graduates",
    "benefit": "Seed funding up to ₹25 Lakhs without collateral",
    "expectedLaunch": "Mid 2026",
    "tag": "Entrepreneurship"
  }
]

# output js string
js_content = f"export const ACTIVE_SCHEMES = {json.dumps(ACTIVE_SCHEMES, indent=2)};\n"
js_content += f"export const UPCOMING_SCHEMES = {json.dumps(UPCOMING_SCHEMES, indent=2)};\n"

# ensure dir
os.makedirs("c:/Users/kushw/Desktop/19 20/frontend/src/data", exist_ok=True)
output_path = "c:/Users/kushw/Desktop/19 20/frontend/src/data/schemeData.js"

with open(output_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Generated scheme dataset at {output_path}")
