const juridicaPrefix = '/juridica';
const historical = `${juridicaPrefix}/historical`;
const contracts = `${juridicaPrefix}/contracts`;

const juridicaRoutesList = {
  juridicaDashboard: juridicaPrefix,
  contracts: contracts,
  createContracts: `${contracts}/create`,
  historical: historical,
}

export default juridicaRoutesList;