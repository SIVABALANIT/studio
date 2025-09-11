import { Code, Shield, BrainCircuit, Database, Terminal } from 'lucide-react';
import type { SVGProps } from 'react';

const PythonIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10.2 2.5a.7.7 0 0 0-1.2 0l-4 6.9a.7.7 0 0 0 .6 1h8a.7.7 0 0 0 .6-1l-4-6.9zM13.8 21.5a.7.7 0 0 1 1.2 0l4 6.9a.7.7 0 0 1-.6 1h-8a.7.7 0 0 1-.6-1l4-6.9z" />
      <path d="M10 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM14 18.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
);


type DomainIconProps = {
  icon: string;
  className?: string;
};

export function DomainIcon({ icon, className }: DomainIconProps) {
  const iconProps = { className: className || 'h-8 w-8 text-primary' };
  switch (icon) {
    case 'python':
      return <PythonIcon {...iconProps} />;
    case 'java':
      return <Code {...iconProps} />;
    case 'cybersecurity':
      return <Shield {...iconProps} />;
    case 'ai-ml':
      return <BrainCircuit {...iconProps} />;
    case 'sql':
      return <Database {...iconProps} />;
    case 'bash':
      return <Terminal {...iconProps} />;
    default:
      return <Code {...iconProps} />;
  }
}
