const chartData = {
  height: 480,
  type: 'bar',
  options: {
    chart: {
      id: 'bar-chart',
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%'
      }
    },
    xaxis: {
      type: 'category',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    legend: {
      show: true,
      fontSize: '14px',
      fontFamily: `'Roboto', sans-serif`,
      position: 'bottom',
      offsetX: 20,
      labels: {
        useSeriesColors: false
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8
      }
    },
    fill: {
      type: 'solid'
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: true
    }
  },
  series: [
    {
      name: 'Front-end',
      data: [15, 12, 25, 35, 25, 40, 35, 20, 35, 25, 15, 35]
    },
    {
      name: 'Back-end',
      data: [35, 15, 15, 25, 35, 40, 60, 25, 25, 15, 25, 25]
    },
    {
      name: 'Java',
      data: [25, 15, 35, 35, 20, 15, 10, 10, 25, 45, 30, 10]
    },
    {
      name: 'Software',
      data: [10, 0, 45, 0, 0, 15, 0, 0, 0, 0, 30, 0]
    }
  ]
};
export default chartData;
