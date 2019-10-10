
import Config from './config';
const widgetName = Config.name;

beforeEach(() => {
    jest.resetModules();
});

// Test the method where the widget is embeded using a simple script tag
test('initialize sync test', () => {
    document.body.innerHTML = `<script src="./widget.js"  id="` + widgetName + `-Script" data-config="{'name': 'wd', 'config': {'targetElementId': 'root'}}" ></script><div id="root" />`

    // run the widget script, since the above script tag doesn't actually load the script in Jest
    require('./main');

    // if successful, our Div will now have children
    expect(document.getElementById('root').childElementCount).toBeGreaterThan(0);
})

//
// Now test the second method where we create a placeholder for the api calls
// run the 'init' call and then instantiate the widget, simulating async loading of the widget
test('initialize async test', () => {
    window[widgetName] = 'wd';
    document.body.innerHTML = '<div id="root" />'

    // add a temporary handler in place for api calls
    // until the widget is instantiated
    window['wd'] = function () {
        // push any calls into a queue
        (wd.q = wd.q || []).push(arguments);
    }

    // make a widget api call that will be queued
    wd('init', { targetElementId: 'root' })

    // run the widget script
    require('./main');

    expect(document.getElementById('root').childElementCount).toBeGreaterThan(0);
})