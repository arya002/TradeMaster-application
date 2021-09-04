export default function chunkArray(myArray, chunk_size) {
	var index = 0;
	var arrayLength = myArray.length;
	var tempArray = [];
    var myChunk = [];
    
	for (index = 0; index < arrayLength; index += chunk_size) {
		myChunk = myArray.slice(index, index + chunk_size);
		// Do something if you want with the group
		tempArray.push(myChunk);
	}

	return tempArray;
}
