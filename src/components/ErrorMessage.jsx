export function ErrorMessage({ message }) {
  if (!message) return null
  return <p style={styles.error}>{message}</p>
}

const styles = {
  error: { color: 'red', margin: 0, fontSize: '0.85rem' },
}