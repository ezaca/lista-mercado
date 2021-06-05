var app = null;

var Init = new class {
    load(app, fetchArray){
        moment.locale('pt-BR');
        this.element = document.querySelector(app);
        var promises = Promise.all(fetchArray).then((...args) => this.handleAll(...args));
    }

    async handleAll(responses){
        let status = null;
        for(var response of responses){
            let currentStatus = await this.handleEach(response);
            if (status == null)
                status = currentStatus;
        }
        document.body.classList.remove('loading');
        this.app = CreateApp(status);
        app = this.app;
        app.list_load();
    }

    async handleEach(response){
        if (response.ok){
            let html = (await response.text()).replace(/^\s*<!--\s*unload\s*-->.*$/gim, m => '').trim();
            this.element.innerHTML += '\n\n' + html;
            return null;
        } else {
            return this.handleError(response);
        }
    }

    handleError(response){
        if (response.status >= 500)
            return `Houve um problema ao conectar-se com o servidor (HTTP ${response.status} ${response.statusText})`;
        switch(response.status){
            case 404: return 'Não foi possível acessar o fragmento de página (HTTP 404 Not Found).';
            default: return `Houve um problema ao carregar o fragmento de página (HTTP ${response.status} ${response.statusText})`;
        }
    }
}