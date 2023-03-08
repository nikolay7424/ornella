// dropdown menu
const catalogs = Array.from(document.querySelector('.catalog').children);
catalogs.pop();
catalogs.shift();
const catalogsElement = document.querySelector('.catalog');
const subcatalogs = Array.from(document.querySelectorAll('.subcatalog'));

catalogsElement.addEventListener('mouseover', e => {
  const allActiveSubcatalogs = document.querySelectorAll('.active');
  allActiveSubcatalogs.forEach(function(activeSubcatalog) {
    activeSubcatalog.classList.remove('active');
  });
  for(catalog in catalogs) {
    if(catalogs[catalog] === e.target) {
      subcatalogs[catalog].classList.add('active');

      const activeSubCatalog = document.querySelector('.active');
      activeSubCatalog.addEventListener('mouseout', e => {
        activeSubCatalog.classList.remove('active');
      });
      catalogs[catalog].addEventListener('mouseout', e => {
        setTimeout(() => {
          activeSubCatalog.classList.remove('active');
        }, 100);
      });
    }
  }
});






