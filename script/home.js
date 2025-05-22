/* HOME PAGE */
// GLOBAL VARIABEL
let templateContainer = document.getElementById('t4NC');
let hidedContainer = document.getElementById('t4HC');
let templateCard = document.querySelector('.templateCard');
let formContainerEl = document.querySelector('.formContainer');
let warnFormContainerEl = document.querySelector('.warnFormContainer');
let addBox = document.getElementById('c4CNT');
let formCclBtn = formContainerEl.querySelector('#formCclBtn');
let formRstBtn = formContainerEl.querySelector('#formRstBtn');
let formAddBtn = formContainerEl.querySelector('#formAddBtn');
const editBox = formBox = formContainerEl.querySelector('.formBox');
let cardTitleData = editBox.querySelector('#datInTitle');
let cardThemeData = editBox.querySelector('#datInTheme');
let cardDescriptionData = editBox.querySelector('#datInDescription');
let editMode = false;
let hideMode = false;
let clickedImgIndex = -1;

// Form Value Function
function cardValue(type, command){
    if(type == 'both'){
        if(command == 'reset'){
            cardTitleData.value = cardDescriptionData.value = '';
            cardThemeData.selectedIndex = 0;
        }
    }
    if(type == 'form'){
        if(command == '||'){
            return (cardTitleData.value || cardDescriptionData.value || cardThemeData.selectedIndex != 0); 
        } else if(command == '&&'){
            return (cardTitleData.value && cardDescriptionData.value);    
        }    
    }

    if(type == 'edit'){
        let LSUCCT = LSGet('userCreatedCardTemplate')[clickedImgIndex];
        let LSUHCT = LSGet('userHidedCardTemplate')[clickedImgIndex];
        if(command == '||'){
            if(hideMode){
                return (cardTitleData.value == LSUHCT.title) || (cardDescriptionData.value == LSUHCT.description) || (cardThemeData.value == LSUHCT.theme);    
            } 
            else {
                return (cardTitleData.value == LSUCCT.title) || (cardDescriptionData.value == LSUCCT.description) || (cardThemeData.value == LSUCCT.theme);
            }
        } else if(command == '&&'){
            if(hideMode){
                return (cardTitleData.value == LSUHCT.title) && (cardDescriptionData.value == LSUHCT.description && (cardThemeData.value == LSUHCT.theme));
            }
            else {
                return (cardTitleData.value == LSUCCT.title) && (cardDescriptionData.value == LSUCCT.description && (cardThemeData.value == LSUCCT.theme));
            }
        } else if(command == 'get'){
            return {title: LSUCCT.title, theme: LSUCCT.theme, description: LSUCCT.description};
        }
    }
}

