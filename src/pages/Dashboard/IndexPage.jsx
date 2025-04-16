import { useUser } from "../../hooks/useUser";

import SideNavBar from "../../components/SideNavBar";

const IndexPage = () => {
    const { user } = useUser();

    return (
        <div className="flex">
            <SideNavBar />
            <div className="dashboard-main-container ml-15 flex-1">
                {user ? (
                    <div>
                        <h1>HR Dashboard Page</h1>
                        <p>Welcome, {user.email}</p>
                        <p>Your HR ID: {user.hr_id}</p>
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