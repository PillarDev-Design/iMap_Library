function countyQuickSearch(filePath){
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
    // countyQuickSearch(filePath)                                            \\
    // ---------------------------------------------------------------------- \\
    // PARAMETERS                                                             \\
    // - filePath: When calling this function, use a string that is the file  \\
    //      path of the JSON file you want to load. For example, use          \\
    //      countyQuickSearch("/data/json/library.json");                     \\
    //                                                                        \\
    // ---------------------------------------------------------------------- \\
    // PURPOSE                                                                \\
    //      The purpose of this function is to remove any hardcoding when     \\
    // looking to populate select lists with states, counties, and libraries. \\
    // The function loads a JSON file that is formatted, and loops through to \\
    // add states to the select list, and add events that trigger when        \\
    // options are selected in any select list.                               \\
    //                                                                        \\
    //      This function loads and sets up the Library Quick Search section  \\
    // on the main landing page.                                              \\
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
            numOfCounties;
        
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
        
        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
        // Create the Select List for States                                  \\
        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
        // Clear
        placeHolder = "";
        placeHolder += "<select size='13' id='county_quick_search_select_state' name='county_quick_search_select_state'>";
        
        for(var i=0; i<numOfStates; i++){
            placeHolder += ("<option value='" + stateList[i] + "'>" + stateList[i] + "</option>");
        }
        placeHolder += "</select>";
        $('county_quick_search_select_container_state').innerHTML = "";
        $('county_quick_search_select_container_state').innerHTML = placeHolder;

        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
        // Create Select List for Counties                                    \\
        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
        $('county_quick_search_select_state').addEvent('change', function(){
            if($('county_quick_search_select_state').value === ""){
            } else {
                //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
                // Clear the placeHolder/elements                                 \\
                //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
                placeHolder = "";
                $('county_quick_search_select_container_county').innerHTML = "";
                $('county_quick_search_select_container_library').innerHTML = "<select size='13' id='county_quick_search_select_library' name='county_quick_search_select_library'></select>";

                //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
                // Build the placeHolder                                          \\
                //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
                placeHolder = "<select size='13' id='county_quick_search_select_county' name='county_quick_search_select_county'>";
                selectedState = $('county_quick_search_select_state').value;

                for(var i=0; i<numOfStates; i++){
                    if(libraries['states'][i][0]['name'] === selectedState){
                        numOfCounties = libraries['states'][i][0]['counties'].length;
                        for(var j=0; j<numOfCounties; j++){
                            placeHolder += ("<option value='" + libraries['states'][i][0]['counties'][j][0]['name'] + "'>" + libraries['states'][i][0]['counties'][j][0]['name'] + "</option>");
                        }
                    }
                }
                //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
                // Close the select list, then set the element to the placeHolder \\
                //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
                placeHolder += "</select>";
                $('county_quick_search_select_container_county').innerHTML = placeHolder;
                $('county_quick_search_label_state').innerHTML = (selectedState + " (Link)");
                $('county_quick_search_label_county').innerHTML = 'Counties';
                $('county_quick_search_label_libraries').innerHTML = 'Libraries';

                //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
                // Create Select List for Libraries                               \\
                //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
                $('county_quick_search_select_county').addEvent('change', function(){
                    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
                    // Clear the placeHolder/elements                             \\
                    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
                    placeHolder = "";
                    $('county_quick_search_select_container_library').innerHTML = "";

                    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
                    // Build the placeHolder                                      \\
                    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
                    placeHolder = "<select size='13' id='county_quick_search_select_library' name='county_quick_search_select_library'>";
                    selectedState = $('county_quick_search_select_state').value;
                    selectedCounty = $('county_quick_search_select_county').value;
                    numOfCounties = $('county_quick_search_select_county').options.length;

                    for (var i=0; i<numOfStates; i++){
                        if(libraries['states'][i][0]['name'] === selectedState){
                            for (var j=0; j<numOfCounties; j++){
                                if(libraries['states'][i][0]['counties'][j][0]['name'] === selectedCounty){
                                    var numOfLibraries = libraries['states'][i][0]['counties'][j][0]['libraries'].length;
                                    for(var k=0; k<numOfLibraries; k++){
                                        placeHolder += ("<option value='" + libraries['states'][i][0]['counties'][j][0]['libraries'][k] + "'>" + libraries['states'][i][0]['counties'][j][0]['libraries'][k] + "</option>");
                                    }
                                }
                            }
                        }
                    }

                    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
                    // Close the select list, then set the element to the         \\
                    //  placeHolder                                               \\
                    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
                    placeHolder += "</select>";
                    $('county_quick_search_select_container_library').innerHTML = placeHolder;
                    $('county_quick_search_label_county').innerHTML = (selectedCounty + " (Link)");
                });
            }
        });
    });

}
