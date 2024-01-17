import { Metadata } from 'next';
import styles from './page.module.css';
import { socialIcons } from '../../utils/socialIcons';
import { SocialIcon } from 'src/components/socialIcon/SocialIcon';
import ContactForm from 'src/components/contactForm/ContactForm';

export const metadata: Metadata = {
    title: 'Contacts Page',
    description: 'This is the Contacts Page',
};

const Contacts = () => {
    return (
        <div className={styles.contacts}>
            <div className={styles.contacts_icons}>
                {socialIcons.map((item) => {
                    return <SocialIcon key={item.id} {...item} />;
                })}
            </div>

            <ContactForm />
        </div>
    );
};

export default Contacts;
