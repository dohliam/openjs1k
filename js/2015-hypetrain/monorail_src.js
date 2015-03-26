/*********************************************
     *
     * JS1K 2015
     * HC-03 Mysterious Monorail
     *
     * Released on 03/2015 at JS1K by homecoded
     * Released under MIT License. Do what you want with it. :)
     *
     * Abstract:
     * Building on the ray marcher from HC-01 Structures I was able to increase on render speed,
     * style and sound quality. Still, there is a lot room to improve.
     * Take the code inside this script tag, run it trough
     * 
     * - Google Closure Compiler (http://closure-compiler.appspot.com/home - advanced mode),
     * - Uglify (http://marijnhaverbeke.nl/uglifyjs)
     * - RegPack (http://siorki.github.io/regPack.html - score=2, gain=1, copies=0, tiebreaker=most copies)
     *
     * Features:
     * 
     * - Raymarcher has marching stepsof a variable length to cover more ground while keeping computing power low
     * - Rendering is done in quater images (only one fourth of a frame is actually rendered, which works well on 
     *   high frame rates and creates an interesting visual appeal)
     * - landscape is defined by some simple boolean and binary expressions as well as trigonometric functions 
     * - music has been created using Lazerbeat (http://lazerbahn.com/lazerbeat.html)
     * 
     **********************************************/
    var iCounter = 0,
        fStartTime,
        // Running on a small resolution keeps the FPS high and makes the dither-look possible.
        // Using high resolutions destroys the unique dot-pattern look
        iWidth = a.width = 500,
        iHeight = a.height = 400,
        // this will be the array to write the rendering results into
        aImageData = c.createImageData(iWidth, iHeight);
    // Create the music, a base64-encoded WAVE-file (44.1kHz, 8Bit, mono)
    for (sSound = "RIFF_oO_WAVEfmt "   atob("EAAAAAEAAQBErAAARKwAAAEACABkYXRh"), t = 0; 4820000 >   t;)
        sSound  = String.fromCharCode(
                // clip values to bytes
                255 & (
                        // make it work in Firefox (wave files starting with zero bytes won't be played
                        1 |
                                (63  
                                        // create a bitmask that will shape the sound of the base synth
                                        (63 & 63   8 * Math.sin(t / 2e5) * t / 2e5) &
                                        // base synth is a simple sine working at defined frequencies
                                        100 * Math.sin(4 * Math.PI * [165, 220, 175, 262, 196, 147, 220, 165]
                                                // use binary operations to select different frequencies
                                                // and jump around between the notes. This creates the base melody.
                                                [7 & ((2 * t / 2e5) & (12 * t / 2e5) ^ (8 * t / 2e5))] * t / 2e5)
                                        // tan creates the flanger/snare effect on every second beat
                                         * (Math.tan(4 * Math.PI * t / 2e5) / 4) |
                                        // this defines the note length of the base melody, switching between
                                        // quater notes and eights.
                                        ( 2048 * (1   (1 & t / 4 / 2e5))) * t / 2e5
                                )
                        )
        );
    (function render(iScreenX, fTime, iScreenY) {
        !fStartTime && (fStartTime = Date.now() / 1000);
        // Calculate the current running time. By slowing it down a bit the animation gets a better synchronization
        // with the music. This could have been also solved via sample rate in the wave-file generation code.
        fTime = (Date.now() / 1000 - fStartTime) * .885;
        // count the frames
        iCounter  ;
        // Just rendering every second pixel saves a lot of calculations.
        // By altering the start x value by one pixel gives the demo a unique dithering look. This way the demo
        // always shows parts of the previous screen, creating a motion blur effect.
        for (// Starting at iHeight/5 creates the upper white wide-screen bar, 1&iCounter alternates the start value
             iScreenY = (iHeight / 5)   (1 & iCounter);
             // stop rendering when we reach the lower white wide-screen bar
             iHeight > iScreenY   (iHeight / 5);
             // always step 2
             iScreenY  = 2
        )
            // Same skipping technique applies to stepping through x-values. With altering the start x value
            // only every second frame, four render calls are needed now to create a full frame. Again, this
            // reduces the amount of calculations greatly and increases the motion blur.
            for (iScreenX = 1 & iCounter / 2;
                 iWidth > iScreenX;
                 iScreenX  = 2
            ) {
                var // start value for the ray vector with some correction on how much of the scene will be
                    // shown (division decreases the visible area showing only a detail view, this could have also been 
                    // solved by changing the frequencies and in sine-calls and binary expressions for landscape)
                    fRayVectorX = (iScreenX - iWidth / 2) / 25,
                    fRayVectorY = (iScreenY - iHeight / 2) / 12,
                    // Calculate start time of the screen
                    fRayZ = 400 * fTime
                            // Using time variable as a bitmask for screen lines and multplying them
                            // with a factor will make the use look into future frames for some lines. The line
                            // setup changes with every beat sometimes creating interesting patterns.
                              (fTime & iScreenY >> 4) * 50
                            // The effect should not always be applied. So use time again to switch the effect on
                            // and off again.
                               * (1 & fTime >> 4),
                    // this simple sin defines the course of the track (road), using the same for x change and y change
                    fTrackShape = Math.sin(fRayZ / 3000),
                    fTrackPosX = 10000 * fTrackShape,
                    fTrackPosY = 10000 * fTrackShape,
                    // Using more steps in the middle of the screen (center of attention) and less on the sides
                    // saves computing power and creates a slight fade-out effect on the side of the screen
                    iMaxRayMarchSteps = Math.max(5, 35 - Math.abs((iScreenX - iWidth / 2) / 10))
                    ;
                for (var // Multiplying the screen x coordinates with a constant makes more geometry visible.
                         // This value could have been factored into the geometry formulas saving more bytes.
                         fRayX = 2 * iScreenX   2000   fTrackPosX,
                         fRayY = 4 * iScreenY   fTrackPosY,
                         // set the start value for the step counter of the ray
                         iRayStep = 0,
                         // Using a variable step length for the ray marcher.
                         // The further away from the viewer, the greater the step.
                         // This way, we can achieve a great view distance with a little number of steps.
                         iCurrrentRayStepLength = 1,
                         // By adding a random value to the step increase creates random dot patterns around
                         // all objects, masking the blocky voxel look coming from huge step sizes.
                         fRayStepSizeIncrease = 3   Math.random() / 2
                     ;
                     // Stop the calculation when maximum number of steps are reached.
                     iRayStep   < iMaxRayMarchSteps;
                )
                    if (
                        // Update the current ray position, this is the actual marching
                        fRayX  = fRayVectorX * iCurrrentRayStepLength,
                        fRayY  = fRayVectorY * iCurrrentRayStepLength,
                        fRayZ  = iCurrrentRayStepLength,
                        iCurrrentRayStepLength  = fRayStepSizeIncrease,
                        // calculate the position of the monorail track depending on the ray's z-value
                        fTrackShape = Math.sin(fRayZ / 3000),
                        fTrackPosX = 2 * iScreenX   2000   10000 * fTrackShape,
                        fTrackPosY = 4 * iScreenY   10000 * fTrackShape,
                        (
                                // When music is over, pretend we always hit geometry immediately,
                                // creating a noise screen in the end of the demo as if the camera broke
                                fTime > 98 ||
                                        // define the track geometry (this is the thin line in the middle)
                                        fRayX > fTrackPosX - 20 && fTrackPosX   20 > fRayX && fTrackPosY - 300 > fRayY ||
                                        // Definition of the underlying solid rock foundation for the ray.
                                        // A bitmaks depending ob the current z-value creates the zick-zacked edges.
                                        // Left zick-zacking fequency is lower, creating a more natural rock-like look.
                                        fRayX > fTrackPosX - (400   (255 & fRayZ / 2)) && fTrackPosX   (400   (255 & fRayZ)) > fRayX && fRayY < fTrackPosY - 400 ||
                                        // Definition of the tunnels as negated boolean expression, tunnel walls
                                        // have the same zick-
