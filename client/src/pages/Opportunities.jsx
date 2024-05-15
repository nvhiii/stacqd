import { Link } from "react-router-dom";
import React, { useState } from "react";
import { jobs, payOptions, perks, requirements } from "../jobData.js";

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
      if (locationFilter !== "All" && job.location !== locationFilter) {
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
    <div className="flex mx-auto px-4 py-16 max-w-2xl">
      <div className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">Job Search</h1>
        <div className="flex">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <label htmlFor="pay" className="mb-2 text-sm font-medium">
                Pay:
              </label>
              <select
                id="pay"
                value={payFilter}
                onChange={(e) => setPayFilter(e.target.value)}
                className="shadow-sm rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Pay Ranges</option>
                {payOptions.map((payOption) => (
                  <option key={payOption} value={payOption}>
                    {payOption}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col mt-5">
              <label htmlFor="perks" className="mb-2 text-sm font-medium">
                Perks:
              </label>
              <div className="grid gap-2">
                {perks.map((perk) => (
                  <div key={perk} className="flex items-center">
                    <input
                      type="checkbox"
                      id={perk}
                      value={perk}
                      checked={perksFilter.includes(perk)}
                      onChange={(e) => {
                        const updatedPerks = perksFilter.includes(perk)
                          ? perksFilter.filter((p) => p !== perk)
                          : [...perksFilter, perk];
                        setPerksFilter(updatedPerks);
                      }}
                      className="w-4 h-4 mr-2 focus:ring-indigo-500"
                    />
                    <label htmlFor={perk} className="text-sm font-medium">
                      {perk}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col mt-5">
              <label
                htmlFor="requirements"
                className="mb-2 text-sm font-medium"
              >
                Requirements:
              </label>
              <div className="grid gap-2">
                {requirements.map((requirement) => (
                  <div key={requirement} className="flex items-center">
                    <input
                      type="checkbox"
                      id={requirement}
                      value={requirement}
                      checked={requirementsFilter.includes(requirement)}
                      onChange={(e) => {
                        const updatedRequirements = requirementsFilter.includes(
                          requirement
                        )
                          ? requirementsFilter.filter((r) => r !== requirement)
                          : [...requirementsFilter, requirement];
                        setRequirementsFilter(updatedRequirements);
                      }}
                      className="w-4 h-4 mr-2 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={requirement}
                      className="text-sm font-medium"
                    >
                      {requirement}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-4">
              <div className="flex flex-col">
                <label htmlFor="company" className="mb-2 text-sm font-medium">
                  Company:
                </label>
                <input
                  type="text"
                  id="company"
                  value={companyFilter}
                  onChange={(e) => setCompanyFilter(e.target.value)}
                  className="shadow-sm rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="location" className="mb-2 text-sm font-medium">
                  Location:
                </label>
                <select
                  id="location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="shadow-sm rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="All">All Locations</option>
                  <option value="New York, NY">New York</option>
                  <option value="San Francisco, CA">San Francisco</option>
                  <option value="Seattle, WA">Seattle</option>
                  <option value="Los Angeles, CA">Los Angeles</option>
                  <option value="Chicago, IL">Chicago</option>
                  {new Set(jobs.map((job) => job.location))
                    .values()
                    .map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="items-center px-4 py-2 bg-indigo-500 text-white font-bold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-3 mb-4"
            >
              Search
            </button>
            {searchResults.length === 0 ? (
              <p className="text-gray-500 text-center">
                No jobs found matching your criteria.
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                <h2 className="mx-auto mt-5">Search Results</h2>
                {searchResults.map((job) => (
                  <Link to="/summarizer">
                    <div
                      key={job.title}
                      className="shadow-sm rounded-md p-4 hover:shadow-lg"
                    >
                      <h3 className="text-lg font-medium mb-2">{job.title}</h3>
                      <p className="text-gray-700 mb-2">
                        <b>Company:</b> {job.company}
                      </p>
                      <p className="text-gray-700 mb-2">
                        <b>Location:</b> {job.location}
                      </p>
                      <p className="text-gray-700 mb-2">
                        <b>Salary:</b> {job.pay}
                      </p>
                      {/* Display other job details */}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Opportunities;
