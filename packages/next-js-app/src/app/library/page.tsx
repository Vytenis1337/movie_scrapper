import styles from './page.module.css';

import { Metadata } from 'next';
import LibrarySection from 'src/components/library/LibrarySection';

export const metadata: Metadata = {
    title: 'Library Page',
    description: 'This is the Library Page',
};

// async function getData() {
//     const res = await fetch('http://localhost:3000/api/library');

//     if (!res.ok) {
//         throw new Error('Failed to fetch data');
//     }

//     return res.json();
// }

const Library = () => {
    // const data = await getData();

    return (
        <div className={styles.library}>
            <LibrarySection />
        </div>
    );
};

export default Library;
