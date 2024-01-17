import { Metadata } from 'next';

import { Inter, Roboto, Poppins } from 'next/font/google';
import './globals.css';
import Providers from 'src/providers/react-query-provider';
import Navbar from 'src/components/navbar/Navbar';
import Footer from 'src/components/footer/Footer';
import { AuthProvider } from 'src/providers/auth-context-provider';
import { Toaster } from 'sonner';
import { ChakraProviders } from 'src/providers/chakra-ui-provider';

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
                    <ChakraProviders>
                        <AuthProvider>
                            <div className="main">
                                <div className="container">
                                    <Navbar />
                                    {children}
                                    <Footer />
                                </div>
                            </div>
                        </AuthProvider>
                    </ChakraProviders>
                </Providers>
                <Toaster position="top-right" richColors />
            </body>
        </html>
    );
}
