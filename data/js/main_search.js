function mainSearch(filePath){
    //########################################################################\\
    // mainSearch(filePath)                                                   \\
    // ---------------------------------------------------------------------- \\
    // PARAMETERS                                                             \\
    // - filePath: When calling this function, use a string that is the file  \\
    //      path of the JSON file you want to load. For example, use          \\
    //      countyQuickSearch("/data/json/library.json");                     \\
    //                                                                        \\
    // ---------------------------------------------------------------------- \\
    // PURPOSE                                                                \\
    //      This function will control the main navigation on the page. The   \\
    // user selects items from the first_section_scroll_area. Once an item is \\
    // selected, the select panel disappears - along with the county quick    \\
    // search. After fading out, the breadcrumbs update, the new county       \\
    // filled select list appears, the map updates, and the state attributes  \\
    // section (data + data viz) will apppear.                                \\
    //########################################################################\\

    d3.json(filePath, function(libraries){
        //####################################################################\\
        // Declare Variables                                                  \\
        //####################################################################\\
        var placeHolder,
            stateList = [],
            numOfStates = libraries['states'].length,
            selectedState,
            selectedCounty,
            numOfCounties,
            numOfLibraries;

        //####################################################################\\
        // Examples                                                           \\
        // ------------------------------------------------------------------ \\
        // How many states in the array?                                      \\
        // libraries['states'].length;                                        \\
        // >>> 2                                                              \\
        //                                                                    \\
        // State name?                                                        \\
        // libraries['states'][0][0]['name'];                                 \\
        // >>> "Florida"                                                      \\
        //                                                                    \\
        // How many counties in the state?                                    \\
        // libraries['states'][0][0]['counties'].length;                      \\
        // >>> 2                                                              \\
        //                                                                    \\
        // What is the name of the county?                                    \\
        // libraries['states'][0][0]['counties'][0][0]['name'];               \\
        // >>> "county_one"                                                   \\
        //                                                                    \\
        // How many libraries in the county?                                  \\
        // libraries['states'][0][0]['counties'][0][0]['libraries'].length;   \\
        // >>> 2                                                              \\
        //                                                                    \\
        // What is the library name?                                          \\
        // libraries['states'][0][0]['counties'][0][0]['libraries'][0];       \\
        // >>> "library_one"                                                  \\
        //####################################################################\\
        
        //####################################################################\\
        // Populate the stateList array                                       \\
        //####################################################################\\
        for(var i=0; i<numOfStates; i++){
            stateList.push(libraries['states'][i][0]['name']);
        }

        //--------------------------------------------------------------------\\
        // First Step                                                         \\
        // 1) Fill first_section_scroll_area with states                      \\
        // 2) Add change event to the select list first_section_select_state  \\
        //--------------------------------------------------------------------\\
        // 1)
        placeHolder = "";
        placeHolder += "<select size='23' id='first_section_select_state' name='first_section_select_state'>";

        for(var i=0; i<numOfStates; i++){
            placeHolder += ("<option value='" + stateList[i] + "'>" + stateList[i] + "</option>");
        }
        placeHolder += "</select>";
        $('first_section_scroll_area').innerHTML = "";
        $('first_section_scroll_area').innerHTML = placeHolder;
        
        // 2)
        $('first_section_select_state').addEvent('change', function(){
            addEventToMainStateSelect();
        });

        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
        // addEventToMainStateSelect
        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
        function addEventToMainStateSelect(){
            if($('first_section_select_state').value === ""){
                } else {
                // Save the selectedState
                selectedState = $('first_section_select_state').value;

                //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
                // EVENTS                                                     \\
                //------------------------------------------------------------\\
                // 2.1) Fade the first_section_select_state                   \\
                // 2.2) Fade the Library Quick Search area                    \\
                // 2.3) Fade out the Breadcrumbs                              \\
                // 2.4) Create first_section_select_county                    \\
                // 2.5) Create the Back button under the select list          \\
                // 2.6) Create the State Attributes section                   \\
                // 2.7) Create the County Search section                      \\
                // 2.8) Update the Breadcrumbs                                \\
                // 2.9) Fade in the first_section_select_county               \\
                // 2.10) Fade in the Back button                              \\
                // 2.11) Fade in the State Attributes section                 \\
                // 2.12) Fade in the County Search Section                    \\
                // 2.13) Fade in the Breadcrumbs                              \\
                // 2.14) Add Event to the Back button                         \\
                // 2.15) Add Event to the first_section_select_county         \\
                //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
                
                // 2.1) Fade the first_section_select_state                   \\
                $('first_section_select_state').set('tween', { duration: 1000 }).fade('out');

                // 2.2) Fade the Library Quick Search area                    \\
                $('county_quick_search_wrapper').set('tween', { duration: 1000 }).fade('out');
                $('home_page_information_container').set('tween', { duration: 1000 }).fade('out');

                // 2.3) Fade out the Breadcrumbs                              \\
                $('current_selection_label_dynamic').set('tween', { duration: 1000 }).fade('out');

                // 2.4) Create first_section_select_county                    \\
                $('first_section_scroll_area').innerHTML = "";
                placeHolder = "";
                placeHolder += "<select size='20' id='first_section_select_county' name='first_section_select_county' style='opacity: 0; visibility: hidden;'>";
                for(var i=0; i<numOfStates; i++){
                    if(libraries['states'][i][0]['name'] === selectedState){
                        numOfCounties = libraries['states'][i][0]['counties'].length;
                        for(var j=0; j<numOfCounties; j++){
                            placeHolder += ("<option value='" + libraries['states'][i][0]['counties'][j][0]['name'] + "'>" + libraries['states'][i][0]['counties'][j][0]['name'] + "</option>");
                        }
                    }
                }
                placeHolder += "</select>";
                // NOTE: The placeHolder will be set at the end of 2.5, because
                // they both are being loaded into the same div.

                // 2.5) Create the Back button under the select list          \\
                placeHolder += "<div id='first_section_back_county' class='main_search_back_button' style='opacity: 0; visbility: hidden;'>Back To State List</div>";
                $('first_section_scroll_area').innerHTML = placeHolder;
                
                // 2.6) Create the State Attributes section                   \\
                $('second_section_label').innerHTML = (selectedState + " Attributes");
                
                // 2.7) Create the County Search section                      \\
                
                // 2.8) Update the Breadcrumbs                                \\
                $('current_selection_label_dynamic').innerHTML = (selectedState);
                
                // 2.9) Fade in the first_section_select_county               \\
                $('first_section_select_county').set('tween', { duration: 1100 }).fade('in');
                
                // 2.10) Fade in the Back button                              \\
                $('first_section_back_county').set('tween', { duration: 1100 }).fade('in');
                
                // 2.11) Fade in the State Attributes section                 \\
                $('second_section_wrapper').set('tween', { duration: 1100 }).fade('in');
                $('third_section_state_data_vis_container').set('tween', { duration: 1100 }).fade('in');
                
                // 2.12) Fade in the County Search Section                    \\
                
                // 2.13) Fade in the Breadcrumbs                              \\
                $('current_selection_label_dynamic').set('tween', { duration: 1100 }).fade('in');

                // 2.14) Add Event to the Back button                         \\
                $('first_section_back_county').addEvent('click', function(){
                    countyBackButton();    
                });
                
                // 2.15) Add Event to the first_section_select_county         \\
                $('first_section_select_county').addEvent('click', function(){
                    if($('first_section_select_county').value === ""){
                    } else {
                        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
                        // Events                                             \\
                        // -------------------------------------------------- \\
                        // Fire these events on clicking a county             \\
                        //                                                    \\
                        // 1. Update Breadcrumbs                              \\
                        // 2. Fade out                                        \\
                        //    - first_section_select_county                   \\
                        //    - first_section_back_county                     \\
                        //    - second_section_wrapper                        \\
                        //    - third_section_state_data_vis_container        \\
                        // 3. Create                                          \\
                        //    - first_section_select_library                  \\
                        //    - first_section_back_library                    \\
                        //    - first_section_back_to_state_library           \\
                        //    - second_section_county_wrapper                 \\
                        //    - third_section_county_data_vis_container       \\
                        // 4. Fade in                                         \\
                        //    - Breadcrumbs                                   \\
                        //    - first_section_select_library                  \\
                        //    - first_section_back_library                    \\
                        //    - first_section_back_to_state_library           \\
                        //    - second_section_county_wrapper                 \\
                        //    - third_section_county_data_vis_container       \\
                        // 5. Add Events                                      \\
                        //    - first_section_select_library                  \\
                        //    - first_section_back_library                    \\
                        //    - first_section_back_to_state_library           \\
                        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
                        selectedCounty = $('first_section_select_county').value;
                        numOfCounties = $('first_section_select_county').options.length;

                        // 1. Update Breadcrumbs                              \\
                        $('current_selection_label_dynamic').innerHTML = (selectedState + " : " + selectedCounty);
                        
                        // 2. Fade out                                        \\
                        //    - first_section_select_county                   \\
                        //    - first_section_back_county                     \\
                        //    - second_section_wrapper                        \\
                        //    - third_section_state_data_vis_container        \\
                        $('first_section_select_county').set('tween', { duration: 1000 }).fade('out');
                        $('first_section_back_county').set('tween', { duration: 1000 }).fade('out');
                        $('second_section_wrapper').set('tween', { duration: 1000 }).fade('out');
                        $('third_section_state_data_vis_container').set('tween', { duration: 1000 }).fade('out');
                        
                        // 3. Create                                          \\
                        //    - first_section_select_library                  \\
                        //    - first_section_back_library                    \\
                        //    - first_section_back_to_state_library           \\
                        //    - second_section_county_wrapper                 \\
                        //    - third_section_county_data_vis_container       \\
                        $('first_section_scroll_area').innerHTML = "";
                        placeHolder = "";
                        placeHolder += "<select size='20' id='first_section_select_library' name='first_section_select_library' style='opacity: 0; visibility: hidden;'>";
                        for(var i=0; i<numOfStates; i++){
                            if(libraries['states'][i][0]['name'] === selectedState){
                                for(var j=0; j<numOfCounties; j++){
                                    if(libraries['states'][i][0]['counties'][j][0]['name'] === selectedCounty){
                                        numOfLibraries = libraries['states'][i][0]['counties'][j][0]['libraries'].length;
                                        for(var k=0; k<numOfLibraries; k++){
                                            placeHolder += ("<option value='" + libraries['states'][i][0]['counties'][j][0]['libraries'][k] + "'>" + libraries['states'][i][0]['counties'][j][0]['libraries'][k] + "</option>");
                                        }
                                    }
                                }
                            }
                        }
                        placeHolder += "</select>";

                        placeHolder += "<div id='first_section_back_to_state_library' class='main_search_back_button' style='opacity: 0; visbility: hidden;'>Back To State List</div>";
                        placeHolder += "<div id='first_section_back_library' class='main_search_back_button' style='opacity: 0; visbility: hidden;'>Back To County List</div>";
                        placeHolder += "<div class='clear'></div>";

                        $('first_section_scroll_area').innerHTML = placeHolder;
                        
                        // *** Second Section ***
                        $('second_section_county_label').innerHTML = (selectedCounty + " Attributes");
                        
                        // *** Third Section ***
                        
                        
                        // 6. Fade in                                         \\
                        //    - Breadcrumbs                                   \\
                        //    - first_section_select_library                  \\
                        //    - first_section_back_library                    \\
                        //    - first_section_back_to_state_library           \\
                        //    - second_section_county_wrapper                 \\
                        //    - third_section_county_data_vis_container       \\
                        $('current_selection_label_dynamic').set('tween', { duration: 1100 }).fade('in');
                        $('first_section_select_library').set('tween', { duration: 1100 }).fade('in');
                        $('first_section_back_library').set('tween', { duration: 1100 }).fade('in');
                        $('first_section_back_to_state_library').set('tween', { duration: 1100 }).fade('in');
                        $('second_section_county_wrapper').set('tween', { duration: 1100 }).fade('in');
                        $('third_section_county_data_vis_container').set('tween', { duration: 1100 }).fade('in');
                        

                        // 7. Add Events                                      \\
                        //    - first_section_select_library                  \\
                        //    - first_section_back_library                    \\
                        //    - first_section_back_to_state_library           \\
                    }
                });
            }

        }

        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
        // countyBackButton - "Back Function"                                 \\
        // ------------------------------------------------------------------ \\
        // We need to reset the page.                                         \\
        // 1) Fade Breadcrumbs                                                \\
        // 2) Fade first_section_select_county                                \\
        // 3) Fade first_section_back_county                                  \\
        // 4) Fade second_section_wrapper                                     \\
        // 5) Fade County Search Area                                         \\
        // 6) Update Breadcrumbs                                              \\
        // 7) Clear select section, build original first_section_select_state \\
        // 8) Fade in Breadcrumbs                                             \\
        // 9) Fade in first_section_select_state                              \\
        // 10) Fade in county_quick_search_wrapper                            \\
        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
        function countyBackButton(){
            // 1) Fade Breadcrumbs                                            \\
            $('current_selection_label_dynamic').set('tween', { duration: 1000 }).fade('out');

            // 2) Fade first_section_select_county                            \\
            $('first_section_select_county').set('tween', { duration: 1000 }).fade('out');

            // 3) Fade first_section_back_county                              \\
            $('first_section_back_county').set('tween', { duration: 1000 }).fade('out');
            
            // 4) Fade second_section_wrapper                                 \\
            $('second_section_wrapper').set('tween', { duration: 1000 }).fade('out');
            $('third_section_state_data_vis_container').set('tween', { duration: 1000 }).fade('out');
            
            // 5) Fade County Search Area                                     \\
            
            // 6) Update Breadcrumbs                                          \\
            $('current_selection_label_dynamic').innerHTML = "None Selected";
            
            // 7) Clear select section, build original                        \\
            //      first_section_select_state                                \\
            placeHolder = "";
            placeHolder += "<select size='23' id='first_section_select_state' name='first_section_select_state' style='opacity: 0; visibility: hidden;'>";

            for(var i=0; i<numOfStates; i++){
                placeHolder += ("<option value='" + stateList[i] + "'>" + stateList[i] + "</option>");
            }
            placeHolder += "</select>";
            $('first_section_scroll_area').innerHTML = "";
            $('first_section_scroll_area').innerHTML = placeHolder;
            $('first_section_select_state').addEvent('change', function(){
                addEventToMainStateSelect();
            });

            // 8) Fade in Breadcrumbs                                         \\
            $('current_selection_label_dynamic').set('tween', { duration: 1100 }).fade('in');
            
            // 9) Fade in first_section_select_state                          \\
            $('first_section_select_state').set('tween', { duration: 1100 }).fade('in');
            
            // 10) Fade in county_quick_search_wrapper                        \\
            $('county_quick_search_wrapper').set('tween', { duration: 1100 }).fade('in');
            $('home_page_information_container').set('tween', { duration: 1100 }).fade('in');
        }
    });
}
