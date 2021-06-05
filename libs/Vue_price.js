let callback_price_promise_resolve = null;

let data_init_price = {
    visible: false,
    okCancel: true,
    title: 'n/d',
    item: null,
    unit: 'un',
    amount: 1,
    total: 0,
    price: 0,
    sale: false,
    history: [],
    availableUnits: MeasureUnits.list(),
    userPromise: null,
};

const unit_list = {
    un: {name:'unidade', sep:'a'},
    duzia: {name:'dúzia', sep: 'a'},
    rolo: {name:'rolo', sep: 'o'},
    kg: {name:'Kg', sep: '/'},
    g: {name:'g', sep: '/'},
    l: {name:'L', sep: '/'},
};

function price_show(_data, title, okCancel){
    let data = _data ?? {};
    this.price.title = title ?? "Calculadora";
    this.price.unit = data.unit ?? 0;
    this.price.amount = data.amount ?? 1;
    this.price.price = data.price ?? 0;
    this.price.total = data.total ?? (this.price.price * this.price.amount);
    this.price.sale = data.sale ?? false;
    this.price.visible = true;
    this.price.history = [];
    this.price.userPromise = new Promise(resolve => callback_price_promise_resolve = resolve);
    this.price.okCancel = okCancel !== false;
    return this.price.userPromise;
}

function price_update(inputName){
    switch(inputName){
        case 'total': this.price.price = this.price.total / this.price.amount; break;
        case 'price': this.price.total = this.price.price * this.price.amount; break;
        case 'amount': this.price.total = this.price.price * this.price.amount; break;
        default: console.error('In price_update, select either "total", "price", or "amount". Value given: '+inputName); break;
    }
}

function price_history_add(){
    this.price.history.unshift({
        unit: ''+this.price.unit,
        amount: this.price.amount|0,
        total: +this.price.total,
        price: +this.price.price,
        sale: !!this.price.sale,
    });
    this.price.history = this.price.history;
}

function price_history_clear(){
    this.price.history = [];
}

function price_submit(){
    this.price.userPromise = null;
    callback_price_promise_resolve({
        unit:""+this.price.unit,
        amount:this.price.amount|0,
        total:+this.price.total,
        price:+this.price.price,
        sale:!!this.price.sale,
    });
    this.price_hide();
}

function price_hide(){
    if (this.price.userPromise)
    {
        this.price.userPromise = null;
        callback_price_promise_resolve(undefined);
    }
    this.price.visible = false;
}