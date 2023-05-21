import React, { Component } from "react";
import axios from "axios";
import "./DailyRevenueReport.css";

class DailyRevenueReport extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: "",
			report: null,
		};
	}

	handleDateChange = (event) => {
		this.setState({
			date: event.target.value,
		});
	};

	handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        const { date } = this.state;
      
        axios
          .post(
            "https://csit-314-cinema-booking-system.vercel.app/genDailyRevenueReport/",
            { date },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
              },
            }
          )
          .then((res) => {
            const report = res.data;
            this.setState({ report });
          })
          .catch((err) => console.error(err));
      };
      

	render() {
		const { date, report } = this.state;
		return (
			<>
				<div className="dailyRevenueReport">
					<h1>Daily Revenue Report</h1>
					<form onSubmit={this.handleSubmit}>
						<label>
							Choose a date:
							<input
								type="date"
								value={date}
								onChange={this.handleDateChange}
								required
							/>
						</label>
						<input type="submit" value="Generate Report" />
					</form>
					{report && (
						<div className="dailyRevenueReport--result">
							<p>For the date - {date}, we have: </p>
							<h3>{report.report_description}</h3>
						</div>
					)}
				</div>
			</>
		);
	}
}

export default DailyRevenueReport;
