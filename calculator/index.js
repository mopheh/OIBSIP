document.querySelectorAll(".input-value").forEach((element) => {
  element.addEventListener("click", (e) => {
    document.querySelector(".input").value += e.target.ariaValueText
  })
})

document.querySelector(".ans").addEventListener("click", () => {
  document.querySelector(".input").value = eval(
    document.querySelector(".input").value
  )
})

document.querySelector(".clear").addEventListener("click", () => {
  document.querySelector(".input").value = ""
})

document.querySelector(".backspace").addEventListener("click", () => {
  document.querySelector(".input").value = document
    .querySelector(".input")
    .value.slice(0, document.querySelector(".input").value.length - 1)
})
