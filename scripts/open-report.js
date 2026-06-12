const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

// 🔹 Corrigido: Aponta para a pasta reports/ na raiz do projeto, subindo apenas 1 nível de /scripts
const reportPath = path.resolve(__dirname, "../reports/html/mochawesome.html");

console.log("🧾 Tentando abrir o relatório Mochawesome...");

// Verifica se o arquivo existe
if (!fs.existsSync(reportPath)) {
  console.error("❌ O relatório não foi encontrado em:", reportPath);
  process.exit(1);
}

// Tenta abrir com o Chrome
exec(`"${process.env.ProgramFiles}\\Google\\Chrome\\Application\\chrome.exe" "file:///${reportPath}"`, (err) => {
  if (err) {
    console.warn("⚠️ Não foi possível abrir no Chrome. Tentando navegador padrão...");
    exec(`start "" "file:///${reportPath}"`, (fallbackErr) => {
      if (fallbackErr) {
        console.error("❌ Falha ao abrir o relatório automaticamente:", fallbackErr.message);
        console.log(`📂 Abra manualmente em: file:///${reportPath}`);
      } else {
        console.log("✅ Relatório aberto no navegador padrão!");
      }
    });
  } else {
    console.log("✅ Relatório aberto no Google Chrome!");
  }
});