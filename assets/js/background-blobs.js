import colorRanges from "../json/color-ranges.json" assert { type: "json" };
let $btnToggleColor = $("#config-toggle-color")
let $btnToggleMotion = $("#config-toggle-motion")
let $iconAutoTheme = $("#icon-auto-theme");
let $iconMotion = $("#icon-motion");
let blobs = [];
let colorUpdateInterval = null;
let motionInterval = null;
$(document).ready(async () => {
  let colorRangeValue = getRandomInteger(0, colorRanges.length - 1);

  let colorRange = colorRanges[colorRangeValue];
  $("body").get(0).style.setProperty("--primary-theme-color", `var(--${colorRange.color})`);
  await generateBlobs(colorRange);
  $btnToggleColor.on("click", toggleColorUpdate)
  $btnToggleMotion.on("click", toggleMotion)
  initiateBlobMotion();
  initiateBlobColorUpdate();
});
const toggleColorUpdate=()=>{
	console.log(colorUpdateInterval)
	$iconAutoTheme.children('.fa-lock').toggleClass("unban")
	if(colorUpdateInterval){
		clearInterval(colorUpdateInterval)
		colorUpdateInterval = null;
	}else{
		initiateBlobColorUpdate()
	}
}
const toggleMotion=()=>{
	console.log(motionInterval)
	$iconMotion.children('.fa-lock').toggleClass("unban")
	if(motionInterval){
		clearInterval(motionInterval)
		motionInterval = null;
	}else{
		initiateBlobMotion()
	}
}
const initiateBlobMotion = async () => {
  setTimeout(async () => {
    await moveBlobs();
  }, 500);
  motionInterval=setInterval(async () => {
    await moveBlobs();
  }, 10000);
};

const initiateBlobColorUpdate = async () => {
  colorUpdateInterval = setInterval(() => {
    updateBlobColor();
  }, getRandomInteger(5, 10) * 1000);
};

const generateBlobs = (colorRange) => {
  let promises = [];
  let num_blobs = 10;
  if(window.innerWidth < 768){
	  num_blobs = getRandomInteger(5, 10);
  }else{
	num_blobs = getRandomInteger(10, 20);
  }
  let $floating_shapes = $("#floating-shapes");
  for (let i = 0; i <= num_blobs; i++) {
    promises.push(
      new Promise((resolve, reject) => {
        let x = getRandomInteger(0, 100) - 10;
        let y = getRandomInteger(0, 100) - 10;
        let size = getRandomInteger(5, 40);
        let $blob_element = createBlob(x, y, size, colorRange);

        let blob = { $blob_element, x, y, size };
        blobs.push(blob);
        $floating_shapes.append($blob_element);
        resolve(blob);
      })
    );
  }
  return Promise.all(promises);
};
const createBlob = (x, y, size, colorRange) => {
  let $blob_element = $(`<div class="blob"></div>`);
  let rotation = getRandomInteger(0, 360);
  let duration = getRandomInteger(5, 10);
  let backgroundColor = generateBlobBackgroundColor("hsla", colorRange);
  let alpha = getRandomInteger(0, 4) / 10;
  let anim_duration = getRandomInteger(3, 10);
  $blob_element.css({
    top: `${y}%`,
    left: `${x}%`,
    width: `${size}em`,
    transform: `rotate(${rotation}deg)`,
    boxShadow: `1px 1px 10px rgb(0 0 0 / ${alpha})`,
    backgroundColor: backgroundColor,
    transition: `transform ${duration}s ease-in-out,background-color ${duration}s ease-in-out, top ${duration}s ease-in-out, left ${duration}s ease-in-out, width ${duration}s ease-in-out`,
    animation: `contort ${anim_duration}s linear -${getRandomInteger(0,anim_duration)}s infinite alternate`,
  });

  return $blob_element;
};
const updateBlobColor = (colorRangeValue = null) => {
  if (colorRangeValue == null) {
    colorRangeValue = getRandomInteger(0, colorRanges.length - 1);
  }
  let colorRange = colorRanges[colorRangeValue];
  $("body").get(0).style.setProperty("--primary-theme-color", `var(--${colorRange.color})`);
  blobs.forEach((blob) => {
    let $blobEl = blob.$blob_element;
    let backgroundColor = generateBlobBackgroundColor("hsla", colorRange);
    $blobEl.css({ backgroundColor: backgroundColor });
  });
};
const generateBlobBackgroundColor = (algorithm = "hsla", colorRange = null) => {
  let a = getRandomInteger(1, 5) / 10;
  let v1, v2, v3;
  if (algorithm == "rgba") {
    v1 = getRandomInteger(0, 255);
    v2 = getRandomInteger(0, 255);
    v3 = getRandomInteger(0, 255);
  } else {
    if (colorRange) {
      v1 = getRandomInteger(colorRange.low, colorRange.high);
    } else {
      v1 = getRandomInteger(0, 360);
    }
    v2 = getRandomInteger(80, 100) + "%";
    v3 = getRandomInteger(40, 80) + "%";
  }
  return `${algorithm}(${v1},${v2},${v3},${a})`;
};
const moveBlobs = () => {
  let promises = [];
  blobs.forEach(({ $blob_element, x, y, size }) => {
    promises.push(
      new Promise((resolve, reject) => {
        let rotation = getRandomInteger(0, 360);
        let movementconfig = {
          transform: `rotate(${rotation}deg)`,
          top: `${getRandomInteger(10, 100) - 10}%`,
          left: `${getRandomInteger(10, 100) - 10}%`,
          width: `${getRandomInteger(5, 40)}em`,
        };
        // let	timingconfig = {
        // 	easing:"easeInOut",
        // 	duration:getRandomInteger(5,10)*1000,
        // 	queue:false,
        // }
        $blob_element.css(movementconfig);
        resolve($blob_element);
      })
    );
  });
  return Promise.all(promises);
};
const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
