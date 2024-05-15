export const jobs = [];

const jobTitles = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "Marketing Manager",
  "UX Designer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Network Engineer",
  "Security Analyst",
  "Business Analyst",
];

const companies = [
  "Meta",
  "Amazon",
  "Apple",
  "Netflix",
  "Google",
  "Citadel",
  "Jane Street",
  "OpenAI",
  "McDonalds",
  "Microsoft",
];

const locations = [
  "New York, NY",
  "San Francisco, CA",
  "Seattle, WA",
  "Los Angeles, CA",
  "Chicago, IL",
];

export const payOptions = [
  "$80,000 - $100,000",
  "$100,000 - $120,000",
  "$120,000 - $150,000",
  "$150,000+",
];

export const perks = [
  "Free food",
  "Gym membership",
  "Health insurance",
  "Stock options",
  "Flexible work hours",
  "Remote work opportunities",
  "Paid time off",
  "Professional development opportunities",
  "Travel opportunities",
  "Team outings",
];

export const requirements = [
  "Bachelor's degree",
  "Master's degree",
  "3+ years experience",
  "Experience with specific technologies (e.g., Python, Java, React)",
  "Strong communication skills",
  "Problem-solving skills",
  "Teamwork skills",
  "Leadership skills",
  "Analytical skills",
  "Attention to detail",
];

function generateRandomJob() {
  return {
    title: jobTitles[Math.floor(Math.random() * jobTitles.length)],
    company: companies[Math.floor(Math.random() * companies.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    pay: payOptions[Math.floor(Math.random() * payOptions.length)],
    perks: perks.slice(Math.floor(Math.random() * (perks.length - 3)) + 3), // Select 3-5 random perks
    requirements: requirements.slice(
      Math.floor(Math.random() * (requirements.length - 3)) + 3
    ), // Select 3-5 random requirements
    posted: Math.floor(Math.random() * 30) + 1, // Posted between 1-30 days ago
  };
}

// Generate 100 random jobs and add them to the jobs array
for (let i = 0; i < 100; i++) {
  jobs.push(generateRandomJob());
}
