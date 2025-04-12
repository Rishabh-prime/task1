export function Button({ label, onClick, color = 'blue' }) {
    return (
      <button
        onClick={onClick}
        className={`bg-${color}-600 text-white px-4 py-2 rounded hover:bg-${color}-700`}
      >
        {label}
      </button>
    );
  }
  
  export function Input({ placeholder, name, value, onChange }) {
    return (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="p-2 border rounded w-full"
      />
    );
  }