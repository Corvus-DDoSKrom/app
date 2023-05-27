'use strict'

const randomChartData = (n) => {
  const data = []

  for (let i = 0; i < n; i++) {
    data.push(Math.round(Math.random() * 200))
  }

  return data
}

const chartColors = {
  default: {
    primary: '#00D1B2',
    info: '#209CEE',
    danger: '#FF3860'
  }
}

const ctx = document.getElementById('big-line-chart').getContext('2d')

const datasets = Object.values(chartColors.default).map((color) => ({
  fill: false,
  borderColor: color,
  borderWidth: 2,
  borderDash: [],
  borderDashOffset: 0.0,
  pointBackgroundColor: color,
  pointBorderColor: 'rgba(255,255,255,0)',
  pointHoverBackgroundColor: color,
  pointBorderWidth: 20,
  pointHoverRadius: 4,
  pointHoverBorderWidth: 15,
  pointRadius: 4,
  data: randomChartData(9)
}))

const options = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  responsive: true,
  tooltips: {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#333',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 12,
    mode: 'nearest',
    intersect: false,
    position: 'nearest'
  },
  scales: {
    y: {
      barPercentage: 1.6,
      grid: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.0)',
        zeroLineColor: 'transparent'
      },
      ticks: {
        padding: 20,
        color: '#9a9a9a'
      }
    },
    x: {
      barPercentage: 1.6,
      grid: {
        drawBorder: false,
        color: 'rgba(225,78,202,0.1)',
        zeroLineColor: 'transparent'
      },
      ticks: {
        padding: 20,
        color: '#9a9a9a'
      }
    }
  }
}

new Chart(ctx, {
  type: 'line',
  data: {
    datasets,
    labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09']
  },
  options
})
