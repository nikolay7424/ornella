// DROPDOWN MENU
const catalogs = Array.from(document.querySelector('.catalog').children);
// trim first and last li's
catalogs.pop();
catalogs.shift();
const subcatalogs = Array.from(document.querySelectorAll('.subcatalog'));
let enteredSubcatalog = false;
const transparentWhiteBgs = Array.from(document.querySelectorAll('.transparent-white-bg'));

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

    // leaving catalog
    catalog.addEventListener('mouseleave', e => {
      // checking if while leaving catalog we entered subcatalog
      subcatalogs[indx].addEventListener('mouseenter', e => {
        // if we entered subcatalog, keeping it active
        enteredSubcatalog = true;
        subcatalogs[indx].addEventListener('mouseleave', e => {
          // leaving subcatalog
          subcatalogs[indx].classList.remove('active');
          catalog.classList.remove('active');
          enteredSubcatalog = false;
        }, { once: true });
      }, { once: true });
      //if while leaving catalog we haven't entered subcatalog, we add a delay, to make checking possible, end then leave
      setTimeout(() => {
        if(!enteredSubcatalog) {
          subcatalogs[indx].classList.remove('active');
          catalog.classList.remove('active');
        }
      }, 100);
    }, { once: true });
  });
});
// leaving while entering white bg
transparentWhiteBgs.forEach(transparentWhiteBg => {
  transparentWhiteBg.addEventListener('mouseenter', e => {
    catalogsReset();
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


// product user actions

function isNumeric(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && 
         !isNaN(parseFloat(str));
}

const productWrapper = document.querySelector('.products-wrapper');
productWrapper.addEventListener('click', (e) => {
  // fav and compare buttons 
  if(e.target.classList.contains('product-user-action-img')) {
    e.target.classList.toggle('product-user-action-img-active');
  }

  // minus button
  if(e.target.classList.contains('btn-minus')) {
    if(e.target.nextElementSibling.value <= 1) {
      e.preventDefault();
      return
    };
    e.target.nextElementSibling.value -= 1;
    e.preventDefault();

  }

  // plus button
  if(e.target.classList.contains('btn-plus')) {
    if(e.target.previousElementSibling.value >= 9999) {
      e.preventDefault();
      return;
    }
    let quantityValueInt = parseInt(e.target.previousElementSibling.value);
    quantityValueInt += 1;
    e.target.previousElementSibling.value = quantityValueInt;
    e.preventDefault();
  }

  // quantity text form validation
  if(e.target.classList.contains('product-quantity')) {
    e.target.addEventListener('beforeinput', e => {
      // checking for text input
      if(!isNumeric(e.data)) {
        e.preventDefault();
      }

      // cheking limits
      if(parseInt(e.target.value) > 9999) {
        e.preventDefault();
        return;
      }
    });
  }

  // add to cart
  if(e.target.classList.contains('product-btn')) {
    if(parseInt(e.target.previousElementSibling.children[1].value) === 0) {
      e.preventDefault();
    }

    // todo: adding product to the cart
  }


});

