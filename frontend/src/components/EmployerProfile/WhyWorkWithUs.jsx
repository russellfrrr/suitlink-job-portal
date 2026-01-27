const WhyWorkWithUs = ({ companyProfile }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Why Work With Us
      </h2>

      <p className="text-sm text-gray-700 leading-relaxed mb-6">
        {companyProfile.tagline ||
          "We build an environment where people can do their best work, grow professionally, and contribute to meaningful outcomes."}
      </p>

      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <span className="h-2 w-2 bg-emerald-600 rounded-full mt-2"></span>
          <p className="text-sm text-gray-700">
            A culture that values collaboration, transparency, and continuous learning.
          </p>
        </li>

        <li className="flex items-start gap-3">
          <span className="h-2 w-2 bg-emerald-600 rounded-full mt-2"></span>
          <p className="text-sm text-gray-700">
            Opportunities to work on impactful projects and develop new skills.
          </p>
        </li>

        <li className="flex items-start gap-3">
          <span className="h-2 w-2 bg-emerald-600 rounded-full mt-2"></span>
          <p className="text-sm text-gray-700">
            Competitive compensation packages aligned with performance and experience.
          </p>
        </li>

        <li className="flex items-start gap-3">
          <span className="h-2 w-2 bg-emerald-600 rounded-full mt-2"></span>
          <p className="text-sm text-gray-700">
            Flexible work arrangements to support work–life balance.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default WhyWorkWithUs;
