
const Input = (props) => {
  const Icon = props.icon;
  return (
    <div className="mb-5">
      <div className="relative group">
        {/* The Icon Container */}
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors">
          <Icon className="size-5 text-gray-500 group-focus-within:text-primary" />
        </div>

        {/* The Input Field */}
        <input
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          required={props.required}
          className="w-full pl-11 pr-4 py-3 bg-bg-card/40 border border-gray-700 rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary 
                     text-white placeholder-gray-500 transition-all duration-200"
        />
      </div>
    </div>
  );
};

export default Input;
