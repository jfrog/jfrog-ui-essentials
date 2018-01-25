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
		let textFileAsBlob = new Blob([text], {type:'text/plain'});
		let fileNameToSaveAs = fileName;

		let downloadLink = document.createElement("a");
		downloadLink.download = fileNameToSaveAs;
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
			};
			downloadLink.style.display = "none";
			document.body.appendChild(downloadLink);
		}

		downloadLink.click();
	}
}