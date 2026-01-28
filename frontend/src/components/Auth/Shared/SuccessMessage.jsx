const SuccessMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
      <p className="text-sm text-green-600">{message}</p>
    </div>
  );
};

export default SuccessMessage;
