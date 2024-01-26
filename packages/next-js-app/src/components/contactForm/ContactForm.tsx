'use client';

import { sendEmail } from 'src/utils/send-email';
import styles from './page.module.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MailValidator, TMailValidator } from 'src/lib/validators/mail-validator';

export type FormDataType = {
    name: string;
    email: string;
    message: string;
};

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TMailValidator>({ resolver: zodResolver(MailValidator) });

    function onSubmit(data: TMailValidator) {
        sendEmail(data);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.contacts_form}>
            <h1>Write Me</h1>
            <div className={styles.contacts_form_field}>
                <label htmlFor="name" className={styles.contacts_form_label}>
                    name
                </label>
                <input
                    type="text"
                    placeholder="Name"
                    className={styles.contacts_form_input}
                    {...register('name', { required: true })}
                />
                {errors?.name && <p>{errors.name.message}</p>}
            </div>
            <div className={styles.contacts_form_field}>
                <label htmlFor="email" className={styles.contacts_form_label}>
                    email
                </label>
                <input
                    type="email"
                    placeholder="example@domain.com"
                    className={styles.contacts_form_input}
                    {...register('email')}
                />
                {errors?.email && <p>{errors.email.message}</p>}
            </div>
            <div className={styles.contacts_form_field}>
                <label htmlFor="message" className={styles.contacts_form_label}>
                    message
                </label>
                <textarea
                    rows={4}
                    placeholder="Type your message"
                    className={styles.contacts_form_input}
                    {...register('message', { required: true })}
                ></textarea>
                {errors?.message && <p>{errors.message.message}</p>}
            </div>
            <div>
                <button disabled={isSubmitting} className={styles.contacts_form_button}>
                    {isSubmitting ? 'loading' : 'send message'}
                </button>
            </div>
        </form>

        // <form
        //     className={styles.contacts_form}
        //     action="https://formsubmit.co/vytenis.kondrackis@gmail.com"
        //     method="POST"
        // >
        //     <h1>Write Me</h1>
        //     <div className={styles.contacts_form_field}>
        //         <label className={styles.contacts_form_label}>name</label>
        //         <input required type="text" name="name" className={styles.contacts_form_input} />
        //     </div>

        //     <div className={styles.contacts_form_field}>
        //         <label className={styles.contacts_form_label}>email</label>
        //         <input required type="email" name="email" className={styles.contacts_form_input} />
        //     </div>
        //     <div className={styles.contacts_form_field}>
        //         <label className={styles.contacts_form_label}>message</label>
        //         <textarea required name="message" className={styles.contacts_form_input}></textarea>
        //     </div>

        //     <div>
        //         <button className={styles.contacts_form_button}>send message</button>
        //     </div>
        // </form>
    );
};

export default ContactForm;
