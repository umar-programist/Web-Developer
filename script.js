const estimator = document.querySelector('[data-estimator]');

if (estimator) {
  const projectType = estimator.querySelector('#project-type');
  const pageCount = estimator.querySelector('#page-count');
  const pageCountValue = estimator.querySelector('#page-count-value');
  const priceOutput = estimator.querySelector('#estimate-price');
  const daysOutput = estimator.querySelector('#estimate-days');
  const pagesOutput = estimator.querySelector('#estimate-pages');
  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  const updateEstimate = () => {
    const selectedType = projectType.selectedOptions[0];
    const pages = Number(pageCount.value);
    const features = [...estimator.querySelectorAll('input[name="feature"]:checked')];
    const basePrice = Number(selectedType.dataset.base);
    const extraPagePrice = Math.max(0, pages - 1) * 75;
    const featurePrice = features.reduce((total, feature) => total + Number(feature.dataset.price), 0);
    const estimate = basePrice + extraPagePrice + featurePrice;
    const extraDays = Math.ceil(Math.max(0, pages - 1) / 2);
    const featureDays = features.reduce((total, feature) => total + Number(feature.dataset.days), 0);
    const days = Number(selectedType.dataset.days) + extraDays + featureDays;

    pageCountValue.value = pages;
    pageCountValue.textContent = pages;
    pagesOutput.textContent = pages;
    priceOutput.textContent = `${currency.format(Math.round(estimate * 0.85))}–${currency.format(Math.round(estimate * 1.15))}`;
    daysOutput.textContent = `${days}–${days + 2} рӯзи корӣ`;
  };

  estimator.addEventListener('input', updateEstimate);
  estimator.addEventListener('change', updateEstimate);
  updateEstimate();
}
