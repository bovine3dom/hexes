// shamelessly nicked from https://odileeds.github.io/odi.hexmap.js/

// Define a colour scale helper function
function ColourScale(c){
	var s,n;
	s = c;
	n = s.length;
	// Get a colour given a value, and the range minimum/maximum
	this.getValue = function(v,min,max){
		var c,a,b;
		v = (v-min)/(max-min);
		if(v<0) return 'rgb('+s[0].rgb.join(',')+')';
		if(v>=1) return 'rgb('+s[n-1].rgb.join(',')+')';
		for(c = 0; c < n-1; c++){
			a = s[c];
			b = s[c+1];
			if(v >= a.v && v < b.v){
				pc = Math.min(1,(v - a.v)/(b.v-a.v));
				rgb = [Math.round(a.rgb[0] + (b.rgb[0]-a.rgb[0])*pc),Math.round(a.rgb[1] + (b.rgb[1]-a.rgb[1])*pc),Math.round(a.rgb[2] + (b.rgb[2]-a.rgb[2])*pc)];
				return 'rgb('+rgb.join(',')+')';
			}
		}
	};
	return this;
}

// Define the Viridis colour scale
viridis = new ColourScale([{'rgb':[68,1,84],v:0},{'rgb':[72,35,116],'v':0.1},{'rgb':[64,67,135],'v':0.2},{'rgb':[52,94,141],'v':0.3},{'rgb':[41,120,142],'v':0.4},{'rgb':[32,143,140],'v':0.5},{'rgb':[34,167,132],'v':0.6},{'rgb':[66,190,113],'v':0.7},{'rgb':[121,209,81],'v':0.8},{'rgb':[186,222,39],'v':0.9},{'rgb':[253,231,36],'v':1}]);

// function quantile(arr, q) {
//     // convert strings to numbers
//     arr = arr.map(Number);
//     var pos = (arr.length - 1) * q;
//     var base = Math.floor(pos);
//     var rest = pos - base;
//     if (arr[base + 1] !== undefined) {
//         return arr[base] + rest * (arr[base + 1] - arr[base]);
//     } else {
//         return arr[base];
//     }
// }

hex = new ODI.hexmap(document.getElementById('hexmap'),{
	'labels': { 'show': true },
    'hexjson': './resources/uk-local-authority-districts-2023.hexjson',
	'ready':function(){
		// Load the data
		ODI.ajax('./data/TS045-2021-4.json',{
			'this': this, // Set the context to the hexmap
			'dataType':'json',
			'success':function(data){
				// Process the data file to find the minimum and maximum
				var min = 0;
				var max = 0.5;
                // var min = quantile(Object.values(data), 0.1);
                // var max = quantile(Object.values(data), 0.9);
				this.data = data;
				// Update the hex colours
				this.updateColours(function(r){ return viridis.getValue(data[r],min,max); });
			},
			'error':function(e,attr){ this.log('ERROR','Unable to load ',attr.url,attr); }
		});
	}
});

// Make a tooltip
hex.on('mouseover',function(e){
	var svg,tip,bb,bbo,hex;
	svg = e.data.hexmap.el;
	hex = e.target;
	// Get any existing tooltip for this hexmap
	tip = svg.querySelector('.tooltip');
	if(!tip){
		// Add a new tooltip
		tip = document.createElement('div');
		tip.classList.add('tooltip');
		svg.appendChild(tip);
	}
	// Update contents of tooltip
	tip.innerHTML = e.data.data.n+'<br />'+(e.data.hexmap.data[e.data.region]*100).toPrecision(2).toLocaleString() + "%";
	// Update position of tooltip
	bb = hex.getBoundingClientRect();
	bbo = svg.getBoundingClientRect();
	tip.style.left = Math.round(bb.left + bb.width/2 - bbo.left + svg.scrollLeft)+'px';
	tip.style.top = Math.round(bb.top + bb.height/2 - bbo.top)+'px';
});
