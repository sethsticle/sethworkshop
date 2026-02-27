import { useState } from 'react';

// 1. Tell TypeScript what our engine output looks like
export interface DiffNode {
  status: string;
  val1?: any;
  val2?: any;
  children?: Record<string, DiffNode>;
  files?: Record<string, DiffNode>;
  diffTree?: DiffNode;
}

export interface MasterTreeData {
  rootFiles: Record<string, DiffNode>;
  folders: Record<string, DiffNode>;
}

interface TreeNodeProps {
  label: string;
  nodeData: DiffNode;
  depth?: number;
}

const TreeNode = ({ label, nodeData, depth = 0 }: TreeNodeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  let statusColor = "text-slate-400"; 
  let bgColor = "hover:bg-slate-800";
  let statusMessage = ""; 
  
  if (nodeData?.status?.includes('only_in_1')) { statusColor = "text-red-400"; bgColor = "hover:bg-red-950/30"; statusMessage = "only in Env A"; }
  else if (nodeData?.status?.includes('only_in_2')) { statusColor = "text-blue-400"; bgColor = "hover:bg-blue-950/30"; statusMessage = "only in Env B"; }
  else if (nodeData?.status === 'drift') { statusColor = "text-orange-400"; bgColor = "hover:bg-orange-950/30"; statusMessage = "drift detected"; }
  else if (nodeData?.status === 'contains_differences') { statusColor = "text-orange-400"; bgColor = "hover:bg-orange-950/30"; statusMessage = "contains drifts"; }
  else if (nodeData?.status === 'contains_missing_files') { statusColor = "text-orange-400"; bgColor = "hover:bg-orange-950/30"; statusMessage = "missing files inside"; }
  else if (nodeData?.status === 'contains_drifts_and_missing_files') { statusColor = "text-orange-500"; bgColor = "hover:bg-orange-950/40"; statusMessage = "drifts & missing files"; }
  else if (nodeData?.status === 'clean_match' || nodeData?.status === 'clean_nested') { statusColor = "text-emerald-400"; bgColor = "hover:bg-emerald-950/30"; }

  const hasFiles = nodeData?.files && Object.keys(nodeData.files).length > 0;
  const hasDiffChildren = nodeData?.diffTree?.children && Object.keys(nodeData.diffTree.children).length > 0;
  const hasNestedChildren = nodeData?.children && Object.keys(nodeData.children).length > 0;
  const isExpandable = hasFiles || hasDiffChildren || hasNestedChildren;

  return (
    <div className="font-mono text-sm">
      <div 
        className={`flex items-center py-1.5 px-2 rounded cursor-pointer select-none transition-colors ${bgColor}`}
        style={{ paddingLeft: `${depth * 1.5}rem` }}
        onClick={() => isExpandable && setIsOpen(!isOpen)}
      >
        <span className="w-5 text-slate-500 mr-1 flex-shrink-0">
          {isExpandable ? (isOpen ? '▼' : '▶') : '•'}
        </span>
        
        <span className={`flex-1 flex items-center flex-wrap gap-2 ${statusColor}`}>
          <span className="font-medium">{label}</span>
          {statusMessage && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-sm border border-current opacity-70 uppercase tracking-wider font-semibold">
              {statusMessage}
            </span>
          )}
        </span>
        
        {nodeData?.status === 'drift' && (
          <div className="flex gap-4 text-xs opacity-90 bg-slate-950/50 px-2 py-1 rounded ml-4">
            <span className="text-red-300 line-through">Env A: {String(nodeData.val1)}</span>
            <span className="text-emerald-300">Env B: {String(nodeData.val2)}</span>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="border-l border-slate-700/50 ml-4 mt-1 mb-2">
          {hasFiles && Object.entries(nodeData.files!).map(([key, data]) => (
            <TreeNode key={key} label={key} nodeData={data} depth={depth + 1} />
          ))}
          {hasDiffChildren && Object.entries(nodeData.diffTree!.children!).map(([key, data]) => (
            <TreeNode key={key} label={key} nodeData={data} depth={depth + 1} />
          ))}
          {hasNestedChildren && Object.entries(nodeData.children!).map(([key, data]) => (
            <TreeNode key={key} label={key} nodeData={data} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

// 2. Type the props for the main export
export default function diffViewer({ masterTree }: { masterTree: MasterTreeData | null }) {
  if (!masterTree) return null;

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mt-6 overflow-x-auto">
      <h2 className="text-lg font-bold text-slate-200 mb-4 border-b border-slate-700 pb-2">Environment Comparison Tree</h2>
      
      {Object.entries(masterTree.rootFiles).map(([fileName, data]) => (
        <TreeNode key={fileName} label={fileName} nodeData={data} />
      ))}

      {Object.entries(masterTree.folders).map(([folderName, data]) => (
        <TreeNode key={folderName} label={folderName} nodeData={data} />
      ))}
    </div>
  );
}