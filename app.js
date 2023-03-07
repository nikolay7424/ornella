// dropdown menu
const catalogs = Array.from(document.querySelector('.catalog').children);
catalogs.pop();
catalogs.shift();
const catalogsElement = document.querySelector('.catalog');
const subcatalogs = Array.from(document.querySelectorAll('.subcatalog'));

catalogsElement.addEventListener('mouseover', e => {
  for(catalog in catalogs) {
    if(catalogs[catalog] === e.target) {
      subcatalogs[catalog].style.display = 'block';
    }
    subcatalogs[catalog].addEventListener('mouseover', e => {
      subcatalogs[catalog].style.display = 'block';
    });
    subcatalogs[catalog].addEventListener('mouseout', e => {
      subcatalogs[catalog].style.display = 'none';
    });
  }
});

catalogsElement.addEventListener('mouseout', e => {
  for(catalog in catalogs) {
    if(catalogs[catalog] === e.target) {
      subcatalogs[catalog].style.display = 'none';
    }
  }
});


