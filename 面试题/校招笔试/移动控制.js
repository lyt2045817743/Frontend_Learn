function bind() {

    document.onkeydown = event => {
        if (!event) return;
        var code = event.keyCode || '';
        if (!{'37': 1, '38': 1, '39': 1, '40': 1}[code]) return;
        event.preventDefault && event.preventDefault();
        //TODO: 请实现按键控制
        
    };
}