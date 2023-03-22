// DROPDOWN MENU
const catalogs = Array.from(document.querySelector('.catalog').children);
// trim first and last li's
catalogs.pop();
catalogs.shift();
const subcatalogs = Array.from(document.querySelectorAll('.subcatalog'));
let enteredSubcatalog = false;

function catalogsReset() {
  subcatalogs.forEach(subcatalog => {
    subcatalog.classList.remove('active');
  });
  catalogs.forEach(catalog => {
    catalog.classList.remove('active');
  });
}

catalogs.forEach((catalog, indx) => {
  catalogsReset();
  catalog.addEventListener('mouseenter', e => {
    catalog.classList.add('active');
    subcatalogs[indx].classList.add('active');

    catalog.addEventListener('mouseleave', e => {
      subcatalogs[indx].addEventListener('mouseenter', e => {
        enteredSubcatalog = true;
        subcatalogs[indx].addEventListener('mouseleave', e => {
          subcatalogs[indx].classList.remove('active');
          catalog.classList.remove('active');
          enteredSubcatalog = false;
        });

      });
      setTimeout(() => {
        if(!enteredSubcatalog) {
          subcatalogs[indx].classList.remove('active');
          catalog.classList.remove('active');
        }
      }, 100);
    });
  });
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
    if(e.target == accordionItemHeaders[0] || e.target == accordionItemHeaders[accordionItemHeaders.length - 1]) {
      return;
    }
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