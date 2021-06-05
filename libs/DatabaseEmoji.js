var DatabaseEmoji = new class{
    constructor(){
        this.data = null;
        this.init();
    }

    get(name){
        let search = Utils.removeAccents(name.toLowerCase().replace(/[- ]|\(.*/g, ''));
        return this.data[search];
    }

    set(name, emoji){
        let validName = name.toLowerCase().replace(/[- ]|\(.*/g, '');
        this.data[validName] = emoji;
        this.save();
    }

    init(){
        if (!window.localStorage.emojis)
            this.recreate();
        this.load();
        if (this.data.__version !== __EmojiVersion)
        {
            console.log(`Updating emojis from ${this.data.__version} to ${__EmojiVersion}`);
            this.recreate();
            this.load();
        }
    }

    recreate(){
        this.data = {
            __version: __EmojiVersion,
        };
        for(var key in InitialEmojis){
            this.data[key] = InitialEmojis[key];
        }
        this.save();
    }

    load(){
        this.data = JSON.parse(window.localStorage.emojis);
    }

    save(){
        window.localStorage.emojis = JSON.stringify(this.data);
    }
}