<h2 class="item1">Интеграция с Require.js</h2>

<h5>
    Скрипт имеет встроенную поддержку AMD экспорта для интеграции с Require.js. Весь процесс интеграции все также
    сводится к нескольким простым шагам.
</h5>

<h3>
    Скачайте скрипт из Git'a
</h3>

<p>
    Для начала необходимо скачать данный скрипт из нашего публичного репозитория:
    <a href="http://products.git.devoffice.com/coding-development/rd-multitabs.git">Кликабельно</a>
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
    Обновите конфигурацию require.js
</h3>

<p>
    Прежде всего вам нобходимо убедиться в правильности настройки конфигурации путей в require.js. Обязательно необходимо
    определить алиасы jquery и jquery.rd-material-tabs. В большинстве случаев, данная конфигурация определяется в главном скрипте
    приложения, путь к которому определяется в дата атрибуте data-main при подключении require.js
</p>

<code>
<pre>
&lt;script data-main="js/main" src="js/require.js"&gt;&lt;/script&gt;
</pre>
</code>

<p>
    Сама конфигурация должна содержать следующие алиасы для путей
</p>

<code>
<pre>
requirejs.config({
  paths: {
    "jquery": "path/to/jquery"
    "jquery.rd-material-tabs": "path/to/jquery.rd-material-tabs"
  }
});
</pre>
</code>

<h3>
    Выполните инициализацию скрипта
</h3>

<p>
    Для инициализации скрипта достаточно воспользоваться следующим кодом.
</p>

<code>
<pre>
requirejs(["jquery", "jquery.rd-material-tabs"], function($, tabs) {
  var o = $(".rd-material-tabs");
  o.RDMaterialTabs();
});
</pre>
</code>

