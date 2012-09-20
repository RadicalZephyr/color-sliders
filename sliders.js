function initSliders(selector) {
    var div = document.createElement('div');
    div.innerHTML = '<div id="sliders" style=" position: relative;z-index: 1000;top : 10em;margin-left: auto;margin-right: auto;width: 70%;padding: 10px;background-color: whitesmoke;border-style: outset;border-width: 2px;"><h2>'+selector+'</h2>Red: <div id="red"></div><br>Green: <div id="green"></div><br>Blue: <div id="blue"></div></div>';
    document.getElementById("alertWrapper").appendChild(div);

    var ss = document.styleSheets;
    var sheet;
    for (var i = 0; i < ss.length; i++) {
        if (/.*?bootstrap.min.css/.test(ss[i].href)) {
            sheet = ss[i];
            break;
        }
    }

    var rules = sheet.cssRules;
    var rule;
    var selectorRE = new RegExp(selector);
    for (var i = 0; i < rules.length; i++) {
        if (selectorRE.test(rules[i].selectorText)) {
            rule = rules[i];
            break;
        }
    }
    jQuery("#sliders div").slider({min:0, max:255, slide: function () {
        var redVal = jQuery("#red").slider("value");
        var greenVal = jQuery("#green").slider("value");
        var blueVal = jQuery("#blue").slider("value");
        rule.style.backgroundColor = "rgb("+redVal+","+greenVal+","+blueVal+")";
        rule.style.borderColor = "rgb("+(redVal-29)+","+(greenVal-5)+","+(blueVal-6)+")";
        rule.style.color = "rgb("+(redVal-159)+","+(greenVal-102)+","+(blueVal-74)+")";
    }});
    var rgb = rule.style.backgroundColor.match(/\d{1,3}/g);
    jQuery("#red").slider("value", rgb[0]);
    jQuery("#green").slider("value", rgb[1]);
    jQuery("#blue").slider("value", rgb[2]);
    return rule;
}
