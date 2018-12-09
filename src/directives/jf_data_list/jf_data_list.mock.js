const items = [
    {
        label: 'Plain text',
        value: 'nam nemo nesciunt omnis perferendis possimus'
    },
    {
        label: 'More plain text',
        value: 'Asperiores at consectetur consequatur consequuntur cumque eos eum'
    },
    {
        label: 'Text with copy to clipboard',
        value: 'optio possimus provident quas quos',
        copy: true
    },
    {
        label: 'Overflowing text',
        value: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, adipisci architecto atque delectus doloremque eos eum expedita explicabo illo ipsa itaque iusto nam neque perferendis, repellendus soluta vitae voluptatibus. Eos est hic id perspiciatis quasi? Ipsa magni optio quod?'
    },
    {
        label: 'Overflowing text with copy',
        value: 'dolore eius error periores at consectetur consequuntur cumque eos eum nam nemo nesciunt omnis perferendis fugiat harum availablePackageTypesnesciunt perferendis fugiat harum, impedit ipsum iste',
        copy: true
    },
    {
        label: 'Empty text',
        value: ''
    },
    {
        label: 'List with some clickable items',
        value: [
            {label:'Lorem',url:'https://www.lipsum.com'},
            {label:'Accusantium'},
            {label:'adipisci'},
            {label:'Ipsum',url:'https://www.lipsum.com/'},
            {label:'Dolor',url:'https://www.lipsum.com/'},
            {label:'architecto'}
        ]
    },
    {
        label: 'List with overflowing items',
        value: [
            {label:'Lorem',url:'https://www.lipsum.com'},
            {label:'Ipsum',url:'https://www.lipsum.com/'},
            {label:'Dolor',url:'https://www.lipsum.com/'},
            {label:'Accusantium'},
            {label:'adipisci'},
            {label:'architecto'},
            {label:'Sit',url:'https://www.lipsum.com/'},
            {label:'Amet',url:'https://www.lipsum.com/'},
            {label:'Consectetur',url:'https://www.lipsum.com/'},
            {label:'elit',url:'https://www.lipsum.com/'},
            {label:'atque',url:'http://www.google.com'},
            {label:'delectus',url:'http://www.google.com'},
            {label:'doloremque',url:'http://www.google.com'},
        ]
    },
    {
        label: 'Hidden',
        value: 'ratione reiciendis repellendus tempora tenetur velit',
        isHidden: true
    },
    {
        label: 'Value is url',
        value: 'http://www.lorem_ipsum_dolor_sit_amet_consectetur_adipisicing_elit.com',
        isUrl: true
    },
    {
        label: 'Value with separate url',
        value: 'Link to lorem ipsum website',
        url: 'https://www.lipsum.com/',
        isUrl: true
    },
    {
        label: 'Empty url',
        value: 'Link to lorem ipsum website',
        url: '',
        isUrl: true
    },
    {
        label: 'Empty url & text',
        value: '',
        url: '',
        isUrl: true
    },

];

export {items};