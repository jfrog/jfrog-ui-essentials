class JFrogUIModelSaver {
	constructor(controller, modelObjects, excludePaths, $timeout, JFrogModal, $q) {
		this.JFrogModal = JFrogModal;
		this.$q = $q;
		this.controller = controller;
		this.controller._$modelSaver$_ = this;
		this.confirmOnLeave = true;
		this.modelObjects = modelObjects;
		this.excludePaths = excludePaths;
		this.savedModels = {};
		this.saved = false;
		$timeout(() => {
			if (!this.saved) {
				this.save();
			}
		});
	}
	save(objectName) {
		this.modelObjects.forEach((objName) => {
			if (!objectName || objectName === objName) {
				this.savedModels[objName] = _.cloneDeep(this.controller[objName]);
			}
		});
		this.saved = true;
	}
	isModelSaved() {
		let isSaved = true;
		for (let objectNameI in this.modelObjects) {
			let objectName = this.modelObjects[objectNameI];
			if (!angular.equals(this.savedModels[objectName], this.controller[objectName])) {
				let deefObj = DeepDiff(this.savedModels[objectName], this.controller[objectName]);
				if (this._isDiffReal(deefObj, this.excludePaths[objectNameI])) {
					isSaved = false;
					break;
				}
			}
		}
		return isSaved;
	}
	_isDiffReal(deefObj, excludePaths) {
		let excludes = excludePaths ? excludePaths.split(';') : [];
		let isReal = false;
		for (let key in deefObj) {
			let deef = deefObj[key];
			if (deef.path && deef.path.length && ((!_.isString(
					deef.path[deef.path.length - 1]) || deef.path[deef.path.length - 1].startsWith(
					'$$')) || this._isExcluded(deef.path, excludes))) {
				continue;
			}
			if ((deef.lhs === undefined && deef.rhs === '') || (deef.lhs === '' && deef.rhs === undefined) ||
				(deef.lhs === undefined && _.isArray(deef.rhs) && deef.rhs.length === 0) ||
				(deef.lhs === undefined && _.isObject(deef.rhs) && Object.keys(deef.rhs).length === 0)) {
				// not real
			}
			else { //real
				isReal = true;
				break;
			}
		}
		return isReal;
	}
	_isExcluded(path, excludes) {
		if (!excludes.length) {
			return false;
		}
		let excluded = false;
		for (let i in excludes) {
			let exclude = excludes[i];
			let exPath = exclude.split('.');
			let match = true;
			for (let pI in exPath) {
				if ((exPath[pI] !== '*' && exPath[pI] !== path[pI]) || (exPath[pI] === '*' && path[pI]) === undefined) {
					match = false;
					break;
				}
			}
			if (match) {
				excluded = true;
			}
			break;
		}
		return excluded;
	}
	ask() {
		let defer = this.$q.defer();
		if (!this.isModelSaved()) {
			JFrogUIModelSaverFactory.prototype.confirmDiscardModalOpen = true;
			this.JFrogModal.confirm('You have unsaved changes. Leaving this page will discard changes.',
				'Discard Changes', {confirm: 'Discard'})
			    .then(() => {
				    defer.resolve();
			    })
			    .finally(() => {
				    JFrogUIModelSaverFactory.prototype.confirmDiscardModalOpen = false;
			    });
		}
		else {
			defer.resolve();
		}
		return defer.promise;
	}
}
export function JFrogUIModelSaverFactory() {
    this.$inject('$timeout', 'JFrogModal', '$q');
    return {
        get confirmDiscardModalOpen() {
            return JFrogUIModelSaverFactory.prototype.confirmDiscardModalOpen;
        },
        createInstance: (controller, modelObjects, excludePaths) => {
            excludePaths = excludePaths || [];
            return new JFrogUIModelSaver(controller, modelObjects, excludePaths, this.$timeout, this.JFrogModal, this.$q);
        },
        checkDiscardConfirmation: ($q, e) => {
            let defer = this.$q.defer();
            let forms = $('form');
            let changeDiscovered = false;
            for (let i = 0; i < forms.length; i++) {
                let form = forms[i];
                let controller = angular.element(form).controller() || angular.element(form).scope().$ctrl;

                if (controller && controller._$modelSaver$_ && controller._$modelSaver$_.confirmOnLeave && !controller._$modelSaver$_.isModelSaved()) {
                    changeDiscovered = true;

                    controller._$modelSaver$_.ask().then(() => {
                        controller._$modelSaver$_.confirmOnLeave = false;
                        defer.resolve();
                    });

                    break;
                }
            }

            if (!changeDiscovered && !e) {
                defer.resolve();
            } else if (changeDiscovered && e) {
                e.preventDefault();
            }

            return defer.promise;

        }

    };
}
JFrogUIModelSaverFactory.prototype.confirmDiscardModalOpen = false;
