function CreateListItem(name){
    return {
        name,
        done: false,
        amount: 1,
        sale: false,
        price: undefined,
        emoji: null,
        last: DatabaseHistory.get(name),
    };
}

let data_init_list = {
    items: [],
};

function list_clear(){
    if (confirm("Apagar a lista atual?"))
    {
        let editor = document.getElementById('editor');
        editor.value = '';
        this.list.items = [];
        saveEditorContent();
    }
}

function list_update(){
    let editor = document.getElementById('editor');
    let lines = editor.value.split(/\r\n?|\n/);
    lines = lines.map(l => l.trim());
    let items = this.list.items;
    if (lines.length === 1 && lines[0].trim() === '')
        lines.pop();
    
    while (items.length > lines.length)
        items.pop();
    while (items.length < lines.length)
        items.push(CreateListItem(lines[items.length]));

    let i;
    for(i = 0; i < items.length; i++)
    {
        if (items[i].name.trim().toLowerCase() === lines[i].toLowerCase())
            continue;
        items[i].name = lines[i];
        items[i].last = DatabaseHistory.get(lines[i]);
        items[i].emoji = DatabaseEmoji.get(lines[i]);
    }

    saveEditorContent();
}

async function list_define_price(name){
    let item = this.list.items.find(item => item.name === name);
    let price = item.price;
    if (!price && item.last)
        price = JSON.parse(JSON.stringify(item.last.price));
    if (! price)
        price = {u:'un','price':0};

    let adjusted = await this.price_show({
        unit: ''+price.u,
        price: +price.v,
        amount: 0|item.amount,
        sale: !!item.sale,
    }, item.name);
    if (adjusted)
    {
        item.price = {
            u: adjusted.unit,
            v: adjusted.price,
        };
        item.amount = adjusted.amount;
        item.sale = adjusted.sale;
    }

    saveEditorContent();
}

function list_scroll(){
    let editor = document.getElementById('editor');
    let editor_background = document.getElementById('editor_background');
    editor_background.scrollTop = editor.scrollTop;
}

function list_load(){
    if (window.localStorage.currentList)
    {
        this.list.items = JSON.parse(window.localStorage.currentList);
        let editor = document.getElementById('editor');
        editor.value = this.list.items.map(item => item.name).join('\n');
        this.list_update();
        console.log('Data loaded');
        clearTimeout(__saveEditorTimeout)
    }
}

var __saveEditorTimeout = undefined;
function saveEditorContent(){
    if (__saveEditorTimeout)
        clearTimeout(__saveEditorTimeout);
    __saveEditorTimeout = setTimeout(__saveEditor, 500);
}

function __saveEditor(){
    window.localStorage.currentList = JSON.stringify(app.list.items);
    console.log('Data saved');
    clearTimeout(__saveEditorTimeout);
    __saveEditorTimeout = undefined;
}