import sanitizeMixin from './index';
import { BASE64_TEST_PNG_IMAGE, TEST_EVENTS, TEST_SIMPLE_TAGS } from './constants';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';

const HtmlSanitizeTestComponent = {
    template: `
    <div>
        <div class="safe" v-html="$sanitize(dynamicContentUnsafe,config)"></div>
        <div class="unsafe" v-html="dynamicContentUnsafe"></div>
    </div>
    `,
    name: 'HtmlSanitizeTestComponent',
    mixins: [sanitizeMixin],
    props: {
        dynamicContentUnsafe: String,
        config: Object,
    },
};
const URLSanitizeTestComponent = {
    template: `
    <div>
        <a class="safe-anchor" :href="$sanitizeUrl(dynamicUrl)"></a>
        <a class="unsafe-anchor" :href="dynamicUrl"></a>
    </div>
    `,
    name: 'URLSanitizeTestComponent',
    mixins: [sanitizeMixin],
    props: {
        dynamicUrl: String,
    },
};

const getElements = (wrapper) => {
    const unsafe = wrapper.find('.unsafe');
    const safe = wrapper.find('.safe');
    return { unsafe, safe };
};

const getHtml = (wrapper) => {
    const { unsafe, safe } = getElements(wrapper);
    const unsafeHtml = unsafe.html();
    const safeHtml = safe.html();
    return { unsafeHtml, safeHtml };
};


const allTagEventCombinations = [];
TEST_SIMPLE_TAGS.forEach(({ tag, isSelfClosing, parentTags = [] }) => {
    TEST_EVENTS.forEach(event => {
        allTagEventCombinations.push([tag, event, isSelfClosing, parentTags]);
    });
});

