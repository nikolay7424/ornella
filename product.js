const pageProduct = document.querySelector(".page-product")

const baseSrc = "assets/img/page-products/"
const productId = document
    .querySelector(".product-section")
    .getAttribute("data-product-id")
let currentColor = document
    .querySelector(".page-product-color-img.page-product-color-active")
    .getAttribute("data-color")
let currentIndex = 0

const productImgMinGroup = document.querySelector(".product-img-min-group")
const mainImg = document.querySelector(".product-img-max")
const pageProductColors = document.querySelector(".page-product-colors")

const minImgLeftBtn = document.querySelector(
    ".product-mobile-slider-button-left"
)

const minImgRightBtn = document.querySelector(
    ".product-mobile-slider-button-right"
)

function minImgHandler(e) {
    const el = e.target
    const arr = Array.from(e.target.parentElement.children)
    let index = 0
    arr.forEach((element) => {
        if (el !== element) {
            index++
        } else {
            currentIndex = index
            mainImg.src = `${baseSrc}${productId}/${currentColor}/${index}.webp`
        }
    })
}

function changeColorsHandler(e) {
    if (e.target.classList.contains("page-product-color-active")) return
    if (!e.target.classList.contains("page-product-color-img")) return

    Array.from(e.target.parentElement.children).forEach((img) => {
        img.classList.remove("page-product-color-active")
    })
    e.target.classList.add("page-product-color-active")
    currentColor = e.target.getAttribute("data-color")
    mainImg.src = `${baseSrc}${productId}/${currentColor}/${currentIndex}.webp`
    let index = 0
    Array.from(productImgMinGroup.children).forEach((img) => {
        img.src = `${baseSrc}${productId}/${currentColor}/${index}.webp`
        index++
    })
}

function minImgBtnHandler(e) {
    if (
        e.target.classList.contains("product-mobile-slider-button-left") &&
        currentIndex > 0
    ) {
        if (
            currentIndex ===
            Array.from(productImgMinGroup.children).length - 1
        ) {
            minImgRightBtn.style.visibility = "visible"
        }
        currentIndex--
        mainImg.src = `${baseSrc}${productId}/${currentColor}/${currentIndex}.webp`
        if (currentIndex === 0) {
            minImgLeftBtn.style.visibility = "hidden"
        }
    }

    if (
        e.target.classList.contains("product-mobile-slider-button-right") &&
        currentIndex < Array.from(productImgMinGroup.children).length - 1
    ) {
        if (currentIndex === 0) {
            minImgLeftBtn.style.visibility = "visible"
        }
        currentIndex++
        mainImg.src = `${baseSrc}${productId}/${currentColor}/${currentIndex}.webp`
        if (
            currentIndex ===
            Array.from(productImgMinGroup.children).length - 1
        ) {
            minImgRightBtn.style.visibility = "hidden"
        }
    }
}

minImgLeftBtn.addEventListener("click", minImgBtnHandler)
minImgRightBtn.addEventListener("click", minImgBtnHandler)
productImgMinGroup.addEventListener("click", minImgHandler)
pageProductColors.addEventListener("click", changeColorsHandler)
