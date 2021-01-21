const Imgur = () => {
	const r = new XMLHttpRequest();
	let u;

	r.open("POST", "https://api.imgur.com/3/image/");
	r.setRequestHeader("Authorization", `Client-ID 9168127d8892b1c`);
	r.onreadystatechange = () => {
		if (r.status === 200 && r.readyState === 4) {
			let res = JSON.parse(r.responseText);
			u = `https://i.imgur.com/${res.data.id}.png`;
		}
	};

	return u;
};

export default Imgur;
