<h2 class="item1">Options</h2>

<h5>
    There are several options available in the script:
</h5>

<h3>
    General Options
</h3>

<p>
    You can define the options below in script initialization
</p>

<h5>layerBlur</h5>
<dl class="inline-term">
    <dt>Type</dt>
    <dd>Boolean</dd>
</dl>
<dl class="inline-term">
    <dt>Value</dt>
    <dd>true, false</dd>
</dl>

<p>
    Enables blur effect for layer if image size is too small for quality display
</p>

<h5>layerDirection</h5>
<dl class="inline-term">
    <dt>Type</dt>
    <dd>String</dd>
</dl>
<dl class="inline-term">
    <dt>Value</dt>
    <dd>inverse, normal</dd>
</dl>

<p>
    Defines parallax scroll direction. If true - parallax will move in parallel with scrollbar.
</p>

<h5>layerSpeed</h5>
<dl class="inline-term">
    <dt>Type</dt>
    <dd>Number</dd>
</dl>
<dl class="inline-term">
    <dt>Value</dt>
    <dd>0 ~ 2</dd>
</dl>

<p>
    Defines the speed of parallax. When speed 1 - we get an emulation of css background-attachment: fixed
</p>

<h5>layerDuration</h5>
<dl class="inline-term">
    <dt>Type</dt>
    <dd>Number</dd>
</dl>
<dl class="inline-term">
    <dt>Defaults</dt>
    <dd>200</dd>
</dl>

<p>
    Defines the duration of parallax movement animation (Only for devices)
</p>

<h5>layerEasing</h5>
<dl class="inline-term">
    <dt>Type</dt>
    <dd>String</dd>
</dl>
<dl class="inline-term">
    <dt>Default</dt>
    <dd>linear</dd>
</dl>

<p>
    Defines the timing function of parallax movement animation (Only for devices)
</p>


<h3>
    Layer Settings
</h3>

<p>
    Script supports a data API for customization of each layer in HTML
</p>

<h5>data-type</h5>
<dl class="inline-term">
    <dt>Type</dt>
    <dd>String</dd>
</dl>
<dl class="inline-term">
    <dt>Value</dt>
    <dd>media, html</dd>
</dl>

<p>
    Defines the layer type. If type is media - the size of layer will be calculated by parallax section height, if HTML - by its content.
</p>

<h5>data-url</h5>
<dl class="inline-term">
    <dt>Type</dt>
    <dd>String</dd>
</dl>

<p>
    Defines the url of image to show as layer background
</p>

<h5>data-speed</h5>
<dl class="inline-term">
    <dt>Type</dt>
    <dd>Number</dd>
</dl>
<dl class="inline-term">
    <dt>Value</dt>
    <dd>0 ~ 2</dd>
</dl>

<p>
    Defines the speed of parallax. When speed 1 - we get an emulation of css background-attachment: fixed
</p>

<h5>data-fade</h5>
<dl class="inline-term">
    <dt>Type</dt>
    <dd>Boolean</dd>
</dl>
<dl class="inline-term">
    <dt>Value</dt>
    <dd>true, false</dd>
</dl>

<p>
    If true, creates a fade in and fade out effect for layer while scrolling
</p>

<h5>data-blur</h5>
<dl class="inline-term">
    <dt>Type</dt>
    <dd>Boolean</dd>
</dl>
<dl class="inline-term">
    <dt>Value</dt>
    <dd>true, false</dd>
</dl>

<p>
    Enables blur effect for layer if image size is too small for quality display
</p>

<h5>data-direction</h5>
<dl class="inline-term">
    <dt>Type</dt>
    <dd>String</dd>
</dl>
<dl class="inline-term">
    <dt>Value</dt>
    <dd>inverse, normal</dd>
</dl>

<p>
    Defines parallax scroll direction. If true - parallax will move in parallel with scrollbar.
</p>

