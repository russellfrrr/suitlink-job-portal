import FormSection from "./FormSection";
import InputField from "./InputField";
import SelectField from "./SelectField";

const BasicInfoSection = ({ formData, onChange, errors }) => {
  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
  const workStyles = ["Office", "Remote", "Hybrid"];

  return (
    <FormSection title="Basic Information">
      <div className="space-y-5">

        {/* Job Title */}
        <InputField
          id="jobTitle"
          label="Job Title"
          value={formData.jobTitle}
          onChange={(e) => onChange("jobTitle", e.target.value)}
          placeholder="e.g., Senior UX Designer"
          required
          error={errors.jobTitle}
        />

        {/* Job Type + Work Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField
            id="jobType"
            label="Job Type"
            value={formData.jobType}
            onChange={(e) => onChange("jobType", e.target.value)}
            options={jobTypes}
            required
            error={errors.jobType}
          />

          <SelectField
            id="workStyle"
            label="Work Style"
            value={formData.workStyle}
            onChange={(e) => onChange("workStyle", e.target.value)}
            options={workStyles}
            required
            error={errors.workStyle}
          />
        </div>

        {/* Location */}
        <InputField
          id="location"
          label="Location"
          value={formData.location}
          onChange={(e) => onChange("location", e.target.value)}
          placeholder="e.g., Makati City"
          required
          error={errors.location}
        />

        {/* Salary Range */}
        <div>
          <label
            htmlFor="salaryMin"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Salary Range <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              id="salaryMin"
              type="number"
              label=""
              value={formData.salaryMin}
              onChange={(e) => onChange("salaryMin", e.target.value)}
              placeholder="Minimum (PHP)"
              error={errors.salaryMin}
            />

            <InputField
              id="salaryMax"
              type="number"
              label=""
              value={formData.salaryMax}
              onChange={(e) => onChange("salaryMax", e.target.value)}
              placeholder="Maximum (PHP)"
              error={errors.salaryMax}
            />
          </div>
        </div>
      </div>
    </FormSection>
  );
};

export default BasicInfoSection;
