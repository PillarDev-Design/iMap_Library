function finderInit(filePath){
    //########################################################################\\
    // finder_init(filePath)                                                  \\
    // ---------------------------------------------------------------------- \\
    // PARAMETERS                                                             \\
    // - filePath: When calling this function, use a string that is the file  \\
    //      path of the JSON file you want to load. For example, use          \\
    //      finderInit("/data/json/library.json");                            \\
    //                                                                        \\
    // ---------------------------------------------------------------------- \\
    // PURPOSE                                                                \\
    //      The purpose of this function is to remove any hardcoding when     \\
    // looking to populate select lists with states, counties, and libraries. \\
    // The function loads a JSON file that is formatted, and loops through to \\
    // add states to the select list, and add events that trigger when        \\
    // options are selected in any select list.                               \\
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
            numOfCounties;
        
        //####################################################################\\
        // Create testVar. Can be accessed in console to look at the JSON     \\
        //  object that was loaded.                                           \\
        //####################################################################\\
        testVar = libraries;

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
        // Populate an HTML element to show the current JSON file name        \\
        //####################################################################\\
        $('current_json').innerHTML = ("Current JSON: " + filePath);
        
        //####################################################################\\
        // Populate the stateList array                                       \\
        //####################################################################\\
        for(var i=0; i<numOfStates; i++){
            stateList.push(libraries['states'][i][0]['name']);
        }
        
        //####################################################################\\
        // Create the Select List for States                                  \\
        //####################################################################\\
        // Clear
        placeHolder = "";
        placeHolder += "<select size='10' id='state' class='wide_select' name='state'>";
        
        for(var i=0; i<numOfStates; i++){
            placeHolder += ("<option value='" + stateList[i] + "'>" + stateList[i] + "</option>");
        }
        placeHolder += "</select>";
        $('state_selection').innerHTML = placeHolder;

        //####################################################################\\
        // Create Select List for Counties                                    \\
        //####################################################################\\
        $('state').addEvent('change', function(){
            //################################################################\\
            // Clear the placeHolder/elements                                 \\
            //################################################################\\
            placeHolder = "";
            $('county_selection').innerHTML = "";
            $('library_selection').innerHTML = "<select size='10' id='library' class='wide_select' name='library'></select>";

            //################################################################\\
            // Build the placeHolder                                          \\
            //################################################################\\
            placeHolder = "<select size='10' id='county' class='wide_select' name='county'>";
            selectedState = $('state').value;

            for(var i=0; i<numOfStates; i++){
                if(libraries['states'][i][0]['name'] === selectedState){
                    var numOfCounties = libraries['states'][i][0]['counties'].length;
                    for(var j=0; j<numOfCounties; j++){
                        placeHolder += ("<option value='" + libraries['states'][i][0]['counties'][j][0]['name'] + "'>" + libraries['states'][i][0]['counties'][j][0]['name'] + "</option>");
                    }
                }
            }
            //################################################################\\
            // Close the select list, then set the element to the placeHolder \\
            //################################################################\\
            placeHolder += "</select>";
            $('county_selection').innerHTML = placeHolder;

            //################################################################\\
            // Create Select List for Libraries                               \\
            //################################################################\\
            $('county').addEvent('change', function(){
                //############################################################\\
                // Clear the placeHolder/elements                             \\
                //############################################################\\
                placeHolder = "";
                $('library_selection').innerHTML = "";

                //############################################################\\
                // Build the placeHolder                                      \\
                //############################################################\\
                placeHolder = "<select size='10' id='library' class='wide_select' name='library'>";
                selectedState = $('state').value;
                selectedCounty = $('county').value;
                numOfCounties = $('county').options.length;

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

                //############################################################\\
                // Close the select list, then set the element to the         \\
                //  placeHolder                                               \\
                //############################################################\\
                placeHolder += "</select>";
                $('library_selection').innerHTML = placeHolder;
            });
        });
        

    });
}
