interface Props {
  page: number;
  setPage: (p: number) => void;
  totalPages: number;
}

export function PaginationUi(props: Props) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (props.totalPages <= maxVisible) {
      for (let i = 1; i <= props.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (props.page <= 3) {
        pages.push(1, 2, 3, 4, '...', props.totalPages);
      } else if (props.page >= props.totalPages - 2) {
        pages.push(1, '...', props.totalPages - 3, props.totalPages - 2, props.totalPages - 1, props.totalPages);
      } else {
        pages.push(1, '...', props.page - 1, props.page, props.page + 1, '...', props.totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Previous Button */}
      <button
        onClick={() => props.setPage(Math.max(props.page - 1, 1))}
        disabled={props.page === 1}
        className="glass-card px-4 py-2 rounded-xl border border-white/30 
                 hover:bg-white/50 transition-all disabled:opacity-50 
                 disabled:cursor-not-allowed font-medium text-gray-700"
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex gap-2">
        {getPageNumbers().map((pageNum, idx) => {
          if (pageNum === '...') {
            return (
              <span key={`ellipsis-${idx}`} className="px-3 py-2 text-gray-600">
                ...
              </span>
            );
          }

          return (
            <button
              key={pageNum}
              onClick={() => props.setPage(pageNum as number)}
              className={`px-4 py-2 rounded-xl border transition-all font-medium
                ${
                  props.page === pageNum
                    ? 'bg-blue-500/80 backdrop-blur-md text-white border-blue-400/30 shadow-md'
                    : 'glass-card border-white/30 text-gray-700 hover:bg-white/50'
                }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => props.setPage(Math.min(props.page + 1, props.totalPages))}
        disabled={props.page === props.totalPages}
        className="glass-card px-4 py-2 rounded-xl border border-white/30 
                 hover:bg-white/50 transition-all disabled:opacity-50 
                 disabled:cursor-not-allowed font-medium text-gray-700"
      >
        Next
      </button>
    </div>
  );
}