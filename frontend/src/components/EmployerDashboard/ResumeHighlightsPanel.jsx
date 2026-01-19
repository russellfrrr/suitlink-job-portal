import { Sparkles, Briefcase, GraduationCap, RefreshCw } from "lucide-react";

const ResumeHighlightsPanel = ({ applicantRecord, onRefresh }) => {
  // Extract AI analysis from backend response
  const analysis = applicantRecord?.applicant?.resumeAnalysis;
  const hasAnalysis = !!analysis;

  const renderScore = () => {
    if (!analysis?.score) return null;

    return (
      <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center">
            <span className="text-lg font-bold text-white">{analysis.score}</span>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-emerald-900">Resume Score</p>
          <p className="text-xs text-emerald-700 mt-0.5">
            {analysis.seniority && `${analysis.seniority} level`}
          </p>
        </div>
      </div>
    );
  };

  const renderStrengths = () => {
    if (!analysis?.strengths || analysis.strengths.length === 0) return null;

    return (
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
          Strengths
        </h4>
        <ul className="space-y-2">
          {analysis.strengths.map((strength, index) => (
            <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-emerald-600 mt-1">•</span>
              <span>{strength}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderWeaknesses = () => {
    if (!analysis?.weaknesses || analysis.weaknesses.length === 0) return null;

    return (
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
          Areas for Improvement
        </h4>
        <ul className="space-y-2">
          {analysis.weaknesses.map((weakness, index) => (
            <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-gray-400 mt-1">•</span>
              <span>{weakness}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderSuggestions = () => {
    if (!analysis?.suggestions || analysis.suggestions.length === 0) return null;

    return (
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          Suggestions
        </h4>
        <ul className="space-y-2">
          {analysis.suggestions.map((suggestion, index) => (
            <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderExperience = () => {
    const experience = applicantRecord?.applicant?.experience;
    if (!experience || experience.length === 0) return null;

    return (
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-gray-600" />
          Experience Highlights
        </h4>
        <div className="space-y-3">
          {experience.slice(0, 3).map((exp, index) => (
            <div key={index} className="pl-4 border-l-2 border-gray-200">
              <p className="text-sm font-medium text-gray-900">{exp.position}</p>
              <p className="text-sm text-gray-600">{exp.company}</p>
              {(exp.startDate || exp.endDate) && (
                <p className="text-xs text-gray-500 mt-1">
                  {exp.startDate && new Date(exp.startDate).getFullYear()}
                  {exp.endDate && ` - ${new Date(exp.endDate).getFullYear()}`}
                  {exp.isCurrent && " - Present"}
                </p>
              )}
            </div>
          ))}
          {experience.length > 3 && (
            <p className="text-xs text-gray-500 pl-4">
              +{experience.length - 3} more positions
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderEducation = () => {
    const education = applicantRecord?.applicant?.education;
    if (!education || education.length === 0) return null;

    return (
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-gray-600" />
          Education
        </h4>
        <div className="space-y-3">
          {education.slice(0, 2).map((edu, index) => (
            <div key={index} className="pl-4 border-l-2 border-gray-200">
              <p className="text-sm font-medium text-gray-900">{edu.school}</p>
              {edu.degree && (
                <p className="text-sm text-gray-600">{edu.degree}</p>
              )}
              {edu.fieldOfStudy && (
                <p className="text-xs text-gray-500 mt-1">{edu.fieldOfStudy}</p>
              )}
            </div>
          ))}
          {education.length > 2 && (
            <p className="text-xs text-gray-500 pl-4">
              +{education.length - 2} more
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderSkills = () => {
    const skills = applicantRecord?.applicant?.skills;
    if (!skills || skills.length === 0) return null;

    return (
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2">Top Skills</h4>
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 8).map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium ring-1 ring-emerald-200"
            >
              {skill}
            </span>
          ))}
          {skills.length > 8 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              +{skills.length - 8} more
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-medium text-gray-900">Resume Highlights</h3>
          </div>
          <p className="text-sm text-gray-600">AI-parsed summary from the applicant's resume</p>
        </div>

        {hasAnalysis && onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-600"
            title="Refresh analysis"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content */}
      {hasAnalysis ? (
        <div className="space-y-6">
          {renderScore()}
          {renderSkills()}
          {renderStrengths()}
          {renderWeaknesses()}
          {renderSuggestions()}
          {renderExperience()}
          {renderEducation()}
        </div>
      ) : (
        <div className="py-12 text-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-sm text-gray-600 mb-2">No analysis available yet</p>
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeHighlightsPanel;
