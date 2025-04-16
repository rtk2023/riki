function draw(ctx){
    ctx.lineCap = 'round';
    ctx.strokeStyle = "#FFFFFF";
}

function getName(){
    return "Eraser"
}

export default {draw, getName}