const juridicaPrefix = '/juridica';
const historical = `${juridicaPrefix}/historical`;
const contracts = `${juridicaPrefix}/contracts`;
const lawyers = `${juridicaPrefix}/lawyers`;

const juridicaRoutesList = {
  juridicaDashboard: juridicaPrefix,
  contracts: contracts,
  listContracts: `${contracts}/list`,
  createContracts: `${contracts}/create`,
  historical: historical,
  lawyers: lawyers,
}

export default juridicaRoutesList;