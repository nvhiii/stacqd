import React, { useState } from "react";
import { jobs, payOptions } from "../jobData.js";

function Opportunities() {
  const [companyFilter, setCompanyFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [payFilter, setPayFilter] = useState(""); // Add state for pay filter
  const [perksFilter, setPerksFilter] = useState([]); // Array for selected perks
  const [requirementsFilter, setRequirementsFilter] = useState([]); // Array for selected requirements
  const [postedFilter, setPostedFilter] = useState(""); // Add state for posted date filter
  const [searchResults, setSearchResults] = useState([]); // Clear search results on every search

  const handleSearch = () => {
    const filteredJobs = jobs.filter((job) => {
      let matches = true;

      // Company filter
      if (
        companyFilter &&
        !job.company.toLowerCase().includes(companyFilter.toLowerCase())
      ) {
        matches = false;
      }

      // Location filter
      if (
        locationFilter &&
        locationFilter !== "All" &&
        job.location !== locationFilter
      ) {
        matches = false;
      }

      // Pay filter (assuming payOptions in jobData.js is an array of strings)
      if (
        (payFilter && !payOptions.includes(payFilter)) ||
        !job.pay.includes(payFilter)
      ) {
        matches = false;
      }

      // Perks filter
      if (
        perksFilter.length > 0 &&
        !perksFilter.every((perk) => job.perks.includes(perk))
      ) {
        matches = false;
      }

      // Requirements filter
      if (
        requirementsFilter.length > 0 &&
        !requirementsFilter.every((requirement) =>
          job.requirements.includes(requirement)
        )
      ) {
        matches = false;
      }

      // Posted date filter (assuming posted is a number of days ago)
      if (
        postedFilter &&
        parseInt(postedFilter) > 0 &&
        job.posted > parseInt(postedFilter)
      ) {
        matches = false; // Filter for jobs posted within the specified number of days
      }

      return matches;
    });

    setSearchResults(filteredJobs); // Clear previous results before setting new ones
  };

  return (
    <div>
      <div className="">
        <h1>Job Search</h1>
        <div>
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)} // Explicitly use setter
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <select
            id="location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)} // Explicitly use setter
          >
            <option value="All">All Locations</option>
            <option value="New York, NY">New York</option>
            <option value="San Francisco, CA">San Francisco</option>
            <option value="Seattle, WA">Seattle</option>
            <option value="Los Angeles, CA">Los Angeles</option>
            <option value="Chicago, IL">Chicago</option>
            {/* Add options for each location from jobData.js */}
            {new Set(jobs.map((job) => job.location))
              .values()
              .map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
          </select>
        </div>
        {/* Add similar input fields and selection elements for other filters (pay, perks, requirements, posted) with explicit use of setter functions in onChange handlers */}
        <button onClick={handleSearch}>Search</button>
        {searchResults.length === 0 ? (
          <p>No jobs found matching your criteria.</p>
        ) : (
          <div>
            <h2>Search Results</h2>
            {searchResults.map((job) => (
              <div key={job.title} className="job-card">
                <h3>{job.title}</h3>
                <p>
                  <b>Company:</b> {job.company}
                </p>
                <p>
                  <b>Location:</b> {job.location}
                </p>
                {/* Display other job details */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Opportunities;
