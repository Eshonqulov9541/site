const existingFiles = new Map([
    ['1912-4267-e274-5bd4-4e78-2947-8428', '6242'],
    ['7667-2668-7f55-04a2-71f1-8348-6370', '7892'],
    ['8585-8767-8780-3a3f-7cf0-3537-5953', '0770'],
]);

function checkInput(lang, errorStr) {
    const input = document.getElementById('file-guid');
    const helpBlock = document.querySelector('.help-block');
    const value = input.value.trim();
    const regex = /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/;

    if (regex.test(value)) {
        helpBlock.textContent = '';

        if (existingFiles.has(value)) {
            window.location.href = `${lang}/file/download.html?guid=${value}`;
        } else {
            window.location.href = `${lang}/site/error.html`;
        }

    } else {
        helpBlock.textContent = errorStr;
    }
}

function downloadChangeLanguage(lang) {
    const urlParams = new URLSearchParams(window.location.search);
    const guid = urlParams.get('guid')
    window.location.href = `../../${lang}/file/download.html?guid=${guid}`;
}

function handlePinCode(input) {
    input.value = input.value.replace(/\D/g, '');
}

function checkPinCodeInput() {
    const input = document.getElementById('repopinmodel-pin_code');
    const helpBlock = document.querySelector('.help-block');
    const pincodeError = document.getElementById('pincode-error')

    const value = input.value.trim();

    const urlParams = new URLSearchParams(window.location.search);
    const guid = urlParams.get('guid');

    if (value.length === 0) {
        pincodeError.classList.add('has-error');
        helpBlock.textContent = 'Необходимо заполнить «ПИН код».';
        return;
    }

    if (value.length < 4) {
        pincodeError.classList.add('has-error');
        helpBlock.textContent = 'Неправильный ПИН код';
        return;
    }

    if (existingFiles.get(guid) !== value) {
        pincodeError.classList.add('has-error');
        helpBlock.textContent = 'Неправильный ПИН код';
        return;
    }

    helpBlock.textContent = '';
    pincodeError.classList.remove('has-error');


    const link = document.createElement('a');
    link.href = `../../files/${guid}.pdf`;
    link.target = '_blank'

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