//Edit Case Function
function editCase(type, text){
    if(type == 'title'){
        return text
        .split(' ')
        .map(txt => txt.charAt(0).toUpperCase() + txt.slice(1))
        .join(' ')
    } else if(type == 'paragraph'){
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
}

//Select Theme System
var colorOption = ['Charcoal Gray', 'Deep Purple', 'Wood Tones', 'Tosca'];
var colorOptionRGB = ['rgb(35, 35, 35)', 'rgb(75, 0, 130)', 'rgb(139, 69, 19)', 'rgb(0, 128, 128)'];
colorOption.forEach(color => {
    let opt = document.createElement('option');
    opt.textContent = color;
    opt.value = colorOptionRGB[colorOption.indexOf(color)];
    
    cardThemeData.appendChild(opt);
})

//Setting Cards System
let allCardContainers = [templateContainer, hidedContainer];

templateContainer.addEventListener('click', (e) => {
    const selectedEl = e.target;
    const card = selectedEl.closest('.templateCard');
    const container = Array
    .from(templateContainer.querySelectorAll('.templateCard'));
    clickedImgIndex = container.indexOf(card)
        
    if(selectedEl.tagName === 'IMG'){
        //Edit Cards System
        if(selectedEl.id === 'edit'){
            editMode = true
            
            //Edit Form Box View
            formContainerEl.style.display = 'flex';
            editBox.querySelector('#formBoxTitle').textContent = 'Sunting Kartu';
            formAddBtn.textContent = 'Sunting';
            cardTitleData.value = LSGet('userCreatedCardTemplate')[clickedImgIndex].title;
            cardThemeData.selectedIndex = colorOptionRGB.indexOf(LSGet('userCreatedCardTemplate')[clickedImgIndex].theme);
            cardDescriptionData.value = LSGet('userCreatedCardTemplate')[clickedImgIndex].description
        } else if(selectedEl.id === 'hide'){
            card.remove();
            let dataHided = LSGet('userHidedCardTemplate') || [];
            let LSCreated = LSGet('userCreatedCardTemplate') || [];
            dataHided.push(LSCreated[clickedImgIndex]);
            LSSet('userHidedCardTemplate', dataHided);

            saveUserProgress();
            loadUserProgress();
        } else if(selectedEl.id === 'bin'){
            card.remove();
            saveUserProgress();
        }
    }
})

hidedContainer.addEventListener('click', (e) => {
    const selectedEl = e.target;
    const card = selectedEl.closest('.templateCard');
    const hideContainer = [...hidedContainer.querySelectorAll('.templateCard')]
    clickedImgIndex = hideContainer.indexOf(card);
    
    if(selectedEl.tagName === 'IMG'){
        hideMode = true;
        if(selectedEl.id == 'edit'){
            editMode = true;

            //Edit Form Box View
            formContainerEl.style.display = 'flex';
            editBox.querySelector('#formBoxTitle').textContent = 'Sunting Kartu';
            cardTitleData.value = LSGet('userHidedCardTemplate')[clickedImgIndex].title;
            cardThemeData.selectedIndex = colorOptionRGB.indexOf(LSGet('userHidedCardTemplate')[clickedImgIndex].theme);
            cardDescriptionData.value = LSGet('userHidedCardTemplate')[clickedImgIndex].description;
            editBox.querySelector('#formAddBtn').textContent = 'Sunting';
        } else if(selectedEl.id == 'show'){
            LSData = LSGet('userHidedCardTemplate');
            addNewCard('created', LSData[clickedImgIndex].title, LSData[clickedImgIndex].theme, LSData[clickedImgIndex].description);
            LSData.splice(clickedImgIndex, 1);
            LSSet('userHidedCardTemplate', LSData);
            saveUserProgress();
        } else if(selectedEl.id == 'bin'){
            const dataHide = LSGet('userHidedCardTemplate');
            dataHide.splice(clickedImgIndex, 1)
            LSSet('userHidedCardTemplate', dataHide);
            loadUserProgress();
        }
    }
})

//Max-Height System
function maxHeightSys(){
    let cards = document.querySelectorAll('.templateCard');
    Array.from(cards)
    .filter(exc => exc !== document.getElementById('c4CNT'))
    .forEach(items => {
        Array.from(items.children).forEach(child => {
            const flexVal = parseFloat(getComputedStyle(child).flex);
    
            if(!isNaN(flexVal)){
                child.style.maxHeight = (flexVal * 100) + '%';
            }
        })
    });
}

// Gap System
function gapSys(){
    let cardClass = document.querySelector('.templateCard');
    let containerClass = document.querySelector('.templateContainer');
    let minGap = parseFloat(getComputedStyle(containerClass).getPropertyValue('--minGap')); 
    let wBorder = parseFloat(getComputedStyle(cardClass).  getPropertyValue('--borderWidth'))*2;
    let wBox = parseFloat(getComputedStyle(cardClass).width);
    let wCon = parseFloat(getComputedStyle(templateContainer).width);

    let wBoxTot = wBox + wBorder + minGap;
    let wConTot = wCon;
    let amtBoxPRow = Math.max(1, Math.floor(wConTot / wBoxTot));
    let rmnGap = wConTot - (wBoxTot * amtBoxPRow);
    let amtCld = templateContainer.childElementCount;

    let fnlGap = minGap + (rmnGap / (amtBoxPRow-1));
    
    for(a=0; a<amtCld; a++){
        if((a+1) % amtBoxPRow != 0){
           templateContainer.children[a].style.marginRight = `${fnlGap}px`;
           if((a+1) % amtBoxPRow == 1){
            let rmnLastGap = wCon - ((wBoxTot-minGap)*amtBoxPRow + fnlGap*(amtBoxPRow-1));
            templateContainer.children[a].style.marginLeft = `${rmnLastGap/2}px`;
           }
        }
        if((a+1) <= (amtCld-(amtCld % amtBoxPRow))){
            templateContainer.children[a].style.marginBottom = `${minGap}px`;
        }
    }
}

//Text Content ::after
function cardCountSys(){
    let createdCardCount = [...templateContainer.children]
    .filter(card => card !== document.getElementById('c4CNT'))
    .length;
    let hidedCardCount = [...hidedContainer.children].length;
    document.querySelector('#home').querySelector('.createdCardTitle').style.setProperty('--card-count', `"[${createdCardCount}]"`);
    document.querySelector('#home').querySelector('.hidedCardTitle').style.setProperty('--card-count', `"[${hidedCardCount}]"`);
}

//Form Button Function (Set in 'Up To Date')
function formBtnSys(){
    if(!cardValue('form', '||')){
        formRstBtn.classList.remove('valid');
    }
    else if(cardValue('form', '||')){
        formRstBtn.classList.add('valid');
    }

    if(!cardValue('form', '&&')){
        formAddBtn.classList.remove('valid');
    } else if(cardValue('form', '&&')){
        if(editMode && cardValue('edit', '&&')){
            formAddBtn.classList.remove('valid');
        } else {
            formAddBtn.classList.add('valid');
        }
    }
}

/* Form System */
let warnCclBtn = warnFormContainerEl.querySelector('#cancelWarn');
let warnNxtBtn = warnFormContainerEl.querySelector('#nextWarn');

formCclBtn.addEventListener('click', () => {
    if(cardValue('form', '||')){
        if(editMode && cardValue('edit', '||')){
            formContainerEl.style.display = 'none';
            editMode = false;
            hideMode = false;
            cardValue('both', 'reset');
        } else {
            warnFormContainerEl.style.display = 'flex';
        }
    } else {
        if(editMode){
            warnFormContainerEl.style.display = 'flex';
        } else {
            formContainerEl.style.display = 'none';
        }
    }
})

//Reset Value System
formRstBtn.addEventListener('click', (e) => {
    if(e.target.classList.contains('valid')){
        cardValue('both', 'reset');
    }
})

//Add Card Button System
formAddBtn.addEventListener('click', (e) => {
    if(e.target.classList.contains('valid')){
        if(editMode && !hideMode){
            const editCard = Array
            .from(templateContainer.querySelectorAll('.templateCard'))
            .filter(box => box != document.getElementById('c4CNT'))[clickedImgIndex]

            editCard.querySelector('#cardTitle').textContent = editCase('title', cardTitleData.value);
            editCard.style.backgroundColor = cardThemeData.value;
            editCard.querySelector('#cardDescription').textContent = editCase('paragraph', cardDescriptionData.value);

            saveUserProgress();
            editMode = false;
            formContainerEl.style.display = 'none';
            cardValue('both', 'reset');
        } else if(editMode && hideMode){
            const editHidedCard = [...hidedContainer.querySelectorAll('templateCard')];

            hidedCardData = LSGet('userHidedCardTemplate')
            hidedCardData.forEach((item, index) => {
                if(index === clickedImgIndex){
                    item.title = editCase('title', cardTitleData.value);
                    item.theme = cardThemeData.value;
                    item.description = editCase('paragraph', cardDescriptionData.value);
                }
            })
            LSSet('userHidedCardTemplate', hidedCardData)
            
            formContainerEl.style.display = 'none';
            loadUserProgress();
            cardValue('both', 'reset');
            editMode = false;
            hideMode = false;
            console.log(hidedCardData);
        } else {
            addNewCard('created', cardTitleData.value, cardThemeData.value, cardDescriptionData.value);
            formContainerEl.style.display = 'none';
            cardValue('both', 'reset');
            saveUserProgress();
        }
    }
})

//Warn Cancel Button System
warnCclBtn.addEventListener('click', () => {
    warnFormContainerEl.style.display = 'none';
})

//Warn Next Button System
warnNxtBtn.addEventListener('click', () => {
    warnFormContainerEl.style.display = 'none';
    formContainerEl.style.display = 'none';
    cardValue('both', 'reset');
    if(editMode){editMode = false}
})

//Create a New Card System
function addNewCard(execution, title, theme, description){
    //Create Card Box
    const cardBox = document.createElement('div');
    const settingBox = document.createElement('div');

    cardBox.classList.add('templateCard');
    cardBox.style.backgroundColor = theme;
    settingBox.classList.add('templateCardSetting');

    //Create Card Box Inline Element
    const titleBox = document.createElement('h1');
    const descriptionBox = document.createElement('h2');
    const dividerLine1 = document.createElement('div');
    const dividerLine2 = document.createElement('div');
    const editImg = document.createElement('img');
    const hideImg = document.createElement('img');
    const binImg = document.createElement('img');

    titleBox.id = 'cardTitle';
    titleBox.textContent = editCase('title', title);
    descriptionBox.id = 'cardDescription';
    descriptionBox.textContent = editCase('paragraph', description);
    dividerLine1.classList.add('divider');
    dividerLine2.classList.add('divider');
    editImg.id = 'edit';
    editImg.src = 'img/whiteEdit.png';
    hideImg.id = (execution == 'created') ? 'hide' : 'show';
    hideImg.src = (execution == 'created') ? 'img/whiteHide.png' : 'img/whiteShow.png';
    binImg.id = 'bin';
    binImg.src = 'img/whiteBin.png';

    //Initialize
    settingBox.appendChild(editImg);
    settingBox.appendChild(dividerLine1);
    settingBox.appendChild(hideImg);
    settingBox.appendChild(dividerLine2);
    settingBox.appendChild(binImg);

    cardBox.appendChild(titleBox);
    cardBox.appendChild(descriptionBox);
    cardBox.appendChild(settingBox);

    if(execution == 'created'){
        templateContainer.appendChild(cardBox);
    } else if (execution == 'hided'){
        hidedContainer.appendChild(cardBox);
    }
}

//Save User Progress
function saveUserProgress(){
    let LSCreated = LSGet('userCreatedCardTemplate') || [];

    let createdCards = Array
    .from(templateContainer.children)
    .filter(card => card != document.getElementById('c4CNT'))
    .map(card => {
        const index = Array.from(templateContainer.children).indexOf(card);
        const cardTitle = card.querySelector('#cardTitle').textContent;
        const cardTheme = getComputedStyle(card).backgroundColor;
        const cardDescription = card.querySelector('#cardDescription').textContent;
        const cardCreatedAt = LSCreated[index]?.created || Date.now();
        const cardUuid = LSCreated[index]?.uuid || crypto.randomUUID();
        
        card.dataset.id = cardUuid;

        return {title: cardTitle, theme: cardTheme, description: cardDescription, created: cardCreatedAt, uuid: cardUuid}
    })
    LSSet('userCreatedCardTemplate', createdCards);
    
    loadUserProgress();
    // console.log(dataHided);
}

//Load User Progress
function loadUserProgress(){
    templateContainer.innerHTML = '';
    hidedContainer.innerHTML = '';
    let LSCreated = LSGet('userCreatedCardTemplate') || [];
    let LSHided = LSGet('userHidedCardTemplate') || [];

    LSCreated.forEach(items => {
        addNewCard('created', items.title, items.theme, items.description)
    })

    //Created Adding Box
    const addingCardBox = document.createElement('div');
    const plusText = document.createElement('h1');
    const descriptionText = document.createElement('p');
    
    plusText.textContent = '+';
    descriptionText.textContent = 'Tambahkan Kartu Baru';
    addingCardBox.classList.add('templateCard');
    addingCardBox.id = 'c4CNT';
    
    addingCardBox.appendChild(plusText);
    addingCardBox.appendChild(descriptionText);
    templateContainer.appendChild(addingCardBox);
    
    addingCardBox.addEventListener('click', () => {
        formContainerEl.style.display = 'flex';
        formBox.querySelector('#formBoxTitle').textContent = 'Kartu Baru';
        formAddBtn.textContent = 'Tambahkan';
    })

    LSHided.forEach(items => {
        addNewCard('hided', items.title, items.theme, items.description);
    })
}

//Hided Container Class
function hidedContainerSys(){
    if(hidedContainer.innerHTML){
        hidedContainer.classList.add('templateContainer');
    } else {
        hidedContainer.classList.remove('templateContainer');
    }
}
