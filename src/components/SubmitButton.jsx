export function SubmitButton({ isLoading, text, loadingText }) {
  return (
    <button type="submit" disabled={isLoading} style={styles.button}>
      {isLoading ? loadingText : text}
    </button>
  )
}

const styles = {
  button: { padding: '10px', fontSize: '1rem', cursor: 'pointer' },
}