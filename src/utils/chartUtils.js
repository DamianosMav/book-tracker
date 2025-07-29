import Chart from 'chart.js/auto'

function generateRandomHexColor() {
    const randomInt = Math.floor(Math.random() * 16777216)
    return `#${randomInt.toString(16).padStart(6, '0')}`
}

async function countGenres() {
    const bookGenreCount = {}
    const res = await fetch("http://localhost:3000/books")
    const books = await res.json()

    for (const book of books) {
        const genre = book.genre
        if (genre) {
            bookGenreCount[genre] = (bookGenreCount[genre] || 0) + 1
        }
    }

    return bookGenreCount
}

let chartInstance = null

export async function createPieChart(canvasId = "analytics-chart") {
  const genreCounts = await countGenres()
  const xValues = Object.keys(genreCounts)
  const yValues = Object.values(genreCounts)

  const colors = [
    "#003f5c","#2f4b7c","#665191","#a05195",
    "#d45087","#f95d6a","#ff7c43","#ffa600"
  ]

  while (colors.length < xValues.length) {
    colors.push(generateRandomHexColor())
  }


  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart(canvasId, {
    type: "pie",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: colors,
        data: yValues
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true }
      }
    }
  })
}
