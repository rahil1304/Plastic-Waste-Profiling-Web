
import 'babel-polyfill';
import * as tf from '@tensorflow/tfjs';
import {CLASSES} from './classes';
import {GoogleCharts} from 'google-charts';
import firebase from 'firebase';


var config = {
    apiKey: "AIzaSyDqzowumAiWDI7obSDdxt96KIP4P2J7szE",
    authDomain: "pwp-823b2.firebaseapp.com",
    databaseURL: "https://pwp1-823b2.firebaseio.com",
    projectId: "pwp1-823b2",
    storageBucket: "pwp1-823b2.appspot.com",
    messagingSenderId: "686761605561"
  };

firebase.initializeApp(config);

var storageRef = firebase.storage().ref();
var database = firebase.database();

const MODEL_URL ='https://storage.googleapis.com/pwp1-823b2.appspot.com/tensorflowjs_model.pb';
const WEIGHTS_URL ='https://storage.googleapis.com/pwp1-823b2.appspot.com/weights_manifest.json';
var coca_count = 0;
var lays_count = 0;
var maggi_count = 0;

GoogleCharts.load(drawChart);


function drawChart() {
  

     const data = GoogleCharts.api.visualization.arrayToDataTable([
        ['Product', 'Current Detection',{role:'style'}],
        ['Coca Cola', coca_count,'red'],
        ['Lays', lays_count,'blue'],
        ['Maggi', maggi_count,'yellow']
    ]);
  


    var options = {
          title: 'Plastic Waste Profiling',
          pieHole: 0.4,
          animation:{duration: 3000,
        easing: 'out', "startup":true
      },
      backgroundColor:{fill:'transparent'},
      titleTextStyle:{color:"ffffff",fontName:'Roboto',fontSize:30,bold:false},
      
      hAxis: {
        textStyle: {
            color: '#ffffff'
        }
    },
    vAxis: {
        textStyle: {
            color: '#ffffff'
        }
    }
        };
    const pie_1_chart = new GoogleCharts.api.visualization.ColumnChart(document.getElementById('donutchart'));

   
    pie_1_chart.draw(data,options);
}




let modelPromise;

window.onload = () => modelPromise = tf.loadFrozenModel(MODEL_URL,WEIGHTS_URL);

// const button = document.getElementById('toggle');
// button.onclick = () => {
//   image.src = image.src.endsWith(imageURL) ? image2URL : imageURL;
  
// };
const button = document.getElementById('inputimg');
const image = document.getElementById('blah');
const ds = document.getElementById('datasubmit');
var inpfile = document.getElementById('imgInp');

const runButton = document.getElementById('run');

button.onclick = () => {
  image.style.visibility = 'visible';
  document.getElementById('loaded').style.visibility='visible';
  document.getElementById('run').style.visibility='visible';


};


function calculateMaxScores(scores,numBoxes,numClasses) {
  const maxes = [];
  const classes = [];
  for (let i = 0; i < numBoxes; i++) {
    let max = Number.MIN_VALUE;
    let index = -1;
    for (let j = 0; j < numClasses; j++) {

      if (scores[i * numClasses + j] > max) {
        max = scores[i * numClasses + j];
        index = j;
      }
    }

    maxes[i] = max;
    classes[i] = index;
  }
 
  return [maxes, classes];
}

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
  }


runButton.onclick = async () => {
  var imgfile = imgInp.files[0];

  document.getElementById('loader').style.visibility='visible';
 
  document.getElementById('canvas').className='ImageBorder';
  document.getElementById('loaderdescription').style.visibility='visible';
  document.getElementById('loaderdescription').innerHTML='Loading Model...';
  
  var imwidth = image.clientWidth;
  var imheight = image.clientHeight;

  console.log(imwidth);
  console.log(imheight);
  document.getElementById('canvas').width=imwidth;
  document.getElementById('canvas').height=imheight;
  const model = await modelPromise;
  const pixels = tf.fromPixels(image);

  document.getElementById('loaderdescription').innerHTML='Model Loaded. Now processing image..';
  const res1 = await model.executeAsync(pixels.reshape([1, ...pixels.shape]));
  const scores = res1[0].dataSync();
  const boxes = res1[1].dataSync();
  tf.dispose(res1);
  const [maxScores, classes] =calculateMaxScores(scores, res1[0].shape[1], res1[0].shape[2]);
  console.log(maxScores);
  const prevBackend = tf.getBackend();
  tf.setBackend('cpu');
  const maxNumBoxes = 20;
  const indexTensor = tf.tidy(() => {
  const boxes2 =
      tf.tensor2d(boxes, [res1[1].shape[1], res1[1].shape[3]]);
  return tf.image.nonMaxSuppression(
      boxes2, maxScores, maxNumBoxes, 0.5, 0.5);
});
  const indexes = indexTensor.dataSync();
  indexTensor.dispose();
  tf.setBackend(prevBackend);
  const c = document.getElementById('canvas');
  const context = c.getContext('2d');
  context.drawImage(image, 0, 0,imwidth,imheight);
  context.font = '15px Arial';

  document.getElementById('loaderdescription').innerHTML='Image Processed. Buckle Up!';
  const count = indexes.length;
  var m=1;
  coca_count = 0;
  lays_count = 0;
  maggi_count = 0;
  
 
  const objects = [];
  for (let i = 0; i < count; i++) {
    const bbox = [];
    for (let j = 0; j < 4; j++) {
      bbox[j] = boxes[indexes[i] * 4 + j];
    }
    const minY = bbox[0] * imheight;
    const minX = bbox[1] * imwidth;
    const maxY = bbox[2] * imheight;
    const maxX = bbox[3] * imwidth;
    context.beginPath();
    context.rect(minX, minY, maxX - minX, maxY - minY);
    context.lineWidth = 2;
    context.strokeStyle = 'yellow';
    context.stroke();
    context.fillStyle = "#faff07";
    context.fillRect(minX, maxY, 100, 20);
    context.fillStyle = "#000000";
    context.fillText(maxScores[indexes[i]].toFixed(3)*100 +'% '+
        CLASSES[classes[indexes[i]]].display_name,
        minX, maxY + 8);

    if(CLASSES[classes[indexes[i]]].display_name == 'Coca Cola'){
      coca_count += 1;
    }
    else if(CLASSES[classes[indexes[i]]].display_name == 'Lays'){
      lays_count += 1;
    }
    else if(CLASSES[classes[indexes[i]]].display_name == 'Maggi'){
      maggi_count += 1;
    }

    document.getElementById('datasubmit').style.visibility='visible';




  }
  document.getElementById('loaderdescription').innerHTML='Image Detected!';
  document.getElementById('loader').style.visibility='hidden';

  
  var imgurl = c.toDataURL("image/png");
  var file = dataURLtoFile(imgurl, imgfile.name);
  // console.log(file);

  //Store the images into firebase in real time
  // storageRef.child('images/' + file.name).put(file);
  

  // console.log("Coca cola:" + coca_count);
  // console.log("Lays:" + lays_count);
  // console.log("Maggi:" + maggi_count);


  ds.onclick = () => {
    GoogleCharts.load(drawChart); 

  }

  document.getElementById('loader').style.visibility='hidden';
  document.getElementById('submitdata').style.visibility='visible';
};

function readURL(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#blah').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

$("#imgInp").change(function() {
  readURL(this);
});