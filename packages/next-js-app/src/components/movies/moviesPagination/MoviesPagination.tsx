import { Button } from '@chakra-ui/react';
import styles from './page.module.css';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

const MoviesPagination = ({ setCurrentPage, currentPage, visibleItems, itemsPerPage, totalPages }: any) => {
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <div className={styles.button_container}>
            <button
                onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
            >
                <ArrowLeftIcon boxSize={6} />
            </button>
            <div className={styles.pagination}>
                {/* Render pagination buttons */}
                {Array.from({ length: totalPages }).map((_, index) => (
                    <Button
                        size="md"
                        variant="link"
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        textDecoration={currentPage === index + 1 ? 'underline' : ''}
                        color={currentPage === index + 1 ? '#EA738D' : '#89ABE3'}
                    >
                        {index + 1}
                    </Button>
                ))}
            </div>
            <button
                onClick={() => setCurrentPage((prev: number) => prev + 1)}
                disabled={visibleItems.length < itemsPerPage}
            >
                <ArrowRightIcon boxSize={6} />
            </button>
        </div>
    );
};

export default MoviesPagination;
