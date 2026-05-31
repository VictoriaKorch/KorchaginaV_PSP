(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor(e,t){this.parent=e,this.onHomeClick=t}getHTML(){return`
            <header class="metparam-header" style="
                background: #f8f9fa;
                padding: 16px 20px;
                border-bottom: 1px solid #e0e0e0;
                position: sticky;
                top: 0;
                z-index: 100;
            ">
                <div class="container" style="max-width: 1200px; margin: 0 auto;">
                    <button id="metparam-home-button" style="
                        background: none;
                        color: #000000;
                        border: none;
                        padding: 0;
                        cursor: pointer;
                        font-size: 1.8rem;
                        font-weight: 500;
                        font-family: inherit;
                    ">
                        Метеопараметры
                    </button>
                </div>
            </header>
        `}addListeners(){let e=document.getElementById(`metparam-home-button`);e&&this.onHomeClick&&e.addEventListener(`click`,this.onHomeClick)}render(){this.parent.insertAdjacentHTML(`afterbegin`,this.getHTML()),this.addListeners()}},t=new class{async get(e){try{let t=await fetch(e);if(!t.ok)throw Error(`HTTP error! status: ${t.status}`);return{data:await t.json(),status:t.status}}catch(e){return console.error(`GET request failed:`,e),{data:null,status:500,error:e.message}}}async post(e,t){try{let n=await fetch(e,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)}),r=null;try{r=await n.json()}catch{}return{data:r,status:n.status}}catch(e){return console.error(`POST request failed:`,e),{data:null,status:500,error:e.message}}}async patch(e,t){try{let n=await fetch(e,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)}),r=null;try{r=await n.json()}catch{}return{data:r,status:n.status}}catch(e){return console.error(`PATCH request failed:`,e),{data:null,status:500,error:e.message}}}async delete(e){try{return{data:null,status:(await fetch(e,{method:`DELETE`})).status}}catch(e){return console.error(`DELETE request failed:`,e),{data:null,status:500,error:e.message}}}},n=new class{constructor(){this.baseUrl=``}getMetParams(){return`/api/metparams`}getMetParamById(e){return`/api/metparams/${e}`}createMetParam(){return`/api/metparams`}updateMetParamById(e){return`/api/metparams/${e}`}deleteMetParamById(e){return`/api/metparams/${e}`}},r=class{constructor(e,t){this.parent=e,this.id=parseInt(t),this.data=null}getHTML(){return`
            <div id="day-page" class="day-page">
                <div class="container" style="max-width: 600px;">
                    <div id="day-content">
                        <div class="text-center py-5">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Загрузка...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `}getIcon(e){return{Температура:`🌡️`,Давление:`🎈`,Влажность:`💧`,Ветер:`💨`,"УФ излучение":`☀️`}[e]||`📊`}getDetailsHTML(e){let t=[];if(e.additionalData)for(let[n,r]of Object.entries(e.additionalData)){let i=n;n===`feelsLike`&&(i=`Ощущается как`),n===`min`&&(i=`Минимум`),n===`max`&&(i=`Максимум`),n===`tendency`&&(i=`Тенденция`),n===`normal`&&(i=`Норма`),n===`dewPoint`&&(i=`Точка росы`),n===`comfort`&&(i=`Комфорт`),n===`direction`&&(i=`Направление`),n===`gusts`&&(i=`Порывы`),n===`level`&&(i=`Уровень`),n===`protection`&&(i=`Защита`);let a=r;(n===`feelsLike`||n===`min`||n===`max`||n===`dewPoint`)&&(a=`${r} ${e.unit}`),n===`gusts`&&(a=`${r} ${e.unit}`),t.push({label:i,value:a})}return t}renderContent(e){this.data=e;let t=document.getElementById(`day-content`),n=this.getDetailsHTML(e);t.innerHTML=`
            <div class="day-card">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <h2 class="day-title" style="color: #333">${e.name}</h2>
                </div>
                <div class="text-center mb-4">
                    <div class="day-icon">${this.getIcon(e.name)}</div>
                    <div class="day-temp">${e.value} ${e.unit}</div>
                    <div class="day-feels">${e.description}</div>
                </div>
                ${n.length>0?`
                <div class="row g-3">
                    ${n.map(e=>`
                        <div class="col-6">
                            <div class="day-detail-item">
                                <div class="day-detail-label">${e.label}</div>
                                <div class="day-detail-value">${e.value}</div>
                            </div>
                        </div>
                    `).join(``)}
                </div>
                `:``}
            </div>
        `}goToMainPage(){new c(this.parent).render()}render(){this.parent.innerHTML=``,new e(this.parent,this.goToMainPage.bind(this)).render(),this.parent.insertAdjacentHTML(`beforeend`,this.getHTML()),(async()=>{let{data:e,status:r}=await t.get(n.getMetParamById(this.id));r===200&&e?this.renderContent(e):document.getElementById(`day-content`).innerHTML=`
                    <div class="alert alert-danger">
                        Ошибка загрузки данных. Метеопараметр не найден.
                    </div>
                `})()}},i=class{constructor(e,t=null){this.parent=e,this.id=t?parseInt(t):null,this.metParam=null}getHTML(){return`
            <div id="form-page" class="day-page">
                <div class="container" style="max-width: 600px;">
                    <div class="day-card">
                        <h2 class="day-title text-center mb-4">${this.id?`Редактирование метеопараметра`:`Создание метеопараметра`}</h2>
                        <div id="form-content">
                            <div class="text-center py-5">
                                <div class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Загрузка...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `}getFormHTML(e={}){let t=[`Температура`,`Давление`,`Влажность`,`Ветер`,`УФ излучение`],n={Температура:`°C`,Давление:`мм.рт.ст`,Влажность:`%`,Ветер:`м/с`,"УФ излучение":`УФИ`},r=e.name||`Температура`,i=e.unit||n[r];return`
            <form id="metparam-form">
                <div class="mb-3">
                    <label for="name" class="form-label">Название параметра</label>
                    <select class="form-select" id="name" name="name" required>
                        ${t.map(e=>`<option value="${e}" ${e===r?`selected`:``}>${e}</option>`).join(``)}
                    </select>
                </div>

                <div class="mb-3">
                    <label for="value" class="form-label">Значение</label>
                    <input type="number" step="0.1" class="form-control" id="value" name="value" 
                           value="${e.value===void 0?``:e.value}" required>
                </div>

                <div class="mb-3">
                    <label for="unit" class="form-label">Единица измерения</label>
                    <input type="text" class="form-control" id="unit" name="unit" 
                           value="${i}" readonly>
                </div>

                <div class="mb-3">
                    <label for="description" class="form-label">Описание</label>
                    <input type="text" class="form-control" id="description" name="description" 
                           value="${e.description||``}" required>
                </div>

                <div class="d-flex gap-2 justify-content-center mt-4">
                    <button type="submit" class="btn btn-primary" style="min-width: 120px;">
                        ${this.id?`Сохранить`:`Создать`}
                    </button>
                    <button type="button" class="btn btn-secondary" id="cancel-btn" style="min-width: 120px;">
                        Отмена
                    </button>
                </div>
            </form>
        `}bindNameChange(){let e=document.getElementById(`name`),t=document.getElementById(`unit`),n={Температура:`°C`,Давление:`мм.рт.ст`,Влажность:`%`,Ветер:`м/с`,"УФ излучение":`УФИ`};e.addEventListener(`change`,e=>{t.value=n[e.target.value]||``})}bindFormSubmit(){document.getElementById(`metparam-form`).addEventListener(`submit`,async e=>{e.preventDefault();let r={name:document.getElementById(`name`).value,value:parseFloat(document.getElementById(`value`).value),unit:document.getElementById(`unit`).value,description:document.getElementById(`description`).value,additionalData:this.metParam?.additionalData||{}};if(this.id){let{status:e}=await t.patch(n.updateMetParamById(this.id),r);e===200?this.goToMainPage():console.error(`Ошибка при обновлении`)}else{let{status:e}=await t.post(n.createMetParam(),r);e===201?this.goToMainPage():console.error(`Ошибка при создании`)}})}loadData(){if(this.id)(async()=>{let{data:e,status:r}=await t.get(n.getMetParamById(this.id)),i=document.getElementById(`form-content`);r===200&&e?(this.metParam=e,i.innerHTML=this.getFormHTML(e),this.bindNameChange(),this.bindFormSubmit(),this.bindCancel()):i.innerHTML=`
                        <div class="alert alert-danger">
                            Ошибка загрузки данных. Метеопараметр не найден.
                        </div>
                    `})();else{let e=document.getElementById(`form-content`);e.innerHTML=this.getFormHTML(),this.bindNameChange(),this.bindFormSubmit(),this.bindCancel()}}bindCancel(){document.getElementById(`cancel-btn`).addEventListener(`click`,()=>{this.goToMainPage()})}goToMainPage(){new c(this.parent).render()}render(){this.parent.innerHTML=``,new e(this.parent,this.goToMainPage.bind(this)).render(),this.parent.insertAdjacentHTML(`beforeend`,this.getHTML()),this.loadData()}},a=class{constructor(e){this.parent=e}getHTML(e){return`
            <div class="weather-card shadow-sm" data-id="${e.id}">
                <div class="card-body text-center">
                    <div class="card-padding-top"></div>
                    <h5 class="weekday-day">${e.name}</h5>
                    
                    <div class="weather-icon-wrapper">
                        <div class="weather-icon">${this.getIcon(e.name)}</div>
                    </div>
                    
                    <div class="weather-value">${e.value} ${e.unit}</div>
                    
                    <div class="weather-feels">${e.description||``}</div>
                    
                    <div class="d-flex gap-2 justify-content-center">
                        <button class="btn btn-detail" data-id="${e.id}">
                            Подробнее
                        </button>
                        <button class="btn btn-edit" data-id="${e.id}">
                            ✏️
                        </button>
                        <button class="btn btn-delete" data-id="${e.id}">
                            🗑️
                        </button>
                    </div>
                    <div class="card-padding-bottom"></div>
                </div>
            </div>
        `}getIcon(e){return{Температура:`🌡️`,Давление:`🎈`,Влажность:`💧`,Ветер:`💨`,"УФ излучение":`☀️`}[e]||`📊`}addListeners(e,t,n,r){setTimeout(()=>{let i=document.querySelector(`.btn-detail[data-id="${e.id}"]`);i&&i.addEventListener(`click`,t);let a=document.querySelector(`.btn-edit[data-id="${e.id}"]`);a&&r&&a.addEventListener(`click`,t=>{t.stopPropagation(),r(e.id)});let o=document.querySelector(`.btn-delete[data-id="${e.id}"]`);o&&n&&o.addEventListener(`click`,t=>{t.stopPropagation(),n(e.id)})},0)}render(e,t,n,r){let i=this.getHTML(e);this.parent.insertAdjacentHTML(`beforeend`,i),this.addListeners(e,t,n,r)}},o=class{constructor(e){this.parent=e,this.grid=null,this.cards=[]}getHTML(){return`
            <div class="metparam-grid-container">
                <div class="metparam-grid" id="metparam-grid"></div>
            </div>
        `}render(){this.parent.insertAdjacentHTML(`beforeend`,this.getHTML()),this.grid=document.getElementById(`metparam-grid`)}setCards(e,t,n,r){this.grid.innerHTML=``,this.cards=[],e.forEach(e=>{new a(this.grid).render(e,t,n,r);let i=this.grid.lastElementChild;this.cards.push({element:i,id:e.id})})}},s=class{constructor(e){this.parent=e,this.onFilter=null,this.searchInput=null}getHTML(){return`
            <div class="search-filter mb-3">
                <div class="row g-2 justify-content-center">
                    <div class="col-auto">
                        <input type="text" id="filter-search" class="form-control" placeholder="Поиск по названию" style="width: 250px;">
                    </div>
                    <div class="col-auto">
                        <button id="filter-apply" class="btn btn-secondary">Применить</button>
                    </div>
                    <div class="col-auto">
                        <button id="filter-reset" class="btn btn-secondary">Сбросить</button>
                    </div>
                </div>
            </div>
        `}setValue(e){this.searchInput.value=e===null?``:e}render(e){this.onFilter=e,this.parent.insertAdjacentHTML(`beforeend`,this.getHTML()),this.searchInput=document.getElementById(`filter-search`);let t=document.getElementById(`filter-apply`),n=document.getElementById(`filter-reset`);t.addEventListener(`click`,()=>{let e=this.searchInput.value;window.searchFilterState={searchText:e},this.onFilter&&this.onFilter(e)}),n.addEventListener(`click`,()=>{this.searchInput.value=``,window.searchFilterState={searchText:``},this.onFilter&&this.onFilter(``)})}},c=class{constructor(e){this.parent=e,this.grid=null,this.filterComponent=null,this.currentData=[]}goToMainPage(){this.render()}clickCard(e){let t=e.target.closest(`.weather-card`)?.dataset.id;t&&new r(this.parent,t).render()}deleteCard(e){(async()=>{let{status:r}=await t.delete(n.deleteMetParamById(e));r===204?this.loadData():console.error(`Ошибка при удалении`)})()}editCard(e){new i(this.parent,e).render()}addCard(){new i(this.parent,null).render()}applyFilter(e){window.searchFilterState={searchText:e},this.loadData(e)}loadData(e=``){let r=n.getMetParams();e&&(r+=`?name=${encodeURIComponent(e)}`),(async()=>{let{data:e,status:n}=await t.get(r);n===200?(this.currentData=e,this.updateGrid()):console.error(`Ошибка загрузки данных`)})()}updateGrid(){this.grid&&this.grid.setCards(this.currentData,this.clickCard.bind(this),this.deleteCard.bind(this),this.editCard.bind(this))}render(){this.parent.innerHTML=``,new e(this.parent,this.goToMainPage.bind(this)).render();let t=document.createElement(`div`);t.className=`min-vh-100`,t.style.background=`#f8f9fa`,t.style.padding=`40px 20px`,t.innerHTML=`
            <div class="container" style="max-width: 1200px;">
                <div id="filter-container"></div>
                <div class="text-center mb-4">
                    <button id="add-btn" class="btn btn-add">+ Добавить параметр</button>
                </div>
                <div id="grid-container"></div>
            </div>
        `,this.parent.appendChild(t);let n=document.getElementById(`filter-container`);this.filterComponent=new s(n),this.filterComponent.render(this.applyFilter.bind(this));let r=document.getElementById(`grid-container`);if(this.grid=new o(r),this.grid.render(),window.searchFilterState){let{searchText:e}=window.searchFilterState;this.filterComponent.setValue(e),this.loadData(e)}else this.loadData();document.getElementById(`add-btn`).onclick=this.addCard.bind(this)}};new c(document.getElementById(`root`)).render();