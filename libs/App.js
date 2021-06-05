let today = new Date();

var CreateApp = status => new Vue({
    el: '#app',
    
    data: {
        load: { status },
        sidemenu: data_init_sidemenu,
        calendar: data_init_calendar,
        price: data_init_price,
        list: data_init_list,
    },

    computed: {
        displayAppTitle,
    },

    methods: {
        sidemenu_start,
        sidemenu_calculator,

        list_load,
        list_clear,
        list_update,
        list_define_price,
        list_scroll,

        calendar_show,
        calendar_update,
        calendar_pick,
        calendar_hide,

        price_show,
        price_update,
        price_history_add,
        price_history_clear,
        price_submit,
        price_hide,
    }
});

function displayAppTitle(){
    let title = [];
    if (this.price.visible) title.push(this.price.title);
    if (this.calendar.visible) title.push(this.calendar.title);
    if (title.length === 0) title.push("Lista de Compras");
    return title.join(", ");
}