import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideNavBar from "../../components/SideNavBar";
// import { predictAttrition } from "../../services/api"; // Uncomment and implement this API call

const schema = yup.object().shape({
  emplyee_id: yup.string().required("Employee ID is required"),
  employee_name: yup.string().required("Employee name is required"),
  Age: yup.number().required("Age is required").min(18).max(65),
  DistanceFromHome: yup.number().required("Distance is required").min(0),
  Education: yup.number().required("Education is required").min(1).max(5),
  JobSatisfaction: yup.number().required("Job Satisfaction is required").min(1).max(5),
  MonthlyIncome: yup.number().required("Monthly Income is required").min(0),
  OverTime: yup.number().required("OverTime is required").oneOf([0, 1]),
  PercentSalaryHike: yup.number().required("Percent Salary Hike is required").min(0),
  TotalWorkingYears: yup.number().required("Total Working Years is required").min(0),
  YearsAtCompany: yup.number().required("Years At Company is required").min(0),
  WorkLifeBalance: yup.number().required("Work Life Balance is required").min(1).max(4),
});

const AttritionPredictionPage = () => {
  const [result, setResult] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // const response = await predictAttrition(data);
      // setResult(response.data); // Adjust according to your API response
      toast.success("Prediction submitted! (API call here)");
      setResult({ prediction: "No Attrition", probability: 0.12 }); // Dummy result
      reset();
    } catch (err) {
      toast.error("Failed to predict attrition.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed SideNavBar */}
      <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-md z-10">
        <SideNavBar />
      </div>
      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col items-center py-8">
        <ToastContainer position="top-right" autoClose={2000} />
        <div className="bg-white rounded-xl shadow p-8 w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-6">Attrition Prediction</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ...form fields as before... */}
              <div>
                <label className="block font-semibold mb-1">Employee ID</label>
                <input
                  type="text"
                  {...register("emplyee_id")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.emplyee_id && (
                  <p className="text-red-500 text-xs mt-1">{errors.emplyee_id.message}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Employee Name</label>
                <input
                  type="text"
                  {...register("employee_name")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.employee_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.employee_name.message}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Age</label>
                <input
                  type="number"
                  {...register("Age")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.Age && (
                  <p className="text-red-500 text-xs mt-1">{errors.Age.message}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Distance From Home (km)</label>
                <input
                  type="number"
                  {...register("DistanceFromHome")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.DistanceFromHome && (
                  <p className="text-red-500 text-xs mt-1">{errors.DistanceFromHome.message}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Education (1-5)</label>
                <input
                  type="number"
                  {...register("Education")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.Education && (
                  <p className="text-red-500 text-xs mt-1">{errors.Education.message}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Job Satisfaction (1-5)</label>
                <input
                  type="number"
                  {...register("JobSatisfaction")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.JobSatisfaction && (
                  <p className="text-red-500 text-xs mt-1">{errors.JobSatisfaction.message}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Monthly Income</label>
                <input
                  type="number"
                  {...register("MonthlyIncome")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.MonthlyIncome && (
                  <p className="text-red-500 text-xs mt-1">{errors.MonthlyIncome.message}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">OverTime</label>
                <select {...register("OverTime")} className="w-full border px-3 py-2 rounded">
                  <option value="">Select</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
                {errors.OverTime && (
                  <p className="text-red-500 text-xs mt-1">{errors.OverTime.message}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Percent Salary Hike</label>
                <input
                  type="number"
                  {...register("PercentSalaryHike")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.PercentSalaryHike && (
                  <p className="text-red-500 text-xs mt-1">{errors.PercentSalaryHike.message}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Total Working Years</label>
                <input
                  type="number"
                  {...register("TotalWorkingYears")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.TotalWorkingYears && (
                  <p className="text-red-500 text-xs mt-1">{errors.TotalWorkingYears.message}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Years At Company</label>
                <input
                  type="number"
                  {...register("YearsAtCompany")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.YearsAtCompany && (
                  <p className="text-red-500 text-xs mt-1">{errors.YearsAtCompany.message}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Work Life Balance (1-4)</label>
                <input
                  type="number"
                  {...register("WorkLifeBalance")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.WorkLifeBalance && (
                  <p className="text-red-500 text-xs mt-1">{errors.WorkLifeBalance.message}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 font-semibold mt-6 w-full"
            >
              {isSubmitting ? "Predicting..." : "Predict Attrition"}
            </button>
          </form>
          {result && (
            <div className="mt-6 p-4 bg-gray-100 rounded">
              <h2 className="font-bold mb-2">Prediction Result</h2>
              <p>
                <span className="font-semibold">Prediction:</span> {result.prediction}
              </p>
              <p>
                <span className="font-semibold">Probability:</span> {result.probability}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttritionPredictionPage;