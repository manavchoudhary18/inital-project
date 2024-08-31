import React, { useState } from "react";

// Updated Dummy data for colleges with placement details
const collegesData = [
  {
    id: 1,
    name: "IIT Madras - Indian Institute of Technology",
    collegeduniaRating: 8.5, // Based on user reviews, out of 10
    fees: 20000,
    userReviewRating: 4.2,
    location: "Chennai, Tamil Nadu",
    course: "B.Tech Computer Science Engineering",
    cutoff: 144,
    reviewCount: 10000,
    bestIn: "Social Life",
    averagePackage: "12 LPA", // Average Package
    highestPackage: "40 LPA", // Highest Package
  },
  {
    id: 2,
    name: "XYZ Institute",
    collegeduniaRating: 7.2,
    fees: 15000,
    userReviewRating: 3.8,
    location: "Delhi, India",
    course: "B.Sc. Mathematics",
    cutoff: 210,
    reviewCount: 8500,
    bestIn: "Research Facilities",
    averagePackage: "6 LPA",
    highestPackage: "15 LPA",
  },
  {
    id: 3,
    name: "PQR University",
    collegeduniaRating: 6.9,
    fees: 18000,
    userReviewRating: 4.0,
    location: "Mumbai, Maharashtra",
    course: "B.A. Economics",
    cutoff: 188,
    reviewCount: 12000,
    bestIn: "Campus Life",
    averagePackage: "5 LPA",
    highestPackage: "12 LPA",
  },
  {
    id: 4,
    name: "LMN College",
    collegeduniaRating: 9.1,
    fees: 25000,
    userReviewRating: 4.5,
    location: "Bangalore, Karnataka",
    course: "B.Tech Mechanical Engineering",
    cutoff: 132,
    reviewCount: 9500,
    bestIn: "Academic Excellence",
    averagePackage: "15 LPA",
    highestPackage: "50 LPA",
  },
  // Add more colleges as needed
];

const CollegeTable = () => {
  const [colleges, setColleges] = useState(collegesData.slice(0, 10));
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("collegeduniaRating");
  const [sortOrder, setSortOrder] = useState("asc");

  // Infinite scroll logic
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop === clientHeight) {
      const moreColleges = collegesData.slice(
        colleges.length,
        colleges.length + 10
      );
      setColleges((prev) => [...prev, ...moreColleges]);
    }
  };

  // Handle sorting
  const handleSort = (field) => {
    const isAsc = sortField === field && sortOrder === "asc";
    setSortField(field);
    setSortOrder(isAsc ? "desc" : "asc");
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filtered and sorted colleges
  const filteredColleges = colleges
    .filter((college) => college.name.toLowerCase().includes(searchTerm))
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });

  return (
    <div>
      <input
        type="text"
        placeholder="Search by College Name"
        onChange={handleSearch}
        className="border p-2 rounded mb-4"
      />
      <div className="overflow-auto max-h-96" onScroll={handleScroll}>
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th
                className="py-2 px-4 border-b"
                onClick={() => handleSort("name")}
              >
                Colleges
              </th>
              <th
                className="py-2 px-4 border-b"
                onClick={() => handleSort("fees")}
              >
                Course Fees{" "}
                {sortField === "fees" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th
                className="py-2 px-4 border-b"
                onClick={() => handleSort("userReviewRating")}
              >
                User Review Rating{" "}
                {sortField === "userReviewRating"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th
                className="py-2 px-4 border-b"
                onClick={() => handleSort("collegeduniaRating")}
              >
                Collegedunia Rating{" "}
                {sortField === "collegeduniaRating"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th className="py-2 px-4 border-b">Placement</th>
            </tr>
          </thead>
          <tbody>
            {filteredColleges.map((college) => (
              <tr key={college.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">
                  <div className="flex flex-col items-start">
                    <h4 className="text-blue-300 font-bold">{college.name}</h4>
                    <p className="font-extralight">{college.location}</p>
                    <div className="bg-yellow-400 flex flex-col border-l-2 border-gray-800 p-2 ">
                      <span className="text-orange-400 font-bold ">
                        {college.course}
                      </span>
                      <span className="text-blue-300 font-bold ">
                        JEE advance cutoff - {college.cutoff}
                      </span>
                    </div>
                    <div className="flex flex-row justify-between w-full">
                      <button className="text-orange-600">Apply Now</button>
                      <button className="text-green-400">
                        Download Brochure
                      </button>
                      <button>Add to Compare</button>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex flex-col items-start">
                    <span className="text-red-300">{college.fees}</span>
                    <span className="text-green-400">BE/B.Tech</span>
                    <span className="text-blue-300">-1st year fees</span>
                    <button className="text-orange-400">Compare Fees</button>
                  </div>
                </td>
                <td className="border-b">
                  <div className=" flex flex-col ">
                    {college.userReviewRating} / 5
                    <span className="text-green-400">
                      based on {college.reviewCount}+ reviews
                    </span>
                    <span className="text-green-400">
                      Best in {college.bestIn}
                    </span>
                  </div>
                </td>
                <td className="border-b">
                  #{college.collegeduniaRating} / 10 in India
                </td>
                <td className="border-b">
                  <div className="flex flex-col">
                    <span>Avg. Package: {college.averagePackage}</span>
                    <span>Highest Package: {college.highestPackage}</span>
                    <button className="text-orange-400">
                      Compare Placement
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollegeTable;
