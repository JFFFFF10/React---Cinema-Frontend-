import React, { Component } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

import "./MonthlyTicketReport.css";

class MonthlyTicketReport extends Component {
	constructor(props) {
		super(props);
		this.state = {
			year: "",
			month: "",
			report: null,
			chartData: null,
		};
	}

	handleInputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
    const token = localStorage.getItem("token");
		const { year, month } = this.state;

		// Calculate start and end dates
		const startDate = new Date(year, month - 1, 1).toISOString().slice(0, 10);
		const endDate = new Date(year, month, 0).toISOString().slice(0, 10);

		axios
			.post(
				"https://csit-314-cinema-booking-system.vercel.app/genMonthlyTicketReport/",
				{ sdate: startDate, edate: endDate },
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

				// Use regex to extract the number of tickets from each category
				const adultTickets = Number(
					report.report_description.match(/Adult tickets: (\d+)/)[1]
				);
				const seniorTickets = Number(
					report.report_description.match(/Senior tickets: (\d+)/)[1]
				);
				const childTickets = Number(
					report.report_description.match(/Child tickets: (\d+)/)[1]
				);

				this.setState({
					chartData: {
						labels: ["Adult tickets", "Senior tickets", "Child tickets"],
						datasets: [
							{
								data: [adultTickets, seniorTickets, childTickets],
								backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
							},
						],
					},
				});
			})
			.catch((err) => console.error(err));
	};

	render() {
		const { year, month, report, chartData } = this.state;
		return (
			<div className="monthlyTicketReport">
				<h1>Monthly Ticket Report</h1>
				<form onSubmit={this.handleSubmit}>
					<label>
						Choose the month:
						<input
							type="number"
							min="1"
							max="12"
							step="1"
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
							max="2023"
							step="1"
							name="year"
							value={year}
							onChange={this.handleInputChange}
							required
						/>
					</label>
					<input type="submit" value="Generate Report" />
				</form>
				{report && (
					<div className="monthlyTicketReport--result">
						<p>Report Id: {report.report_id}</p>
						<h2>{report.report_description}</h2>
					</div>
				)}
				{chartData && (
					<div className="monthlyTicketReport--chart">
						<Pie data={chartData} />
					</div>
				)}
			</div>
		);
	}
}

export default MonthlyTicketReport;
