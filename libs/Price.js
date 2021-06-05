throw new Error('Obsolete / Removed');

class Price
{
    constructor({unit, amount, unitPrice, total}){
        this.unit = unit ?? "un";
        this.amount = amount ?? 1;
        this.unitPrice = unitPrice ?? 0;
        this.total = total ?? 0;

        if (amount !== undefined)
        {
            if (total !== undefined){
                this.unitPrice = total / amount;
            } else
            if (unitPrice !== undefined){
                this.total = unitPrice * amount;
            }
        }
    }

    setAmount(value){
        this.amount = value;
        this.total = this.amount * this.unitPrice;
    }

    setUnitPrice(value){
        this.unitPrice = value |0;
        this.total = this.unitPrice * amount;
    }

    setTotalPrice(value){
        this.total = Number(Value) |0;
        this.unitPrice = this.total / this.amount;
    }

    getLastPriceString(){
        let amount = this.amount;
        let unit = this.unit.toLowerCase();

        if (amount === 1 && unit === "un")
            return `${this.unitPrice} cada`;
        else
            return `${this.unitPrice}/${unit}`;
    }

    toJSON(){
        let amount = this.amount;
        let unit = this.unit.toLowerCase();
        let total = this.total;

        if (amount === 1 && unit === 'un')
        {
            return { [unit] : total };
        }
        if (amount != 1)
        {
            return {
                [unit] : total,
                amount,
            }
        }
        return {unit, amount, total};
    }

    static fromJSON(json){
        const validUnits = ['un', 'cx', 'rolo', 'kg', 'g', 'l'];
        let unit;
        for(unit of validUnits){
            if(json[unit] !== undefined)
            {
                if (json.amount !== undefined){
                    return new Price({
                        unit: json[unit],
                        amount: json.amount,
                        total: json.total
                    });
                } else {
                    return new Price({
                        unit: json[unit],
                        total: json.total
                    });
                }
            }
        }
    }
}