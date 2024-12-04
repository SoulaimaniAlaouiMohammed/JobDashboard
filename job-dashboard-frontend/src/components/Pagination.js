import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="pagination-container">
            {currentPage > 1 && (
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    className="pagination-button"
                >
                    Previous
                </button>
            )}

            {pageNumbers.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`pagination-button ${
                        currentPage === page ? "active" : ""
                    }`}
                >
                    {page}
                </button>
            ))}

            {currentPage < totalPages && (
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    className="pagination-button"
                >
                    Next
                </button>
            )}
        </div>
    );
};

export default Pagination;
