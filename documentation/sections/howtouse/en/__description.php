<h2 class="item1">How to use</h2>

<h5>
    There are several steps to use RD Parallax
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
    Include the script
</h3>

<p>
    Include the script on target page
</p>

<code>
<pre>
&lt;script src="js/rd-parallax.min.js"&gt;&lt;/script&gt;
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
&lt;script&gt;
  $(document).ready(function () {
    o.RDParallax({}); // Additional options
  });
&lt;/script&gt;
</pre>
</code>

