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

function productInputFormValidation(e) {
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
}

const productWrapper = document.querySelector('.products-wrapper');
productWrapper.addEventListener('click', (e) => {
  // fav and compare buttons 
  if(e.target.classList.contains('product-user-action-img')) {
    e.target.classList.toggle('product-user-action-img-active');
  }

  productInputFormValidation(e);

  // add to cart
  if(e.target.classList.contains('product-btn')) {
    if(parseInt(e.target.previousElementSibling.children[1].value) <= 0) {
      e.preventDefault();
    }
    openCartModal();
  }
});


// branches change url
const branchesBlock = document.querySelector('.branches-picker');
const branches = document.querySelectorAll('.branch');
const branchIframe = document.querySelector('.branches-map');
const branchesIframeUrls = [
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2311.180218746836!2d30.74680669317638!3d46.459159938969634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c633d880e8eb89%3A0xae5125add1471600!2z0J7RgNC90LXQu9C70LAg0KLQtdC60YE!5e0!3m2!1sen!2sua!4v1681329162475!5m2!1sen!2sua',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2749.24981102435!2d30.640811738497842!3d46.44374702262167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c63283e08cf1c1%3A0x8ea58ca7ce998f16!2z0J7RgNC90LXQu9C70LAg0KLQtdC60YEgN9C60LwuINC80LDQs9Cw0LfQuNC9IDMyNw!5e0!3m2!1sen!2sua!4v1681383232471!5m2!1sen!2sua',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1634.8478270058324!2d30.637148150813434!3d46.439277526430274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c6334fc3d60457%3A0x3250fe8226e502b1!2sOrnella%20Tex!5e0!3m2!1sen!2sua!4v1681383259078!5m2!1sen!2sua',
  'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6354.6342157656545!2d30.714127521378686!3d46.42689387618085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sua!4v1681382550953!5m2!1sen!2sua',
  'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d8984.340192564181!2d30.750935140981497!3d46.441872326022306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sua!4v1681382577536!5m2!1sen!2sua',
  'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d8987.619063076192!2d30.75773674554656!3d46.421985533014194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sua!4v1681382603876!5m2!1sen!2sua'
];

branchesBlock.addEventListener('click', e => {
  if(window.innerWidth < 700) {
    e.preventDefault();
    return;
  }
  branches.forEach((branch, index) => {
    if(branchesIframeUrls[index] === branchIframe.src && e.target === branch) {
      e.preventDefault();
      return;
    }
    if(e.target === branch) {
      branchIframe.src = branchesIframeUrls[index];
    }
  });
});


// SLIDER

const track = document.querySelector('.slider-track');
const slides = Array.from(track.children);
const nextButtton = document.querySelector('.slider-button-right');
const prevButtton = document.querySelector('.slider-button-left');
const dotsNav = document.querySelector('.slider-nav');
const dots = Array.from(dotsNav.children);
let slideWidth = slides[0].getBoundingClientRect().width;

// arrange slides next to each other
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

// resize fix
window.addEventListener("resize", (event) => {
  slideWidth = slides[0].getBoundingClientRect().width;
  slides.forEach(setSlidePosition);
});


const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
}

const hideShowArrows = (targetIndex) => {
  if(targetIndex === 0) {
    prevButtton.classList.add('is-hidden');
    nextButtton.classList.remove('is-hidden');
  } else if(targetIndex === slides.length - 1) {
    prevButtton.classList.remove('is-hidden');
    nextButtton.classList.add('is-hidden');
  } else {
    prevButtton.classList.remove('is-hidden');
    nextButtton.classList.remove('is-hidden');
  }
}

// move to right
nextButtton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide == nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(nextIndex);
});

// move to left
prevButtton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide == prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(prevIndex);
});

// move to selected indicator
dotsNav.addEventListener('click', e => {
  // what indicator was clicked
  const targetDot = e.target.closest('button');

  // if not dot - exit
  if(!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot == targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(targetIndex);

});


// CART MODAL
const cartButtons = document.querySelectorAll('.cart-btn');
const closeCartButtons = document.querySelectorAll('.cart-btn-close');
const cartModal = document.querySelector('.cart-modal');
const cartModalProducts = document.querySelector('.cart-modal-products');
const cartModalTotal = document.querySelector('.cart-modal-total');

cartButtons.forEach(cartButton => {
  cartButton.addEventListener('click', openCartModal);
});

function cartModalEventsHandler(e) {
  if(e.target.classList.contains('close-btn')) {
    cartModal.close();
    cartModal.removeEventListener('click', cartModalEventsHandler);
  }

  if(e.target.classList.contains('cart-modal-product-delete')) {
    e.target.parentElement.classList.add('cart-modal-product-remove');
    setTimeout(() => {
      e.target.parentElement.remove();
      if(cartModalProducts.children.length === 0) {
        cartModalTotal.style.visibility = 'hidden';
        cartModalTotal.nextElementSibling.classList.remove('is-hidden');
      }
    }, 300);

  }

  productInputFormValidation(e);
}


function openCartModal() {
  if(cartModalProducts.children.length === 0) {
    cartModalTotal.style.visibility = 'hidden';
    cartModalTotal.nextElementSibling.classList.remove('is-hidden');
  } else {
    cartModalTotal.nextElementSibling.classList.add('is-hidden');
  }
  cartModal.showModal();
  cartModal.addEventListener('click', cartModalEventsHandler);
}
