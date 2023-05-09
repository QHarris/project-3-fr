
console.log(Data);

const quaas = Data.filter(item => item.quaas == true);
const kuks = Data.filter(item => item.kuks == true);
const moans = Data.filter(item => item.moans == true);
const running = Data.filter(item => item.running == true);
const eating = Data.filter(item => item.eating == true);
const foraging = Data.filter(item => item.foraging == true);
const chasing = Data.filter(item => item.chasing == true);
const climbing = Data.filter(item => item.climbing == true);

const config = {
    type: 'pie',
    data: data,
  };

  const data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
      
