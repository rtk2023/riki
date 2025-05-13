// Sākuma "pildspalva", tiek izmantots kā noklusējuma rīks

function draw(ctx){
    ctx.lineCap = 'round';
    ctx.strokeStyle = document.getElementById('colorSelector').value;
}

function getName(){
    return "Pen"
}

export default {draw, getName}