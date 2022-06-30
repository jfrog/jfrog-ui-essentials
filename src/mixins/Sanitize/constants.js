const BASE64_TEST_PNG_IMAGE = `iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAAAAACNsI2aAAAACXBIWXMAAAB5AAAAeQBPsriEAAAB6ElEQVR42rVWO46EMAzNadAcY3vaOQMXoXcXKZehS8NpqNxamw8JxDYra1Zjhgge9jhx/By7bYvtl4Y8Qn+tEjty6WxuQ0KkfOM5wJEeEkT1bsigU+xGQV+QfZ2ned0LAkLnyQ4XV2XB/k+jXdTs8Mc1+UlvQehEt5Fit7hLFsUfqfOk3d1lJ9VO+qN1sFvJm+IScB7s3uo8ZVzC8RrsXjIuqp2n0d+sxFNbHxCw9cF34yn2L5jyJWndIprzRfqLpvw0+6PCh1fjgxpP5NL4VzlYEa6zOYDgzyvk0cMbykMek6THipSXAD5/BKh8H/3JGZTxPgM9Px9WDL0CkM1ORJie48nsWAXQ8kW1YxlknKfIWJs/EBXgoZ6Jf2KMNMYz4FgBJjTGkxR/H67vm/H8eP9ShlyRqfli24c0svy0zLNXgOkNtQJEle/P/MPOv8T3TGZIZIbO7sL7BMON74nkuQqUj4XvnMvwiNCBjO+yev2NVDtZLeX5rvD9lu0zauxW+a6dBvJ8H5Gyfzz3wIBkO57rYECyHeeWF+xW+YcT47Jkdzi4TpT+lPNdIv9Z34fxNOxf0PhO91yw5MuMen56AxLPOtG7W9T63SCQ2k9Uol1so3bVnrog2JTyU57n1bb37n3s5s8Of5RfsaTdSlfuyUAAAAA8dEVYdGNvbW1lbnQAIEltYWdlIGdlbmVyYXRlZCBieSBHTlUgR2hvc3RzY3JpcHQgKGRldmljZT1wbm1yYXcpCvqLFvMAAABKdEVYdHNpZ25hdHVyZQA4NWUxYWU0YTJmYmE3OGVlZDRmZDhmMGFjZjIzNzYwOWU4NGY1NDk2Y2RlMjBiNWQ3NmM5Y2JjMjk4YzRhZWJjJecJ2gAAAABJRU5ErkJggg==`
const TEST_SIMPLE_TAGS = [
    { tag: 'span', isSelfClosing: false },
    { tag: 'h1', isSelfClosing: false, allowedAttributes: ['align="left"'] },
    { tag: 'h2', isSelfClosing: false, allowedAttributes: ['align="left"']  },
    { tag: 'h3', isSelfClosing: false, allowedAttributes: ['align="left"']  },
    { tag: 'h4', isSelfClosing: false, allowedAttributes: ['align="left"']  },
    { tag: 'h5', isSelfClosing: false, allowedAttributes: ['align="left"']  },
    { tag: 'h6', isSelfClosing: false, allowedAttributes: ['align="left"']  },
    { tag: 'blockquote', isSelfClosing: false },
    { tag: 'p', isSelfClosing: false, allowedAttributes: [
            'align="left"',
            'cite="http://www.mycites.com"',
            'cite="https://www.mycites.com"',
            'cite="ftp://10.20.30:4050/cites"'
        ]
    },
    {
        tag: 'a', isSelfClosing: false, allowedAttributes: [
            'class="moshe"',
            'href="mailto:my@example.com"',
            'href="tel:123456789"',
        ]
    },
    { tag: 'ul', isSelfClosing: false },
    { tag: 'ol', isSelfClosing: false },
    { tag: 'nl', isSelfClosing: false },
    { tag: 'li', isSelfClosing: false },
    { tag: 'li', isSelfClosing: false },
    { tag: 'b', isSelfClosing: false },
    { tag: 'i', isSelfClosing: false },
    { tag: 'strong', isSelfClosing: false },
    { tag: 'em', isSelfClosing: false },
    { tag: 'strike', isSelfClosing: false },
    { tag: 'code', isSelfClosing: false },
    { tag: 'hr', isSelfClosing: true },
    { tag: 'br', isSelfClosing: true },
    { tag: 'div', isSelfClosing: false, allowedAttributes: ['class="moshe"', 'id="moshe"'] },
    { tag: 'pre', isSelfClosing: false },
    { tag: 'table', isSelfClosing: false },
    {
        tag: 'img', isSelfClosing: true, allowedAttributes: [
            'src="/my/relative/img/src"',
            'src="http://www.myphotos.com"',
            'src="https://www.myphotos.com"',
            'src="ftp://10.20.30:4050/photos"',
            'width="100px"'
        ]
    },
    { tag: 'area', isSelfClosing: true },
    // These tags must be as child of specified parents (in ascending order)
    { tag: 'thead', isSelfClosing: false, parentTags: ['table']},
    { tag: 'caption', isSelfClosing: false, parentTags: ['table']},
    { tag: 'tbody', isSelfClosing: false, parentTags: ['table']},
    { tag: 'tr', isSelfClosing: false, parentTags: ['tbody', 'table']},
    {
        tag: 'td', isSelfClosing: false, parentTags: ['tr', 'tbody', 'table'],
        allowedAttributes: [
            'align="left"', 'valign="bottom"'
        ]
    },
];
const TEST_EVENTS = ['hover', 'click', 'error'];

export { TEST_EVENTS, TEST_SIMPLE_TAGS, BASE64_TEST_PNG_IMAGE };
