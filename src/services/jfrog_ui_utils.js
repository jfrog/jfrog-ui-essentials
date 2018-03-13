export class JFrogUIUtils {

    constructor($timeout) {
        this.$timeout = $timeout;
    }

    getCapitalizedKeys(object, dictionary) {

        let getCapitalized = (str) => {
            str = str.split('_').join(' ');
            str = str.split(' ').map((word)=>_.capitalize(word)).join(' ');
            return str;
        };

        let destObj = {};

        for (let key in object) {
            if (dictionary && dictionary[key]) {
                destObj[dictionary[key]] = object[key];
            }
            else {
                let capitalized = getCapitalized(key);
                destObj[capitalized] = object[key];
            }
        }

        return destObj;

    }

    getSafeHtml(unsafeHtml) {
        if (!unsafeHtml) return unsafeHtml;
        let decoded = _.unescape(unsafeHtml);
        let safe = _.escape(decoded);
        return safe;
    }

    fireResizeEvent() {
        let resizeEvent = document.createEvent("Event");
        resizeEvent.initEvent("resize", false, true);
        this.$timeout(() => {
            try {
                window.dispatchEvent(new Event('resize'));
            }
            catch (e) {
                window.dispatchEvent(resizeEvent);
            }
        });
    }

	stringifyData(value, separator) {
		if (_.isEmpty(value)) {
			return '';
		}

		if (_.isArray(value)) {
			let resultArray = _.map(value, (item) => {
				if (item.name) {
					return item.name;
				}
				return item;
			});
			if (separator && typeof separator === 'string') {
				return resultArray.join(separator);
			}
			return resultArray.join(', ');
		}

		return value;
	}

	formatHtmlList(list,maxInRow) {
		let result = ``;
		let temp = [];
		_.forEach(list,(item)=>{
			if(temp.length === maxInRow) {
				result += this.stringifyData(temp) + `<br>`;
				temp = [item];
			} else {
				temp.push(item);
			}
		});
		if(temp.length > 0) {
			result += this.stringifyData(temp) + `<br>`;
		}

		return result;
	}

	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}


	saveTextAsFile(text,fileName) {
		let ie = navigator.userAgent.match(/MSIE\s([\d.]+)/),
			ie11 = navigator.userAgent.match(/Trident\/7.0/) && navigator.userAgent.match(/rv:11/),
			ieEDGE = navigator.userAgent.match(/Edge/g),
			ieVer=(ie ? ie[1] : (ie11 ? 11 : (ieEDGE ? 12 : -1)));

		if (ie && ieVer<10) {
			console.log("No blobs on IE ver<10");
			return;
		}

		let textFileAsBlob = new Blob([text], {type:'text/plain'});

		if (ieVer>-1) {
			window.navigator.msSaveBlob(textFileAsBlob, fileName)
			return;
		}

		let downloadLink = document.createElement("a");
		downloadLink.download = fileName;
		downloadLink.innerHTML = "Download File";
		if (window.URL != null) {
			// Chrome allows the link to be clicked
			// without actually adding it to the DOM.
			downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		} else {
			// Firefox requires the link to be added to the DOM
			// before it can be clicked.
			downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
			downloadLink.onclick = (event) =>{
				document.body.removeChild(event.target);
				console.log('oh my blob');
			};
			downloadLink.style.display = "none";
			document.body.appendChild(downloadLink);
			console.log(downloadLink);
		}

		downloadLink.click();
	}


	compareVersions(aText,bText) {
		let splitters = /\-|\.|_/
		let aArr = aText.split(splitters);
		let bArr = bText.split(splitters);
		let minLength = Math.min(aArr.length,bArr.length);

		let first;
		for (let i = 0; i<minLength; i++) {
			let aNum = parseInt(aArr[i]);
			let bNum = parseInt(bArr[i]);
			let aIsNum = !_.isNaN(aNum);
			let bIsNum = !_.isNaN(bNum);
			if (aIsNum && bIsNum && aNum < bNum) {
				first = 'a';
				break;
			}
			else if (aIsNum && bIsNum && aNum > bNum) {
				first = 'b';
				break;
			}
			else if (!aIsNum || !bIsNum || aNum === bNum) {
				if (aArr[i]<bArr[i]) {
					first = 'a';
					break;
				}
				else if (aArr[i]>bArr[i]) {
					first = 'b';
					break;
				}
			}
		}

		if (!first) {
			if (aArr.length > 3 && bArr.length > 3) {
				if (aArr.length > bArr.length) first = 'b';
				else if (aArr.length < bArr.length) first = 'a';
			}
			else {
				if (aArr.length > bArr.length) first = 'a';
				else if (aArr.length < bArr.length) first = 'b';
			}
		}
		return first === 'a' ? -1 : first === 'b' ? 1 : 0;
	}
}