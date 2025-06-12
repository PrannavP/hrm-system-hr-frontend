import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { employeeDetail } from "../../services/api";
import SideNavBar from "../../components/SideNavBar";

const EmployeeDetailsPage = () => {
    const { id } = useParams();

    const [employeeDetails, setEmployeeDetails] = useState({});

    useEffect(() => {
        fetchEmployeeDetail(id);
    }, [id]);

    const fetchEmployeeDetail = async (emp_id) => {
        try {
            const response = await employeeDetail(emp_id);
            setEmployeeDetails(response.data.employee); // Access the "employee" object
            console.log(response.data.employee);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* SideNavBar */}
            <SideNavBar />

            {/* Main Content */}
            <div className="flex-1 p-8">
                <div className="flex flex-col items-center mb-8">
                    {/* Profile Image */}
                    <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden shadow-md">
                        <img
                            src={`http://localhost:5000/${employeeDetails.image}`}
                            alt={`${employeeDetails.first_name} ${employeeDetails.last_name}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Employee Name */}
                    <h2 className="text-2xl font-bold text-gray-800 mt-4">
                        {employeeDetails.first_name} {employeeDetails.last_name}
                    </h2>
                </div>

                {/* Employee Details Table */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <table className="table-auto w-full text-left border-collapse">
                        <tbody className="text-gray-700 text-sm">
                            <tr className="border-b border-gray-200">
                                <td className="py-3 px-6 font-medium text-gray-600">Employee ID</td>
                                <td className="py-3 px-6">{employeeDetails.emp_id}</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-3 px-6 font-medium text-gray-600">Email</td>
                                <td className="py-3 px-6">{employeeDetails.email}</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-3 px-6 font-medium text-gray-600">Department</td>
                                <td className="py-3 px-6">{employeeDetails.department}</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-3 px-6 font-medium text-gray-600">Role</td>
                                <td className="py-3 px-6">{employeeDetails.role}</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-3 px-6 font-medium text-gray-600">Phone Number</td>
                                <td className="py-3 px-6">{employeeDetails.phone_number}</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-3 px-6 font-medium text-gray-600">Address</td>
                                <td className="py-3 px-6">{employeeDetails.address}</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-3 px-6 font-medium text-gray-600">Join Date</td>
                                <td className="py-3 px-6">
                                    {new Date(employeeDetails.join_date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetailsPage;