const PRICE_BY_PROFILE = 246.41;
const ANUAL_DISCOUNT = 0.2;

let profileCount = 1;
let subscriptionType = 'monthly';

const profileCountSpan = getById('profile-count');
const planCostSpan = getById('plan-cost');
const slider = getById('slider');

const monthlyButton = getById('monthly-button');
const annualButton = getById('annual-button');

const minusButton = getById('minus-button');
const plusButton = getById('plus-button');

minusButton.addEventListener('click', () => {
	if (profileCount <= 1) return;
	profileCount--;
	updateProfilePlan();
});

plusButton.addEventListener('click', () => {
	if (profileCount >= 10) return;
	profileCount++;
	updateProfilePlan();
});

slider.addEventListener('input', () => {
	const value = parseInt(slider.value);
	profileCount = value;
	updateProfilePlan();
});

monthlyButton.addEventListener('click', () => {
	if (subscriptionType === 'monthly') return;
	subscriptionType = 'monthly';
	updateProfilePlan();
	updateActiveButtonSubscriptionType();
});

annualButton.addEventListener('click', () => {
	if (subscriptionType === 'annual') return;
	subscriptionType = 'annual';
	updateProfilePlan();
	updateActiveButtonSubscriptionType();
});

updateActiveButtonSubscriptionType();
updateProfilePlan();

function updateActiveButtonSubscriptionType() {
	if (subscriptionType === 'monthly') {
		if (!monthlyButton.classList.contains('active')) {
			monthlyButton.classList.add('active');
		}
		if (annualButton.classList.contains('active')) {
			annualButton.classList.remove('active');
		}
	} else {
		if (monthlyButton.classList.contains('active')) {
			monthlyButton.classList.remove('active');
		}
		if (!annualButton.classList.contains('active')) {
			annualButton.classList.add('active');
		}
	}
}

function updateProfilePlan() {
	profileCountSpan.innerHTML = profileCount;
	slider.value = profileCount;
	planCostSpan.innerHTML = calculatePlanCost();
}

function calculatePlanCost() {
	let price = PRICE_BY_PROFILE * profileCount;

	if (subscriptionType === 'annual') {
		price = price - price * ANUAL_DISCOUNT;
	}

	return price.toFixed(2);
}

function getById(id) {
	return document.getElementById(id);
}
