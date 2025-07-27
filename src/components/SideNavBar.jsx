import { Link, useNavigate } from "react-router-dom";
import { RxDashboard, RxClock, RxCheckbox, RxCalendar, RxExit } from "react-icons/rx";

const SideNavBar = () => {
    const navigate = useNavigate();

    const logoutFnc = () => {
        // clear token from localstorage
        localStorage.removeItem('token');

        navigate("/login");
    };

    return (
        <div className="h-screen w-64 bg-white text-black flex flex-col border-r border-gray-300">
            <div className="flex items-center justify-center h-20 border-b border-gray-300">
                <h1 className="text-2xl font-bold">HR Portal</h1>
            </div>
            <nav className="flex-1 ml-1 px-4 py-6">
                <ul>
                    <li className="mb-4">
                        <Link to="/" className="flex items-center text-lg font-medium hover:text-gray-500">
                            <RxDashboard className="mr-2 text-black" />
                            Dashboard
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/employees" className="flex items-center text-lg font-medium hover:text-gray-500">
                            <RxClock className="mr-2 text-black" />
                            Employees
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/attendance" className="flex items-center text-lg font-medium hover:text-gray-500">
                            <RxClock className="mr-2 text-black" />
                            Attendance
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/tasks" className="flex items-center text-lg font-medium hover:text-gray-500">
                            <RxCheckbox className="mr-2 text-black" />
                            Tasks
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/leaves" className="flex items-center text-lg font-medium hover:text-gray-500">
                            <RxCalendar className="mr-2 text-black" />
                            Leave Management
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/performance-evaluation" className="flex items-center text-lg font-medium hover:text-gray-500">
                            <RxCalendar className="mr-2 text-black" />
                            Performance Evaluate
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/predict-attrition" className="flex items-center text-lg font-medium hover:text-gray-500">
                            <RxCalendar className="mr-2 text-black" />
                            Attrition Prediction
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="mt-auto flex items-center justify-center h-20 border-t border-gray-300">
                <button onClick={logoutFnc} className="button flex items-center text-lg font-medium hover:text-gray-500">
                    <RxExit className="mr-2 text-black" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default SideNavBar;