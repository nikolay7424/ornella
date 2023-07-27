import { productInputFormValidation } from "./app.js";
import { openCartModal } from "./app.js";


// PRODUCTS
function isNumeric(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && 
         !isNaN(parseFloat(str));
}

const productWrapper = document.querySelector('.products-wrapper');
const productWrapperArr = Array.from(document.querySelector('.products-wrapper').children);

productWrapper.addEventListener('click', (e) => {
  // fav and compare buttons 
  if(e.target.classList.contains('product-user-action-img')) {
    e.target.classList.toggle('product-user-action-img-active');
  }

  // change color
  if(e.target.classList.contains('product-color-img')) {
    const product = e.target.parentElement.parentElement.parentElement.parentElement;
    const productPic = product.querySelector('.product-img');
    const productColors = Array.from(product.querySelectorAll('.product-colors')[0].children);
    const productIndex = productWrapperArr.findIndex(selectedProduct => selectedProduct == product);
    productColors.forEach((productColor, index) => {
      if(e.target == productColor) {
        productPic.src = `/assets/img/products/${productIndex}_${index}.webp`;
      }
    });
  }


  
  // product quantity controls
  productInputFormValidation(e);



  // add to cart
  if(e.target.classList.contains('product-btn')) {
    if(parseInt(e.target.previousElementSibling.children[1].value) <= 0) {
      e.preventDefault();
    }
    openCartModal();
  }
});




// filter accordion
const filterAccordionItemHeaders = document.querySelectorAll('.filter-accordion-item-header');
filterAccordionItemHeaders.forEach(accordionItemHeader => {
  accordionItemHeader.addEventListener('click', (e) => {

    // keep only one list open
    const currentlyActiveAccordionItemHeader = document.querySelector('.filter-accordion-item-header.filter-accordion-active');
    if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader !== accordionItemHeader) {
      currentlyActiveAccordionItemHeader.classList.remove('filter-accordion-active');
      currentlyActiveAccordionItemHeader.children[1].classList.remove('rotate');
      currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
    }
    // rotate arrow
    accordionItemHeader.classList.toggle('filter-accordion-active');
    accordionItemHeader.children[1].classList.toggle('rotate');

    // open/close list
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if(accordionItemHeader.classList.contains('filter-accordion-active')) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + 'px';
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
});


// add remove filter
const filterAccordion = document.querySelector('.filter-accordion');
const ul = document.querySelector('.filter-chosen').children[0];
const filterChosenWrapper = document.querySelector('#filter-chosen');
const filterDeleteAll = document.querySelector('.filter-delete-all');
const allCheckboxes = filterAccordion.querySelectorAll("input[type='checkbox']");
const allLabels = filterAccordion.querySelectorAll('label');

filterAccordion.addEventListener('click', labelHandler);
filterAccordion.addEventListener('change', filterActionHandler);
filterDeleteAll.addEventListener('click', deleteAllFiltersActionHandler);
ul.addEventListener('click', deleteOneFilterActionHandler);

function deleteOneFilterActionHandler(e) {
  if(e.target.tagName === 'LI') {
    const liTextContent = e.target.textContent;
    e.target.remove();
    Array.from(allLabels).forEach(label => {
      if(label.textContent === liTextContent) {
        label.previousElementSibling.checked = false;
        return;
      }
    });
  }
  if(!ul.children[0]) {
    filterChosenWrapper.classList.add('is-hidden')
  }
}

function deleteAllFiltersActionHandler() {
  ul.innerHTML = '';
  Array.from(allCheckboxes).forEach(checkbox => {
    if(checkbox.checked) {
      checkbox.click();
    }
  });
  filterChosenWrapper.classList.add('is-hidden')
}

function labelHandler(e) {
  if(e.target.tagName === 'LABEL') {
    e.target.previousElementSibling.click();
  }
}

function filterActionHandler(e) {
  if(e.target.parentElement.children[0].checked) {
    for(let i in Array.from(allLabels)) {
      if(Array.from(allLabels)[i].textContent === e.target.parentElement.children[1].textContent) {
          const li = document.createElement('li')
          li.setAttribute('data-index', i)
          li.textContent = e.target.parentElement.children[1].textContent
          ul.appendChild(li)
          break
        }
    }
  } else {
    for(let i in Array.from(allLabels)) {
      if(Array.from(allLabels)[i].textContent === e.target.parentElement.children[1].textContent) {
        const liRemove = Array.from(ul.children).find(li => li.getAttribute('data-index') === i)
        liRemove.remove()
        break
      }
    }
  }

  if(ul.children[0]) {
    filterChosenWrapper.classList.remove('is-hidden')
  } else {
    filterChosenWrapper.classList.add('is-hidden')
  }
}
