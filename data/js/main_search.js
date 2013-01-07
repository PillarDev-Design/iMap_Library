function mainSearch(filePath){
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
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
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\

    d3.json(filePath, function(libraries){
        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
        // Declare Variables                                                  \\
        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
        var placeHolder,
            stateList = [],
            numOfStates = libraries['states'].length,
            selectedState,
            selectedCounty,
            numOfCounties,
            numOfLibraries;

        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
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
        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
        
        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
        // Populate the stateList array                                       \\
        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
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
        // addEventToMainStateSelect()                                        \\
        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
        function addEventToMainStateSelect(){
            if($('first_section_select_state').value === ""){
            } else {
                // Save the selectedState
                selectedState = $('first_section_select_state').value;

                //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
                // EVENTS                                                     \\
                //------------------------------------------------------------\\
                // 1. Update Breadcrumbs                                      \\
                // 2. Fade out                                                \\
                //    - first_section_select_state                            \\
                //    - county_quick_search_wrapper                           \\
                //    - home_page_information_container                       \\
                // 3. Create                                                  \\
                //    - first_section_select_county                           \\
                //    - first_section_back_county                             \\
                //    + Update Second Section                                 \\
                //      - second_section_label                                \\
                //    + Update Third Section                                  \\
                // 4. Fade in                                                 \\
                //    - first_section_select_county                           \\
                //    - first_section_back_county                             \\
                //    - second_section_wrapper                                \\
                //    - third_section_state_data_vis_container                \\
                // 5. Add Events                                              \\
                //    - first_section_back_county                             \\
                //    - first_section_select_county                           \\
                // 6. Move window location to the second section              \\
                //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
                
                // 1. Update Breadcrumbs                                      \\
                $('current_selection_label_dynamic_container').innerHTML = ("<div class='current_selection_label_dynamic_scheme'>" + selectedState + "</div>");

                // 2. Fade out                                                \\
                //    - first_section_select_state                            \\
                //    - county_quick_search_wrapper                           \\
                //    - home_page_information_container                       \\
                $('first_section_select_state').set('tween', { duration: 1000 }).fade('out');
                $('county_quick_search_wrapper').set('tween', { duration: 1000 }).fade('out');
                $('home_page_information_container').set('tween', { duration: 1000 }).fade('out');


                // 3. Create                                                  \\
                //    - first_section_select_county                           \\
                //    - first_section_back_county                             \\
                //    + Update Second Section                                 \\
                //      - second_section_label                                \\
                //    + Update Third Section                                  \\
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
                placeHolder += "<div id='first_section_back_county' class='main_search_back_button' style='opacity: 0; visbility: hidden;'>Back To State List</div>";
                $('first_section_scroll_area').innerHTML = placeHolder;
                $('second_section_label').innerHTML = (selectedState + " Attributes");
                
                // 4. Fade in                                                 \\
                //    - first_section_select_county                           \\
                //    - first_section_back_county                             \\
                //    - second_section_wrapper                                \\
                //    - third_section_state_data_vis_container                \\
                $('first_section_select_county').set('tween', { duration: 1100 }).fade('in');
                $('first_section_back_county').set('tween', { duration: 1100 }).fade('in');
                $('second_section_wrapper').set('tween', { duration: 1100 }).fade('in');
                $('third_section_state_data_vis_container').set('tween', { duration: 1100 }).fade('in');
                

                // 5. Add Events                                              \\
                //    - first_section_back_county                             \\
                //    - first_section_select_county                           \\
                $('first_section_back_county').addEvent('click', function(){
                    countyBackButton();    
                });
                $('first_section_select_county').addEvent('change', function(){
                    if($('first_section_select_county').value === ""){
                    } else {
                        selectedCounty = $('first_section_select_county').value;
                        numOfCounties = $('first_section_select_county').options.length;
                        addEventToMainCountySelect(selectedState, selectedCounty, numOfCounties);
                    }
                });

                // 6. Move window location to the second section              \\
                window.location = "#county_quick_search_container";
            }
        }
        function addEventToMainCountySelect(currentState, currentCounty, currentNumOfCounties){
            //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
            // Events                                                         \\
            // -------------------------------------------------------------- \\
            // Fire these events on clicking a county                         \\
            //                                                                \\
            // 1. Update Breadcrumbs                                          \\
            // 2. Fade out                                                    \\
            //    - first_section_select_county                               \\
            //    - first_section_back_county                                 \\
            //    - second_section_wrapper                                    \\
            //    - third_section_state_data_vis_container                    \\
            // 3. Create                                                      \\
            //    - first_section_select_library                              \\
            //    - first_section_back_library                                \\
            //    - first_section_back_to_state_library                       \\
            //    + Update Second Section                                     \\
            //      - second_section_label                                    \\
            //    + Update Third Section                                      \\
            // 4. Fade in                                                     \\
            //    - first_section_select_library                              \\
            //    - first_section_back_library                                \\
            //    - first_section_back_to_state_library                       \\
            //    - second_section_county_wrapper                             \\
            //    - third_section_county_data_vis_container                   \\
            // 5. Add Events                                                  \\
            //    - first_section_select_library                              \\
            //    - first_section_back_library                                \\
            //    - first_section_back_to_state_library                       \\
            // 6. Move window location to the second section                  \\
            //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\

            // 1. Update Breadcrumbs                                          \\
            placeHolder = "";
            placeHolder += ("<div class='current_selection_label_dynamic_scheme'>" + currentState + "</div>");
            placeHolder += ("<div class='current_selection_label_dynamic_space'>" + " :: " + "</div>");
            placeHolder += ("<div class='current_selection_label_dynamic_scheme'>" + currentCounty + "</div>");
            $('current_selection_label_dynamic_container').innerHTML = placeHolder;
            
            // 2. Fade out                                                    \\
            //    - first_section_select_county                               \\
            //    - first_section_back_county                                 \\
            //    - second_section_wrapper                                    \\
            //    - third_section_state_data_vis_container                    \\
            $('first_section_select_county').set('tween', { duration: 1000 }).fade('out');
            $('first_section_back_county').set('tween', { duration: 1000 }).fade('out');
            $('second_section_wrapper').set('tween', { duration: 1000 }).fade('out');
            $('third_section_state_data_vis_container').set('tween', { duration: 1000 }).fade('out');
            
            // 3. Create                                                      \\
            //    - first_section_select_library                              \\
            //    - first_section_back_library                                \\
            //    - first_section_back_to_state_library                       \\
            //    + Update Second Section                                     \\
            //      - second_section_label                                    \\
            //    + Update Third Section                                      \\
            $('first_section_scroll_area').innerHTML = "";
            placeHolder = "";
            placeHolder += "<select size='20' id='first_section_select_library' name='first_section_select_library' style='opacity: 0; visibility: hidden;'>";
            for(var i=0; i<numOfStates; i++){
                if(libraries['states'][i][0]['name'] === currentState){
                    for(var j=0; j<currentNumOfCounties; j++){
                        if(libraries['states'][i][0]['counties'][j][0]['name'] === currentCounty){
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
            $('second_section_county_label').innerHTML = (currentCounty + " Attributes");
            
            // 4. Fade in                                                     \\
            //    - first_section_select_library                              \\
            //    - first_section_back_library                                \\
            //    - first_section_back_to_state_library                       \\
            //    - second_section_county_wrapper                             \\
            //    - third_section_county_data_vis_container                   \\
            $('first_section_select_library').set('tween', { duration: 1100 }).fade('in');
            $('first_section_back_library').set('tween', { duration: 1100 }).fade('in');
            $('first_section_back_to_state_library').set('tween', { duration: 1100 }).fade('in');
            $('second_section_county_wrapper').set('tween', { duration: 1100 }).fade('in');
            $('third_section_county_data_vis_container').set('tween', { duration: 1100 }).fade('in');
            

            // 5. Add Events                                                  \\
            //    - first_section_select_library                              \\
            //    - first_section_back_library                                \\
            //    - first_section_back_to_state_library                       \\
            $('first_section_back_library').addEvent('click', function() {
                libraryBackButton(currentCounty, currentState);
            });
            $('first_section_back_to_state_library').addEvent('click', function() {
                libraryBackToStateButton();
            });
            $('first_section_select_library').addEvent('change', function (){
                if($('first_section_select_library').value === ""){
                } else {
                    // Events to be Fire when Library is selected
                }
            });
            // 6. Move window location to the second section                  \\
            window.location = "#county_quick_search_container";
        }
        
        function libraryBackButton(currentCounty, currentState){
            //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
            // EVENTS                                                         \\
            //----------------------------------------------------------------\\
            // 1. Update Breadcrumbs                                          \\
            // 2. Fade out                                                    \\
            //    - first_section_select_library                              \\
            //    - first_section_back_library                                \\
            //    - first_section_back_to_state_library                       \\
            //    - second_section_county_wrapper                             \\
            //    - third_section_county_data_vis_container                   \\
            // 3. Create                                                      \\
            //    - first_section_select_county                               \\
            //    - first_section_back_county                                 \\
            //    + Update Second Section                                     \\
            //      - second_section_label                                    \\
            //    + Update Third Section                                      \\
            // 4. Fade in                                                     \\
            //    - first_section_select_county                               \\
            //    - first_section_back_county                                 \\
            //    - second_section_wrapper                                    \\
            //    - third_section_state_data_vis_container                    \\
            // 5. Add Events                                                  \\
            //    - first_section_select_county                               \\
            //    - first_section_back_county                                 \\
            //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\

            // 1. Update Breadcrumbs                                          \\
            placeHolder = "";
            placeHolder += ("<div class='current_selection_label_dynamic_scheme'>" + currentState + "</div>");
            $('current_selection_label_dynamic_container').innerHTML = placeHolder;
            
            // 2. Fade out                                                    \\
            //    - first_section_select_library                              \\
            //    - first_section_back_library                                \\
            //    - first_section_back_to_state_library                       \\
            //    - second_section_county_wrapper                             \\
            //    - third_section_county_data_vis_container                   \\
            $('first_section_select_library').set('tween', { duration: 1000 }).fade('out');
            $('first_section_back_library').set('tween', { duration: 1000 }).fade('out');
            $('first_section_back_to_state_library').set('tween', { duration: 1000 }).fade('out');
            $('second_section_county_wrapper').set('tween', { duration: 1000 }).fade('out');
            $('third_section_county_data_vis_container').set('tween', { duration: 1000 }).fade('out');
            
            // 3. Create                                                      \\
            //    - first_section_select_county                               \\
            //    - first_section_back_county                                 \\
            //    + Update Second Section                                     \\
            //      - second_section_label                                    \\
            //    + Update Third Section                                      \\
            $('first_section_scroll_area').innerHTML = "";
            placeHolder = "";
            placeHolder += "<select size='20' id='first_section_select_county' name='first_section_select_county' style='opacity: 0; visibility: hidden;'>";
            for(var i=0; i<numOfStates; i++){
                if(libraries['states'][i][0]['name'] === currentState){
                    numOfCounties = libraries['states'][i][0]['counties'].length;
                    for(var j=0; j<numOfCounties; j++){
                        placeHolder += ("<option value='" + libraries['states'][i][0]['counties'][j][0]['name'] + "'>" + libraries['states'][i][0]['counties'][j][0]['name'] + "</option>");
                    }
                }
            }
            placeHolder += "</select>";
            placeHolder += "<div id='first_section_back_county' class='main_search_back_button' style='opacity: 0; visbility: hidden;'>Back To State List</div>";
            $('first_section_scroll_area').innerHTML = placeHolder;
            $('second_section_label').innerHTML = (currentState + " Attributes");
            
            // 4. Fade in                                                     \\
            //    - first_section_select_county                               \\
            //    - first_section_back_county                                 \\
            //    - second_section_wrapper                                    \\
            //    - third_section_state_data_vis_container                    \\
            $('first_section_select_county').set('tween', { duration: 1100 }).fade('in');
            $('first_section_back_county').set('tween', { duration: 1100 }).fade('in');
            $('second_section_wrapper').set('tween', { duration: 1100 }).fade('in');
            $('third_section_state_data_vis_container').set('tween', { duration: 1100 }).fade('in');
            
            // 5. Add Events                                                  \\
            //    - first_section_select_county                               \\
            //    - first_section_back_county                                 \\
            $('first_section_back_county').addEvent('click', function(){
                countyBackButton();    
            });
            $('first_section_select_county').addEvent('change', function(){
                if($('first_section_select_county').value === ""){
                } else {
                    selectedCounty = $('first_section_select_county').value;
                    numOfCounties = $('first_section_select_county').options.length;
                    addEventToMainCountySelect(selectedState, selectedCounty, numOfCounties);
                }

            });
        }
        function libraryBackToStateButton(){
            //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
            // EVENTS                                                         \\
            //----------------------------------------------------------------\\
            // 1. Update Breadcrumbs                                          \\
            // 2. Fade out                                                    \\
            //    - first_section_select_library                              \\
            //    - first_section_back_library                                \\
            //    - first_section_back_to_state_library                       \\
            //    - second_section_county_wrapper                             \\
            //    - third_section_county_data_vis_container                   \\
            // 3. Create                                                      \\
            //    - first_section_select_state                                \\
            // 4. Fade in                                                     \\
            //    - first_section_select_state                                \\
            //    - county_quick_search_wrapper                               \\
            //    - home_page_information_container                           \\
            // 5. Add Events                                                  \\
            //    - first_section_select_state                                \\
            //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
            
            // 1. Update Breadcrumbs                                          \\
            placeHolder = "";
            placeHolder += "<div class='current_selection_label_dynamic_scheme'>None Selected</div>";
            $('current_selection_label_dynamic_container').innerHTML = placeHolder;
            
            // 2. Fade out                                                    \\
            //    - first_section_select_library                              \\
            //    - first_section_back_library                                \\
            //    - first_section_back_to_state_library                       \\
            //    - second_section_county_wrapper                             \\
            //    - third_section_county_data_vis_container                   \\
            $('first_section_select_library').set('tween', { duration: 1000 }).fade('out');
            $('first_section_back_library').set('tween', { duration: 1000 }).fade('out');
            $('first_section_back_to_state_library').set('tween', { duration: 1000 }).fade('out');
            $('second_section_county_wrapper').set('tween', { duration: 1000 }).fade('out');
            $('third_section_county_data_vis_container').set('tween', { duration: 1000 }).fade('out');
            
            // 3. Create                                                      \\
            //    - first_section_select_state                                \\
            placeHolder = "";
            placeHolder += "<select size='23' id='first_section_select_state' name='first_section_select_state' style='opacity: 0; visibility: hidden;'>";
            for(var i=0; i<numOfStates; i++){
                placeHolder += ("<option value='" + stateList[i] + "'>" + stateList[i] + "</option>");
            }
            placeHolder += "</select>";
            $('first_section_scroll_area').innerHTML = "";
            $('first_section_scroll_area').innerHTML = placeHolder;
            
            // 4. Fade in                                                     \\
            //    - first_section_select_state                                \\
            //    - county_quick_search_wrapper                               \\
            //    - home_page_information_container                           \\
            $('first_section_select_state').set('tween', { duration: 1100 }).fade('in');
            $('county_quick_search_wrapper').set('tween', { duration: 1100 }).fade('in');
            $('home_page_information_container').set('tween', { duration: 1100 }).fade('in');
            
            // 5. Add Events                                                  \\
            //    - first_section_select_state                                \\
            $('first_section_select_state').addEvent('change', function(){
                addEventToMainStateSelect();
            });
        }
        function countyBackButton(){
            //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
            // EVENTS                                                         \\
            //----------------------------------------------------------------\\
            // 1. Update Breadcrumbs                                          \\
            // 2. Fade out                                                    \\
            //    - first_section_select_county                               \\
            //    - first_section_back_county                                 \\
            //    - second_section_wrapper                                    \\
            //    - third_section_state_data_vis_container                    \\
            // 3. Create                                                      \\
            //    - first_section_select_state                                \\
            // 4. Fade in                                                     \\
            //    - first_section_select_state                                \\
            //    - county_quick_search_wrapper                               \\
            //    - home_page_information_container                           \\
            // 5. Add Events                                                  \\
            //    - first_section_select_state                                \\
            //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\

            // 1. Update Breadcrumbs                                          \\
            placeHolder = "";
            placeHolder += "<div class='current_selection_label_dynamic_scheme'>None Selected</div>";
            $('current_selection_label_dynamic_container').innerHTML = placeHolder;

            // 2. Fade out                                                    \\
            //    - first_section_select_county                               \\
            //    - first_section_back_county                                 \\
            //    - second_section_wrapper                                    \\
            //    - third_section_state_data_vis_container                    \\
            $('first_section_select_county').set('tween', { duration: 1000 }).fade('out');
            $('first_section_back_county').set('tween', { duration: 1000 }).fade('out');
            $('second_section_wrapper').set('tween', { duration: 1000 }).fade('out');
            $('third_section_state_data_vis_container').set('tween', { duration: 1000 }).fade('out');
            
            
            // 3. Create                                                      \\
            //    - first_section_select_state                                \\
            placeHolder = "";
            placeHolder += "<select size='23' id='first_section_select_state' name='first_section_select_state' style='opacity: 0; visibility: hidden;'>";
            for(var i=0; i<numOfStates; i++){
                placeHolder += ("<option value='" + stateList[i] + "'>" + stateList[i] + "</option>");
            }
            placeHolder += "</select>";
            $('first_section_scroll_area').innerHTML = "";
            $('first_section_scroll_area').innerHTML = placeHolder;
            
            // 4. Fade in                                                     \\
            //    - first_section_select_state                                \\
            //    - county_quick_search_wrapper                               \\
            //    - home_page_information_container                           \\
            $('first_section_select_state').set('tween', { duration: 1100 }).fade('in');
            $('county_quick_search_wrapper').set('tween', { duration: 1100 }).fade('in');
            $('home_page_information_container').set('tween', { duration: 1100 }).fade('in');

            // 5. Add Events                                                  \\
            //    - first_section_select_state                                \\
            $('first_section_select_state').addEvent('change', function(){
                addEventToMainStateSelect();
            });
        }
        function quick_search_state_link(stateLinkName){
            if(stateLinkName === ""){
            } else {
                // Save the selectedState
                selectedState = stateLinkName;

                //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
                // EVENTS                                                     \\
                //------------------------------------------------------------\\
                // 1. Update Breadcrumbs                                      \\
                // 2. Fade out                                                \\
                //    - first_section_select_state                            \\
                //    - county_quick_search_wrapper                           \\
                //    - home_page_information_container                       \\
                // 3. Create                                                  \\
                //    - first_section_select_county                           \\
                //    - first_section_back_county                             \\
                //    + Update Second Section                                 \\
                //      - second_section_label                                \\
                //    + Update Third Section                                  \\
                // 4. Fade in                                                 \\
                //    - first_section_select_county                           \\
                //    - first_section_back_county                             \\
                //    - second_section_wrapper                                \\
                //    - third_section_state_data_vis_container                \\
                // 5. Add Events                                              \\
                //    - first_section_back_county                             \\
                //    - first_section_select_county                           \\
                // 6. Move window location to the second section              \\
                //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\

                // 1. Update Breadcrumbs                                      \\
                $('current_selection_label_dynamic_container').innerHTML = ("<div class='current_selection_label_dynamic_scheme'>" + selectedState + "</div>");

                // 2. Fade out                                                \\
                //    - first_section_select_state                            \\
                //    - county_quick_search_wrapper                           \\
                //    - home_page_information_container                       \\
                $('first_section_select_state').set('tween', { duration: 1000 }).fade('out');
                $('county_quick_search_wrapper').set('tween', { duration: 1000 }).fade('out');
                $('home_page_information_container').set('tween', { duration: 1000 }).fade('out');


                // 3. Create                                                  \\
                //    - first_section_select_county                           \\
                //    - first_section_back_county                             \\
                //    + Update Second Section                                 \\
                //      - second_section_label                                \\
                //    + Update Third Section                                  \\
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
                placeHolder += "<div id='first_section_back_county' class='main_search_back_button' style='opacity: 0; visbility: hidden;'>Back To State List</div>";
                $('first_section_scroll_area').innerHTML = placeHolder;
                $('second_section_label').innerHTML = (selectedState + " Attributes");
                
                // 4. Fade in                                                 \\
                //    - first_section_select_county                           \\
                //    - first_section_back_county                             \\
                //    - second_section_wrapper                                \\
                //    - third_section_state_data_vis_container                \\
                $('first_section_select_county').set('tween', { duration: 1100 }).fade('in');
                $('first_section_back_county').set('tween', { duration: 1100 }).fade('in');
                $('second_section_wrapper').set('tween', { duration: 1100 }).fade('in');
                $('third_section_state_data_vis_container').set('tween', { duration: 1100 }).fade('in');
                

                // 5. Add Events                                              \\
                //    - first_section_back_county                             \\
                //    - first_section_select_county                           \\
                $('first_section_back_county').addEvent('click', function(){
                    countyBackButton();    
                });
                $('first_section_select_county').addEvent('change', function(){
                    if($('first_section_select_county').value === ""){
                    } else {
                        selectedCounty = $('first_section_select_county').value;
                        numOfCounties = $('first_section_select_county').options.length;
                        addEventToMainCountySelect(selectedState, selectedCounty, numOfCounties);
                    }
                });

                // 6. Move window location to the second section              \\
                window.location = "#county_quick_search_container";
            }
        }
        function quick_search_county_link(){
        }
        function quick_search_library_link(){
        }
    });
}
