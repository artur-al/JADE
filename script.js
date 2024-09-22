let list = document.querySelectorAll('.carousel .list .item');
let carousel = document.querySelector('.carousel');
let dots = document.querySelectorAll('.dots li');
let nextBtn = document.getElementById('next');
let prevBtn = document.getElementById('prev');

let lastPosition = list.length - 1;
let active = 0;
let zIndex = 2;

nextBtn.onclick = () => {
    let newValue = active + 1 > lastPosition ? 0 : active + 1;
    setItemActive(newValue, showSlider);
}
prevBtn.onclick = () => {
    let newValue = active - 1 < 0 ? lastPosition : active - 1;
    setItemActive(newValue, showSlider);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        setItemActive(index, showSlider);
    })
})

const setItemActive = (newValue, callbackFunction) => {
    if (newValue === active) return;
    let type = newValue > active ? 'next' : 'prev';
    active = newValue;
    callbackFunction(type);
}

let removeEffect;
let autoRun = setTimeout(() => {
    nextBtn.click();
}, 5000);

const showSlider = (type) => {
    carousel.style.pointerEvents = 'none';
    let itemActiveOld = document.querySelector('.carousel .list .item.active');
    if (itemActiveOld) itemActiveOld.classList.remove('active');
    zIndex++;
    list[active].style.zIndex = zIndex;
    list[active].classList.add('active');

    if (type === 'next') {
        carousel.style.setProperty('--transform', '300px');
    } else {
        carousel.style.setProperty('--transform', '-300px');
    }
    carousel.classList.add('effect');

    let dotActiveOld = document.querySelector('.dots li.active');
    if (dotActiveOld) dotActiveOld.classList.remove('active');
    dots[active].classList.add('active');

    clearTimeout(removeEffect);
    removeEffect = setTimeout(() => {
        carousel.classList.remove('effect');
        carousel.style.pointerEvents = 'auto';
    }, 1500);

    clearTimeout(autoRun);
    autoRun = setTimeout(() => {
        nextBtn.click();
    }, 5000);
}

// Inicializa o gráfico com dados simulados
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Início'], // Começa com um rótulo
        datasets: [{
            label: 'Sensor Data',
            data: [0], // Começa com um valor
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            }
        }
    }
});

// Função para atualizar o gráfico com dados simulados
function updateChart() {
    const data = { sensorValue: Math.random() * 100 }; // Gera um valor aleatório
    myChart.data.labels.push(new Date().toLocaleTimeString());
    myChart.data.datasets[0].data.push(data.sensorValue);
    myChart.update();

    // Limita o número de pontos mostrados no gráfico
    if (myChart.data.labels.length > 10) {
        myChart.data.labels.shift();
        myChart.data.datasets[0].data.shift();
    }
}

// Atualiza o gráfico a cada 5 segundos
setInterval(updateChart, 5000);
