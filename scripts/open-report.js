const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

// 🔹 Corrigido: Aponta para a pasta correta dentro de /cypress
const reportPath = path.resolve(__dirname, "../cypress/reports/html/mochawesome.html");

console.log("🧾 Tentando abrir o relatório Mochawesome...");

// Verifica se o arquivo existe
if (!fs.existsSync(reportPath)) {
  console.error("❌ O relatório não foi encontrado em:", reportPath);
  process.exit(1);
}

// 🔹 Evita quebra no CI: Se estiver rodando no GitHub Actions, não tenta abrir o navegador
if (process.env.GITHUB_ACTIONS === "true") {
  console.log("🚀 Detectado ambiente de CI (GitHub Actions). Relatório gerado com sucesso!");
  console.log(`📂 Caminho do artefato: ${reportPath}`);
  process.exit(0); // Encerra com sucesso sem tentar abrir a interface gráfica
}

// Se estiver na sua máquina local (Windows), segue o fluxo normal de abertura
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