// filter accordion
const filterAccordionItemHeaders = document.querySelectorAll(
    ".filter-accordion-item-header"
)
filterAccordionItemHeaders.forEach((accordionItemHeader) => {
    accordionItemHeader.addEventListener("click", (e) => {
        // keep only one list open
        const currentlyActiveAccordionItemHeader = document.querySelector(
            ".filter-accordion-item-header.filter-accordion-active"
        )
        if (
            currentlyActiveAccordionItemHeader &&
            currentlyActiveAccordionItemHeader !== accordionItemHeader
        ) {
            currentlyActiveAccordionItemHeader.classList.remove(
                "filter-accordion-active"
            )
            currentlyActiveAccordionItemHeader.children[1].classList.remove(
                "rotate"
            )
            currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0
        }
        // rotate arrow
        accordionItemHeader.classList.toggle("filter-accordion-active")
        accordionItemHeader.children[1].classList.toggle("rotate")

        // open/close list
        const accordionItemBody = accordionItemHeader.nextElementSibling
        if (accordionItemHeader.classList.contains("filter-accordion-active")) {
            accordionItemBody.style.maxHeight =
                accordionItemBody.scrollHeight + "px"
        } else {
            accordionItemBody.style.maxHeight = 0
        }
    })
})

// add remove filter
const filterAccordion = document.querySelector(".filter-accordion")
const ul = document.querySelector(".filter-chosen").children[0]
const filterChosenWrapper = document.querySelector("#filter-chosen")
const filterDeleteAll = document.querySelector(".filter-delete-all")
const allCheckboxes = filterAccordion.querySelectorAll("input[type='checkbox']")
const allLabels = filterAccordion.querySelectorAll("label")

filterAccordion.addEventListener("click", labelHandler)
filterAccordion.addEventListener("change", filterActionHandler)
filterDeleteAll.addEventListener("click", deleteAllFiltersActionHandler)
ul.addEventListener("click", deleteOneFilterActionHandler)

function deleteOneFilterActionHandler(e) {
    if (e.target.tagName === "LI") {
        const liTextContent = e.target.textContent
        e.target.remove()
        Array.from(allLabels).forEach((label) => {
            if (label.textContent === liTextContent) {
                label.previousElementSibling.checked = false
                return
            }
        })
    }
    if (!ul.children[0]) {
        filterChosenWrapper.classList.add("is-hidden")
    }
}

function deleteAllFiltersActionHandler() {
    ul.innerHTML = ""
    Array.from(allCheckboxes).forEach((checkbox) => {
        if (checkbox.checked) {
            checkbox.click()
        }
    })
    filterChosenWrapper.classList.add("is-hidden")
}

function labelHandler(e) {
    if (e.target.tagName === "LABEL") {
        e.target.previousElementSibling.click()
    }
}

function filterActionHandler(e) {
    if (e.target.parentElement.children[0].checked) {
        for (let i in Array.from(allLabels)) {
            if (
                Array.from(allLabels)[i].textContent ===
                e.target.parentElement.children[1].textContent
            ) {
                const li = document.createElement("li")
                li.setAttribute("data-index", i)
                li.textContent = e.target.parentElement.children[1].textContent
                ul.appendChild(li)
                break
            }
        }
    } else {
        for (let i in Array.from(allLabels)) {
            if (
                Array.from(allLabels)[i].textContent ===
                e.target.parentElement.children[1].textContent
            ) {
                const liRemove = Array.from(ul.children).find(
                    (li) => li.getAttribute("data-index") === i
                )
                liRemove.remove()
                break
            }
        }
    }

    if (ul.children[0]) {
        filterChosenWrapper.classList.remove("is-hidden")
    } else {
        filterChosenWrapper.classList.add("is-hidden")
    }
}
