/* HOME PAGE */
// const card = document.querySelector('.templateCard');
// let template = Array.from(card.children);
// template.forEach(items => {
//     const flexVal = parseFloat(getComputedStyle(items).flex);

//     if(!isNaN(flexVal)){
//         items.style.maxHeight = (flexVal * 100) + '%';
//     }
// })
let cards = document.querySelectorAll('.templateCard');
Array.from(cards)
.filter(exc => exc !== document.getElementById('c4CNT'))
.forEach(items => {
    Array.from(items.children).forEach(child => {
        const flexVal = parseFloat(getComputedStyle(child).flex);

        if(!isNaN(flexVal)){
            child.style.maxHeight = (flexVal * 100) + '%';
        }
        // console.log(flexVal);
    })
});
// let template = Array
// .from(card.children)
// .filter(item => item.id !== document.getElementById('c4CNT'))


