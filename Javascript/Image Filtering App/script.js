const image = document.querySelector('img');
const summary = document.querySelector('.filterSummary');
const imageControlsContainer = document.querySelector('.image-controls');
const filterControls = [...document.querySelectorAll('input[type=range]')];
const filterButtons = [...document.querySelectorAll('button')];
const resetbutton = document.querySelector('.reset').addEventListener('click', resetFilters);
const advancedButton = document.querySelector('.toggleAdvanced');

function toggleAdvanced() {
    if(!imageControlsContainer.classList.contains('active')) {
        imageControlsContainer.classList.add('active', 'w3-animate-opacity')
        advancedButton.innerHTML = `
            <i class="fa fa-angle-up">
                <span>Hide Advanced Settings</span>
            </i>
        `;
    } else {
        imageControlsContainer.classList.remove('active')
        summary.classList.remove('active', 'w3-animate-opacity');
        advancedButton.innerHTML = `
            <i class="fa fa-angle-down">
                <span>Show Advanced Settings...</span>
            </i>
        `;
    }
}

function selectFilter(e) {
    const clickedFilter = e.target.getAttribute('data-filter');
    image.style.filter += clickedFilter;
}
function resetFilters() {
    image.style.filter = '';
}
function applyFilter() {
    let filters = '';
    filterControls.map(item => {
        const value = item.value;
        filters += item.getAttribute('data-filter') + '(' + value + item.getAttribute('data-scale') + ')';
        image.style.filter = filters;
        summary.innerHTML = filters;
        summary.classList.add('active');
    })
}
filterControls.forEach(item => item.addEventListener('active', applyFilter));
filterButtons.forEach(button => button.addEventListener('click', selectFilter));
advancedButton.addEventListener('click', toggleAdvanced);