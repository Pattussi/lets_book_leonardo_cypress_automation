const { merge } = require("mochawesome-merge");
const generator = require("mochawesome-report-generator");
const fs = require("fs");

async function generateReport() {
  try {
    console.log("🧩 Iniciando merge dos relatórios JSON...");

    // 🔹 Ajustado para a pasta real do projeto (reports/ na raiz)
    const reportDir = "reports";

    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const reportFiles = fs.readdirSync(reportDir).filter(f => f.endsWith(".json"));
    if (reportFiles.length === 0) {
      throw new Error(`Nenhum arquivo JSON encontrado em ${reportDir}/`);
    }

    // Faz o merge dos arquivos
    const jsonReport = await merge({
      files: [`${reportDir}/*.json`],
    });

    // Salva o arquivo JSON final
    fs.writeFileSync(`${reportDir}/report.json`, JSON.stringify(jsonReport, null, 2));
    console.log("✅ Arquivo report.json criado com sucesso.");

    // Gera o relatório HTML
    console.log("📊 Gerando relatório HTML...");
    await generator.create(jsonReport, {
      reportDir: `${reportDir}/html`,
      reportTitle: "Relatório de Auditoria de Testes - LetsBook", // 🔹 Corrigido para LetsBook!
      reportFilename: "mochawesome", 
      inlineAssets: true,
      overwrite: true,
    });

    console.log(`🎉 Relatório gerado com sucesso em: ${reportDir}/html/mochawesome.html`);
  } catch (err) {
    console.error("❌ Erro ao gerar o relatório:", err);
    process.exit(1);
  }
}

generateReport();