var output_image = document.getElementById('output-image')
var output_overlay_image = document.getElementById('output-overlay-image')
var input_image = document.getElementById('input-image')
var input_overlay_image = document.getElementById('input-overlay-image')
var input_rotate = document.getElementById('input-rotate')
var rotate_deg = document.getElementById('rotate-deg')
var input_opacity = document.getElementById('input-opacity')
var opacity = document.getElementById('opacity')
var resizable = document.getElementById('resizable')
var upload_text = document.getElementById('upload-text')
var image_cont = document.getElementById("image-cont")
var img_c
var image
input_image.addEventListener('change', (event) => {
    output_image.setAttribute('alt', 'your image')
    output_image.src = URL.createObjectURL(event.target.files[0]);
    output_image.style.display = 'inline-block'

    document.getElementById("cropImageModal").style.display = "block";
    image = output_image
    output_image
    document.getElementById('crop-button').style.display = 'block'
    if (img_c) img_c.setImage(image.src);
    else img_c = new ImageCropper(".modal .container__image", image.src);
    document.getElementById('crop-action-button').style.display = 'block'
    document.getElementById('crop-action-button-overlay').style.display = 'none'
    isnewimage = true
})
input_overlay_image.addEventListener('change', (event) => {
    output_image.setAttribute('alt', 'your overlay image')
    output_overlay_image.src = URL.createObjectURL(event.target.files[0]);
    output_overlay_image.style.display = 'inline-block'
    resizable.style.display = 'inline-block'
    document.getElementById("cropImageModal").style.display = "block";
    image = output_overlay_image
    if (img_c) img_c.setImage(image.src);
    else img_c = new ImageCropper(".modal .container__image", image.src);
    document.getElementById('crop-button-overlay').style.display = 'block'
    document.getElementById('crop-action-button').style.display = 'none'
    document.getElementById('crop-action-button-overlay').style.display = 'block'

})
input_rotate.addEventListener('change', () => {
    rotate_deg.innerText = `rotate:${input_rotate.value}deg`
    resizable.style.transform = `rotate(${input_rotate.value}deg)`
    //to be on the safe side I used input_rotate.value instead of rotate_deg.innerText
})
input_opacity.addEventListener('change', () => {
    opacity.innerText = `opacity:${input_opacity.value}%`
    var opacityy = input_opacity.value / 100
    output_overlay_image.style.opacity = opacityy
    // divided by 100 cause opacity is between 0 and 1
})
var resize_button = document.getElementById('resize-button')
resize_button.addEventListener('click', () => {

    if (resize_button.getAttribute('value') == 'drag') {
        resize_button.setAttribute('value', 'resize')
        isactive = true
    } else {
        resize_button.setAttribute('value', 'drag')
        isactive = false
    }
})
var isdraged = true
var isactive = true
function check() {
    isdraged = isdraged
}
function onDrag({ movementX, movementY }) {
    if (isdraged && isactive) {
        let getStyle = window.getComputedStyle(resizable);
        let leftVal = parseInt(getStyle.left);
        let topVal = parseInt(getStyle.top);
        resizable.style.left = `${leftVal + movementX}px`;
        resizable.style.top = `${topVal + movementY}px`;
        resizable.style.cursor = 'grab'
        check()
    }
}
resizable.addEventListener("mousedown", () => {
    resizable.addEventListener("mousemove", onDrag);
});
document.addEventListener("mouseup", () => {
    resizable.removeEventListener("mousemove", onDrag);
})
//croper
const imageContainer = document.querySelector(".modal .container__image");
var isnewimage = false
function openCropImageModal() {
    image_cont.style.minWidth = '20vw'
    document.getElementById('crop-action-button').style.display = 'block'
    document.getElementById("cropImageModal").style.display = "block";
    document.getElementById('crop-action-button-overlay').style.display = 'none'
    image = output_image
    if (img_c) img_c.setImage(image.src);
    else img_c = new ImageCropper(".modal .container__image", image.src);

}
var isopened = false
function openCropImageModalOverlay() {
    document.getElementById('crop-action-button').style.display = 'none'
    document.getElementById('crop-action-button-overlay').style.display = 'block'
    document.getElementById("cropImageModal").style.display = "block";
    document.getElementById('crop-action-button-overlay').style.display = 'block'
    image = output_overlay_image
    if (img_c) img_c.setImage(image.src);
    else img_c = new ImageCropper(".modal .container__image", image.src);
}
var prev_cont_width = []
var prev_cont_height = []
function cropImage(e, isoverlay) {
    if (!isoverlay) {

        if (prev_cont_width.length == 0) {
            prev_cont_width[0] = 100
            var value = 30
        } else {
            var value = 0
        }
        if (prev_cont_height.length == 0) {
            prev_cont_height[0] = 100
        }
        if (isnewimage) {
            prev_cont_width = []
            prev_cont_height = []
            image_cont.style.width = '70vw'
            image_cont.style.height = '70vh'
            var all_image = document.getElementsByClassName('imgc-content')[0]
            var all_image_style = window.getComputedStyle(all_image)
            var image_style = window.getComputedStyle(document.getElementsByClassName('imgc-handles')[0])
            var width_percent = parseInt(image_style.width) / parseInt(all_image_style.width) * 100
            var height_percent = parseInt(image_style.height) / parseInt(all_image_style.height) * 100
            var image_cont_width = parseInt(width_percent) - 30
            var image_cont_height = parseInt(height_percent) - 30
            image_cont.style.width = image_cont_width + "vw"
            image_cont.style.height = image_cont_height + "vh"
            prev_cont_width.push(image_cont_width)
            prev_cont_height.push(image_cont_height)
            isnewimage = false
        } else {
            var all_image = document.getElementsByClassName('imgc-content')[0]
            var all_image_style = window.getComputedStyle(all_image)
            var image_style = window.getComputedStyle(document.getElementsByClassName('imgc-handles')[0])
            var width_percent = parseInt(image_style.width) / parseInt(all_image_style.width) * 100
            var height_percent = parseInt(image_style.height) / parseInt(all_image_style.height) * 100
            var image_cont_width = parseInt(width_percent) - 30
            var image_cont_height = parseInt(height_percent) - 30
            image_cont.style.width = image_cont_width + "vw"
            image_cont.style.height = image_cont_height + "vh"
            prev_cont_width.push(image_cont_width)
            prev_cont_height.push(image_cont_height)
            isnewimage = false
        }
    } else {
        isnewimage = false
    }
    isopened = false
    document.getElementById("cropImageModal").style.display = "none";
    let img_b64_str = img_c.crop("image/png", 1);
    image.src = img_b64_str;
}
function closeModal() {
    document.getElementById("cropImageModal").style.display = "none";
}

// Get the modal
var modal = document.getElementById('cropImageModal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
//paste
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('paste', function (evt) {
        const clipboardItems = evt.clipboardData.items;
        const items = [].slice.call(clipboardItems).filter(function (item) {
            // Filter the image items only
            return item.type.indexOf('image') !== -1;
        });
        if (items.length === 0) {
            alert('no image in clipboard');
        }
        const item = items[0];
        const blob = item.getAsFile();
        output_overlay_image.src = URL.createObjectURL(blob);
        output_overlay_image.style.display = 'block'
        resizable.style.display = 'block'
        document.getElementById("cropImageModal").style.display = "block";
        image = output_overlay_image
        document.getElementById('crop-button-overlay').style.display = 'block'
        document.getElementById('crop-action-button-overlay').style.display = 'block'
        document.getElementById('crop-action-button').style.display = 'none'
        if (img_c) img_c.setImage(image.src);
        else img_c = new ImageCropper(".modal .container__image", image.src);
    });
});