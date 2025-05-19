/* HOME PAGE */


// GLOBAL VARIABEL
let addBox = document.getElementById('c4CNT');
let titleData = document.getElementById('datInTitle');
let themeData = document.getElementById('datInTheme');
let descriptionData = document.getElementById('datInDescription');

// FUNCTION
function formValue(command){
    if(command == 'reset'){
        titleData.value = descriptionData.value = '';
        themeData.selectedIndex = 0;
    } else if(command == '||'){
        return (titleData.value || descriptionData.value || themeData.selectedIndex != 0);
    } else if(command == '&&'){
        return (titleData.value && descriptionData.value);
    }
}

function gapSys(){
    let tmpltContainer = document.getElementById('t4NC');
    let minGap = parseFloat(getComputedStyle(tmpltContainer).   getPropertyValue('--minGap')); 
    let wScroll = parseFloat(getComputedStyle(tmpltContainer).  getPropertyValue('--scrollbarWidth'));
    let wBorder = parseFloat(getComputedStyle(addBox).  getPropertyValue('--borderWidth'))*2;
    let wBox = parseFloat(getComputedStyle(addBox).width);
    let wCon = parseFloat(getComputedStyle(tmpltContainer).width);

    let wBoxTot = wBox + wBorder + minGap;
    let wConTot = wCon - 0;
    let amtBoxPRow = Math.max(1, Math.floor(wConTot / wBoxTot));
    let rmnGap = wConTot - (wBoxTot * amtBoxPRow);
    let amtCld = tmpltContainer.childElementCount;

    let fnlGap = minGap + (rmnGap / (amtBoxPRow-1));
    
    for(a=0; a<amtCld; a++){
        if((a+1) % amtBoxPRow != 0){
           tmpltContainer.children[a].style.marginRight = `${fnlGap}px`;
           if((a+1) % amtBoxPRow == 1){
            let rmnLastGap = wCon - ((wBoxTot-minGap)*amtBoxPRow + fnlGap*(amtBoxPRow-1));
            tmpltContainer.children[a].style.marginLeft = `${rmnLastGap/2}px`;
           }
        }
        if((a+1) <= (amtCld-(amtCld % amtBoxPRow))){
            tmpltContainer.children[a].style.marginBottom = `${minGap}px`;
        }
    }
}

function formBtnSys(){
    if(!formValue('||')){
        formRstBtn.classList.remove('valid');
    }
    else if(formValue('||')){
        formRstBtn.classList.add('valid');
    }
    if(!formValue('&&')){
        formAddBtn.classList.remove('valid');
    } else if(formValue('&&')){
        formAddBtn.classList.add('valid');
    }
}



//Max-Height System
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

//Select Theme System
var colorOption = ['Green', 'Charcoal Gray', 'Deep Purple', 'Wood Tones', 'Tosca'];
var colorOptionRGB = ['rgb(0, 128, 0)', 'rgb(35, 35, 35)', 'rgb(75, 0, 130)', 'rgb(139, 69, 19)', 'rgb(0, 128, 128)'];

colorOption.forEach(color => {
    let opt = document.createElement('option');
    opt.textContent = color;
    opt.value = colorOptionRGB[colorOption.indexOf(color)];
    
    themeData.appendChild(opt);
})

//Add Form System
let formContainerEl = document.querySelector('.formContainer');
let warnFormContainerEl = document.querySelector('.warnFormContainer');
let formCclBtn = formContainerEl.querySelector('#cancelForm');
let formRstBtn = formContainerEl.querySelector('#resetForm');
let formAddBtn = formContainerEl.querySelector('#addForm');
let warnCclBtn = warnFormContainerEl.querySelector('#cancelWarn');
let warnNxtBtn = warnFormContainerEl.querySelector('#nextWarn');

addBox.addEventListener('click', () => {
    formContainerEl.style.display = 'flex';
})
formCclBtn.addEventListener('click', () => {
    if(formValue('||')){
        warnFormContainerEl.style.display = 'flex';
    } else {
        formContainerEl.style.display = 'none';
    }
})
formRstBtn.addEventListener('click', () => {
    formValue('reset');
})
warnCclBtn.addEventListener('click', () => {
    warnFormContainerEl.style.display = 'none';
})
warnNxtBtn.addEventListener('click', () => {
    warnFormContainerEl.style.display = 'none';
    formContainerEl.style.display = 'none';
    formValue('reset');
})
