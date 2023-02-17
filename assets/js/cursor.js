let floating = $(".floating-shapes")
$(document).ready(()=>{
    var relX = 0;
    var relY = 0;
    // let e = null;
    // let ripples = []
    $(document).mousemove(function(event){            
        relX = event.pageX 
        relY = event.pageY
        floating.css({
            backgroundImage:`radial-gradient( farthest-corner at ${relX}px ${relY}px, rgba(var(--primary-theme-color),20%) 0%, rgba(var(--primary-bg),80%) 100% )`
        })
        // e = event;
        // var relBoxCoords = `(${relX}, ${relY}) :(${window.innerWidth}, ${window.innerHeight})`;
        // $(".hero-name").text(relBoxCoords);
    });
    // setInterval(()=>{
    //     if(ripples.length < 3){

    //         let ripple = $(`<div class="ripple"></div>`)
    //         floating.append(ripple)
    //         ripples.push(ripple);
    //         ripple.css({
    //             // opacity:1,
    //             top:`${relY/window.innerHeight*100}%`,
    //             left:`${relX/window.innerWidth*100}%`
    //             // transition:'transform .1s ease-in-out',
    //             // transform:ripple.css("transform")+`translate(${relX}px, ${relY}px)`
    //         })
    //         // else{
    //             //     ripples.shift().remove()
    //             // }
    //             setTimeout(()=>{
    //                 if(ripple){
                        
    //                     // ripples.filter((rip)=>rip !== ripple)
    //                     ripples.splice(ripples.indexOf(ripple), 1)
    //                     ripple.remove();
    //                 }
    //             },4000)
    //         }
    // },100)
    // setInterval(()=>{
    //         ripples.shift().remove()

    // },3000)
})