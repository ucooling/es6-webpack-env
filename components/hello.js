/**
	* 实现一个简单的Promise
	* Promise已经被ES6支持，所以不需要额外引入
*/
var timeout = function(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, ms, 'done');
	});
};

/**
 * 使用Promise对象实现一个Ajax操作的例子
 */

var getJSON = function(url) {
	var promise = new Promise((resolve, reject) => {
		var client = new XMLHttpRequest();
		client.open('GET', url);
		client.onreadystatechange = handler;
		client.responseType = 'json';
		client.setRequestHeader("Accept", "application/json");
		client.send();

		function handler() {
			if(this.readyState !==4) {
				return;
			}

			if(this.state === 200) {
				resolve(this.response);
			}else {
				reject(new Error(this.statusText));
			}
		}
	});

	return promise;
}

module.exports = {
	timeout : timeout,
    getJSON : getJSON
}