function openStackblitz(descriptor) {

    let fields = [];

    let addField = (key,val) => {
        fields.push(`<input type="hidden" name="${key}" value="${val}">`);
    }

    addField('project[files][test.js]', `console.log('moshe');`);
    addField('project[description]', 'bla bla bla');
    addField('project[dependencies]', '{}');
    addField('project[template]', 'javascript');

    let markup = `<form id="openStackblitz" method="post" action="https://stackblitz.com/run" target="_blank">${fields.join('\n')}</form>`

    let wrapper = document.createElement('div');

    wrapper.innerHTML = markup;

    document.body.append(wrapper);

    document.querySelector('form#openStackblitz').submit();

    wrapper.remove();
}