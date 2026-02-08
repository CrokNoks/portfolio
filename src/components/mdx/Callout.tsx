import { AlertCircle, Info, CheckCircle, XCircle } from 'lucide-react';

interface CalloutProps {
  type: 'tip' | 'warning' | 'info' | 'danger';
  children: React.ReactNode;
}

const Callout = ({ type, children }: CalloutProps) => {
  const styles = {
    tip: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      icon: CheckCircle,
      iconColor: 'text-green-600 dark:text-green-400',
      title: 'Conseil'
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      icon: AlertCircle,
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      title: 'Attention'
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      icon: Info,
      iconColor: 'text-blue-600 dark:text-blue-400',
      title: 'Information'
    },
    danger: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      icon: XCircle,
      iconColor: 'text-red-600 dark:text-red-400',
      title: 'Danger'
    }
  };

  const config = styles[type];

  const Icon = config.icon;

  return (
    <div className={`my-6 p-4 rounded-lg border ${config.bg} ${config.border}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${config.iconColor}`} />
        <div>
          <p className={`font-semibold mb-2 ${config.iconColor}`}>
            {config.title}
          </p>
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Callout;