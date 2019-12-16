var myDuyuruModal;

class DuyuruModal {
    constructor(bind) {
        this.veriUrl = 'http://localhost:3600/json';
        this.donusUrl = 'http://localhost:3600/dondurduk';
        this.index = 0;
        this.bind = bind;
        this.dondurulecek = [];
        this.check(this.veriUrl, this.donusUrl);
        this.oncekiStyle = this.index > 0 ? `visibility: visible` : `visibility:hidden`;
        this.template;
        return this;
    }

    createElement(par) {
        const vElem = Object.create(null);      
        console.log(par);
        par.forEach(elem => {
            Object.assign(vElem, { tagName: elem.tagName });
            if(elem.attrs) Object.assign(vElem, { attr: elem.attrs });
            if(elem.children) Object.assign(vElem, { children: elem.children });
        });
        return vElem;
    }

    renderPage() {
        let page = document.querySelector('.modal_ic');
        this.template.forEach(elem => {
            page.appendChild(this.render(elem));
        });
        return page;
    }

    render(elem) {
        let $el;
        if(elem.tagName!='textNode') {
            $el = document.createElement(elem.tagName);

            if(elem.attrs) {
                for (const [key, value] of Object.entries(elem.attrs)) {
                    $el.setAttribute(key, value);            
                }
            }

            if(elem.children) {
                for (const child of elem.children) {
                    $el.appendChild(this.render(child));
                }
            }

            if(elem.events) {
/*
                document.addEventListener('onclick', (e) => {
                    console.log(e);
                    
                }, true);/**/
                for (const [key, value] of Object.entries(elem.events)) {
                    document.addEventListener(key, eval(value), true);                    
                }
            }
        } else {
            $el = document.createTextNode(elem.value);
        }
        return $el;
/*
        let res = par.map(elem => {
            let element = document.createElement(elem.tagName);
            if(elem.attrs) {
                Object.keys(elem.attrs).map(attrKey => {
                    element.setAttribute(attrKey, elem.attrs[attrKey]);
                });
            }
            if(elem.children) {
                element.appendChild(this.render(elem.children));
            }
            return element;
        });*/
    }
    
    sonraki() {
        this.index++;
        this.render();
    }

    onceki () {
        this.index--;
        this.renderPage();
    }
/*
    dondure_ekle(par) {
        let index = this.dondurulecek.findIndex(x => x == par);
        if(index == -1) {
            this.dondurulecek.push(par);
        } else {
            this.dondurulecek.splice(index, 1);
        }
        console.log(this.dondurulecek);
        
    }
*/
    kapat() {
        fetch(this.closeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                kapatilan: this.dondurulecek
            })
        }).then(r => r.json())
        .then(res => {            
            document.querySelector(this.bind).innerHTML = '';
        });
    }
/*
    createTemplate(data) {   
        
        let temp = `
        <div id="modal" class="modal-main">
            <div class="onceki" onclick='myDuyuruModal.onceki()'`;
        temp +=  (this.index > 0) ? ` style='visibility: visible'` : `style='visibility:hidden'`;
        temp += `>
                <i class="fas fa-arrow-circle-left"></i>
            </div>`;
            temp += `
            <div class="modal">
                <div class="modal-header">
                    <span class="modal-title">${data.title}</span>
                    <i class='fas fa-close-circle'></i>    
                </div>
                <div class="modal-body">
                    ${data.content}
                </div>
                <div class="modal-footer">
                    <span><input class='gosterme' `;
                    if(this.dondurulecek.findIndex(x => x == data.uid) != -1) temp += 'checked'
                    temp += ` onchange='myDuyuruModal.dondure_ekle(${data.uid})' data_index='${this.index}' uid='${data.uid}' type='checkbox'> Bu duyuruyu bir daha gösterme!</span>
                    <button id='kapat_buton' onclick='myDuyuruModal.kapat()'> Kapat </button>
                </div>
            </div>
            <div class="sonraki" onclick='myDuyuruModal.sonraki()'`;
            temp +=  (this.index<this.data.length-1) ? ` style='visibility: visible'` : `style='visibility:hidden'`;
            temp +=`>
                <i class="fas fa-arrow-circle-right"></i>
            </div>`;
            temp += `
        </div>`;
        return temp;
    }

    static create(bind) {
        myDuyuruModal = new DuyuruModal(bind);
        return myDuyuruModal;
    }*/

    check(url, closeUrl) {
        this.closeUrl = closeUrl;
        fetch(url, {
            method: 'GET'
        }).then(r => r.json())
        .then(res => {
            if(res.length > 0){
                this.data = res;
                this.template = [{
                    tagName: 'div',
                    attrs: {
                        class: 'modal-main',
                    },
                    children: [{
                        tagName: 'div',
                        attrs: {
                            class: 'onceki',
                            style: this.oncekiStyle
                        },
                        /*events: {
                            onclick: 'onceki'
                        },*/
                        children: [{
                            tagName: 'i',
                            attrs: {
                                class: 'fas fa-arrow-circle-left'
                            }
                        }]
                    }, {
                        tagName: 'div',
                        attrs: {
                            class: 'modal'
                        },
                        children: [{
                            tagName: 'div',
                            attrs: {
                                class: 'modal-header'
                            },
                            children: [{
                                tagName: 'span',
                                attrs: {
                                    class: 'modal-title'
                                },
                                children: [{
                                    tagName: 'textNode',
                                    value: this.data[this.index].title
                                }]
                            }, {
                                tagName: 'i',
                                attrs: {
                                    class: 'fas fa-close-circle'
                                }
                            }]
                        }, {
                            tagName: 'div',
                            attrs: {
                                class: 'modal-body'
                            },
                            children: [{
                                tagName: 'textNode',
                                value: this.data[this.index].content
                            }]
                        }, {
                            tagName: 'div',
                            attrs: {
                                class: 'modal-footer'
                            },
                            children: [{
                                tagName: 'span',
                                children: [{
                                    tagName: 'input',
                                    attrs: {
                                        class: 'gosterme',
                                        data_index: this.index,
                                        type: 'checkbox'
                                    },
                                    events: {
                                        onclick: `() => {
                                            console.log('deneme');
                                            
                                        }`
                                    }
                                }, {
                                    tagName: 'textNode',
                                    value: 'Bu bildirimi bir daha gösterme!'
                                }]
                            }, {
                                tagName: 'button',
                                attrs: {
                                    id: 'kapat_buton'
                                }, children: [{
                                    tagName: 'textNode',
                                    value: 'Kapat'
                                }]
                            }]
                        }]
                    },{
                        tagName: 'div',
                        attrs: {
                            class: 'sonraki'
                        },
                        /*events: {
                            onclick: 'deneme'
                        },*/
                        children: [{
                            tagName: 'i',
                            attrs: {
                                class: 'fas fa-arrow-circle-right'
                            }
                        }]
                    }]
                }];
            }
            this.renderPage();
        });
    }
    /*
    render() {
        this.mObject = this;
        document.querySelector(this.bind).innerHTML = this.createTemplate(this.data[this.index]);
    }*/
}