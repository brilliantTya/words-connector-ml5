const a = 'CC4125-E06666-F6B26B-FFD966-93C47D-76A5AF-6D9EED-6FA8DC-8E7CC3-C27BA0-FAFAFA-18FFFF-64FFDA-EF3D59-E17A47-EFC958-4AB19D-EC407A-D500F9-42A5F5-FFA726';
// const a = 'EF3D59-E17A47-EFC958-4AB19D-EC407A-EA80FC-42A5F5-FFA726';

var raw_colors = a.split('-');
var colors = []

function generate_colors() {
    for (let index = 0; index < raw_colors.length; index++) {
        var rgb = [];
        for (let i = 0; i < 3; i++) {
            var hex_str = '0x';
            hex_str += raw_colors[index].slice(2* i, 2* i + 2);
            rgb.push(parseInt(hex_str));
            // console.log(hex_str);
        }
        colors.push(rgb);
    }
}

// console.log(colors)