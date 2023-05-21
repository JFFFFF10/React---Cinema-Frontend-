import React, { Component } from "react";
import axios from "axios";
import "./MonthlyRevenueReport.css";

class MonthlyRevenueReport extends Component {
	constructor(props) {
		super(props);
		this.state = {
			month: "",
			year: "",
			report: null,
		};
	}

	formatDate = (date) => {
		const day = ("0" + date.getDate()).slice(-2);
		const month = ("0" + (date.getMonth() + 1)).slice(-2);
		const year = date.getFullYear();

		return `${year}-${month}-${day}`;
	};

	handleInputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const token = localStorage.getItem("token");
		const { month, year } = this.state;

		// First day of the month
		let sdate = new Date(year, month - 1, 1);
		sdate = this.formatDate(sdate);

		// Last day of the month
		let edate = new Date(year, month, 0);
		edate = this.formatDate(edate);

		axios
			.post(
				"https://csit-314-cinema-booking-system.vercel.app/genMonthlyRevenueReport/",
				{ sdate: sdate, edate: edate },
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
		const { month, year, report } = this.state;
		return (
			<div className="monthlyRevenueReport">
				<h1>Monthly Revenue Report</h1>
				<form onSubmit={this.handleSubmit}>
					<label>
						Choose the month:
						<input
							type="number"
							min="1"
							max="12"
							name="month"
							value={month}
							onChange={this.handleInputChange}
							required
						/>
					</label>
					<label>
						Choose the year:
						<input
							type="number"
							min="2000"
							max="2099"
							name="year"
							value={year}
							onChange={this.handleInputChange}
							required
						/>
					</label>
					<input type="submit" value="Generate Report" />
				</form>
				{report && (
					<div className="monthlyRevenueReport--result">
						<p>Report Id: {report.report_id}</p>
						<h3>{report.report_description}</h3>
					</div>
				)}
			</div>
		);
	}
}

export default MonthlyRevenueReport;
