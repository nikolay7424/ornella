// DROPDOWN MENU
const catalogs = Array.from(document.querySelector('.catalog').children);
// trim first and last li's
catalogs.pop();
catalogs.shift();
const catalogsElement = document.querySelector('.catalog');
const subcatalogs = Array.from(document.querySelectorAll('.subcatalog'));
catalogsElement.addEventListener('mouseover', e => {
  // reset all active classes
  const allActiveSubcatalogs = document.querySelectorAll('.active');
  allActiveSubcatalogs.forEach(function(activeSubcatalog) {
    activeSubcatalog.classList.remove('active');
  });

  for(catalog in catalogs) {
    if(catalogs[catalog] === e.target) {
      // simulate hover
      subcatalogs[catalog].classList.add('active');
      const activeSubCatalog = document.querySelector('.active');
      activeSubCatalog.addEventListener('mouseout', e => {
        activeSubCatalog.classList.remove('active');
      });
      // add delay, to keep subcatalog active, if mouse is hovering it
      catalogs[catalog].addEventListener('mouseout', e => {
        setTimeout(() => {
          activeSubCatalog.classList.remove('active');
        }, 100);
      });
    }
  }
});


// BURGER MENU 
const burgerButton = document.querySelector('.burger');
burgerButton.addEventListener('click', () => {
  burgerButton.children[0].classList.toggle('burger-item-active');
  burgerButton.classList.toggle('gray-bg');
  const burgerMenu = document.querySelector('.burger-menu');
  burgerMenu.classList.toggle('burger-menu-active');
});


// ACCORDION CATALOG

// main
const accordionItemHeaderMain = document.querySelector('.accordion-item-header-main');
const cartButton = accordionItemHeaderMain.querySelector('.cart-btn');

accordionItemHeaderMain.addEventListener('click', (e) => {
  if(e.target == cartButton) {
    return;
  }
  accordionItemHeaderMain.classList.toggle('accordion-main-active');
  accordionItemHeaderMain.children[1].classList.toggle('rotate');
  // open/close list
  const accordionItemBodyMain = accordionItemHeaderMain.nextElementSibling;
  if(accordionItemHeaderMain.classList.contains('accordion-main-active')) {
    accordionItemBodyMain.style.maxHeight = '1500px';
  } else {
    accordionItemBodyMain.style.maxHeight = 0;
  }
});

// inner
const accordionItemHeaders = document.querySelectorAll('.accordion-item-header');
accordionItemHeaders.forEach(accordionItemHeader => {
  accordionItemHeader.addEventListener('click', (e) => {
    // keep only one list open
    const currentlyActiveAccordionItemHeader = document.querySelector('.accordion-item-header.accordion-active');
    if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader !== accordionItemHeader) {
      currentlyActiveAccordionItemHeader.classList.remove('accordion-active');
      currentlyActiveAccordionItemHeader.children[1].classList.remove('rotate');
      currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
    }

    // rotate arrow
    accordionItemHeader.classList.toggle('accordion-active');
    accordionItemHeader.children[1].classList.toggle('rotate');

    // open/close list
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if(accordionItemHeader.classList.contains('accordion-active')) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + 'px';
      const accordionItemBodyMain = document.querySelector('.accordion-item-body-main');
      accordionItemBodyMain.style.maxHeight = '1500px';
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
});