const registerSw = (url, scope = './') => {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register(url, {
            scope
        })
        .then(registration => {
            console.log('Registration ok')
        })
        .catch(error => console.log('Registration KO'))
    }
}

registerSw('./sw.js')