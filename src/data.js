async function showData() {
    
    let url = `https://spreadsheets.google.com/feeds/list/1tw_rkzBOInhdMF0iwWCh2oBBFrHLgjK8Lxj_B9PyVhE/1/public/full?alt=json`;
    let response = await fetch(url);
	let data = await response.json();
    let arr = data.feed.entry;
	let newArr = [];
	let checkDate = [];
	
	arr.map(function(item) {
        let date = item.gsx$date.$t
        item.gsx$date.$t = new Date(date);
        newArr.push(item);
    })
	
	
    newArr.sort((a, b) => b.gsx$date.$t - a.gsx$date.$t);
	
	
	newArr.map(function(item, index) {
		let date = item.gsx$date.$t.toString();
		let dateFilter = date.split(' ');
		let dateValid = dateFilter[3];
		if(!checkDate.includes(dateValid)) {
			checkDate.push(dateValid);
			let lastItem = checkDate.length-1;
			let style = ``;
			if (index === 0) {
				style = `<style>
				.tr-box {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
					margin-top: 5vh;
					margin-bottom: 5vh;
					box-shadow: 0px 0px 42.32px 3.68px rgba(0, 1, 1, 0.122);
				}
				.card-date {
					position: absolute;
					background: #023867;
					right: 0;
					top: 0;
					color: #fff;
					text-align: center;
					font-weight: bold;
					font-size: 12px;
					line-height: 0.9;
					padding: 10px;
				}
				.tr-one {
					margin-left: 1px !important;
					filter: contrast(0.85);
					transition: all .1s linear;
					width: 500px;
    				margin: 15px;
    				padding: 15px;
					box-shadow: 0px 0px 42.32px 3.68px rgba(0, 1, 1, 0.122);
				}
				</style>`
			} else {
				style = ``;
			}
			let element = document.createElement("div");
			let template = `
				${style}
				<hr style="clear: both;" />
				<h2><a class="collapsed" data-toggle="collapse" data-target="#${checkDate[lastItem]}">${checkDate[lastItem]}</a></h2>
				<div id="${checkDate[lastItem]}" class="collapsed">

				</div>
			`
			element.innerHTML = template;
			document.getElementById('videos').appendChild(element);
		}
	})
	
    newArr.map(function(item) {
        let name = item.gsx$name.$t;
        let date = item.gsx$date.$t.toString();
        let url = item.gsx$url.$t;
		let description = item.gsx$description.$t;
        let tags = item.gsx$tags.$t;
		let dateFilter = date.split(' ');
		let dateValid = dateFilter[3];
		date = dateFilter.splice(1, 3).join(' ');
        let embedFilter = url.split('/');
        let embed = embedFilter[3];
        let element = document.createElement("div");
        let template = `
		<div class="check-search tr-box">
			<div class="vid">
				<div class="vid-frame">
					<div class="">
						<iframe class="lazy" data-src="https://www.youtube.com/embed/${embed}?rel=0&amp;modestbranding=1&amp;showinfo=0&amp;controls=0&amp;theme=light" width="100%" height="auto" frameborder="0"></iframe>
					</div>
				</div>	
			</div>

			<div class="vid tr-one">
				<span class="card-date">${date}</span>
				<h6><a href="${url}">${name}<br /></a></h6>
                <p>${description}</p>
                <p class="tag">${tags}</p>
			</div>
		<div>
        `
        element.innerHTML = template;
        document.getElementById(`${dateValid}`).appendChild(element);
    })
	const myLazyLoad = new LazyLoad({
				elements_selector: ".lazy"
	});

}

showData();