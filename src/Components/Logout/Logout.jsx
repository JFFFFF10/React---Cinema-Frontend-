import axios from "axios";

export const logoutUser = async () => {
	try {
		const response = await axios.post(
			"https://csit-314-cinema-booking-system.vercel.app/logout/",
			{},
			{
			  headers: {
				Authorization: `Token ${localStorage.getItem("token")}`,
			  },
			}
		  );

		console.log(response.data.message);
		alert("Log Out Successful!");
	} catch (error) {
		console.log(error.response.data);
		alert("Log Out Unsuccessful! :(");
	}
};

