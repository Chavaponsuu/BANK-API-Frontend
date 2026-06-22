interface Props {
  Label: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputUi(props: Props) {
  return (
    <div className="mb-4">
      <label 
        htmlFor={`input-${props.Label}`} 
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {props.Label}
      </label>
      <input
        id={`input-${props.Label}`}
        type={props.type || "text"}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className="w-full glass-card px-4 py-3 rounded-xl border border-white/30 
                   focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50
                   text-gray-900 placeholder-gray-500 transition-all"
      />
    </div>
  );
}
