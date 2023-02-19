// picker
let colorCanvas = document.getElementById('color_canvas');
let ColorCtx = colorCanvas.getContext('2d');

let color = `rgb(255, 0 ,0)`;
let gradientH = ColorCtx.createLinearGradient(0, 0, ColorCtx.canvas.width, 0);
ColorCtx.createLinearGradient(0, 0, 0, ColorCtx.canvas.height)
gradientH.addColorStop(0, '#fff');
gradientH.addColorStop(1, color);
ColorCtx.fillStyle = gradientH;
ColorCtx.fillRect(0, 0, ColorCtx.canvas.width, ColorCtx.canvas.height);

let gradientV = ColorCtx.createLinearGradient(0, 0, 0, ColorCtx.canvas.height);
gradientV.addColorStop(0, 'rgba(0,0,0,0)');
gradientV.addColorStop(1, '#000');
ColorCtx.fillStyle = gradientV;
ColorCtx.fillRect(0, 0, ColorCtx.canvas.width, ColorCtx.canvas.height);

// wheel
for (var i = 0; i < 360; i++) {
    var colorStrip = document.createElement("span")
    colorStrip.setAttribute("id", i)
    colorStrip.style.backgroundColor = "hsl(" + i + ", 100%, 50%)"
    document.getElementById('colorwheel').appendChild(colorStrip);
};

document.getElementById('colorwheel').addEventListener('pointermove',
    (event) => {
        event.stopPropagation();
        event.preventDefault();

        const h = event.target.id;
        if (h >= 0 && h <= 360) {
            const { bg, fore } = hslToRGB(h);

            let gradientH = ColorCtx.createLinearGradient(0, 0, ColorCtx.canvas.width, 0);
            gradientH.addColorStop(0, '#fff');
            gradientH.addColorStop(1, bg);
            ColorCtx.fillStyle = gradientH;
            ColorCtx.fillRect(0, 0, ColorCtx.canvas.width, ColorCtx.canvas.height);

            let gradientV = ColorCtx.createLinearGradient(0, 0, 0, ColorCtx.canvas.height);
            gradientV.addColorStop(0, 'rgba(0,0,0,0)');
            gradientV.addColorStop(1, '#000');
            ColorCtx.fillStyle = gradientV;
            ColorCtx.fillRect(0, 0, ColorCtx.canvas.width, ColorCtx.canvas.height);

            document.body.style.color = fore;
            document.getElementById('bg').style.backgroundColor = bg;
            document.getElementById('fore').style.backgroundColor = fore;
        }
    });

document.getElementById('color_canvas').addEventListener('pointermove',
    (event) => {
        event.preventDefault();
        event.stopPropagation();

        const bounding = colorCanvas.getBoundingClientRect();
        const x = event.clientX - bounding.left;
        const y = event.clientY - bounding.top;

        let data = ColorCtx.getImageData(x, y, 1, 1)['data'];

        if ((data[0] >= 0 && data[0] <= 255)
            && (data[1] >= 0 && data[1] <= 255)
            && (data[2] >= 0 && data[2] <= 255)) {

            let bg = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
            let fore = `rgb(${255 - data[0]}, ${255 - data[1]}, ${255 - data[2]})`;
            document.body.style.color = fore;
            document.getElementById('bg').style.backgroundColor = bg;
            document.getElementById('fore').style.backgroundColor = fore;
        }

    });


function hslToRGB(h) {
    const s = 1;
    const l = 0.5;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    return { bg: `rgb(${r}, ${g}, ${b})`, fore: `rgb(${255 - r}, ${255 - g}, ${255 - b})` }
}

