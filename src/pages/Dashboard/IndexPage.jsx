import { useUser } from "../../hooks/useUser";
import SideNavBar from "../../components/SideNavBar";
import DashboardActiveTasksListCard from "./statistics-cards/DashboardActiveTasksListCard";
import DashboardEmployeesListCard from "./statistics-cards/DashboardEmployeesListCard";
import DashboardEmployeesOnLeaveCard from "./statistics-cards/DashboardEmployeesOnLeaveCard";
import { useEffect } from "react";

const IndexPage = () => {
    const { user } = useUser();
    const today = new Date().toLocaleDateString();

    useEffect(() => {
        // Only refresh once per session
        if (!window.sessionStorage.getItem("dashboardRefreshed")) {
            window.sessionStorage.setItem("dashboardRefreshed", "true");
            window.location.reload();
        }
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-md z-10">
                <SideNavBar />
            </div>
            <div className="dashboard-main-container ml-60 flex-1 p-8">
                {user ? (
                    <div>
                        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-2xl font-bold mb-1">HR Dashboard</h1>
                                <p className="text-gray-600">Welcome, {user.email}</p>
                            </div>
                            <div className="text-right mt-4 md:mt-0">
                                <span className="text-sm text-gray-500 font-semibold">
                                    Today's Date: {today}
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <DashboardEmployeesListCard />
                            <DashboardActiveTasksListCard />
                            <DashboardEmployeesOnLeaveCard />
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1>Loading...</h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IndexPage;