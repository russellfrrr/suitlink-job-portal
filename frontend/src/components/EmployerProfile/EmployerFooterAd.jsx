const EmployerFooterAd = () => {
  return (
    <div className="mt-10 bg-emerald-700 text-white rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between shadow-md">
      <div className="mb-4 md:mb-0">
        <h3 className="text-lg font-medium">
          Accelerate Your Hiring Process
        </h3>
        <p className="text-sm text-emerald-100 mt-1">
          Discover a smarter way to manage applicants and streamline job postings.
        </p>
      </div>

      <button
        className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-800 transition text-sm font-medium"
        type="button"
      >
        Explore Hiring Tools
      </button>
    </div>
  );
};

export default EmployerFooterAd;
