$( document ).ready(function() {
    main();
});


function render_animation () {
    ajax_call("/test/animation/viruses.json", 30, 100, 100, "viruses-animation");
}


function ajax_call (jsonfile_name_input, fps_input, width_input, height_input, target_id) {
    var jsonfile = jsonfile_name_input,
        fps = fps_input,
        width = width_input,
        height = height_input,
        AJAX_req;
    
    AJAX_JSON_Req(jsonfile);
    
    
    function handle_AJAX_Complete() {
        if( AJAX_req.readyState == 4 && AJAX_req.status == 200 ) {
            json = JSON.parse(AJAX_req.responseText);
            // console.log("wait for it (json) =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
            // console.log(json["DOMDocument"]["Shape2"]);
            comp = new SVGAnim(
                          json,
                          width,
                          height,
                          fps
                          );
            document.getElementById(target_id).appendChild(comp.s.node); // Add this line of code
        }
    }
    
    function AJAX_JSON_Req( url ) {
        AJAX_req = new XMLHttpRequest();
        AJAX_req.open("GET", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/json");
        
        AJAX_req.onreadystatechange = handle_AJAX_Complete;
        AJAX_req.send();
    }
    
}



function main () {
    render_animation();
    console.log("Hello World");
}



function pauseResumeButtonClicked() {
    console.log("What do");
}

