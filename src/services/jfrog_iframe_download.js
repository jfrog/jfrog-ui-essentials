export function JFrogIFrameDownload(JFrogNotifications, $timeout) {
	'ngInject';
    return function(url,defaultErrorMessage) {
        let iframe=$('<iframe style="display: none">');
        iframe.load((event)=>{
            let responseObjStr, response,defaultMessage;
            try {
                responseObjStr = $(event.target).contents().find('pre').text();
            }
            catch(e) { //workaround for ie .contents() ACCESS DENIED error
                defaultMessage = defaultErrorMessage || 'Something went wrong.';
            }

            if (responseObjStr) {
                try {
                    response = JSON.parse(JSON.parse(responseObjStr).errors[0].message).error;
                }
                catch(e) {
                    //Do nothing
                }
            }

            if (defaultMessage || response) {
                let message = defaultMessage || response;
                $timeout(()=>{
                    JFrogNotifications.create({error: message});
                    if (iframe.parent().length) iframe.remove();
                });
            }
        });

        iframe.ready(() => {
            $timeout(()=>{
                if (iframe.parent().length) iframe.remove();
            },15000);
        });

        iframe.attr('src', url).appendTo('body');
    }
}