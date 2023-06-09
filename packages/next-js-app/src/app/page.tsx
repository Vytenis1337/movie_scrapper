import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
    return (
        <div className={styles.home}>
            <div className={styles.home_content}>
                <Link as="/login" href="/login">
                    <button className={styles.home_button}>
                        {' '}
                        <span>Login</span>
                    </button>
                </Link>
                <Link as="/movies" href="/movies">
                    <button className={styles.home_button}>
                        <span>Movies</span>
                    </button>
                </Link>
            </div>
        </div>
    );
}
