const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-600 dark:border-neutral-400"></div>
      <span className="ml-3 text-neutral-600 dark:text-neutral-400">
        Loading your recalls...
      </span>
    </div>
  );
};

export default LoadingSpinner;
