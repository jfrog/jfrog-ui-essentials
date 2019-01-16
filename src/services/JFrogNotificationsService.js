export class JFrogNotifications {

    constructor() {
        this.$inject('toaster', '$timeout', '$rootScope', 'JFrogEventBus');
        this.toast = this.toaster;
        this.lastNotification = null;
        this.EVENTS = this.JFrogEventBus.getEventsDefinition();
        this.errors = [];
        this.MIN_ERROR_TIME = 6000;
        this.registerEvents();
    }

    registerEvents() {
        this.JFrogEventBus.registerOnScope(this.$rootScope, this.EVENTS.CLOSE_NOTIFICATIONS, () => {
            this.errors.forEach(error => {
                if (!error.closing) {
                    error.closing = true;
                    let now = new Date().getTime();
                    let delay = now - error.time > this.MIN_ERROR_TIME ? 0 : this.MIN_ERROR_TIME - (now - error.time);
                    let instance = error.instance;
                    window.setTimeout(() => {
                        instance.goAway(0);
                        let i = this.errors.indexOf(error);
                        this.errors.splice(i, 1);
                    }, delay);
                }
            });
        });
    }

    create(message, allowHtml) {

        if (message.info) {
            this.showNotification(message.info, message.timeout, 'toasted-primary', allowHtml);
        }

        if (message.warn) {
            this.showNotification(message.warn, message.timeout, 'toasted-warning', allowHtml);
        }

        if (message.error) {
            let instance = this.showNotification(message.error, message.timeout, 'toasted-error', allowHtml);
            this.errors.push({
                time: new Date().getTime(),
                instance
            });
        }
    }

    showNotification(content, timeout, classType, allowHtml) {
        if (this.lastNotification === content) {
            return;
        }

        let notificationObject = this.createToastedObject(timeout);
        this.buildNotificationHtml(notificationObject, content, classType, allowHtml);

        this.$set(this, 'lastNotification', content);
        window.setTimeout(() => {
            this.$set(this, 'lastNotification', null);
        }, timeout || 5000);
        return notificationObject;
    }

    createToastedObject(timeout) {
        return Vue.toasted.show('WILL BE DELETED', {
            position: 'top-center',
            containerClass: 'toast-top-center',
            duration: timeout || 5000
        });
    }

    buildNotificationHtml(notificationObject, content, classType, allowHtml) {
        // used to modify vue-toasted notifications to essentials angularjs notifications Html structure
        // (for design purposes)
        let notificationElement = notificationObject.el;
        notificationElement.innerHTML = '';
        notificationElement.classList.remove('toasted-primary');
        notificationElement.classList.add(classType);

        // close button
        let closeDiv = document.createElement('div');
        let closeButton = document.createElement('button');
        closeButton.classList.add('toast-close-button');
        closeButton.type = 'button';
        closeButton.innerText = '×';
        closeButton.onclick = () => {
            notificationObject.goAway(0);
        };
        closeDiv.append(closeButton);
        notificationElement.append(closeDiv);

        // title
        let titleDiv = document.createElement('div');
        titleDiv.classList.add('toast-title');
        notificationElement.append(titleDiv);

        // toast message
        let messageDiv = document.createElement('div');
        messageDiv.classList.add('toast-message');
        let messageInnerDiv = document.createElement('div');
        if (allowHtml) {
            messageInnerDiv.innerHTML = content;
        } else {
            messageInnerDiv.innerText = messageInnerDiv.textContent = content;
        }


        messageDiv.append(messageInnerDiv);
        notificationElement.append(messageDiv);
    }

    /**
     * Show toast with HTML content
     *
     * @param message {{type: string, body: string}}
     */
    createMessageWithHtml(message) {
        let messageObj = {
            timeout: message.timeout || 5000
        };
        message[message.type || 'info'] = message.body;

        this.create(messageObj, true)
    }

    clear() {
        Vue.toasted.clear();
    }
}
