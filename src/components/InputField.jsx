export function InputField({ label, type, name, value, onChange, autoComplete, required = true }) {
  return (
    <label style={styles.label}>
      {label}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
        style={styles.input}
      />
    </label>
  )
}

const styles = {
  label: { display: 'flex', flexDirection: 'column', fontSize: '0.9rem' },
  input: { display: 'block', width: '100%', marginTop: '4px', padding: '8px', fontSize: '1rem', boxSizing: 'border-box' },
}