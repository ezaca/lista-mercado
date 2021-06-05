var Utils = new class {

    constructor(){
        this.today = new Date();
    }

    get now() { return new Date(); }

    currencyString(value){
        let cents = Math.round(Number(value) * 100);
        let integer = (cents / 100)|0;
        let decimals = (cents - integer * 100);
        return `R$ ${integer},${decimals.toString().padStart(2,'0')}`
    }

    priceConv(price){
        if (! price)
            return null;
        let p = price;
        while(p.converter)
            p = p.converter(p.v);
        return p;
    }

    priceString(price, amount){
        let unit = MeasureUnits[price.u];
        if (amount)
            return `${this.currencyString(amount * price.v)}`;
        else
            return `${this.currencyString(price.v)}${unit.separator}${unit.display}`;
    }

    removeAccents(text){
        let i, result = ''+text;
        return result.replace(/[\s\S]/g, m => CharAccents[m] ?? m);
    }

    toast(html){
        const startTime = 1500;
        const duration = 2000;
        const fadeOutTime = 200;
        var toasts = document.getElementById('toasts');
        var toast = document.createElement('DIV');
        toast.innerHTML = html;
        toasts.appendChild(toast);
        setTimeout(div => {
            div.classList.add('fadeout');
        }, startTime + duration, toast);
        setTimeout(div => {
            div.remove();
        }, startTime + duration + fadeOutTime, toast);
    }
};

let MeasureUnits = {
    un: { id:'un', title:"Unidade", display:'unidade', separator:' a ' },
    duzia: { id:'duzia', title:"Dúzia", display:'dúzia', separator:' a ', converter: value => ({u:'un', v:value / 6}) },
    rolo: { id:'rolo', title:"Rolo", display:'rolo', separator:' o ' },
    l: { id:'l', title:"Litro", display:'litro', separator:'/' },
    kg: { id:'kg', title:"Quilos (Kg)", display:'Kg', separator:'/' },
    cg: { id:'cg', title:"Cada 100 gramas", display:'100g', separator:' cada ', converter: value => ({ u:'kg', v:value * 10 }) },
    g: { id:'g', title:"Gramas (g)", display:'g', separator:'/' },
    ml: { id:'ml', title:"Mililitros (ml)", display:'ml', separator:'/' },

    list(){
        return [this.un, this.duzia, this.rolo, this.l, this.kg, this.cg, this.g, this.ml];
    },

    random(){
        let list = this.list();
        return { u:list[Math.random()*list.length|0].id, v:(Math.random()*2500|0)/100 };
    },
}

let CharAccents = {
    'á':'a','à':'a','ã':'a','â':'a','ä':'a',
    'é':'e','è':'e','ê':'e','ë':'e',
    'í':'i','ì':'i','î':'i','ï':'i',
    'ó':'o','ò':'o','õ':'o','ô':'o','ö':'o',
    'ú':'u','ù':'u','û':'u','ü':'u',
    'ç':'c','ñ':'n',
    'Á':'A','À':'A','Ã':'A','Â':'A','Ä':'A',
    'É':'E','È':'E','Ê':'E','Ë':'E',
    'Í':'I','Ì':'I','Î':'I','Ï':'I',
    'Ó':'O','Ò':'O','Õ':'O','Ô':'O','Ö':'O',
    'Ú':'U','Ù':'U','Û':'U','Ü':'U',
    'Ç':'C','Ñ':'N',
}