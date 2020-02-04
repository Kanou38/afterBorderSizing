jQuery(document).ready(function($) {
    // Full height mobile menu
    $wh = window.innerrHeight;
    $('.elementor-nav-menu--dropdown').height($wh);

    setPropertiesBorderAfterElement();
});

var resolutions = {
    "xs": 460,
    "sm": 768,
    "md": 1170,
    "lg": 1171,
}

function setPropertiesBorderAfterElement() {
    /* Get all class of the page who has a gradient title */
    var arrayOfBorders = document.querySelectorAll("[class*=title-gradient-]");
    //two dimensino table = key : resolution and for value : border size
    var arrayOfBordersSettings = [];

    /* get all the value of the size and resolution to apply the size */
    for (var i = 0; i < arrayOfBorders.length; i++) {
        var borderTitles = arrayOfBorders[i];
        var classLists = borderTitles.classList;

        var borderSettings = {
            item: borderTitles,
            sizes: {}
        };

        for (var j = 0; j < classLists.length; j++) {

            if (classLists[j].match(/^title-gradient-/)) {
                //on récupere la valeur du % de la largeur a affecter
                var valueGradientSize = borderTitles.classList[j].split('-');
                var sizeGradientBorder = valueGradientSize[valueGradientSize.length - 1] + "%";
                var applyOnSpecificResolution = valueGradientSize[valueGradientSize.length - 2];

                borderSettings.sizes[applyOnSpecificResolution] = sizeGradientBorder;
            }
        }

        arrayOfBordersSettings.push(borderSettings);
    }

    //on initialise la resolution initiale
    var resolutionCurrent = 'lg';
    var layoutWidth = window.innerWidth;

    for (var resolution in resolutions) {
        if (layoutWidth <= resolutions[resolution]) {
            resolutionCurrent = resolution;
            break;
        }
    }

    // on affecte la valeur de la taille du pseudo element dans la variable --width
    arrayOfBordersSettings.forEach(function(elem) {
        if (!elem.sizes.hasOwnProperty(resolutionCurrent)) {
            return;
        }
        elem.item.style.setProperty("--width", elem.sizes[resolutionCurrent]);
    });
}