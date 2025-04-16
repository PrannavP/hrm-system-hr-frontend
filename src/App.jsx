import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

import '../src/styles/main.css';

import LoginPage from './pages/LoginPage';
import IndexPage from "./pages/Dashboard/IndexPage";
import EmployeePage from './pages/Employees/EmployeesPage';

const App = () => {
    return(
        <UserProvider>
            <Router>
                <Routes>
                    <Route path='/login' element={<LoginPage />} />

                    <Route path='/' element={<IndexPage />} />

                    <Route path='/employees' element={<EmployeePage />} />

                    <Route path='*' element={<h1>Page Not Found</h1>} />
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;