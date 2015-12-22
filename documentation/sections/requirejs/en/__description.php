<h2 class="item1">Use with Require.js</h2>

<h5>
    There are several steps to use RD Parallax with Require.js
</h5>

<h3>
    Get the script from GIT
</h3>

<p>
    Get the script from our public Repo:
    <a href="http://products.git.devoffice.com/coding-development/rd-parallax">Click</a>
</p>


<h3>
    Add the HTML markup
</h3>

<p>
    Default HTML markup is shown below
</p>

<code>
<pre>
&lt;!-- RD Parallax --&gt;
&lt;section class="rd-parallax"&gt;
  &lt;div class="rd-parallax-layer" data-speed="0.2" data-type="media" data-url="path/to/your-image.jpg"&gt;&lt;/div&gt;
  &lt;div class="rd-parallax-layer" data-speed="0.3" data-type="html" data-fade="true"&gt;
    ...
  &lt;/div&gt;
&lt;/section&gt;
&lt;!-- END RD Parallax--&gt;
</pre>
</code>

<p>
    <strong>Attention:</strong> element with data-type="media" can hold any custom markup (sliders, background video etc.)
</p>


<h3>
    Include the stylesheet
</h3>

<p>
    Include rd-parallax.css in &lt;head/&gt; section of target page.
</p>

<code>
<pre>
&lt;link rel="stylesheet" href="path/to/css/rd-parallax.css"&gt;
</pre>
</code>

<h3>
    Update Require.js configuration
</h3>

<p>
    First of all check the paths in require.js. Add path aliaces for jquery and jquery.rd-parallax.
    By default the configuration is defined in main script defined as data-main attribute of require.js
    definition
</p>

<code>
<pre>
&lt;script data-main="js/main" src="js/require.js"&gt;&lt;/script&gt;
</pre>
</code>

<p>
    The target part of require.js configuration is shown below
</p>

<code>
<pre>
requirejs.config({
  paths: {
    "jquery": "path/to/jquery"
    "jquery.rd-parallax": "path/to/jquery.rd-parallax"
  }
});
</pre>
</code>

<h3>
    Initialize the script
</h3>

<p>
    Use this code for script initialization
</p>

<code>
<pre>
requirejs(["jquery", "jquery.rd-parallax"], function($, parallax) {
  var o = $(".rd-parallax");
  o.RDParallax();
});
</pre>
</code>

