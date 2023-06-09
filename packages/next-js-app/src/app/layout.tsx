import { Metadata } from 'next';

import { Inter, Roboto, Poppins } from 'next/font/google';
import './globals.css';
import Providers from 'src/utils/provider';
import Navbar from 'src/components/navbar/Navbar';
import Footer from 'src/components/footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Reflix Vytenis 2023',
    description: 'This is the Home Page',
};

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <div className="container">
                        <Navbar />
                        {children}
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    );
}
