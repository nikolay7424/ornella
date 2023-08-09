// SELECT
import Select from "./select/select.js"
const selectElements = document.querySelectorAll("[data-custom]")
selectElements.forEach((selectElement) => {
    new Select(selectElement)
})

// DROPDOWN MENU
const catalogs = Array.from(document.querySelector(".catalog").children)
// trim first and last li's
catalogs.pop()
catalogs.shift()
const subcatalogs = Array.from(document.querySelectorAll(".subcatalog"))
let enteredSubcatalog = false
const transparentWhiteBgs = Array.from(
    document.querySelectorAll(".transparent-white-bg")
)

function catalogsReset() {
    subcatalogs.forEach((subcatalog) => {
        subcatalog.classList.remove("active")
    })
    catalogs.forEach((catalog) => {
        catalog.classList.remove("active")
    })
}

catalogs.forEach((catalog, indx) => {
    catalogsReset()
    catalog.addEventListener("mouseenter", (e) => {
        catalog.classList.add("active")
        subcatalogs[indx].classList.add("active")

        // leaving catalog
        catalog.addEventListener(
            "mouseleave",
            (e) => {
                // checking if while leaving catalog we entered subcatalog
                subcatalogs[indx].addEventListener(
                    "mouseenter",
                    (e) => {
                        // if we entered subcatalog, keeping it active
                        enteredSubcatalog = true
                        subcatalogs[indx].addEventListener(
                            "mouseleave",
                            (e) => {
                                // leaving subcatalog
                                subcatalogs[indx].classList.remove("active")
                                catalog.classList.remove("active")
                                enteredSubcatalog = false
                            },
                            { once: true }
                        )
                    },
                    { once: true }
                )
                //if while leaving catalog we haven't entered subcatalog, we add a delay, to make checking possible, end then leave
                setTimeout(() => {
                    if (!enteredSubcatalog) {
                        subcatalogs[indx].classList.remove("active")
                        catalog.classList.remove("active")
                    }
                }, 100)
            },
            { once: true }
        )
    })
})
// leaving while entering white bg
transparentWhiteBgs.forEach((transparentWhiteBg) => {
    transparentWhiteBg.addEventListener("mouseenter", (e) => {
        catalogsReset()
    })
})

// BURGER MENU
const burgerButton = document.querySelector(".burger")
burgerButton.addEventListener("click", () => {
    burgerButton.children[0].classList.toggle("burger-item-active")
    burgerButton.classList.toggle("gray-bg")
    const burgerMenu = document.querySelector(".burger-menu")
    burgerMenu.classList.toggle("burger-menu-active")
})

// ACCORDION CATALOG

// main
const accordionItemHeaderMain = document.querySelector(
    ".accordion-item-header-main"
)
const cartButton = accordionItemHeaderMain.querySelector(".cart-btn")

accordionItemHeaderMain.addEventListener("click", (e) => {
    if (e.target == cartButton) {
        return
    }
    accordionItemHeaderMain.classList.toggle("accordion-main-active")
    accordionItemHeaderMain.children[1].classList.toggle("rotate")
    // open/close list
    const accordionItemBodyMain = accordionItemHeaderMain.nextElementSibling
    if (accordionItemHeaderMain.classList.contains("accordion-main-active")) {
        accordionItemBodyMain.style.maxHeight = "1500px"
    } else {
        accordionItemBodyMain.style.maxHeight = 0
    }
})

// inner
const accordionItemHeaders = document.querySelectorAll(".accordion-item-header")
accordionItemHeaders.forEach((accordionItemHeader) => {
    accordionItemHeader.addEventListener("click", (e) => {
        if (
            e.target == accordionItemHeaders[0] ||
            e.target == accordionItemHeaders[accordionItemHeaders.length - 1]
        ) {
            return
        }
        // keep only one list open
        const currentlyActiveAccordionItemHeader = document.querySelector(
            ".accordion-item-header.accordion-active"
        )
        if (
            currentlyActiveAccordionItemHeader &&
            currentlyActiveAccordionItemHeader !== accordionItemHeader
        ) {
            currentlyActiveAccordionItemHeader.classList.remove(
                "accordion-active"
            )
            currentlyActiveAccordionItemHeader.children[1].classList.remove(
                "rotate"
            )
            currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0
        }

        // rotate arrow
        accordionItemHeader.classList.toggle("accordion-active")
        accordionItemHeader.children[1].classList.toggle("rotate")

        // open/close list
        const accordionItemBody = accordionItemHeader.nextElementSibling
        if (accordionItemHeader.classList.contains("accordion-active")) {
            accordionItemBody.style.maxHeight =
                accordionItemBody.scrollHeight + "px"
            const accordionItemBodyMain = document.querySelector(
                ".accordion-item-body-main"
            )
            accordionItemBodyMain.style.maxHeight = "1500px"
        } else {
            accordionItemBody.style.maxHeight = 0
        }
    })
})

