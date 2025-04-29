/*
 Input/Output - ievadīt / izvadīt foto attēlus
*/ 
let fileInput = document.getElementById("fileInput")
let ctx = document.getElementById("canvas").getContext("2d")
fileInput.addEventListener("change", function() {
    window.saveToHistory()
    let file = fileInput.files[0]
    let reader = new FileReader()
    reader.onload = function(e) {
        let img = new Image()
        img.src = e.target.result
        img.onload = function() {
            window.setCanvasScale(img.width, img.height)
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        }
    }
    reader.readAsDataURL(file)
})

document.getElementById("loadPhoto").addEventListener("click", function() {
    fileInput.click()
})

document.getElementById("savePhoto").addEventListener("click", function() {
    let link = document.createElement("a")
    link.download = "canvas.png"
    link.href = document.getElementById("canvas").toDataURL()
    link.click()
    link.remove()
})