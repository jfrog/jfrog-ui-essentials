/**
 * wrapper around the ngToast service
 * @url http://tamerayd.in/ngToast/#
 */
export class JFrogNotifications {

    constructor(toaster, $timeout, $rootScope, JFrogEventBus) {
        this.toast = toaster;
        this.$timeout = $timeout;
        this.lastNotification = null;
        this.JFrogEventBus = JFrogEventBus;
        this.$rootScope = $rootScope;
        this.EVENTS = JFrogEventBus.getEventsDefinition();

        this.errors = [];
        this.MIN_ERROR_TIME = 6000;

        this.registerEvents();
    }

    registerEvents() {
        this.JFrogEventBus.registerOnScope(this.$rootScope, this.EVENTS.CLOSE_NOTIFICATIONS, () => {
            this.errors.forEach(error => {
                if (!error.closing) {
                    error.closing = true;
                    let now = (new Date()).getTime();
                    let delay = now - error.time > this.MIN_ERROR_TIME ? 0 : this.MIN_ERROR_TIME - (now - error.time);
                    this.$timeout(()=>{
                        this.toast.clear(error.instance);
                        let i = this.errors.indexOf(error);
                        this.errors.splice(i,1);
                    },delay)
                }
            })
        });
    }

    create(message, allowHtml = false) {
        if (message.info) {
            if (this.lastNotification == message.info) {
                return false
            }
            this.toast.pop({
                type: 'success',
                timeout: message.timeout || 5000,
                body: message.info,
                showCloseButton: true,
                bodyOutputType: allowHtml ? 'trustedHtml' : undefined,
                clickHandler: this.notifClickHandle,

            });
            this.lastNotification = message.info;
            this.$timeout(() => {
                this.lastNotification = null
            }, message.timeout || 5000);
            //this.toast.create({animation:'fade',content:message.info});
        }

        if (message.error) {
            if (this.lastNotification == message.error) {
                return false
            }
            let instance = this.toast.pop({
                type: 'error',
                timeout: message.timeout || 0,
                body: message.error,
                showCloseButton: true,
                bodyOutputType: allowHtml ? 'trustedHtml' : undefined,
                clickHandler: this.notifClickHandle
            });
            this.errors.push({time: (new Date()).getTime(), instance});
            this.lastNotification = message.error;
            this.$timeout(() => {
                this.lastNotification = null
            }, message.timeout || 0);
            //this.toast.danger({animation:'fade',content:message.error});
        }
        if(message.warn) {
            if (this.lastNotification == message.warn) {
                return false
            }
            this.toast.pop({
                type: 'warning',
                timeout: message.timeout || 5000,
                body: message.warn,
                showCloseButton: true,
                bodyOutputType: allowHtml ? 'trustedHtml' : undefined,
                clickHandler: this.notifClickHandle
            });
            this.lastNotification = message.warn;
            this.$timeout(() => {
                this.lastNotification = null
            }, message.timeout || 0);
        }
    }

    notifClickHandle(toast, isCloseButton) {
        return isCloseButton;
    }

    /**
     * Show toast with HTML content
     *
     * @param message {{type: string, body: string}}
     */
    createMessageWithHtml(message) {
        this.toast.pop({
            type: message.type,
            body: message.body,
            bodyOutputType: 'trustedHtml',
            timeout: message.timeout,
            showCloseButton: true,
            clickHandler: this.notifClickHandle
        });
    }

    clear() {
        this.toast.clear();
    }

}