// PRODUCTS
export function productInputFormValidation(e) {
    // minus button
    if (e.target.classList.contains("btn-minus")) {
        if (e.target.nextElementSibling.value <= 1) {
            e.preventDefault()
            return
        }
        e.target.nextElementSibling.value -= 1
        e.preventDefault()
    }

    // plus button
    if (e.target.classList.contains("btn-plus")) {
        if (e.target.previousElementSibling.value >= 9999) {
            e.preventDefault()
            return
        }
        let quantityValueInt = parseInt(e.target.previousElementSibling.value)
        quantityValueInt += 1
        e.target.previousElementSibling.value = quantityValueInt
        e.preventDefault()
    }

    // quantity text form validation
    if (e.target.classList.contains("product-quantity")) {
        e.target.addEventListener("beforeinput", (e) => {
            // checking for text input
            if (!isNumeric(e.data)) {
                e.preventDefault()
            }

            // cheking limits
            if (parseInt(e.target.value) > 9999) {
                e.preventDefault()
                return
            }
        })
    }
}

function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str))
}

const productWrapper = document.querySelector(".products-wrapper")
const pageProduct = document.querySelector(".page-product")
const productWrapperArr = Array.from(
    document.querySelector(".products-wrapper").children
)

productWrapper.addEventListener("click", productHandler)
if (pageProduct) {
    pageProduct.addEventListener("click", productHandler)
}

function productHandler(e) {
    // fav and compare buttons
    if (e.target.classList.contains("product-user-action-img")) {
        e.target.classList.toggle("product-user-action-img-active")
    }

    // change color
    if (e.target.classList.contains("product-color-img")) {
        const product =
            e.target.parentElement.parentElement.parentElement.parentElement
        const productPic = product.querySelector(".product-img")
        const productColors = Array.from(
            product.querySelectorAll(".product-colors")[0].children
        )
        const productIndex = productWrapperArr.findIndex(
            (selectedProduct) => selectedProduct == product
        )
        productColors.forEach((productColor, index) => {
            if (e.target == productColor) {
                productPic.src = `/assets/img/products/${productIndex}_${index}.webp`
            }
        })
    }

    // product quantity controls
    productInputFormValidation(e)

    // add to cart
    if (e.target.classList.contains("product-btn")) {
        if (parseInt(e.target.previousElementSibling.children[1].value) <= 0) {
            e.preventDefault()
        }
        openCartModal()
    }
}

// CART MODAL
const cartButtons = document.querySelectorAll(".cart-btn")
const cartModal = document.querySelector(".cart-modal")
const cartModalProducts = document.querySelector(".cart-modal-products")
const cartModalTotal = document.querySelector(".cart-modal-total")

cartButtons.forEach((cartButton) => {
    cartButton.addEventListener("click", openCartModal)
})

function cartModalEventsHandler(e) {
    if (e.target.classList.contains("close-btn")) {
        cartModal.close()
        cartModal.removeEventListener("click", cartModalEventsHandler)
    }

    // close on click outside of modal
    const cartDimentions = cartModal.getBoundingClientRect()
    if (
        e.clientX < cartDimentions.left ||
        e.clientX > cartDimentions.right ||
        e.clientY < cartDimentions.top ||
        e.clientY > cartDimentions.bottom
    ) {
        cartModal.close()
        cartModal.removeEventListener("click", cartModalEventsHandler)
    }

    // product deleting
    if (e.target.classList.contains("cart-modal-product-delete")) {
        e.target.parentElement.classList.add("cart-modal-product-remove")
        setTimeout(() => {
            e.target.parentElement.remove()
            if (cartModalProducts.children.length === 0) {
                cartModalTotal.style.visibility = "hidden"
                // empty cart message
                cartModalTotal.nextElementSibling.classList.remove("is-hidden")
            }
        }, 500)
    }
    // product quantity controls
    productInputFormValidation(e)
}

export function openCartModal() {
    // empty cart message
    if (cartModalProducts.children.length === 0) {
        cartModalTotal.style.visibility = "hidden"
        cartModalTotal.nextElementSibling.classList.remove("is-hidden")
    } else {
        cartModalTotal.nextElementSibling.classList.add("is-hidden")
    }
    cartModal.showModal()
    cartModal.addEventListener("click", cartModalEventsHandler)
}

// FOOTER UP ARROW
const upArrow = document.querySelector(".up-arrow")

window.addEventListener("scroll", (e) => {
    if (window.scrollY > 2500) {
        upArrow.classList.add("arrow-active")
    } else {
        upArrow.classList.remove("arrow-active")
    }
})
