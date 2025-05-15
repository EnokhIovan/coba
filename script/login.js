/* LOGIN PAGE */
    const expiredTime = 1 * 10 * 1000;

/* FUNCTION */

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
    if(LSGet('userEnteredState') === true){
        LSSet('userLastActive', Date.now());
    }
})