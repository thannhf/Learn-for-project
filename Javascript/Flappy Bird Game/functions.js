// to get the mouse position
export const getMousePos = (canvas, event) => {
    var rect = canvas.getBoundingClientRect();
    return {
        x:event.clientX - rect.left,
        y:event.clientY - rect.top
    };
}

// to test if the mouse is exactly inside of a specific given rect
export const isInside=(pos, rect) => {
    return pos.x > rect.x && pos.x < (rect.x + rect.width) && pos.y < (rect.y+rect.height) && pos.y > rect.y
}

// to set the flap of the bird
export const moveBird = (f1, f2, f3) => {
    setTimeout(f1, 200);
    setTimeout(f2, 300);
    setTimeout(f3, 400);
}