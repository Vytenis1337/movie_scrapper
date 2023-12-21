import Link from 'next/link';
import styles from './page.module.css';
import HomeNavigationButton from 'src/components/homeNavigationButton/HomeNavigationButton';

export default function Home() {
    return (
        <div className={styles.home}>
            <div className={styles.home_content}>
                <HomeNavigationButton />
                <Link as="/movies" href="/movies">
                    <button className={styles.home_button}>
                        <span>Movies</span>
                    </button>
                </Link>
            </div>
        </div>
    );
}
