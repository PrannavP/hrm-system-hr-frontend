import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import SideNavBar from "../../components/SideNavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define validation schema
const schema = yup.object().shape({
  EmpID: yup.string().required("Employee ID is required"),
  Age: yup.number().required().min(18).max(65),
  AgeGroup: yup.string().required(),
  BusinessTravel: yup.string().required(),
  Department: yup.string().required(),
  DistanceFromHome: yup.number().required().min(0),
  Education: yup.number().required().min(1).max(5),
  EducationField: yup.string().required(),
  EnvironmentSatisfaction: yup.number().required().min(1).max(4),
  Gender: yup.string().required(),
  JobRole: yup.string().required(),
  JobInvolvement: yup.number().required().min(1).max(4),
  JobLevel: yup.string().required(),
  JobSatisfaction: yup.number().required().min(1).max(4),
  MaritalStatus: yup.string().required(),
  MonthlyIncome: yup.number().required().min(0),
  SalarySlab: yup.string().required(),
  NumCompaniesWorked: yup.number().required().min(0),
  OverTime: yup.string().required(),
  PercentSalaryHike: yup.number().required().min(0),
  StockOptionLevel: yup.number().required().min(0).max(3),
  TotalWorkingYears: yup.number().required().min(0),
  TrainingTimesLastYear: yup.number().required().min(0),
  YearsAtCompany: yup.number().required().min(0),
  YearsInCurrentRole: yup.number().required().min(0),
  YearsSinceLastPromotion: yup.number().required().min(0),
  YearsWithCurrManager: yup.number().required().min(0),
  AttendanceScore: yup.number().required().min(1).max(5),
  WorkLifeBalance: yup.number().required().min(1).max(4),
  ManagerRating: yup.number().required().min(1).max(5),
  Attrition: yup.string().required(),
  DailyRate: yup.number().required().min(0),
  HourlyRate: yup.number().required().min(0),
  MonthlyRate: yup.number().required().min(0),
  RelationshipSatisfaction: yup.number().required().min(1).max(4),
});

