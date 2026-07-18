let cars = [
    {
        id: Date.now(),
        year: 2009,
        make: 'Mazda',
        model: 'CX-9',
        baseCost: 1500,
        targetSale: 4500,
        expenses: [
            { itemName: 'Carrier Bearing', itemCost: 45.00 },
            { itemName: 'Driveshaft Alignment', itemCost: 120.00 }
        ]
    }
];

let activeCarId = cars[0].id;

const carSelector = document.querySelector('#car-selector');
const carTitle = document.querySelector('#car-title');
const toggleAddBtn = document.querySelector('#toggle-add-btn');
const closeAddBtn = document.querySelector('#close-add-car');
const addCarSection = document.querySelector('.add-car-section');

const newCarForm = document.querySelector('#new-car-form');
const expenseForm = document.querySelector('#expense-form');
const expenseList = document.querySelector('#expense-list');
const leaderboardList = document.querySelector('#leaderboard-list');

const baseCostEl = document.querySelector('#base-cost');
const targetSaleEl = document.querySelector('#target-sale');
const totalInvestmentEl = document.querySelector('#total-investment');
const projectedProfitEl = document.querySelector('#projected-profit');

function renderDropdown() {
    carSelector.innerHTML = '';
    
    cars.forEach(car => {
        const option = document.createElement('option');
        option.value = car.id;
        option.textContent = `${car.year} ${car.make} ${car.model}`;
        
        if (car.id === activeCarId) {
            option.selected = true;
        }
        carSelector.appendChild(option);
    });
}

function renderActiveCar() {
    const activeCar = cars.filter(car => car.id === activeCarId)[0];

    const carNameString = `${activeCar.year} ${activeCar.make} ${activeCar.model}`;
    carTitle.textContent = carNameString;

    expenseList.innerHTML = '';
    activeCar.expenses.forEach(expense => {
        const li = document.createElement('li');
        li.className = 'expense-item';
        li.innerHTML = `
            <span>${expense.itemName}</span>
            <span>$${expense.itemCost.toFixed(2)}</span>
        `;
        expenseList.appendChild(li);
    });

    calculateTotals(activeCar);
    renderLeaderboard();
}

function calculateTotals(activeCar) {
    const totalPartsCost = activeCar.expenses.reduce((sum, expense) => sum + expense.itemCost, 0);
    const totalInvestment = activeCar.baseCost + totalPartsCost;
    const profit = activeCar.targetSale - totalInvestment;

    baseCostEl.textContent = activeCar.baseCost.toFixed(2);
    targetSaleEl.textContent = activeCar.targetSale.toFixed(2);
    totalInvestmentEl.textContent = totalInvestment.toFixed(2);
    projectedProfitEl.textContent = `Expected Profit: $${profit.toFixed(2)}`;

    if (profit > 0) {
        projectedProfitEl.classList.remove('profit-bad');
        projectedProfitEl.classList.add('profit-good');
    } else {
        projectedProfitEl.classList.remove('profit-good');
        projectedProfitEl.classList.add('profit-bad');
    }
}

function renderLeaderboard() {
    leaderboardList.innerHTML = '';

    const carsWithProfit = cars.map(car => {
        const totalParts = car.expenses.reduce((sum, exp) => sum + exp.itemCost, 0);
        const inv = car.baseCost + totalParts;
        const prof = car.targetSale - inv;
        return { ...car, profit: prof };
    });

    carsWithProfit.sort((a, b) => b.profit - a.profit);

    const maxProfit = Math.max(...carsWithProfit.map(c => c.profit), 1);
    const minProfit = Math.min(...carsWithProfit.map(c => c.profit), -1);

    carsWithProfit.forEach(car => {
        const li = document.createElement('li');
        li.className = 'leaderboard-item';
        
        let color;
        if (car.profit >= 0) {
            const ratio = car.profit / maxProfit;
            const lightness = 60 - (30 * ratio);
            color = `hsl(120, 100%, ${lightness}%)`;
        } else {
            const ratio = car.profit / minProfit;
            const lightness = 60 - (30 * ratio);
            color = `hsl(0, 100%, ${lightness}%)`;
        }

        li.style.color = color;
        li.innerHTML = `
            <span>${car.year} ${car.make} ${car.model}</span>
            <span>$${car.profit.toFixed(2)}</span>
        `;
        leaderboardList.appendChild(li);
    });
}

toggleAddBtn.addEventListener('click', function() {
    addCarSection.classList.remove('hidden');
});

closeAddBtn.addEventListener('click', function() {
    addCarSection.classList.add('hidden');
});

carSelector.addEventListener('change', function(event) {
    activeCarId = parseInt(event.target.value);
    renderActiveCar();
});

newCarForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const newCar = {
        id: Date.now(),
        year: parseInt(document.querySelector('#car-year').value),
        make: document.querySelector('#car-make').value,
        model: document.querySelector('#car-model').value,
        baseCost: parseFloat(document.querySelector('#car-base').value),
        targetSale: parseFloat(document.querySelector('#car-target').value),
        expenses: []
    };

    cars.push(newCar);
    activeCarId = newCar.id;
    
    newCarForm.reset();
    addCarSection.classList.add('hidden');
    renderDropdown();
    renderActiveCar();
});

expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const activeCar = cars.filter(car => car.id === activeCarId)[0];
    
    activeCar.expenses.push({
        itemName: document.querySelector('#item-name').value,
        itemCost: parseFloat(document.querySelector('#item-cost').value)
    });

    expenseForm.reset();
    renderActiveCar();
});

renderDropdown();
renderActiveCar();