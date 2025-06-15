import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

import "../src/styles/main.css";

import LoginPage from "./pages/LoginPage";
import IndexPage from "./pages/Dashboard/IndexPage";
import EmployeePage from "./pages/Employees/EmployeesPage";
import EmployeeDetailsPage from "./pages/EmployeeDetails/EmployeeDetailsPage";
import CreateEmployeePage from "./pages/Employees/CreateEmployeePage";
import EditEmployeePage from "./pages/Employees/EditEmployeePage";

import NotFoundPage from "./pages/NotFound/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";

import LeavesPage from "./pages/Leaves/LeavesPage";

import TasksPage from "./pages/Tasks/TasksPage";
import CreateTaskPage from "./pages/Tasks/CreateTaskPage";
import EditTaskPage from "./pages/Tasks/EditTaskPage";

const App = () => {
	return (
		<UserProvider>
			<Router>
				<Routes>
					{/* Public Route */}
					<Route path="/login" element={<LoginPage />} />

					{/* Protected Routes */}
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<IndexPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/employees"
						element={
							<ProtectedRoute>
								<EmployeePage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/employee/:id"
						element={
							<ProtectedRoute>
								<EmployeeDetailsPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/add-employee"
						element={
							<ProtectedRoute>
								<CreateEmployeePage />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/edit-employee/:id"
						element={
							<ProtectedRoute>
								<EditEmployeePage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/leaves"
						element={
							<ProtectedRoute>
								<LeavesPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/tasks"
						element={
							<ProtectedRoute>
								<TasksPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/create-task"
						element={
							<ProtectedRoute>
								<CreateTaskPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/edit-task/:id"
						element={
							<ProtectedRoute>
								<EditTaskPage />
							</ProtectedRoute>
						}
					/>
					{/* Catch-All Route */}
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Router>
		</UserProvider>
	);
};

export default App;
