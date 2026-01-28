const ApplicantAvatar = ({ applicant, size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-11 h-11 text-sm",
    lg: "w-16 h-16 text-base",
  };

  const getInitials = () => {
    if (!applicant) return "?";
    const first = applicant.firstName?.[0] || "";
    const last = applicant.lastName?.[0] || "";
    return (first + last).toUpperCase() || "?";
  };

  const imageUrl = applicant?.profileImage?.url;

  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`${applicant?.firstName || ""} ${applicant?.lastName || ""}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to initials on image load error
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      ) : null}
      <div
        className={`w-full h-full bg-emerald-600 text-white flex items-center justify-center font-medium ${
          imageUrl ? "hidden" : "flex"
        }`}
      >
        {getInitials()}
      </div>
    </div>
  );
};

export default ApplicantAvatar;
