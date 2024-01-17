import { toast } from 'sonner';
import { TMailValidator } from 'src/lib/validators/mail-validator';

export function sendEmail(data: TMailValidator) {
    const apiEndpoint = '/api/email';

    fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((response) => {
            toast.success('email sent successfully!');
        })
        .catch((err) => {
            toast.error(err);
        });
}
