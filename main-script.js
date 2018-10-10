$( document ).ready(function() {
    main();
});

console.log("hello world - 0.8");

function render_animation () {
    console.log("render_animation triggered");
    ajax_call("animation/airways.json", 30, 100, 100, "airways-animation");
    ajax_call("animation/viruses.json", 30, 100, 100, "viruses-animation");
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


function init_buttons () {
    console.log("init_buttons triggered");
    init_buttons_helper("#btn-choice-home", "#choice-list-solution-specific", "#section-stay-home");
    init_buttons_helper("#btn-choice-emergency", "#choice-list-solution-specific", "#section-emergency-department");
    init_buttons_helper("#btn-choice-unsure", "#choice-list-solution-specific", "#section-unsure");
    //init_liability_button();
    //init_overlay_close_button();
}

function init_buttons_helper (btn_id_name, choice_list_name, section_tips_name) {
    $(btn_id_name).click(function() {
        console.log("button has been clicked");
        if ($(btn_id_name).hasClass("choice-unselected") == true) {
            console.log("if function has been triggered");
            $(choice_list_name+" .choice-selected").removeClass('choice-selected').addClass('choice-unselected');
            $(btn_id_name).removeClass("choice-unselected").addClass("choice-selected");
            $(btn_id_name).next().removeClass("choice-unselected").addClass('choice-selected');
            $(".solution-specific-section").hide();
            $(section_tips_name).show();
        }
    });
}

function init_liability_button(){
    $("#liability-statement-btn").click(function(){
       console.log("liability button was clicked");
       $("#liability-overlay").fadeIn();
       $("body").addClass("scroll-locked");
    });
}

function init_overlay_close_button () {
    $(".overlay-close-btn").click(function(){
       console.log("overlay close button was clicked");
       $("#liability-overlay").hide();
       $("body").removeClass("scroll-locked");
       $("#liability-statement-btn").get(0).scrollIntoView();
    });
}


















function main () {
    render_animation();
    init_buttons();
}



function pauseResumeButtonClicked() {
    console.log("Hi");
//   if(pauseResumeButton.innerHTML=="pause")
//   {
    // $("#viruses-animation").pause();
    $("#viruses-animation .movieclip").css({"animation-play-state": "paused"});
    // animation-play-state: paused;
        
//         pauseResumeButton.innerHTML="resume"
//   }
//   else
//   {
//       myAnim.resume()
//       pauseResumeButton.innerHTML="pause"
//   }
}

