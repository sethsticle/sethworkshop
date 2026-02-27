import { useState, type ChangeEvent } from 'react';
// @ts-ignore - Ignoring JS imports if your tsconfig is strictly looking for TS files
import { parseEnvironment, generateMasterTree } from '../lib/diffEngine';
import DiffViewer, { type MasterTreeData } from '../components/diffViewer';

export default function SWFMConfigViewer() {
  // Using 'any' here so we don't have to strictly type the raw parsed environment files yet
  const [envA, setEnvA] = useState<any>(null);
  const [envB, setEnvB] = useState<any>(null);
  const [masterTree, setMasterTree] = useState<MasterTreeData | null>(null);

  // Type the event as a file input change
  const handleUpload = async (e: ChangeEvent<HTMLInputElement>, setEnv: React.Dispatch<React.SetStateAction<any>>) => {
    if (e.target.files && e.target.files.length > 0) {
      // TypeScript doesn't natively know about the webkitdirectory properties on standard files
      setEnv(await parseEnvironment(e.target.files as any));
    }
  };

  const runComparison = () => {
    setMasterTree(generateMasterTree(envA, envB));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-emerald-400">Smart WFM Config Diff</h1>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 border border-slate-700 rounded-lg bg-slate-900">
            <label className="block text-sm font-medium mb-4">Upload Env A (Baseline)</label>
            {/* Ignore the webkitdirectory type error by explicitly passing the attributes */}
            <input 
              type="file" 
              {...{ webkitdirectory: "true", directory: "true" }} 
              onChange={(e) => handleUpload(e, setEnvA)}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-emerald-500 file:text-slate-900 cursor-pointer text-sm w-full" 
            />
            {envA && <p className="mt-4 text-xs text-emerald-400">Ready: {envA.environmentName}</p>}
          </div>

          <div className="p-6 border border-slate-700 rounded-lg bg-slate-900">
            <label className="block text-sm font-medium mb-4">Upload Env B (Target)</label>
            <input 
              type="file" 
              {...{ webkitdirectory: "true", directory: "true" }} 
              onChange={(e) => handleUpload(e, setEnvB)}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-emerald-500 file:text-slate-900 cursor-pointer text-sm w-full" 
            />
            {envB && <p className="mt-4 text-xs text-emerald-400">Ready: {envB.environmentName}</p>}
          </div>
        </div>

        <button 
          onClick={runComparison}
          disabled={!envA || !envB}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 rounded-lg font-bold text-white transition-colors">
          Run Deep Compare
        </button>

        <DiffViewer masterTree={masterTree} />
      </div>
    </div>
  );
}