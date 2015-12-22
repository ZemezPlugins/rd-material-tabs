<h2 class="item1">Настройки скрипта</h2>

<h5>
    Скрипт поддерживает следующие опции для настройки
</h5>

<h3>
    Общие настройки
</h3>

<p>
    Общие настройки скрипта определяются в объекте options при инициализации.
</p>

<h5>itemSelector</h5>
<dl class="inline-term">
    <dt>Тип</dt>
    <dd>String</dd>
</dl>
<dl class="inline-term">
    <dt>Значение по-умолчанию</dt>
    <dd>div</dd>
</dl>

<p>
    HTML тэг элемента в контенте
</p>

<h5>margin</h5>
<dl class="inline-term">
    <dt>Тип</dt>
    <dd>Number</dd>
</dl>
<dl class="inline-term">
    <dt>Значение по-умолчанию</dt>
    <dd>20</dd>
</dl>

<p>
    Определяет отступ справа от элемента в списке наименований вкладок
</p>

<h5>marginContent</h5>
<dl class="inline-term">
    <dt>Тип</dt>
    <dd>Number</dd>
</dl>
<dl class="inline-term">
    <dt>Значение по-умолчанию</dt>
    <dd>0</dd>
</dl>

<p>
    Определяет отступ справа от элемента в контенте
</p>

<h5>items</h5>
<dl class="inline-term">
    <dt>Тип</dt>
    <dd>Number</dd>
</dl>
<dl class="inline-term">
    <dt>Значение по-умолчанию</dt>
    <dd>3</dd>
</dl>

<p>
    Определяет количество видимых элементов в списке наименований вкладок
</p>

<h5>speed</h5>
<dl class="inline-term">
    <dt>Тип</dt>
    <dd>Number</dd>
</dl>
<dl class="inline-term">
    <dt>Значение по-умолчанию</dt>
    <dd>500</dd>
</dl>

<p>
    Время анимации доводки (после выполнения драга)
</p>

<h5>stagePadding</h5>
<dl class="inline-term">
    <dt>Тип</dt>
    <dd>Number</dd>
</dl>
<dl class="inline-term">
    <dt>Значение по-умолчанию</dt>
    <dd>0</dd>
</dl>

<p>
    Определяет внутренний отступ справа и слева для stage в списке наименований вкладок.
</p>

<h5>touchRatio</h5>
<dl class="inline-term">
    <dt>Тип</dt>
    <dd>Number</dd>
</dl>
<dl class="inline-term">
    <dt>Значение по-умолчанию</dt>
    <dd>1</dd>
</dl>

<p>
    Определяет коеффициент скорости при выполнении события драга.
</p>

<h5>responsive</h5>
<dl class="inline-term">
    <dt>Тип</dt>
    <dd>Object</dd>
</dl>

<p>
    Объект, который используется для переопределения параметров по-умолчанию для специфических разрешений.
</p>

<h5>callbacks</h5>
<dl class="inline-term">
    <dt>Тип</dt>
    <dd>Object</dd>
</dl>

<p>
    Объект, который используется для определений callback функций для определенных событий
</p>


<h3>
    События
</h3>

<h5>Drag Start</h5>
<dl class="inline-term">
    <dt>Callback</dt>
    <dd>onDragStart</dd>
</dl>

<p>
    Определяется при срабатывании события драга.
</p>

<h5>Drag End</h5>
<dl class="inline-term">
    <dt>Callback</dt>
    <dd>onDragEnd</dd>
</dl>

<p>
    Определяется при окончании события драга.
</p>


<h5>Tab Changed</h5>
<dl class="inline-term">
    <dt>Callback</dt>
    <dd>onChangeEnd</dd>
</dl>

<p>
    Определяется при смене активной вкладки.
</p>

<h5>Before initialization</h5>
<dl class="inline-term">
    <dt>Callback</dt>
    <dd>onBeforeInit</dd>
</dl>

<p>
    Определяется до выполнения скрипта и создания необходимой разметки.
</p>

<h5>After initialization</h5>
<dl class="inline-term">
    <dt>Callback</dt>
    <dd>onInit</dd>
</dl>

<p>
    Определяется после выполнения скрипта и создания необходимой разметки.
</p>

