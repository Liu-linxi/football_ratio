export function insertionSort(arr,key,order="小") {
	// 对于数组的每一个元素，从它开始到0位置，比较该元素和前一个元素的大小
	for (let i = 1; i < arr.length; i++) {
		let current = arr[i];
		let j = i - 1;
		// 如果该元素小于前一个元素，那么前一个元素向后移动，并继续向前比较
		if(order=="小"){
			// 从小到大
			while (j >= 0 && arr[j][key] > current[key]) {
				arr[j + 1] = arr[j];
				j--;
			}
		}else{
			// 从大到小
			while (j >= 0 && arr[j][key] < current[key]) {
				arr[j + 1] = arr[j];
				j--;
			}
		}
		// 如果该元素大于前一个元素，那么它将放到合适的位置
		arr[j + 1] = current;
	}
	// 返回排序后的数组
	return arr;
	/* 
		
		// 测试数据
		const testArr = [5, 2, 9, 1, 5, 6];
		// 调用插入排序函数
		const sortedArr = insertionSort(testArr);
		// 打印结果
		console.log(sortedArr);
	 */
}





export function mergeArrays(oldArray, newArray) {
	let mergedArray = [];

	// 遍历新数组
	newArray.forEach(function(element) {
		// 检查当前元素是否在旧数组中存在
		var index = oldArray.indexOf(element);
		if (index !== -1) {
			// 如果存在，则替换为旧数组中对应的元素
			mergedArray.push(oldArray[index]);
		} else {
			// 如果不存在，则将元素添加到结果数组中
			mergedArray.push(element);
		}
	});

	return mergedArray;
	// 测试数据
	// var oldArray = [1, 2, 3];
	// var newArray = [2, 3, 4, 5];

	// // 调用函数合并数组
	// var resultArray = mergeArrays(oldArray, newArray);

	// // 输出结果
	// console.log(resultArray); // 输出：[2, 3, 1, 4, 5]
}


export function mergeObjArrays(oldArray, newArray, key) {
	var mergedArray = oldArray.slice(); // 复制旧数组以避免修改原数组
	
	// 遍历新数组
	newArray.forEach(function(newItem) {
		// 检查新数组中的每个元素是否在旧数组中存在
		var found = false;
		for (var i = 0; i < mergedArray.length; i++) {
			if (mergedArray[i][key] === newItem[key]) {
				// 如果找到匹配项，则替换旧数组中的对应元素
				mergedArray[i] = newItem;
				found = true;
				break;
			}
		}
		// 如果在旧数组中没有找到匹配项，则将新元素添加到结果数组中
		if (!found) {
			mergedArray.push(newItem);
		}
	});
console.log(mergedArray);
	return mergedArray;

	/* // 测试数据
	var oldArray = [
		{ id: 1, name: "John" },
		{ id: 2, name: "Alice" },
		{ id: 3, name: "Bob" }
	];
	
	var newArray = [
		{ id: 2, name: "Alex" },
		{ id: 3, name: "Bob" },
		{ id: 4, name: "Eva" }
	];
	
	// 调用函数合并数组
	var resultArray = mergeArrays(oldArray, newArray, 'id');
	
	// 输出结果
	console.log(resultArray); */

}