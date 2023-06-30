const convertId = function (id: number) {
	const str = "" + id;
	const pad = "0000";
	const result = pad.substring(0, pad.length - str.length) + str;
	return result;
};

const convertName = function (name: string) {
	return name.charAt(0).toUpperCase() + name.slice(1);
};

export { convertId, convertName };
