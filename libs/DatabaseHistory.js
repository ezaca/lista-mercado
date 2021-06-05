var DatabaseHistory = new class {

    constructor(){
        this.init();
    }

    get(_name){
        let name = (''+_name).replace(/\(.*/, '');
        let instance = this.data[name.trim().toLowerCase()];
        while(instance && instance.alias) instance = this.data[instance.alias];

        if (instance) return JSON.parse(JSON.stringify(instance));
        else return null;
    }

    suggestions(_name){
        let name = _name.trim().toLowerCase().replace(/\(.*/,'');
        let available = Object.getOwnPropertyNames(this.data);
        let filtered = [];
        console.log('We will suggest something like',available);
    }

    setOne(_name, value, shouldSave){
        let name = (''+_name).replace(/\(.*/, '');
        if (value.price && !value.price.u && !value.date)
            this.data[name.trim().toLowerCase()] = value;
        else
            console.error('DatabaseHistory.setOne "value" argument is not well formed', value);

        if (shouldSave)
            this.save();
    }

    setMany(items){
        for(var item of items)
            this.setOne(item.name, item.value, false);
        this.save();
    }

    init(){
        if (! window.localStorage.history)
            this.recreate();
        this.load();
    }

    load(){
        this.data = JSON.parse(window.localStorage.history);
    }

    save(){
        window.localStorage.history = JSON.stringify(this.data);
    }

    recreate(){
        let date = (month, day) => moment(`2021-${month}-${day}`, 'YYYY-MM-DD');
        this.data = {
            "leite": { price: { u:'l', v:3.15 }, date: date(6, 1) },
            "chocolatinho": { price: {u:'un', v:0.95 }, date: date(5, 25) },
            "queijo": { price: {u:'kg', v:32.90 }, date: date(5, 25) },
            "presunto": { price: {u:'kg', v:24.90 }, date: date(5, 25) },
            "bolacha": { alias:"bolacha doce" },
            "bolacha doce": { price: {u:'un', v:4.64 }, date: date(5, 21) },
            "bolacha salgada": { price: {u:'un', v:4.99 }, date: date(4, 19) },
            "refrigerante": { price: {u:'un', v:4.99 }, date: date(5, 21) },
            "suco": {alias:"refrigerante"}
        };
        this.save();
    }

};