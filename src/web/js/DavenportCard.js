
export default class DavenportCard {
	#standardCard
	#dom;

	constructor(davenportCardArguments = {}) {
		const { standardCard } = davenportCardArguments;
		this.#standardCard = standardCard;
		const dom = document.createElement('span');
		dom.classList.add('playing-card', this.#standardCard.suit.name);
		dom.insertAdjacentHTML('afterbegin', `&#${DavenportCard.cardMapping.get(this.#standardCard.toString())};`);
		this.#dom =  dom;
	}

	get dom () {
		return this.#dom;
	}

	static cardMapping = new Map([
		['as', 127137],
		['2s', 127138],
		['3s', 127139],
		['4s', 127140],
		['5s', 127141],
		['6s', 127142],
		['7s', 127143],
		['8s', 127144],
		['9s', 127145],
		['10s', 127146],
		['js', 127147],
		['qs', 127149],
		['ks', 127150],
		['ah', 127153],
		['2h', 127154],
		['3h', 127155],
		['4h', 127156],
		['5h', 127157],
		['6h', 127158],
		['7h', 127159],
		['8h', 127160],
		['9h', 127161],
		['10h', 127162],
		['jh', 127163],
		['qh', 127165],
		['kh', 127166],
		['ad', 127169],
		['2d', 127170],
		['3d', 127171],
		['4d', 127172],
		['5d', 127173],
		['6d', 127174],
		['7d', 127175],
		['8d', 127176],
		['9d', 127177],
		['10d', 127178],
		['jd', 127179],
		['qd', 127181],
		['kd', 127181],
		['ac', 127185],
		['2c', 127186],
		['3c', 127187],
		['4c', 127188],
		['5c', 127189],
		['6c', 127190],
		['7c', 127191],
		['8c', 127192],
		['9c', 127193],
		['10c', 127194],
		['jc', 127195],
		['qc', 127197],
		['kc', 127198]
	])

}