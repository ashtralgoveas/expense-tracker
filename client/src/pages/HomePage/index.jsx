import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Cards from "../../components/Cards";
import TransactionForm from "../../components/TransactionForm";
import { MdLogout } from "react-icons/md";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "../../../graphql/mutations/user.mutation";
import { GET_AUTHENTICATED_USER } from "../../../graphql/queries/user.query";
import { GET_TRANSACTION_STATISTICS } from "../../../graphql/queries/transaction.query";

// const chartData = {
//   labels: ["Saving", "Expense", "Investment"],
//   datasets: [
//     {
//       label: "%",
//       data: [13, 8, 3],
//       backgroundColor: [
//         "rgba(240, 197, 42)",
//         "rgba(240, 48, 42)",
//         "rgba(240, 131, 42)",
//       ],
//       borderColor: [
//         "rgba(75, 192, 192)",
//         "rgba(255, 99, 132)",
//         "rgba(54, 162, 235, 1)",
//       ],
//       borderWidth: 1,
//       borderRadius: 30,
//       spacing: 10,
//       cutout: 130,
//     },
//   ],
// };

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
  const { data } = useQuery(GET_TRANSACTION_STATISTICS);
  const { data: authUserData } = useQuery(GET_AUTHENTICATED_USER);
  const [logout, { loading, client }] = useMutation(LOGOUT, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Rs.",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 130,
      },
    ],
  });

  useEffect(() => {
    if (data?.categoryStatistics) {
      const categories = data.categoryStatistics.map((stat) => stat.category);
      const totalAmounts = data.categoryStatistics.map(
        (stat) => stat.totalAmount
      );

      const backgroundColors = [];
      const borderColors = [];

      categories.forEach((category) => {
        if (category === "saving") {
          backgroundColors.push("rgba(240, 197, 42)");
          borderColors.push("rgba(240, 197, 42)");
        } else if (category === "expense") {
          backgroundColors.push("rgba(240, 48, 42)");
          borderColors.push("rgba(240, 48, 42)");
        } else if (category === "investment") {
          backgroundColors.push("rgba(240, 131, 42)");
          borderColors.push("rgba(240, 131, 42)");
        }
      });

      setChartData((prev) => ({
        labels: categories,
        datasets: [
          {
            ...prev.datasets[0],
            data: totalAmounts,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
          },
        ],
      }));
    }
  }, [data]);

  const handleLogout = async () => {
    try {
      await logout();
      client.resetStore();
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
        <div className="flex items-center">
          <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 inline-block text-transparent bg-clip-text">
            Spend Smart, Live Smart
          </p>
          <img
            src={authUserData?.authUser.profilePicture}
            className="w-11 h-11 rounded-full border cursor-pointer"
            alt="Avatar"
          />
          {!loading && (
            <MdLogout
              className="mx-2 w-5 h-5 cursor-pointer"
              onClick={handleLogout}
            />
          )}
          {/* loading spinner */}
          {loading && (
            <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div>
          )}
        </div>
        <div className="flex flex-wrap w-full justify-center items-center gap-6">
          {data?.categoryStatistics.length > 0 && (
            <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]  ">
              <Doughnut data={chartData} />
            </div>
          )}
          <TransactionForm />
        </div>
        <Cards />
      </div>
    </>
  );
};
export default HomePage;
