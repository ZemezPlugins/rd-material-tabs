# RD Material Tabs

The plugin provides easy to use responsive tabs functionality like in Material Design Specification. The tabs works well with mouse and touch devices.

Check out this [Demo](http://cms.devoffice.com/coding-dev/rd-material-tabs/demo/) to see it in action!

Extended documentation is available here: [Documentation](http://cms.devoffice.com/coding-dev/rd-material-tabs/documentation/)

## Setup
The HTML markup is really simple. Just create a list of your headers and put content in your item selector(default value is 'div') in same order. Here is an example:

```html
<!-- RD Material Tabs -->
<section class="rd-material-tabs">
    <div class="rd-material-tabs__list">
    <!-- List of tab headings -->
	    <ul>
            <li>
    	        <a href="#">Tab 1</a>
            </li>
            <li>
    	        <a href="#">Tab 2</a>
            </li>
            <li>
    	        <a href="#">Tab 3</a>
            </li>
        </ul> 
    </div>
    <!-- Container for your content -->
	<div class="rd-material-tabs__container">
		<!-- Content for first tab -->
        <div>...</div>
        <!-- Content for second tab -->
        <div>...</div>
        <!-- Content for third tab -->
        <div>...</div>
    </div>
</section>
<!-- END RD Material Tabs-->
```

Apply the tabs styles to the scene

```html
<link rel="stylesheet" href="path/to/css/jquery.rd-material-tabs.css">
```

Finally, initialize the script

```js
$(document).ready(function () {
    o.RDMaterialTabs({}); // Additional options
});
```

## License
Licensed under dual [CC By-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/)
and [GPLv3](http://www.gnu.org/licenses/gpl-3.0.ru.html)

