import React from 'react';
import Button from "@mui/material/Button"

export default function Pagination ({ currentPage, setCurrentPage, resultsPerPage, totalResults }) {
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="flex justify-center mt-4">
            <ul className="inline-flex -space-x-px">
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button
                            onClick={() => setCurrentPage(number)}
                            className={`
                                border-cyan-600 hover:border-cyan-500 border-2 border-collapse w-12 h-12
                                ${number === 1 ? "rounded-l" : ""}
                                ${number === totalPages ? "rounded-r" : ""}
                                ${
                                currentPage === number
                                    ? 'text-gray-800 bg-cyan-600 hover:bg-cyan-500'
                                    : 'text-gray-500 hover:text-gray-400'
                                }
                            `}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
