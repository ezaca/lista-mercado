var data_init_sidemenu = {
    visible: false,
}

function sidemenu_start(){
    this.sidemenu.visible = false;
    this.price.visible = false;
    this.calendar.visible = false;
}

function sidemenu_calculator(){
    this.sidemenu_start();
    this.price_show(this.price, "Calculadora", false);
}