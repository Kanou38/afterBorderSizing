jQuery(document).ready(function($) {
    // Full height mobile menu
    $wh = window.innerrHeight;
    $('.elementor-nav-menu--dropdown').height($wh);
    setSizeBorderTitle();
});

var resolution = {
    "xs": 460,
    "sm": 768,
    "md": 1170,
    "lg": 1171
}

function getResolution(s_resolution) {
    for (var key in resolution) {
        var value = resolution[key];
        if (key === s_resolution) {
            return value;
        }
    }
}

function setSizeBorderTitle() {

    var values = getPropertiesBorderAfterElement();
    var arrayOfBorderSize = values.size;
    var arrayOfResolution = values.resolution;
    var arrayOfBorders = values.borders;
    var layoutWidth = window.innerWidth;

    // on affecte la valeur à la div parent
    arrayOfBorders.forEach(function(elem, index = 0) {
        var resToApplySizing = getResolution(arrayOfResolution[index]);

        if (layoutWidth > "1170" && resToApplySizing > "1170") {
            elem.style.setProperty("--width", arrayOfBorderSize[index]);
        }
        if (layoutWidth <= resToApplySizing && resToApplySizing != "1171") {
            elem.style.setProperty("--width", arrayOfBorderSize[index]);
        }

        index++;
    });
}

function getPropertiesBorderAfterElement() {
    /* Get all class of the page who has a gradient title */
    var arrayOfBorders = document.querySelectorAll("[class*=title-gradient-]");
    var arrayOfBorderSize = [],
        arrayOfResolution = [];

    /* get all the value of the size and resolution to apply the size */
    for (var i = 0; i < arrayOfBorders.length; i++) {
        var borderTitle = arrayOfBorders[i];
        var classLists = borderTitle.classList;
        console.log(classLists);
        for (var j = 0; j < classLists.length; j++) {
            if (classLists[j].match(/^title-gradient-/)) {
                //on récupere la valeur du % de la largeur a affecter
                var valueGradientSize = borderTitle.classList[j].split('-');
                var sizeGradientBorder = valueGradientSize[valueGradientSize.length - 1] + "%";
                var applyOnSpecificResolution = valueGradientSize[valueGradientSize.length - 2];

                arrayOfBorderSize.push(sizeGradientBorder);
                arrayOfResolution.push(applyOnSpecificResolution);
            }
        }
    }

    return {
        size: arrayOfBorderSize,
        resolution: arrayOfResolution,
        borders: arrayOfBorders
    };
}