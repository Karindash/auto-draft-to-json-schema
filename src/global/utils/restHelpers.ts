export const getRestDefaults = (type: string, resourceName: string, criteria: string = "") => {
  if (!resourceName) return { method: "GET", path: "/" };
  const basePath = `/${resourceName.toLowerCase()}s`;
  const critPath = criteria ? `${basePath}/{${criteria}}` : `${basePath}/{id}`;

  switch (type) {
    case 'create': return { method: 'POST', path: basePath };
    case 'viewAll': return { method: 'GET', path: basePath };
    case 'viewBy': return { method: 'GET', path: critPath };
    case 'updateBy': return { method: 'PUT', path: critPath };
    case 'delete': return { method: 'DELETE', path: critPath };
    default: return { method: 'POST', path: `${basePath}/custom` };
  }
};

export const generateOpName = (type: string, resourceName: string, criteria: string = "") => {
  if (!resourceName) return "";
  const capitalized = resourceName.charAt(0).toUpperCase() + resourceName.slice(1);
  const crit = criteria ? `By${criteria.charAt(0).toUpperCase() + criteria.slice(1)}` : "";
  
  switch (type) {
    case 'create': return `create${capitalized}`;
    case 'viewAll': return `getAll${capitalized}s`;
    case 'viewBy': return `get${capitalized}${crit}`;
    case 'updateBy': return `update${capitalized}${crit}`;
    case 'delete': return `delete${capitalized}`;
    default: return `custom${capitalized}Op`;
  }
};
