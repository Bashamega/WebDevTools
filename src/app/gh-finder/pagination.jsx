import React from 'react';

export default function Pagination ({ currentPage, setCurrentPage, resultsPerPage, totalResults }) {
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="flex justify-center mt-4">
            <ul className="grid justify-center rounded-2xl grid-cols-10">
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button
                            onClick={() => setCurrentPage(number)}
                            className={`
                                border-cyan-600 hover:border-cyan-500 border-2 w-12 h-12
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
