// Eventos automáticos
document.getElementById("valor").addEventListener("input", converter);
document.getElementById("de").addEventListener("change", converter);
document.getElementById("para").addEventListener("change", converter);

// Inverter
function inverter() {
    const de = document.getElementById("de");
    const para = document.getElementById("para");

    let temp = de.value;
    de.value = para.value;
    para.value = temp;

    converter();
}

// Mostrar histórico
function toggleHistorico() {
    const box = document.getElementById("historico-box");
    box.style.display = box.style.display === "none" ? "block" : "none";
}

// Limpar histórico
function limparHistorico() {
    localStorage.removeItem("historico");
    document.getElementById("historico").innerHTML = "";
}

// Converter
function converter() {
    const valor = parseFloat(document.getElementById("valor").value);
    const de = document.getElementById("de").value;
    const para = document.getElementById("para").value;

    const resultado = document.getElementById("resultado");
    const formula = document.getElementById("formula");

    if (isNaN(valor)) {
        resultado.innerText = "Digite um valor válido!";
        formula.innerText = "";
        return;
    }

    let celsius;

    if (de === "c") celsius = valor;
    else if (de === "f") celsius = (valor - 32) * 5 / 9;
    else celsius = valor - 273.15;

    let res;
    let formulaTexto = "";

    if (para === "c") {
        res = celsius;
        formulaTexto = "C = valor ou (F - 32) × 5/9 ou K - 273.15";
    } else if (para === "f") {
        res = (celsius * 9 / 5) + 32;
        formulaTexto = "F = (C × 9/5) + 32";
    } else {
        res = celsius + 273.15;
        formulaTexto = "K = C + 273.15";
    }

    const texto = `${valor} → ${res.toFixed(2)} ${para.toUpperCase()}`;

    resultado.innerText = texto;
    formula.innerText = formulaTexto;

    // Salvar histórico
    let historico = JSON.parse(localStorage.getItem("historico")) || [];
    historico.unshift(texto);

    if (historico.length > 10) historico.pop();

    localStorage.setItem("historico", JSON.stringify(historico));

    atualizarHistorico();
}

// Atualizar histórico
function atualizarHistorico() {
    const historicoDiv = document.getElementById("historico");
    let historico = JSON.parse(localStorage.getItem("historico")) || [];

    historicoDiv.innerHTML = "";

    historico.forEach(item => {
        historicoDiv.innerHTML += `<div>${item}</div>`;
    });
}

// Carregar ao abrir
document.addEventListener("DOMContentLoaded", () => {
    atualizarHistorico();
});

// 🌙 Alternar modo escuro
function toggleDarkMode() {
    document.body.classList.toggle("dark");

    // Salvar preferência
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDark);
}

// Aplicar modo salvo
const darkSalvo = localStorage.getItem("darkMode");

if (darkSalvo === "true") {
    document.body.classList.add("dark");
}