const PerformanceEvaluationPage = () => {
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
      // Call your API here
      toast.success("Performance evaluation submitted! (API call here)");
      setResult({ evaluation: "Good", score: 85 }); // Dummy result
      reset();
    } catch (err) {
      toast.error("Failed to submit evaluation.");
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
        <div className="bg-white rounded-xl shadow p-8 w-full max-w-3xl">
          <h1 className="text-2xl font-bold mb-6">Performance Evaluation</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Render all fields */}
              <div>
                <label className="block font-semibold mb-1">Employee ID</label>
                <input type="text" {...register("EmpID")} className="w-full border px-3 py-2 rounded" />
                {errors.EmpID && <p className="text-red-500 text-xs mt-1">{errors.EmpID.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Age</label>
                <input type="number" {...register("Age")} className="w-full border px-3 py-2 rounded" />
                {errors.Age && <p className="text-red-500 text-xs mt-1">{errors.Age.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Age Group</label>
                <input type="text" {...register("AgeGroup")} className="w-full border px-3 py-2 rounded" />
                {errors.AgeGroup && <p className="text-red-500 text-xs mt-1">{errors.AgeGroup.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Business Travel</label>
                <select {...register("BusinessTravel")} className="w-full border px-3 py-2 rounded">
                  <option value="">Select</option>
                  <option value="Travel_Rarely">Travel Rarely</option>
                  <option value="Travel_Frequently">Travel Frequently</option>
                  <option value="Non-Travel">Non-Travel</option>
                </select>
                {errors.BusinessTravel && <p className="text-red-500 text-xs mt-1">{errors.BusinessTravel.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Department</label>
                <input type="text" {...register("Department")} className="w-full border px-3 py-2 rounded" />
                {errors.Department && <p className="text-red-500 text-xs mt-1">{errors.Department.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Distance From Home</label>
                <input type="number" {...register("DistanceFromHome")} className="w-full border px-3 py-2 rounded" />
                {errors.DistanceFromHome && <p className="text-red-500 text-xs mt-1">{errors.DistanceFromHome.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Education</label>
                <input type="number" {...register("Education")} className="w-full border px-3 py-2 rounded" />
                {errors.Education && <p className="text-red-500 text-xs mt-1">{errors.Education.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Education Field</label>
                <input type="text" {...register("EducationField")} className="w-full border px-3 py-2 rounded" />
                {errors.EducationField && <p className="text-red-500 text-xs mt-1">{errors.EducationField.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Environment Satisfaction</label>
                <input type="number" {...register("EnvironmentSatisfaction")} className="w-full border px-3 py-2 rounded" />
                {errors.EnvironmentSatisfaction && <p className="text-red-500 text-xs mt-1">{errors.EnvironmentSatisfaction.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Gender</label>
                <select {...register("Gender")} className="w-full border px-3 py-2 rounded">
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.Gender && <p className="text-red-500 text-xs mt-1">{errors.Gender.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Job Role</label>
                <input type="text" {...register("JobRole")} className="w-full border px-3 py-2 rounded" />
                {errors.JobRole && <p className="text-red-500 text-xs mt-1">{errors.JobRole.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Job Involvement</label>
                <input type="number" {...register("JobInvolvement")} className="w-full border px-3 py-2 rounded" />
                {errors.JobInvolvement && <p className="text-red-500 text-xs mt-1">{errors.JobInvolvement.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Job Level</label>
                <input type="text" {...register("JobLevel")} className="w-full border px-3 py-2 rounded" />
                {errors.JobLevel && <p className="text-red-500 text-xs mt-1">{errors.JobLevel.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Job Satisfaction</label>
                <input type="number" {...register("JobSatisfaction")} className="w-full border px-3 py-2 rounded" />
                {errors.JobSatisfaction && <p className="text-red-500 text-xs mt-1">{errors.JobSatisfaction.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Marital Status</label>
                <select {...register("MaritalStatus")} className="w-full border px-3 py-2 rounded">
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                </select>
                {errors.MaritalStatus && <p className="text-red-500 text-xs mt-1">{errors.MaritalStatus.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Monthly Income</label>
                <input type="number" {...register("MonthlyIncome")} className="w-full border px-3 py-2 rounded" />
                {errors.MonthlyIncome && <p className="text-red-500 text-xs mt-1">{errors.MonthlyIncome.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Salary Slab</label>
                <input type="text" {...register("SalarySlab")} className="w-full border px-3 py-2 rounded" />
                {errors.SalarySlab && <p className="text-red-500 text-xs mt-1">{errors.SalarySlab.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Num Companies Worked</label>
                <input type="number" {...register("NumCompaniesWorked")} className="w-full border px-3 py-2 rounded" />
                {errors.NumCompaniesWorked && <p className="text-red-500 text-xs mt-1">{errors.NumCompaniesWorked.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">OverTime</label>
                <select {...register("OverTime")} className="w-full border px-3 py-2 rounded">
                  <option value="">Select</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
                {errors.OverTime && <p className="text-red-500 text-xs mt-1">{errors.OverTime.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Percent Salary Hike</label>
                <input type="number" {...register("PercentSalaryHike")} className="w-full border px-3 py-2 rounded" />
                {errors.PercentSalaryHike && <p className="text-red-500 text-xs mt-1">{errors.PercentSalaryHike.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Stock Option Level</label>
                <input type="number" {...register("StockOptionLevel")} className="w-full border px-3 py-2 rounded" />
                {errors.StockOptionLevel && <p className="text-red-500 text-xs mt-1">{errors.StockOptionLevel.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Total Working Years</label>
                <input type="number" {...register("TotalWorkingYears")} className="w-full border px-3 py-2 rounded" />
                {errors.TotalWorkingYears && <p className="text-red-500 text-xs mt-1">{errors.TotalWorkingYears.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Training Times Last Year</label>
                <input type="number" {...register("TrainingTimesLastYear")} className="w-full border px-3 py-2 rounded" />
                {errors.TrainingTimesLastYear && <p className="text-red-500 text-xs mt-1">{errors.TrainingTimesLastYear.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Years At Company</label>
                <input type="number" {...register("YearsAtCompany")} className="w-full border px-3 py-2 rounded" />
                {errors.YearsAtCompany && <p className="text-red-500 text-xs mt-1">{errors.YearsAtCompany.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Years In Current Role</label>
                <input type="number" {...register("YearsInCurrentRole")} className="w-full border px-3 py-2 rounded" />
                {errors.YearsInCurrentRole && <p className="text-red-500 text-xs mt-1">{errors.YearsInCurrentRole.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Years Since Last Promotion</label>
                <input type="number" {...register("YearsSinceLastPromotion")} className="w-full border px-3 py-2 rounded" />
                {errors.YearsSinceLastPromotion && <p className="text-red-500 text-xs mt-1">{errors.YearsSinceLastPromotion.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Years With Current Manager</label>
                <input type="number" {...register("YearsWithCurrManager")} className="w-full border px-3 py-2 rounded" />
                {errors.YearsWithCurrManager && <p className="text-red-500 text-xs mt-1">{errors.YearsWithCurrManager.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Attendance Score</label>
                <input type="number" {...register("AttendanceScore")} className="w-full border px-3 py-2 rounded" />
                {errors.AttendanceScore && <p className="text-red-500 text-xs mt-1">{errors.AttendanceScore.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Work Life Balance</label>
                <input type="number" {...register("WorkLifeBalance")} className="w-full border px-3 py-2 rounded" />
                {errors.WorkLifeBalance && <p className="text-red-500 text-xs mt-1">{errors.WorkLifeBalance.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Manager Rating</label>
                <input type="number" {...register("ManagerRating")} className="w-full border px-3 py-2 rounded" />
                {errors.ManagerRating && <p className="text-red-500 text-xs mt-1">{errors.ManagerRating.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Attrition</label>
                <select {...register("Attrition")} className="w-full border px-3 py-2 rounded">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.Attrition && <p className="text-red-500 text-xs mt-1">{errors.Attrition.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Daily Rate</label>
                <input type="number" {...register("DailyRate")} className="w-full border px-3 py-2 rounded" />
                {errors.DailyRate && <p className="text-red-500 text-xs mt-1">{errors.DailyRate.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Hourly Rate</label>
                <input type="number" {...register("HourlyRate")} className="w-full border px-3 py-2 rounded" />
                {errors.HourlyRate && <p className="text-red-500 text-xs mt-1">{errors.HourlyRate.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Monthly Rate</label>
                <input type="number" {...register("MonthlyRate")} className="w-full border px-3 py-2 rounded" />
                {errors.MonthlyRate && <p className="text-red-500 text-xs mt-1">{errors.MonthlyRate.message}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Relationship Satisfaction</label>
                <input type="number" {...register("RelationshipSatisfaction")} className="w-full border px-3 py-2 rounded" />
                {errors.RelationshipSatisfaction && <p className="text-red-500 text-xs mt-1">{errors.RelationshipSatisfaction.message}</p>}
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 font-semibold mt-6 w-full"
            >
              {isSubmitting ? "Evaluating..." : "Evaluate Performance"}
            </button>
          </form>
          {result && (
            <div className="mt-6 p-4 bg-gray-100 rounded">
              <h2 className="font-bold mb-2">Evaluation Result</h2>
              <p>
                <span className="font-semibold">Evaluation:</span> {result.evaluation}
              </p>
              <p>
                <span className="font-semibold">Score:</span> {result.score}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformanceEvaluationPage;