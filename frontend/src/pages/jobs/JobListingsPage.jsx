import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import jobService from "../../services/jobService";
import EmployerNavbar from "../../components/EmployerDashboard/EmployerNavBar";

const JobListingsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    employmentType: searchParams.get("employmentType") || "",
    remote: searchParams.get("remote") || "",
    salaryMin: searchParams.get("salaryMin") || "",
    salaryMax: searchParams.get("salaryMax") || "",
  });

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    fetchJobs(page);
  }, [searchParams]);

  const fetchJobs = async (page = 1) => {
    try {
      setLoading(true);

      const params = {
        page,
        limit: 10,
        ...(filters.employmentType && { employmentType: filters.employmentType }),
        ...(filters.remote && { remote: filters.remote }),
        ...(filters.salaryMin && { salaryMin: filters.salaryMin }),
        ...(filters.salaryMax && { salaryMax: filters.salaryMax }),
      };

      const response = await jobService.getJobs(params);

      if (response?.success) {
        setJobs(response.data.jobs || []);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    params.set("page", "1");

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    setSearchParams(params);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setFilters({
      employmentType: "",
      remote: "",
      salaryMin: "",
      salaryMax: "",
    });
    setSearchParams({ page: "1" });
    setShowFilters(false);
  };

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);
  };

  const handleJobClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const formatSalary = (salaryRange) => {
    if (!salaryRange || (!salaryRange.min && !salaryRange.max)) return "Negotiable";

    const currency = salaryRange.currency || "PHP";
    const min = salaryRange.min ? `${salaryRange.min.toLocaleString()}` : "";
    const max = salaryRange.max ? `${salaryRange.max.toLocaleString()}` : "";

    if (min && max) return `${currency} ${min} - ${max}`;
    if (min) return `${currency} ${min}+`;
    if (max) return `Up to ${currency} ${max}`;
    return "Negotiable";
  };

  const employmentTypeLabels = {
    "full-time": "Full-time",
    "part-time": "Part-time",
    contract: "Contract",
    internship: "Internship",
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40">
        <EmployerNavbar />
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-medium text-gray-900 mb-1">Browse Jobs</h1>
            <p className="text-gray-600">
              Find your next opportunity from{" "}
              <span className="font-medium text-gray-900">{pagination.totalItems}</span>{" "}
              available positions
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowFilters(true)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition text-sm font-medium text-gray-700"
          >
            <Filter className="w-4 h-4" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold ring-1 ring-emerald-200">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop Filters */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                {activeFiltersCount > 0 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                    {activeFiltersCount} applied
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Employment Type
                  </label>
                  <select
                    value={filters.employmentType}
                    onChange={(e) => handleFilterChange("employmentType", e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
                  >
                    <option value="">All Types</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Work Type
                  </label>
                  <select
                    value={filters.remote}
                    onChange={(e) => handleFilterChange("remote", e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
                  >
                    <option value="">All</option>
                    <option value="true">Remote</option>
                    <option value="false">On-site</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Min Salary
                    </label>
                    <input
                      type="number"
                      value={filters.salaryMin}
                      onChange={(e) => handleFilterChange("salaryMin", e.target.value)}
                      placeholder="30000"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Max Salary
                    </label>
                    <input
                      type="number"
                      value={filters.salaryMax}
                      onChange={(e) => handleFilterChange("salaryMax", e.target.value)}
                      placeholder="80000"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={applyFilters}
                    className="w-full px-4 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition text-sm font-medium"
                  >
                    Apply Filters
                  </button>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition text-sm font-medium"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Listings */}
          <section className="lg:col-span-3 space-y-4">
            {loading ? (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600 mx-auto mb-3"></div>
                <p className="text-sm text-gray-600">Loading jobs...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600">Try adjusting your filters</p>
                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-6 px-5 py-2.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition text-sm font-medium"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Top meta bar */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex items-center justify-between gap-3">
                  <p className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-medium text-gray-900">
                      {(pagination.page - 1) * pagination.limit + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium text-gray-900">
                      {Math.min(pagination.page * pagination.limit, pagination.totalItems)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-gray-900">
                      {pagination.totalItems}
                    </span>{" "}
                    jobs
                  </p>

                  {activeFiltersCount > 0 && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm font-medium"
                    >
                      <X className="w-4 h-4" />
                      Clear filters
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div
                      key={job._id}
                      onClick={() => handleJobClick(job._id)}
                      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {job.title}
                          </h3>
                          <p className="text-sm text-gray-600 truncate">
                            {job.company?.companyName || "Company"}
                          </p>
                        </div>

                        {job.remote && (
                          <span className="shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-200">
                            Remote
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                        <div className="inline-flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="truncate">{job.location}</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5">
                          <DollarSign className="w-4 h-4 text-gray-500" />
                          <span className="truncate">{formatSalary(job.salaryRange)}</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>
                            {employmentTypeLabels[job.employmentType] || job.employmentType}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-sm text-gray-600">
                    Page{" "}
                    <span className="font-medium text-gray-900">{pagination.page}</span>{" "}
                    of{" "}
                    <span className="font-medium text-gray-900">{pagination.totalPages}</span>
                  </div>

                  <div className="flex items-center gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => goToPage(pagination.page - 1)}
                      disabled={!pagination.hasPrevPage}
                      className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>

                    <button
                      type="button"
                      onClick={() => goToPage(pagination.page + 1)}
                      disabled={!pagination.hasNextPage}
                      className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Next page"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </main>

      {/* Mobile Filters Sheet */}
      {showFilters && (
        <div
          className="fixed inset-0 z-50 bg-black/40 lg:hidden"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setShowFilters(false);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl border-l border-gray-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <h3 className="text-base font-medium text-gray-900">Filters</h3>
                {activeFiltersCount > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold ring-1 ring-emerald-200">
                    {activeFiltersCount}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-64px)]">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Employment Type
                </label>
                <select
                  value={filters.employmentType}
                  onChange={(e) => handleFilterChange("employmentType", e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
                >
                  <option value="">All Types</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Work Type</label>
                <select
                  value={filters.remote}
                  onChange={(e) => handleFilterChange("remote", e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
                >
                  <option value="">All</option>
                  <option value="true">Remote</option>
                  <option value="false">On-site</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Min Salary</label>
                  <input
                    type="number"
                    value={filters.salaryMin}
                    onChange={(e) => handleFilterChange("salaryMin", e.target.value)}
                    placeholder="30000"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Max Salary</label>
                  <input
                    type="number"
                    value={filters.salaryMax}
                    onChange={(e) => handleFilterChange("salaryMax", e.target.value)}
                    placeholder="80000"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={applyFilters}
                  className="w-full px-4 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition text-sm font-medium"
                >
                  Apply Filters
                </button>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition text-sm font-medium"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListingsPage;
