const CompanyCulture = ({ companyProfile }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Company Culture
      </h2>

      <p className="text-sm text-gray-700 leading-relaxed">
        {companyProfile.cultureDescription ||
          "Our team thrives on shared purpose, open communication, and a genuine commitment to delivering excellence."}
      </p>
    </div>
  );
};

export default CompanyCulture;
