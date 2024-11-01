import React, { useState, useEffect } from 'react';

const DeveloperFinder = () => {
  const [developers, setDevelopers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [domainFilter, setDomainFilter] = useState('');

  useEffect(() => {
    fetchDevelopers();
  }, [currentPage, searchTerm, domainFilter]);

  const fetchDevelopers = async () => {
    try {
      const response = await fetch(`https://render-backend-clnp.onrender.com/api/developers`);
      const data = await response.json();
      console.log('Fetched Developers:', data); // Log the fetched data
      setDevelopers(data.results || data); // Handle both cases: with pagination or not
      setTotalPages(Math.ceil((data.count || data.length) / 9)); // Update total pages based on results
    } catch (error) {
      console.error('Error fetching developers:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleDomainFilter = (e) => {
    setDomainFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Filter by domain..."
          value={domainFilter}
          onChange={handleDomainFilter}
          className="border p-2 rounded ml-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {developers.map((developer) => (
          <div key={developer.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{developer.name}</h3>
              <p className="text-gray-600 mb-2">{developer.domain_expertise}</p>
              <p className="text-gray-600 mb-2">Branch: {developer.branch}</p>
              <div className="space-y-1">
                {Array.isArray(developer.projects) ? (
                  developer.projects.map((project, index) => (
                    <div key={index} className="text-gray-500">{project}</div>
                  ))
                ) : (
                  <div className="text-red-500">Projects data is not available</div>
                )}
              </div>
            </div>
            <div className="bg-gray-100 px-4 py-3 flex justify-end">
              <a href={`mailto:${developer.domain_mail_id}`} className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                Contact
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            className={`mx-1 ${currentPage === page ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DeveloperFinder;
