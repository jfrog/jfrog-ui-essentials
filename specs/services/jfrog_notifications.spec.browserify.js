/**
 * Created by idannaim on 8/2/15.
 */
let JFrogNotifications;
let toast;
let timeout;
describe('Unit test: JFrogNotifications', () => {


    beforeEach(m('jfrog.ui.essentials'));
    beforeEach(inject(($timeout, _JFrogNotifications_, toaster) => {
        toast = toaster;
        timeout = $timeout;
        spyOn(toast, 'pop');
        JFrogNotifications = _JFrogNotifications_;
    }));

    it('should pop success message with options', ()=> {
        let messageOptions = {
            type: 'success',
            timeout: 5000,
            body: 'my message success',
            showCloseButton: true,
            bodyOutputType: undefined,
            clickHandler: JFrogNotifications.notifClickHandle
        };
        let message = {
            info: 'my message success'
        };
        JFrogNotifications.create(message);
        expect(toast.pop).toHaveBeenCalledWith(messageOptions);
    });

    it('should pop error message with options', ()=> {
        let message = {error: 'my error message'};
        let messageOptions = {
            type: 'error',
            timeout: 10000,
            body: 'my error message',
            showCloseButton: true,
            bodyOutputType: undefined,
            clickHandler: JFrogNotifications.notifClickHandle
        };
        JFrogNotifications.create(message);
        expect(toast.pop).toHaveBeenCalledWith(messageOptions);
    });

    it('should pop warn message with options', ()=> {
        let messageOptions = {
            type: 'warning',
            timeout: 4000,
            body: 'my message warn',
            showCloseButton: true,
            bodyOutputType: undefined,
            clickHandler: JFrogNotifications.notifClickHandle
        };
        let message = {
            warn: 'my message warn'
        };
        JFrogNotifications.create(message);
        expect(toast.pop).toHaveBeenCalledWith(messageOptions);
    });

    it('should pop message with html template', ()=> {
        let tempHtml = {
            type: 'success',
            body: 'test content',
            timeout: 60 * 60000
        };
        JFrogNotifications.createMessageWithHtml(tempHtml);
        let tempHtmlOptions = {
            type: tempHtml.type,
            body: tempHtml.body,
            bodyOutputType: 'trustedHtml',
            timeout: tempHtml.timeout,
            showCloseButton: true,
            clickHandler: JFrogNotifications.notifClickHandle
        };
        expect(toast.pop).toHaveBeenCalledWith(tempHtmlOptions);
    });

    it('should clear all toasts', ()=> {
        spyOn(toast, 'clear');
        JFrogNotifications.clear();
        expect(toast.clear).toHaveBeenCalled();
    });

    it('should not have duplicate  toast ', ()=> {
        let message = {warn: 'my message warn'};
        JFrogNotifications.create(message);
        JFrogNotifications.create(message);
        expect(toast.pop.calls.count()).toEqual(1);
    });
    it('should show next toast when timeout finish ', ()=> {
        let message = {warn: 'my message warn'};
        JFrogNotifications.create(message);
        timeout.flush();
        JFrogNotifications.create(message);
        expect(toast.pop.calls.count()).toEqual(2);
    });
});