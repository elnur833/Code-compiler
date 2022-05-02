//general variables

const html = document.getElementById("html");
const css = document.getElementById("css");
const js = document.getElementById("js");
const savebtn = document.getElementById('save');
const select = document.getElementById('select');
const runBtn = document.getElementById('runCode');
const minimize = document.getElementById('minimize');
const codeOutput = document.getElementById('code');

// code compile

function compile() {
    const code = document.getElementById("code").contentWindow.document;
    code.open();
    code.writeln(html.value + "<style>" + css.value + "</style>" + "<script>" + js.value + "</script>");
    code.close();
};

runBtn.addEventListener('click', compile);





//add to storage

function save() {
    const codeTitle = document.getElementById('code-title');
    let codeTitleVal = codeTitle.value;


    if (codeTitleVal !== 0 && codeTitleVal !== "") {
        var addedCode = {
            "name": codeTitleVal,
            "html": html.value,
            "js": js.value,
            "css": css.value
        }

        var cartData = {
            "codes": []
        };

        let data = JSON.parse(localStorage.getItem('codes'));
        console.log();

        if (data) {
            cartData = data;
        }
        cartData["codes"].push(addedCode)
        localStorage.setItem('codes', JSON.stringify(cartData));
        $('#exampleModal').modal('hide');
        select.innerHTML = "<option value='0'>History</option>"
        data['codes'].forEach(element => {
            let opt = document.createElement('option');

            opt.value = element.name;
            opt.innerHTML = element.name;
            select.appendChild(opt);

        });
    } else {

    }

}


// get options at onload

const storageDatas = JSON.parse(localStorage.getItem('codes'));
if (storageDatas) {
    window.onload = (event) => {
        storageDatas['codes'].forEach(element => {
            let opt = document.createElement('option');
            opt.value = element.name;
            opt.innerHTML = element.name;
            select.appendChild(opt);
        });
    };
}


savebtn.addEventListener('click', save);

// get codes from storage

function changeSelect() {
    if (storageDatas) {

        var addedItem = storageDatas['codes'].find(elem => elem.name === select.value);
        if (addedItem) {
            html.value = addedItem.html;
            css.value = addedItem.css;
            js.value = addedItem.js;
            compile()
        }
    };
}

select.addEventListener('change', changeSelect);






var elem = document.getElementById("coding-section");
function slide() {
    elem.classList.toggle('hide');
    codeOutput.classList.toggle('wide');
    if (minimize.textContent === "Minimize") {
        minimize.textContent = "Show Inputs";
    } else {
        minimize.textContent = "Minimize"
    }
}

minimize.addEventListener('click', slide)