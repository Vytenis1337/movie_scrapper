import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/login/Login';
import { Register } from './pages/register/Register';
import { Movies } from './pages/movies/Movies';
import { Navbar } from './components/Navbar/Navbar';
import { SingleMovie } from './pages/singleMovie/SingleMovie';
import { Trailer } from './pages/trailer/Trailer';
import { Library } from './pages/library/Library';
import { Home } from './pages/home/Home';

function App() {
    const queryClient = new QueryClient();

    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/movies" element={<Movies />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/movies/:id" element={<SingleMovie />} />
                        <Route path="/trailer/:id" element={<Trailer />} />
                        <Route path="/library" element={<Library />} />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </div>
    );
}
export default App;
