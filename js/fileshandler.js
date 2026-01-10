const existingFiles = new Map([

    ['2222-1468-d106-09c3-0bd8-6084-1957', '1234'],
    ['9904-1468-d106-09c3-0bd8-6084-1957', '1111'],
    ['9904-1468-d106-09c3-0bd8-6084-9669', '9669'],
    ['1234-1468-d106-09c3-0bd8-6084-1551', '2001'],
    ['7305-8868-e144-3f46-0b82-1173-8771', '2016'],
    ['8c857cda-f35a-481b-9b7f-5567ccf4516d', '1149'],
    ['1764-1068-e5ee-fbd3-5074-6913-0991', '1137'],
    ['3703-8566-0115-3abe-5449-5802-6283', '1161'],
    ['7582-9068-e887-a4df-93f1-2705-4035', '7191'],
    ['1592-9168-C697-B4df-52f1-2895-1937', '9182'],
    ['2421-9469-12e2-abe5-17e7-9450-4742', '7570'],
    ['4559-3569-611a-0f93-3e86-1183-7513', '6720'],
    ['1209-0369-12e3-8d1f-53a4-1237-5800', '9364'],

    
    
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