describe('Sanitize Html Mixin', () => {
    describe('Special tags test suit', () => {
        let wrapper;
        beforeEach(() => {
            const localVue = createLocalVue();
            wrapper = shallowMount(HtmlSanitizeTestComponent, {
                localVue,
            });
        });

        it('rendering', () => {
            expect(wrapper.find(HtmlSanitizeTestComponent).exists()).toBe(true);
        });

        it('Should escape script tag with onclick XSS', async () => {
            const xss = `<script onclick="alert('xss')"></script>`;
            wrapper.setProps({ dynamicContentUnsafe: xss });
            await Vue.nextTick();
            const { unsafeHtml, safeHtml } = getHtml(wrapper);
            expect(unsafeHtml).toContain(xss);
            expect(safeHtml).toContain('&lt;script&gt;&lt;/script&gt;');
            expect(wrapper.element).toMatchSnapshot();
        });

        it('Should escape script tag with inner js XSS', async () => {
            const xss = `<script>alert('xss')</script>`;
            wrapper.setProps({ dynamicContentUnsafe: xss });
            await Vue.nextTick();
            const { unsafeHtml, safeHtml } = getHtml(wrapper);
            expect(unsafeHtml).toContain(`<script>`);
            expect(unsafeHtml).toContain(`alert('xss')`);
            expect(safeHtml).toContain(`&lt;script&gt;alert('xss')&lt;/script&gt;`);
            expect(wrapper.element).toMatchSnapshot();
        });

        it('Should escape object tag with data64 XSS', async () => {
            // PHNjcmlwdD5hbGVydCgiWFNTIik7PC9zY3JpcHQ is '<script onclick="alert('xss')"></script>'
            const xss = `<object data="data:text/html;base64,PHNjcmlwdD5hbGVydCgiWFNTIik7PC9zY3JpcHQ+Cg=="></object>`;
            wrapper.setProps({ dynamicContentUnsafe: xss });
            await Vue.nextTick();
            const { unsafeHtml, safeHtml } = getHtml(wrapper);
            expect(unsafeHtml).toContain(xss);
            expect(safeHtml).toContain('&lt;object&gt;&lt;/object&gt;');
            expect(wrapper.element).toMatchSnapshot();
        });

        it('Should sanitize img tag with onerror XSS', async () => {
            const xss = `<img src="x" onerror="alert('xss');">`;
            wrapper.setProps({ dynamicContentUnsafe: xss });
            await Vue.nextTick();
            const { unsafeHtml, safeHtml } = getHtml(wrapper);
            expect(unsafeHtml).toContain(xss);
            expect(safeHtml).toContain('<img src="x">');
            expect(wrapper.element).toMatchSnapshot();
        });

        it('Should not sanitize custom configured tags', async () => {
            const mockHtml = `<ul><li><input checked="" disabled="" type="checkbox" /> foo<ul><li><input disabled="" type="checkbox" /> bar</li><li><input checked="" disabled="" type="checkbox" /> baz</li></ul><li><input disabled="" type="checkbox" /> bim</li></ul>`;
            const { DEFAULT_CONFIG } = sanitizeMixin;
            const releaseNotesSanitizerConfig = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
            releaseNotesSanitizerConfig.allowedTags.push('input');
            releaseNotesSanitizerConfig.allowedAttributes.input = ['checked', 'disabled', 'type'];
            wrapper.setProps({ dynamicContentUnsafe: mockHtml, config: releaseNotesSanitizerConfig });
            await Vue.nextTick();
            expect(wrapper.element).toMatchSnapshot();
        });
        it('Should sanitize & render img with base64 src', async () => {
            const xss = `<img src="data:image/png;base64,${BASE64_TEST_PNG_IMAGE}" onerror="alert('xss');">`;
            wrapper.setProps({ dynamicContentUnsafe: xss });
            await Vue.nextTick();
            const { unsafeHtml, safeHtml } = getHtml(wrapper);
            expect(unsafeHtml).toContain(xss);
            expect(safeHtml).toContain(`<img src="data:image/png;base64,${BASE64_TEST_PNG_IMAGE}">`);
            expect(wrapper.element).toMatchSnapshot();
        });

        it('Should sanitize & keep href attribute in anchor tag', async () => {
            const xss = `<a href="http://google.com" onerror="alert('xss');"></a>`;
            wrapper.setProps({ dynamicContentUnsafe: xss });
            await Vue.nextTick();
            const { unsafeHtml, safeHtml } = getHtml(wrapper);
            expect(unsafeHtml).toContain(xss);
            expect(safeHtml).toContain('<a href="http://google.com"></a>');
            expect(wrapper.element).toMatchSnapshot();
        });
        it('Should sanitize javascript scheme from anchor tag', async () => {
            const xss = `<a href="javascript:alert('xss');"></a>`;
            wrapper.setProps({ dynamicContentUnsafe: xss });
            await Vue.nextTick();
            const { unsafeHtml, safeHtml } = getHtml(wrapper);
            expect(unsafeHtml).toContain(xss);
            expect(safeHtml).toContain('<a></a>');
            expect(wrapper.element).toMatchSnapshot();
        });
    });

    describe('Simple tags data driven test suit', () => {
        let wrapper;

        beforeEach(() => {
            const localVue = createLocalVue();
            wrapper = shallowMount(HtmlSanitizeTestComponent, {
                localVue,
            });
        });

        test.each(allTagEventCombinations)(`Should sanitize %s tag with %s event XSS`,
            async (tag, event, isSelfClosing, parentTags) => {
                const closingTag = isSelfClosing ? '' : `</${tag}>`;
                let xss = `<${tag} on${event}="eventHandler">${closingTag}`;
                if (parentTags && parentTags.length) {
                    parentTags.forEach(parentTag => {
                        xss = `<${parentTag}>${xss}</${parentTag}>`;
                    });
                }
                wrapper.setProps({ dynamicContentUnsafe: xss });
                await Vue.nextTick();
                const { unsafeHtml, safeHtml } = getHtml(wrapper);
                expect(unsafeHtml).toContain(`${tag}`);
                expect(unsafeHtml).toContain(`on${event}="eventHandler"`);
                expect(safeHtml).toContain(`<${tag}>${closingTag}`);
                expect(!safeHtml.includes(`on${event}="eventHandler"`));
            });
    });
    describe('Sanitize URL', () => {
        let wrapper;

        beforeEach(() => {
            const localVue = createLocalVue();
            wrapper = shallowMount(URLSanitizeTestComponent, {
                localVue,
            });
        });
        it('Should sanitize url with javascript in href', async () => {
            const xss = `javascript:alert('xss')`;
            wrapper.setProps({ dynamicUrl: xss });
            await Vue.nextTick();
            const safeUrl = wrapper.find('.safe-anchor').attributes('href');
            const unsafeUrl = wrapper.find('.unsafe-anchor').attributes('href');
            expect(unsafeUrl).toContain(xss);
            expect(safeUrl).toContain('about:blank');
            expect(wrapper.element).toMatchSnapshot();
        });
        it('Should sanitize url with encoded javascript in href', async () => {
            const xss = decodeURIComponent(`JaVaScRiP%0at:alert('xss')`);
            console.log(xss);
            wrapper.setProps({ dynamicUrl: xss });
            await Vue.nextTick();
            const safeUrl = wrapper.find('.safe-anchor').attributes('href');
            const unsafeUrl = wrapper.find('.unsafe-anchor').attributes('href');
            expect(unsafeUrl).toContain(xss);
            expect(safeUrl).toContain('about:blank');
            expect(wrapper.element).toMatchSnapshot();
        });
        it('Should not change a valid url', async () => {
            const noXss = 'https://example.com';
            wrapper.setProps({ dynamicUrl: noXss });
            await Vue.nextTick();
            const safeUrl = wrapper.find('.safe-anchor').attributes('href');
            const unsafeUrl = wrapper.find('.unsafe-anchor').attributes('href');
            expect(unsafeUrl).toContain(noXss);
            expect(safeUrl).toContain(noXss);
            expect(wrapper.element).toMatchSnapshot();
        });
        it('Should not change a valid url without https', async () => {
            const noXss = 'example.com';
            wrapper.setProps({ dynamicUrl: noXss });
            await Vue.nextTick();
            const safeUrl = wrapper.find('.safe-anchor').attributes('href');
            const unsafeUrl = wrapper.find('.unsafe-anchor').attributes('href');
            expect(unsafeUrl).toContain(noXss);
            expect(safeUrl).toContain(noXss);
            expect(wrapper.element).toMatchSnapshot();
        });
    });
});
