((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[263],{

/***/ "13d5":
/***/ (function(module, exports) {

// flow

module.exports = {
  watch: {
    typeAheadPointer() {
      this.maybeAdjustScroll()
    }
  },

  methods: {
    /**
     * Adjust the scroll position of the dropdown list
     * if the current pointer is outside of the
     * overflow bounds.
     * @returns {*}
     */
    maybeAdjustScroll() {
      let pixelsToPointerTop = this.pixelsToPointerTop()
      let pixelsToPointerBottom = this.pixelsToPointerBottom()

      if ( pixelsToPointerTop <= this.viewport().top) {
        return this.scrollTo( pixelsToPointerTop )
      } else if (pixelsToPointerBottom >= this.viewport().bottom) {
        return this.scrollTo( this.viewport().top + this.pointerHeight() )
      }
    },

    /**
     * The distance in pixels from the top of the dropdown
     * list to the top of the current pointer element.
     * @returns {number}
     */
    pixelsToPointerTop() {
      let pixelsToPointerTop = 0
      if( this.$refs.dropdownMenu ) {
        for (let i = 0; i < this.typeAheadPointer; i++) {
          pixelsToPointerTop += this.$refs.dropdownMenu.children[i].offsetHeight
        }
      }
      return pixelsToPointerTop
    },

    /**
     * The distance in pixels from the top of the dropdown
     * list to the bottom of the current pointer element.
     * @returns {*}
     */
    pixelsToPointerBottom() {
      return this.pixelsToPointerTop() + this.pointerHeight()
    },

    /**
     * The offsetHeight of the current pointer element.
     * @returns {number}
     */
    pointerHeight() {
      let element = this.$refs.dropdownMenu ? this.$refs.dropdownMenu.children[this.typeAheadPointer] : false
      return element ? element.offsetHeight : 0
    },

    /**
     * The currently viewable portion of the dropdownMenu.
     * @returns {{top: (string|*|number), bottom: *}}
     */
    viewport() {
      return {
        top: this.$refs.dropdownMenu ? this.$refs.dropdownMenu.scrollTop: 0,
        bottom: this.$refs.dropdownMenu ? this.$refs.dropdownMenu.offsetHeight + this.$refs.dropdownMenu.scrollTop : 0
      }
    },

    /**
     * Scroll the dropdownMenu to a given position.
     * @param position
     * @returns {*}
     */
    scrollTo(position) {
      return this.$refs.dropdownMenu ? this.$refs.dropdownMenu.scrollTop = position : null
    },
  }
}


/***/ }),

/***/ "ada1":
/***/ (function(module, exports) {

module.exports = {
	props: {
		/**
		 * Toggles the adding of a 'loading' class to the main
		 * .v-select wrapper. Useful to control UI state when
		 * results are being processed through AJAX.
		 */
		loading: {
			type: Boolean,
			default: false
		},

		/**
		 * Accept a callback function that will be
		 * run when the search text changes.
		 *
		 * loading() accepts a boolean value, and can
		 * be used to toggle a loading class from
		 * the onSearch callback.
		 *
		 * @param {search}  String          Current search text
		 * @param {loading} Function(bool)  Toggle loading class
		 */
		onSearch: {
			type: Function,
			default: function(search, loading){}
		}
	},

	data() {
		return {
      mutableLoading: false
    }
	},

	watch: {
		/**
		 * If a callback & search text has been provided,
		 * invoke the onSearch callback.
		 */
		search() {
			if (this.search.length > 0) {
				this.onSearch(this.search, this.toggleLoading)
        this.$emit('search', this.search, this.toggleLoading)
      }
		},
    /**
		 * Sync the loading prop with the internal
		 * mutable loading value.
     * @param val
     */
		loading(val) {
			this.mutableLoading = val
		}
	},

	methods: {
		/**
		 * Toggle this.loading. Optionally pass a boolean
		 * value. If no value is provided, this.loading
		 * will be set to the opposite of it's current value.
		 * @param toggle Boolean
		 * @returns {*}
		 */
		toggleLoading(toggle = null) {
			if (toggle == null) {
				return this.mutableLoading = !this.mutableLoading
			}
			return this.mutableLoading = toggle
		}
	}
}


/***/ }),

/***/ "e08f":
/***/ (function(module, exports) {

module.exports = {
  data() {
    return {
      typeAheadPointer: -1
    }
  },

  watch: {
    filteredOptions() {
      this.typeAheadPointer = 0
    }
  },

  methods: {
    /**
     * Move the typeAheadPointer visually up the list by
     * subtracting the current index by one.
     * @return {void}
     */
    typeAheadUp() {
      if (this.typeAheadPointer > 0) {
        this.typeAheadPointer--
        if( this.maybeAdjustScroll ) {
          this.maybeAdjustScroll()
        }
      }
    },

    /**
     * Move the typeAheadPointer visually down the list by
     * adding the current index by one.
     * @return {void}
     */
    typeAheadDown() {
      if (this.typeAheadPointer < this.filteredOptions.length - 1) {
        this.typeAheadPointer++
        if( this.maybeAdjustScroll ) {
          this.maybeAdjustScroll()
        }
      }
    },

    /**
     * Select the option at the current typeAheadPointer position.
     * Optionally clear the search input on selection.
     * @return {void}
     */
    typeAheadSelect() {
      if( this.filteredOptions[ this.typeAheadPointer ] ) {
        this.select( this.filteredOptions[ this.typeAheadPointer ] );
      } else if (this.taggable && this.search.length){
        this.select(this.search)
      }

      if( this.clearSearchOnSelect ) {
        this.search = "";
      }
    },
  }
}

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~a1bdf38b.js.map