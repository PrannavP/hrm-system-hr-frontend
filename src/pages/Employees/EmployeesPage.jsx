import { useEffect, useRef, useState } from "react";
import { employeesList } from "../../services/api";
import SideNavBar from "../../components/SideNavBar";
import { Link } from "react-router-dom";

const EmployeePage = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("All");
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const popupRef = useRef(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await employeesList();
                const data = response.data.employees || [];
                setEmployees(data);
                setFilteredEmployees(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching employees:", error);
                setEmployees([]);
                setFilteredEmployees([]);
            }
        };

        fetchEmployees();
    }, []);

    useEffect(() => {
        let temp = [...employees];

        if (search.trim()) {
            temp = temp.filter((emp) =>
                `${emp.first_name} ${emp.last_name}`.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (departmentFilter !== "All") {
            temp = temp.filter((emp) => emp.department === departmentFilter);
        }

        setFilteredEmployees(temp);
    }, [search, departmentFilter, employees]);

    const handleThreeDotsClick = (event, employee) => {
        event.stopPropagation();

        const popupWidth = 160;
        const popupHeight = 120;
        const padding = 8;

        // Get cursor position in viewport coordinates
        let x = event.clientX;
        let y = event.clientY;

        // Adjust for right edge
        if (x + popupWidth > window.innerWidth) {
            x = window.innerWidth - popupWidth - padding;
        }

        // Adjust for left edge
        if (x < padding) {
            x = padding;
        }

        // Adjust for bottom edge
        if (y + popupHeight > window.innerHeight) {
            y = window.innerHeight - popupHeight - padding;
        }

        // Adjust for top edge
        if (y < padding) {
            y = padding;
        }

        setPopupPosition({ x, y });
        setSelectedEmployee(employee);
        setPopupVisible(true);
        console.log(employee);
    };   

    const closePopup = () => {
        setPopupVisible(false);
        setSelectedEmployee(null);
    };

    const departmentOptions = ["All", "HR", "Engineering", "Sales", "Finance"];

    return (
        <div className="flex" onClick={closePopup}>
            <SideNavBar />
            <div className="flex-1 p-8 relative">
                <h1 className="text-2xl font-bold mb-6">Employee List</h1>

                {/* Search & Filters */}
                <div className="flex gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search employees..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={departmentFilter}
                        onChange={(e) => setDepartmentFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {departmentOptions.map((dep) => (
                            <option key={dep} value={dep}>
                                {dep === "All" ? "All Departments" : dep}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="table-auto w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
                                <th className="py-3 px-6">Employee</th>
                                <th className="py-3 px-6">Department</th>
                                <th className="py-3 px-6">Position</th>
                                <th className="py-3 px-6">Join Date</th>
                                <th className="py-3 px-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                            {filteredEmployees.length > 0 ? (
                                filteredEmployees.map((employee) => (
                                    <tr
                                        key={employee.emp_id}
                                        className="border-b border-gray-200 hover:bg-gray-50"
                                    >
                                        <td className="py-3 px-6 flex items-center">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
                                            <img
                                                src={`http://localhost:5000/${employee.image}`}
                                                alt={`${employee.first_name} ${employee.last_name}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                            <div className="ml-4">
                                                <p className="font-medium">
                                                    {employee.first_name} {employee.last_name}
                                                </p>
                                                <p className="text-gray-500 text-sm">{employee.email}</p>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6">{employee.department}</td>
                                        <td className="py-3 px-6">{employee.role}</td>
                                        <td className="py-3 px-6">
                                            {new Date(employee.join_date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </td>
                                        <td className="py-3 px-6 text-right">
                                            <button
                                                className="text-gray-500 hover:text-gray-700"
                                                onClick={(e) => handleThreeDotsClick(e, employee)}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM10 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM17 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-3 px-6 text-center text-gray-500">
                                        No employees found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Popup */}
                {popupVisible && (
                    <div
                        ref={popupRef}
                        className="fixed bg-white border border-gray-200 shadow-lg rounded-md z-50 w-40"
                        style={{
                            left: `${popupPosition.x}px`,
                            top: `${popupPosition.y}px`,
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ul className="py-1">
                            <li>
                                <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View Employee</Link>
                            </li>
                            <li>
                                <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</Link>
                            </li>
                            <li>
                                <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Delete</Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeePage;