import React, { Component } from "react";
import axios from "axios";
import "./WeeklyRevenueReport.css";

class WeeklyRevenueReport extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sdate: "",
			edate: "",
			report: null,
		};
	}

	handleDateChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const token = localStorage.getItem("token");
		const { sdate, edate } = this.state;

		axios
			.post(
				"https://csit-314-cinema-booking-system.vercel.app/genWeeklyRevenueReport/",
				{ sdate, edate },
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
		const { sdate, edate, report } = this.state;
		return (
			<div className="weeklyRevenueReport">
				<h1>Weekly Revenue Report</h1>
				<form onSubmit={this.handleSubmit}>
					<label>
						Choose the start date:
						<input
							type="date"
							name="sdate"
							value={sdate}
							onChange={this.handleDateChange}
							required
						/>
					</label>
					<label>
						Choose the end date:
						<input
							type="date"
							name="edate"
							value={edate}
							onChange={this.handleDateChange}
							required
						/>
					</label>
					<input type="submit" value="Generate Report" />
				</form>
				{report && (
					<div className="weeklyRevenueReport--result">
						<p>Report Id: {report.report_id}</p>
						<h3>{report.report_description}</h3>
					</div>
				)}
			</div>
		);
	}
}

export default WeeklyRevenueReport;
