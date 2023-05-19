import React, { Component } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

import "./WeeklyTicketReport.css";

class WeeklyTicketReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      report: null,
      chartData: null
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { startDate, endDate } = this.state;

    axios.post('https://csit-314-cinema-booking-system.vercel.app/genWeeklyTicketReport/', { sdate: startDate, edate: endDate })
      .then(res => {
        const report = res.data;
        this.setState({ report });

        // Use regex to extract the number of tickets from each category
        const adultTickets = Number(report.report_description.match(/Adult tickets: (\d+)/)[1]);
        const seniorTickets = Number(report.report_description.match(/Senior tickets: (\d+)/)[1]);
        const childTickets = Number(report.report_description.match(/Child tickets: (\d+)/)[1]);

        this.setState({
          chartData: {
            labels: ['Adult tickets', 'Senior tickets', 'Child tickets'],
            datasets: [{
              data: [adultTickets, seniorTickets, childTickets],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }]
          }
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { startDate, endDate, report, chartData } = this.state;
    return (
      <div className="weeklyTicketReport">
        <h1>Weekly Ticket Report</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Choose the start date:
            <input type="date" name="startDate" value={startDate} onChange={this.handleInputChange} required />
          </label>
          <label>
            Choose the end date:
            <input type="date" name="endDate" value={endDate} onChange={this.handleInputChange} required />
          </label>
          <input type="submit" value="Generate Report" />
        </form>
        {report &&
          <div className="weeklyTicketReport--result">
            <p>Report Id: {report.report_id}</p>
            <h2>{report.report_description}</h2>
          </div>
        }
        {chartData &&
          <div className="weeklyTicketReport--chart">
            <Pie data={chartData} />
          </div>
        }
      </div>
    );
  }
}

export default WeeklyTicketReport;
