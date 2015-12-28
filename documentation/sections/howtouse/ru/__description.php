<h2 class="item1">Как использовать</h2>

<h5>
    Внедрение скрипта на страницу сводится к нескольким простым шагам.
</h5>

<p>
    <strong>Обратите внимание:</strong> предложенный вариант инициализации может отличаться в зависимости от продукта,
    в котором он внедряется. Информация предоставленная ниже лишь отображает принципы работы со скриптом.
</p>

<h3>
    Скачайте скрипт из Git'a
</h3>

<p>
    Для начала необходимо скачать данный скрипт из нашего публичного репозитория:
    <a href="https://github.com/TemplatemonsterPlugins/rd-material-tabs">Кликабельно</a>
</p>


<h3>
    Добавьте необходимую разметку
</h3>

<p>
    HTML разметка по умолчанию для создания табов выглядит следующим образом.
</p>

<code>
<pre>
&lt;!-- RD Material Tabs --&gt;
&lt;section class="rd-material-tabs"&gt;
    &lt;div class="rd-material-tabs__list"&gt;
        &lt;ul&gt;
            &lt;li&gt;
                &lt;a href="#"&gt; Tab 1 &lt;/a&gt;
            &lt;/li&gt;
            &lt;li&gt;
                &lt;a href="#"&gt; Tab 1 &lt;/a&gt;
            &lt;/li&gt;
            &lt;li&gt;
                &lt;a href="#"&gt; Tab 1 &lt;/a&gt;
            &lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;
    &lt;div class="rd-material-tabs__container"&gt;
        &lt;div&gt;
            ...
        &lt;/div&gt;
        &lt;div&gt;
            ...
        &lt;/div&gt;
        &lt;div&gt;
            ...
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/section&gt;
&lt;!-- END RD Material Tabs --&gt;
</pre>
</code>

<h3>
    Подключите стили
</h3>

<p>
    Подключите файл стилей rd-material-tabs.css в секции &lt;head/&gt; целевой страницы.
</p>

<code>
<pre>
&lt;link rel="stylesheet" href="path/to/css/rd-material-tabs.css"&gt;
</pre>
</code>

<h3>
    Подключите скрипт на странице
</h3>

<p>
    Вам необходимо скоппировать скрипт в папку /js вашего проекта и выполнить его подключение на странице. Для это можно
    исспользовать следующий участок кода:
</p>

<code>
<pre>
&lt;script src="js/jquery.rd-material-tabs.min.js"&gt;&lt;/script&gt;
</pre>
</code>


<h3>
    Выполните инициализацию скрипта
</h3>

<p>
    Вам необходимо выполнить инициализацию скрипта для элементов по целевому селектору, с помощью следующего участка кода
</p>

<code>
<pre>
&lt;script&gt;
  $(document).ready(function () {
    o.RDMaterialTabs({}); // Additional options
  });
&lt;/script&gt;
</pre>
</code>

