import styles from './page.module.css';

import { Metadata } from 'next';
import LibrarySection from 'src/components/library/LibrarySection';

export const metadata: Metadata = {
    title: 'Library Page',
    description: 'This is the Library Page',
};

const Library = () => {
    return (
        <div className={styles.library}>
            <LibrarySection />
        </div>
    );
};

export default Library;
