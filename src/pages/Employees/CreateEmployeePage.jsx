import { useState } from "react";
import SideNavBar from "../../components/SideNavBar";
import { addEmployee } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
	firstName: Yup.string().required("First Name is required"),
	lastName: Yup.string().required("Last Name is required"),
	email: Yup.string().email("Invalid email").required("Email is required"),
	password: Yup.string()
		.required("Password is required")
		.min(6, "Password should be atleast of 6 characters"),
	phoneNumber: Yup.string()
		.required("Phone Number is required")
		.min(10, "Phone number should be minimum of 10 digits"),
	address: Yup.string()
		.required("Address is required")
		.min(4, "Address should be atleat 4 letters"),
	employeeId: Yup.string().required("Employee ID is required"),
	department: Yup.string().required("Department is required"),
	role: Yup.string().required("Role is required"),
	joinDate: Yup.string().required("Join Date is required"),
	image: Yup.mixed().required("Image is required"),
});

const CreateEmployeePage = () => {
	// navigation
	const navigate = useNavigate();

	const [previewImage, setPreviewImage] = useState(null);

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		trigger,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			phoneNumber: "",
			address: "",
			employeeId: "",
			department: "",
			role: "",
			joinDate: "",
			image: null,
		},
	});

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setValue("image", file, { shouldValidate: true });
			setPreviewImage(URL.createObjectURL(file));
		}
	};

	const onSubmit = async (data) => {
		try {
			const response = await addEmployee(
				data.employeeId,
				data.firstName,
				data.lastName,
				data.email,
				data.password,
				data.department,
				data.role,
				data.image,
				data.phoneNumber,
				data.address
			);
			if (response.status === 201) {
				toast.success("Employee added successfully!");
				reset();
				setPreviewImage(null);
				setTimeout(() => {
					navigate("/employees");
				}, 2000);
			}
		} catch (err) {
			toast.error("An error occurred while adding the employee.");
		}
	};

	return (
		<div className="flex">
			<div className="fixed top-0 left-0 h-full w-64 bg-white shadow-md z-10">
				<SideNavBar />
			</div>
			<div className="flex-1 ml-64 p-8 bg-gray-100 overflow-y-auto">
				<ToastContainer
					position="top-right"
					autoClose={2000}
					closeOnClick={true}
				/>
				<h1 className="text-2xl font-bold mb-6">Add New Employee</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Personal Information Section */}
						<div className="bg-white shadow-md rounded-lg p-6">
							<h3 className="text-lg font-semibold mb-2">
								Personal Information
							</h3>
							<p className="text-sm text-gray-500 mb-4">
								Enter the employee's personal details.
							</p>
							<div className="flex flex-col items-center mb-6">
								<div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden mb-4">
									{previewImage ? (
										<img
											src={previewImage}
											alt="Preview"
											className="w-full h-full object-cover"
										/>
									) : (
										<span className="text-gray-400 text-2xl">
											?
										</span>
									)}
								</div>
								<input
									type="file"
									accept="image/*"
									onChange={handleImageChange}
									className="hidden"
									id="upload-photo"
								/>
								<label
									htmlFor="upload-photo"
									className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer"
								>
									Upload Photo
								</label>
								{errors.image && (
									<p className="text-red-500 text-xs mt-1">
										{errors.image.message}
									</p>
								)}
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										First Name
									</label>
									<input
										type="text"
										{...register("firstName")}
										autoComplete="off"
										onBlur={() => trigger("firstName")}
										className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
									{errors.firstName && (
										<p className="text-red-500 text-xs mt-1">
											{errors.firstName.message}
										</p>
									)}
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Last Name
									</label>
									<input
										type="text"
										{...register("lastName")}
										onBlur={() => trigger("lastName")}
										autoComplete="off"
										className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
									{errors.lastName && (
										<p className="text-red-500 text-xs mt-1">
											{errors.lastName.message}
										</p>
									)}
								</div>
							</div>
							<div className="mt-4">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Email
								</label>
								<input
									type="email"
									{...register("email")}
									onBlur={() => trigger("email")}
									autoComplete="off"
									className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								{errors.email && (
									<p className="text-red-500 text-xs mt-1">
										{errors.email.message}
									</p>
								)}
							</div>
							<div className="mt-4">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Password
								</label>
								<input
									type="password"
									{...register("password")}
									onBlur={() => trigger("password")}
									autoComplete="off"
									className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								{errors.password && (
									<p className="text-red-500 text-xs mt-1">
										{errors.password.message}
									</p>
								)}
							</div>
							<div className="mt-4">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Phone Number
								</label>
								<input
									type="text"
									{...register("phoneNumber")}
									onBlur={() => trigger("phoneNumber")}
									autoComplete="off"
									className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								{errors.phoneNumber && (
									<p className="text-red-500 text-xs mt-1">
										{errors.phoneNumber.message}
									</p>
								)}
							</div>
							<div className="mt-4">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Address
								</label>
								<input
									{...register("address")}
									onBlur={() => trigger("address")}
									autoComplete="off"
									className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								></input>
								{errors.address && (
									<p className="text-red-500 text-xs mt-1">
										{errors.address.message}
									</p>
								)}
							</div>
						</div>

						{/* Employment Details Section */}
						<div className="bg-white shadow-md rounded-lg p-6">
							<h3 className="text-lg font-semibold mb-2">
								Employment Details
							</h3>
							<p className="text-sm text-gray-500 mb-4">
								Enter the employee's work-related information.
							</p>
							<div className="mt-4">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Employee ID
								</label>
								<input
									type="text"
									{...register("employeeId")}
									onBlur={() => trigger("employeeId")}
									autoComplete="off"
									className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								{errors.employeeId && (
									<p className="text-red-500 text-xs mt-1">
										{errors.employeeId.message}
									</p>
								)}
							</div>
							<div className="mt-4">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Department
								</label>
								<select
									{...register("department")}
									onBlur={() => trigger("department")}
									className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									<option value="">Select department</option>
									<option value="HR">HR</option>
									<option value="Engineering">
										Engineering
									</option>
									<option value="Sales">Sales</option>
									<option value="Finance">Finance</option>
								</select>
								{errors.department && (
									<p className="text-red-500 text-xs mt-1">
										{errors.department.message}
									</p>
								)}
							</div>
							<div className="mt-4">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Role
								</label>
								<input
									type="text"
									{...register("role")}
									onBlur={() => trigger("role")}
									autoComplete="off"
									className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								{errors.role && (
									<p className="text-red-500 text-xs mt-1">
										{errors.role.message}
									</p>
								)}
							</div>
							<div className="mt-4">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Join Date
								</label>
								<input
									type="date"
									{...register("joinDate")}
									onBlur={() => trigger("joinDate")}
									autoComplete="off"
									className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								{errors.joinDate && (
									<p className="text-red-500 text-xs mt-1">
										{errors.joinDate.message}
									</p>
								)}
							</div>

							<button
								type="button"
								onClick={() => {
									reset();
									setPreviewImage(null);
								}}
								className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors mt-4"
							>
								Reset
							</button>
						</div>
					</div>
					<div className="mt-6">
						<button
							type="button"
							onClick={() => navigate("/employees")}
							className="bg-white text-black mr-4 px-6 py-2 rounded-lg hover:bg-amber-50"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateEmployeePage;
