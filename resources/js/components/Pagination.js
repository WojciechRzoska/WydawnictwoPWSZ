import React, {useState} from 'react';

function Pagination(props) {
    const pageNumbers = [];
    const [activeNumber, setActiveNumber] = useState(1);
    for (let i = 1; i <= Math.ceil(props.totalBooks / props.booksPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={() => {
                            props.paginate(number);
                            setActiveNumber(number);
                        }}
                           className="page-link"
                           id={activeNumber === number ? "active" : "no-active"}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;
