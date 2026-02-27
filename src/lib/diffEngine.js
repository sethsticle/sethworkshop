// src/utils/diffEngine.js

export const parseEnvironment = async (files) => {
  const environmentState = {
    environmentName: files[0].webkitRelativePath.split('/')[0],
    rootFiles: {},
    folders: {}
  };

  for (const file of files) {
    if (!file.name.endsWith('.json')) continue;
    const pathParts = file.webkitRelativePath.split('/');
    const fileName = file.name;

    try {
      const fileContent = await file.text();
      const jsonData = JSON.parse(fileContent);

      if (pathParts.length === 2) {
        environmentState.rootFiles[fileName] = jsonData;
      } else if (pathParts.length >= 3) {
        const folderName = pathParts[1];
        if (!environmentState.folders[folderName]) environmentState.folders[folderName] = {};
        environmentState.folders[folderName][fileName] = jsonData;
      }
    } catch (error) {
      console.error(`Failed to parse ${fileName}:`, error);
    }
  }
  return environmentState;
};

const deepCompare = (val1, val2) => {
  if (typeof val1 !== 'object' || val1 === null || typeof val2 !== 'object' || val2 === null) {
    if (val1 === val2) return { status: 'match', val1, val2 };
    return { status: 'drift', val1, val2 };
  }

  const children = {};
  const keys = [...new Set([...Object.keys(val1 || {}), ...Object.keys(val2 || {})])];
  let containsDifferences = false;

  keys.forEach(key => {
    const in1 = val1 && val1.hasOwnProperty(key);
    const in2 = val2 && val2.hasOwnProperty(key);

    if (in1 && !in2) {
      children[key] = { status: 'only_in_1', val1: val1[key], val2: undefined };
      containsDifferences = true;
    } else if (!in1 && in2) {
      children[key] = { status: 'only_in_2', val1: undefined, val2: val2[key] };
      containsDifferences = true;
    } else {
      const result = deepCompare(val1[key], val2[key]);
      children[key] = result;
      if (result.status !== 'match' && result.status !== 'clean_nested') {
        containsDifferences = true;
      }
    }
  });

  return { status: containsDifferences ? 'contains_differences' : 'clean_nested', children };
};

export const generateMasterTree = (envA, envB) => {
  if (!envA || !envB) return null;
  const tree = { rootFiles: {}, folders: {} };
  const getUniqueKeys = (obj1 = {}, obj2 = {}) => [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])];

  // 1. Root Files
  const rootKeys = getUniqueKeys(envA.rootFiles, envB.rootFiles);
  rootKeys.forEach(fileName => {
    const inA = envA.rootFiles[fileName] !== undefined;
    const inB = envB.rootFiles[fileName] !== undefined;
    const diffTree = (inA && inB) ? deepCompare(envA.rootFiles[fileName], envB.rootFiles[fileName]) : null;
    tree.rootFiles[fileName] = { status: inA && inB ? 'compared' : inA ? 'only_in_1' : 'only_in_2', diffTree };
  });

  // 2. Folders & Files (with Status Bubbling)
  const folderKeys = getUniqueKeys(envA.folders, envB.folders);
  folderKeys.forEach(folderName => {
    const inA = envA.folders[folderName] !== undefined;
    const inB = envB.folders[folderName] !== undefined;
    tree.folders[folderName] = { status: 'comparing...', files: {} };

    let folderHasDrift = false;
    let folderHasMissingFiles = false;
    const fileKeys = getUniqueKeys(envA.folders[folderName], envB.folders[folderName]);

    fileKeys.forEach(fileName => {
      const fileInA = envA.folders[folderName]?.[fileName] !== undefined;
      const fileInB = envB.folders[folderName]?.[fileName] !== undefined;
      const diffTree = (fileInA && fileInB) ? deepCompare(envA.folders[folderName][fileName], envB.folders[folderName][fileName]) : null;
      const fileStatus = fileInA && fileInB ? 'compared' : fileInA ? 'only_in_1' : 'only_in_2';

      if (fileStatus !== 'compared') folderHasMissingFiles = true;
      if (diffTree && diffTree.status === 'contains_differences') folderHasDrift = true;

      tree.folders[folderName].files[fileName] = { status: fileStatus, diffTree };
    });

    if (inA && inB) {
      if (folderHasMissingFiles && folderHasDrift) tree.folders[folderName].status = 'contains_drifts_and_missing_files';
      else if (folderHasMissingFiles) tree.folders[folderName].status = 'contains_missing_files';
      else if (folderHasDrift) tree.folders[folderName].status = 'contains_differences';
      else tree.folders[folderName].status = 'clean_match';
    } else {
      tree.folders[folderName].status = inA ? 'only_in_1' : 'only_in_2';
    }
  });

  return tree;
};