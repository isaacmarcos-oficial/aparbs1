import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 12,
    padding: 10,
    borderBottom: "1px solid #ccc",
  },
  textBold: {
    fontWeight: "bold",
  },
})


interface ContractData {
  nomeLocatario: string
  cpfLocatario: string
  enderecoLocatario: string
  dataInicio: string
  dataFim: string
  valorDiaria: string
  formaPagamento: string
}

// Essa função gera o PDF **sem JSX explícito no server**
export function ContratoPDF(data: ContractData) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>CONTRATO DE LOCAÇÃO DE VEÍCULO SEM CONDUTOR</Text>
        </View>

        <View style={styles.section}>
          <Text>LOCADORA: APARBS Transportes LTDA, CNPJ 51.494.204/0001-67</Text>
          <Text>LOCATÁRIO: {data.nomeLocatario}, CPF: {data.cpfLocatario}, Endereço: {data.enderecoLocatario}</Text>
        </View>

        <View style={styles.section}>
          <Text>OBJETO DO CONTRATO:</Text>
          <Text>Veículo: Volkswagem Voyage 1.6, 2016/2017, placa GDZ-7I85, cor CINZA, chassi 9BWDB45U5HT033347.</Text>
        </View>

        <View style={styles.section}>
          <Text>1. PRAZO DE LOCAÇÃO</Text>
          <Text>Início: {data.dataInicio} / Término: {data.dataFim}</Text>
        </View>

        <View style={styles.section}>
          <Text>2. VALOR E FORMA DE PAGAMENTO</Text>
          <Text>R$ {data.valorDiaria} por dia - Forma de pagamento: {data.formaPagamento}</Text>
        </View>

        {/* Demais cláusulas aqui, se quiser... */}

        <View style={styles.section}>
          <Text>Porteirinha/MG, {data.dataInicio.split("T")[0]}</Text>
          <Text>LOCADORA: ______________________________________</Text>
          <Text>LOCATÁRIO: ______________________________________</Text>
        </View>
      </Page>
    </Document>
  )
}
