import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/login/Login';
import { Register } from './pages/register/Register';
import { Movies } from './pages/home/Movies';
import { Navbar } from './components/Navbar/Navbar';
import { SingleMovie } from './pages/singleMovie/SingleMovie';

function App() {
    const queryClient = new QueryClient();
    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/movies" element={<Movies />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/movies/single/:id" element={<SingleMovie />} />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </div>
    );
}
export default App;
