const Loader = ({ showText = true, showIcon = true }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {showIcon && (
        <div className="size-6 animate-spin border border-b-2 border-blue-600 rounded-full" />
      )}
      {showText && <span className="text-sm animate-pulse">Loading...</span>}
    </div>
  );
};

export default Loader;