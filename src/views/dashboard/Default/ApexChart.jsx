import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [10, 5, 3, 2],
      options: {
        chart: {
          width: 360,
          type: 'donut',
        },
        dataLabels: {
          enabled: false,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                show: false,
              },
            },
          },
        ],
        legend: {
          show: false,
        },
        labels: ['Front End', 'Back End', 'Figma', 'Testing'], // Custom names for series
      },
    };
  }

  render() {
    const customLabels = this.state.series.map((value, index) => {
      return `${this.state.options.labels[index]}: ${value}`;
    });

    return (
      <div>
      <div className="chart-wrap">
          <div id="chart">
            <ReactApexChart options={{ ...this.state.options, labels: customLabels }} series={this.state.series} type="donut" width={380} />
          </div>
        </div>
      </div>
    );
  }
}

export default ApexChart;
