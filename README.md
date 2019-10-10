# A Simple Embeddable React Widget
This project is a simple template for an embeddable React widget that can be inserted into a host website using a single &lt;script> tag. It supports JSX, CSS styles, and is compiled using Webpack into a single .js file which can be static-hosted.

Both synchronous and asynchronous loading is supported.

# Overview
1. The widget is instantiated when the .js package is loaded
2. The host page supplies a **name** and a **targetElementId**
3. The widget registers a global object with the name supplied by the host page 
4. The widget renders the React component at the element specified by the host page
5. The host page can communicate with the widget via the global object

## Demo
You can view a live demo of both synchronous and asynchronous loading here: 

https://bjgrosse.github.io/simple-embeddable-react-widget/dist/

## Usage Example #1: Synchronous
This method uses simple <script> tag reference as shown below:

```html
    <div id="root"></div>
    
    <script src="http://somehost/widget.js"  
            id="Simple-Widget-Script" 
            data-config="{'name': 'w1', 'config': {'targetElementId': 'root'}}" ></script>
```

The data-config attribute passes in the name **w1** for the widget's global object as well as the target element id **root** where the widget should be rendered.

The host page can then communicate with the widget via the global object like this:

```html
<div><button onclick="w1('message', 'Hello world!');">Send Message</button></div>
```

In this code, we send the **message** call to the widget and pass a string as the parameter.

## Usage Example #2: Asynchronous
We can load the widget asynchronously. Using this method we create a *temporary* object that holds any calls to the widget in a queue and when the widget loads, it will then process those calls.

```html
<div id="root">Loading...</div>
<script>
    (function (w, d, s, o, f, js, fjs) {
        w['Simple-Widget'] = o; w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
        js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
        js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
    }(window, document, 'script', 'w1', 'http://somehost/widget.js'));
    w1('init', { targetElementId: 'root' });
</script>
```

This code follows the pattern used by Google Analytics. The function is called with the desired name of the global object (**w1**) and the url to the script. The function then records the desired name and, using that name, creates a placeholder global object that receives and queues any calls made to the widget before the asynchronous loading finishes.

Then it creates a script tag and injects it into the DOM. 

The host then issues the 'init' call to the widget passing in any initialization values:

```html
    w1('init', { targetElementId: 'root' });
```

# Running the Project
## Install dependencies
```
$ npm install
```
## Run the development server
```
$ ./node_modules/.bin/webpack-dev-server --open
```
## Build the package
```
$ ./node_modules/.bin/webpack --config webpack.config.js
```
## Run Tests
```
$ Jest
```

# Acknowledgments
I found helpful guidance in this project from the following sites:

https://blog.jenyay.com/building-javascript-widget/

https://github.com/seriousben/embeddable-react-widget
