/* LOGIN PAGE */
const expiredTime = 1 * 10 * 1000;

/* FUNCTION */
function checkSession(){
    let expiredCalc = Date.now() - parseInt(LSGet('userLastActive'), 10);
    if(!LSGet('userEnteredState')){
        blackAllSection('login');
    } else if(LSGet('userLastActive')){
        if(expiredCalc < expiredTime){
            blackAllSection(LSGet('userLastSection'));
        } else {
            blackAllSection('login');
        }
    }
}

/* LOGIN SYSTEM */
//Login Trigger System
document.getElementById('loginTrigger').addEventListener('click', () => {
    loginPage.classList.add('fade-out');
    
    loginPage.addEventListener('animationend', () => {
        homePage.classList.add('fade-in');
        blackAllSection('home');
    })
    LSSet('userEnteredState', 'true');
})

//Refreshed or Reloaded Page System
window.addEventListener('beforeunload', () => {
    if(LSGet('userEnteredState') === 'true'){
        LSSet('userLastActive', Date.now());
    }
})
